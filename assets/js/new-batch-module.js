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
	let $codeInp;
	let $batchStudentSearchTrigger;
	let $batchStudentSearchReset;
	let $studentSearchInp;

	function getCourseCode(courseId) {
		let courseCode;
		distinctCoursesArr.forEach(courseInfo => {
			if (courseId === courseInfo._id) courseCode = courseInfo.code;
		});
		return courseCode;
	}

	function getAllStudensWithInThisBatch(batchStudentArray, tuitionId) {
		if (studentsArr === undefined) throw new Error('Module has not been initialised');
		if (Array.isArray(studentsArr) === false) throw new Error('Students array not an array ');

		if (batchStudentArray === undefined) throw new Error('Batch student array not provided');
		if (Array.isArray(batchStudentArray) === false) throw new Error('Batch student is not an array');

		const filteredStudentsArr = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);

		filteredStudentsArr.forEach(studentObj => {
			studentObj.inThisBatch = batchStudentArray.indexOf(studentObj._id) !== -1;
		});
		return filteredStudentsArr;
	}

	function cache() {
		$addBatchForm = $('.add_batch_form');
		$batchContainer = $('.active-batch-container');
		$courseSelectMenu = $('.course-select-menu');
		$studentChekboxContainer = $('.student-checkbox-container');
		$codeInp = $('.add-batch-code-inp');
		$batchStudentSearchTrigger = $('.batch-student-search-trigger');
		$batchStudentSearchReset = $('.batch-student-search-reset');
		$studentSearchInp = $('.batch-student-search-inp');
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

	async function editBatch(event, tuitionId, courseId, batchId) {
		try {
			event.preventDefault();
			const editedData = modal.serializeForm();
			const editedBatch = await submitEditRequest(tuitionId, courseId, batchId, editedData);
			modal.hideModal();
			notification.push('Batch has been successfully edited');
			editedBatch.tuitionId = tuitionId;
			editedBatch.courseId = courseId;
			editedBatch.courseCode = getCourseCode(courseId);
			batchesArr = batchesArr.map(batchObj => batchObj._id === batchId ? editedBatch : batchObj);
			PubSub.publish('batch.edit', editedBatch);
			refresh();
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
			deletedBatch.tuitionId = tuitionId;
			deletedBatch.courseId = courseId;
			notification.push('Batch has been successfully deleted');
			console.log('Batch was successfully deleted');
			batchesArr = batchesArr.filter(batchObj => batchObj._id !== deletedBatch._id);
			PubSub.publish('batch.delete', deletedBatch);
			refresh();
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
		batchInfo.allStudents = getAllStudensWithInThisBatch(batchInfo.students, tuitionId);
		const editBatchInputHTML = template.batchEditInputs(batchInfo);
		modal.renderFormContent(editBatchInputHTML);
		modal.bindSubmitEvent(e => editBatch(e, tuitionId, courseId, batchId));
		modal.showModal();
	}

	function isDuplicateCode(tuitionId) {
		const code = $codeInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const batchesOfThisTuition = batchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
		let isCodeDuplicate = false;
		batchesOfThisTuition.forEach(batchObj => {
			if (batchObj.code === code) isCodeDuplicate = true;
		});
		return isCodeDuplicate;
	}

	async function addBatch(event) {
		try {
			event.preventDefault();
			const $form = $(event.target);
			const tuitionId = $form.attr('data-id');
			if (isDuplicateCode(tuitionId)) {
				alert('A batch with same code has already been added');
				return;
			}
			const serializedForm = $form.serialize();
			const courseId = $courseSelectMenu.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const courseCode = getCourseCode(courseId);
			const newBatch = await requestAddBatch(tuitionId, courseId, serializedForm);
			notification.push('Batch has been successfully added');
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

	function renderStudentCheckbox(studentsInfoArr, renderTuitionId) {
		if (studentsInfoArr === undefined) throw new Error('Students not provided');
		if (Array.isArray(studentsInfoArr) === false) throw new Error('Students info array not an array');

		$studentChekboxContainer.each((__, checkboxContainer) => {
			const $checkboxContainer = $(checkboxContainer);
			const tuitionId = $checkboxContainer.attr('data-tuition-id');

			if (renderTuitionId && renderTuitionId !== tuitionId) return;

			const studentsOfThisTuition = studentsInfoArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			// to increment index
			Handlebars.registerHelper("inc", function(value, options) {
				return parseInt(value) + 1;
			});
			const studentCheckboxesHTML = template.studentCheckboxes({ students: studentsOfThisTuition });
			$checkboxContainer.html(studentCheckboxesHTML);
		});
	}

	function filterAndRenderStudents(event) {
		$btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');

		const searchStr = $studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const regex = new RegExp(searchStr, 'i');

		const searchStudentArr = studentsArr.filter(studentObj => regex.test(studentObj.name));
		renderStudentCheckbox(searchStudentArr, tuitionId);
	}

	function clearSearchInpAndRenderStudents(event) {
		$btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		renderStudentCheckbox(studentsArr, tuitionId);

		$studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val('');
	}

	function bindEvents() {
		$addBatchForm.submit(addBatch);
		$batchStudentSearchTrigger.click(filterAndRenderStudents);
		$batchStudentSearchReset.click(clearSearchInpAndRenderStudents);
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

		renderStudentCheckbox(studentsArr);
	}

	function refresh() {
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

		batchesArr = JSON.parse(JSON.stringify(batches));
		distinctCoursesArr = getUniqueCourses(courses);
		studentsArr = JSON.parse(JSON.stringify(students));
		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	PubSub.subscribe('course.add', (msg, courseAdded) => {
		distinctCoursesArr.push(courseAdded);
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

	PubSub.subscribe('batch.edit', (msg, editedBatch) => {
		batchesArr = batchesArr.map(batchObj => {
			if (batchObj._id === editedBatch._id) return editedBatch;
			return batchObj;
		});
		refresh();
	});

	PubSub.subscribe('student.add', (msg, studentAdded) => {
		if (Array.isArray(studentAdded)) {
			studentsArr = studentsArr.concat(studentAdded);
		} else {
			studentsArr.push(studentAdded);
		}
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
