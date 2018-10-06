const schedule = (() => {
	let batchesArr;
	let distinctCoursesArr;
	let $batchContainer;
	let $addBatchForm;
	let $editButton;
	let $deleteButton;
	let $courseSelectMenu;

	function getCourseCode(courseId) {
		let courseCode;
		distinctCoursesArr.forEach(courseInfo => {
			if (courseId === courseInfo._id) courseCode = courseInfo.code;
		});
		return courseCode;
	}

	function cache() {
		$addBatchForm = $('.add_batch_form');
		$batchContainer = $('#active_batch_container');
		$courseSelectMenu = $('#course_select_menu');
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
			const deletedTuition = await submitDeleteRequest(tuitionId, courseId, batchId);
			console.log('Batch was successfully deleted');
			newCourseArr = batchesArr.filter(batchObj => batchObj._id !== batchId);
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
				uniqueCourseArr.push({ _id: coursesArr[i]._id, code: coursesArr[i].code });
				uniqueCourseIds[coursesArr[i]._id] = true;
			}
		}
	}

	function bindEvents() {
		$addBatchForm.submit(addBatch);
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteBatch);
	}

	function render() {
		const cardsHtml = template.batchCard({ batches: batchesArr });
		$batchContainer.html(cardsHtml);

		const courseOptionsHTML = template.courseOptions({ courses: distinctCoursesArr });
		$courseSelectMenu.html(courseOptionsHTML).selectpicker('refresh');
	}

	function refresh(batches) {
		if (batches) batchesArr = batches;
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init(batches, courses) {
		if (batches === undefined) throw new Error('Batches not provided');
		if (Array.isArray(batches) === false) throw new Error('Batches not an array');

		if (courses === undefined) throw new Error('Courses not provided');
		if (Array.isArray(courses) === false) throw new Error('Courses not an array');

		batchesArr = batches;
		distinctCoursesArr = getUniqueCourses(courses);

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	return { init };
})();
