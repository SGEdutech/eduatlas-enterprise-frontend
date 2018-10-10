const batch = (() => {
	let studentsArr;
	let batchesArr;
	let distinctCoursesArr;
	let $batchContainer;
	let $addBatchForm;
	let $editButton;
	let $deleteButton;
	let $courseSelectMenu;
	let $studentChekboxContainer;

	function getCourseCode(courseId) {
		let courseCode;
		distinctCoursesArr.forEach(courseInfo => {
			if (courseId === courseInfo._id) courseCode = courseInfo.code;
		});
		return courseCode;
	}

	function getAllStudensWithInThisBatch(batchStudentArray) {
		if (studentsArr === undefined) throw new Error('Module has not been initialised');
		if (Array.isArray(studentsArr) === false) throw new Error('Students array not an array ');

		if (batchStudentArray === undefined) throw new Error('Batch student array not provided');
		if (Array.isArray(batchStudentArray) === false) throw new Error('Batch student is not an array');

		// Doing this to prevent actual objects from being manipulated
		// JSON meathod has been implemented for performance
		const jsonString = JSON.stringify(studentsArr);
		const duplicateStudentsArr = JSON.parse(jsonString);

		duplicateStudentsArr.forEach(studentObj => {
			studentObj.inThisBatch = batchStudentArray.indexOf(studentObj._id) !== -1;
		});
		return duplicateStudentsArr;
	}

	function cache() {
		$addBatchForm = $('.add_batch_form');
		$batchContainer = $('.active-batch-container');
		$courseSelectMenu = $('.course-select-menu');
		$studentChekboxContainer = $('.student-checkbox-container');
	}

	function cacheDynamic() {
		$editButton = $('.batch-edit');
		$deleteButton = $('.delete-batch-btn');
	}

	function requestAddBatch(tuitionId, courseId, newCourseDetails) {
		return tuitionApiCalls.putBatchInCourseInTuition(tuitionId, courseId, newCourseDetails);
	}

	function submitEditRequest(tuitionId, courseId, batchId, editedData) {
		return tuitionApiCalls.editBatchInCourseInTuition(tuitionId, courseId, batchId, editedData);
	}

	async function editBatch(tuitionId, courseId, batchId) {
		try {
			const editedData = modal.serializeForm();
			const editedBatch = await submitEditRequest(tuitionId, courseId, batchId, editedData);
			modal.hideModal();
			console.log('Batch was successfully edited');
			editedBatch.tuitionId = tuitionId;
			editedBatch.courseId = courseId;
			editedBatch.courseCode = getCourseCode(courseId);
			const newBatchArr = batchesArr.map(batchObj => batchObj._id === batchId ? editedBatch : batchObj)
			PubSub.publish('batch.edit', editedBatch);
			refresh(newBatchArr);
		} catch (err) {
			console.error(err);
		}
	}

	function submitDeleteRequest(tuitionId, courseId, batchId) {
		return tuitionApiCalls.deleteBatchInCourseInTuition(tuitionId, courseId, batchId);
	}

	async function deleteBatch(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const courseId = $deleteBtn.attr('data-course-id');
			const batchId = $deleteBtn.attr('data-batch-id');
			const deletedBatch = await submitDeleteRequest(tuitionId, courseId, batchId);
			console.log('Batch was successfully deleted');
			newCourseArr = batchesArr.filter(batchObj => batchObj._id !== batchId);
			PubSub.publish('batch.delete', deletedBatch);
			refresh(newCourseArr);
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const courseId = $editBtn.attr('data-course-id');
		const batchId = $editBtn.attr('data-batch-id');
		const batchInfo = batchesArr.find(batchToBeEdited => batchToBeEdited._id === batchId);
		batchInfo.allStudents = getAllStudensWithInThisBatch(batchInfo.students);
		const editBatchInputHTML = template.batchEditInputs(batchInfo);
		modal.renderFormContent(editBatchInputHTML);
		modal.bindSubmitEvent(() => editBatch(tuitionId, courseId, batchId));
		modal.showModal();
	}

	async function addBatch(e) {
		try {
			e.preventDefault();
			const $form = $(e.target);
			const tuitionId = $form.attr('data-id');
			// FIXME: extract courseId for new batch
			const serializedForm = $form.serialize();
			const courseId = $courseSelectMenu.val();
			const courseCode = getCourseCode(courseId);
			const newBatch = await requestAddBatch(tuitionId, courseId, serializedForm);
			newBatch.courseId = courseId;
			newBatch.courseCode = courseCode;
			newBatch.tuitionId = tuitionId;
			batchesArr.push(newBatch);
			PubSub.publish('batch.add', newBatch);
			$form.trigger('reset');
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function getUniqueCourses(coursesArr) {
		if (Array.isArray(coursesArr) === false) throw new Error('Course provided is not an array');

		const uniqueCourseIds = {};
		const uniqueCourseArr = [];
		for (const i in coursesArr) {
			if (uniqueCourseIds[coursesArr[i]._id] !== true) {
				uniqueCourseArr.push({ _id: coursesArr[i]._id, code: coursesArr[i].code, tuitionId: coursesArr[i].tuitionId });
				uniqueCourseIds[coursesArr[i]._id] = true;
			}
		}
		return uniqueCourseArr;
	}

	function bindEvents() {
		$addBatchForm.submit(addBatch);
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteBatch);
	}

	function render() {
		$batchContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const batchesArrOfThisTuition = batchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);

			const cardsHtml = template.batchCard({ batches: batchesArrOfThisTuition });
			$container.html(cardsHtml);
		});

		$courseSelectMenu.each((__, selectMenu) => {
			const $selectMenu = $(selectMenu);
			const tuitionId = $selectMenu.attr('data-tuition-id');

			const coursesOfThisTuition = distinctCoursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
			const courseOptionsHTML = template.courseOptions({ courses: coursesOfThisTuition });
			$selectMenu.html(courseOptionsHTML).selectpicker('refresh');
		});

		$studentChekboxContainer.each((__, checkboxContainer) => {
			const $checkboxContainer = $(checkboxContainer);
			const tuitionId = $checkboxContainer.attr('data-tuition-id');

			const studentsOfThisTuition = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);

			const studentCheckboxesHTML = template.studentCheckboxes({ students: studentsOfThisTuition });
			$checkboxContainer.html(studentCheckboxesHTML);
		});
	}

	function refresh(batches) {
		if (batches) batchesArr = batches;
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init(batches, courses, students) {
		if (batches === undefined) throw new Error('Batches not provided');
		if (Array.isArray(batches) === false) throw new Error('Batches not an array');

		if (courses === undefined) throw new Error('Courses not provided');
		if (Array.isArray(courses) === false) throw new Error('Courses not an array');

		if (students === undefined) throw new Error('Students not provided');
		if (Array.isArray(students) === false) throw new Error('Students not an array');

		batchesArr = batches;
		distinctCoursesArr = getUniqueCourses(courses);
		studentsArr = students;
		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	PubSub.subscribe('course.add', (msg, courseAdded) => {
		const newCourse = { _id: courseAdded._id, code: courseAdded.code };
		distinctCoursesArr.push(newCourse);
		refresh();
	});

	PubSub.subscribe('course.edit', (msg, editedCourse) => {
		distinctCoursesArr.forEach(courseObj => {
			if (courseObj._id === editedCourse._id) courseObj.code = editedCourse.code;
		});
		batchesArr.forEach(batchObj => {
			if (editedCourse._id === batchObj.courseId) batchObj.courseCode = editedCourse.code;
		})
		refresh();
	});

	PubSub.subscribe('course.delete', (msg, deletedCourse) => {
		distinctCoursesArr = distinctCoursesArr.filter(courseObj => courseObj._id !== deletedCourse._id);
		batchesArr = batchesArr.filter(batchObj => batchObj.courseId !== deletedCourse._id);
		refresh();
	});

	PubSub.subscribe('student.add', (msg, studentAdded) => {
		studentsArr.push(studentAdded);
		refresh();
	});

	PubSub.subscribe('student.edit', (msg, studentAdded) => {
		studentsArr = studentsArr.map(studentObj => {
			if (studentObj._id === studentAdded._id) return studentAdded;
			return studentObj;
		});
		refresh();
	});

	PubSub.subscribe('student.delete', (msg, studentAdded) => {
		studentsArr = studentsArr.filter(studentObj => studentObj._id !== studentAdded._id);
		refresh();
	});

	return { init };
})();