const schedule = (() => {
	let schedulesArr;
	let distinctBatchesArr;
	let $scheduleContainer;
	let $addscheduleForm;
	let $editButton;
	let $deleteButton;

	// function getCourseCode(batchId) {
	// 	let batchCode;
	// 	distinctBatchesArr.forEach(batchInfo => {
	// 		if (batchId === batchInfo._id) batchCode = batchInfo.code;
	// 	});
	// 	return batchCode;
	// }

	function cache() {
		$addscheduleForm = $('.add-schedule-form');
		$scheduleContainer = $('#active_schedule_container');
	}

	function cacheDynamic() {
		$editButton = $('.schedule-edit');
		$deleteButton = $('.delete-schedule-btn');
	}

	function requestAddschedule(tuitionId, courseId, batchId, newScheduleDetails) {
		return tuitionApiCalls.putscheduleInCourseInTuition(tuitionId, courseId, batchId, newScheduleDetails);
	}

	function submitEditRequest(tuitionId, courseId, batchId, scheduleId, editedData) {
		return tuitionApiCalls.editscheduleInCourseInTuition(tuitionId, courseId, batchId, scheduleId, editedData);
	}

	async function editschedule(tuitionId, courseId, batchId, scheduleId) {
		try {
			const editedData = modal.serializeForm();
			const editedschedule = await submitEditRequest(tuitionId, courseId, batchId, scheduleId, editedData);
			modal.hideModal();
			console.log('schedule was successfully edited');
			editedschedule.tuitionId = tuitionId;
			editedschedule.courseId = courseId;
			editedschedule.batchId = batchId;
			const newscheduleArr = schedulesArr.map(scheduleObj => scheduleObj._id === scheduleId ? editedschedule : scheduleObj)
			refresh(newscheduleArr);
		} catch (err) {
			console.error(err);
		}
	}

	function submitDeleteRequest(tuitionId, courseId, batchId, scheduleId) {
		return tuitionApiCalls.deletescheduleInCourseInTuition(tuitionId, courseId, batchId, scheduleId);
	}

	async function deleteschedule(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const batchId = $deleteBtn.attr('data-batch-id');
			const courseId = $deleteBtn.attr('data-course-id');
			const scheduleId = $deleteBtn.attr('data-schedule-id');
			const deletedTuition = await submitDeleteRequest(tuitionId, courseId, batchId, scheduleId);
			console.log('schedule was successfully deleted');
			newCourseArr = schedulesArr.filter(scheduleObj => scheduleObj._id !== scheduleId);
			refresh(newCourseArr);
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const batchId = $editBtn.attr('data-batch-id');
		const courseId = $editBtn.attr('data-course-id');
		const scheduleId = $editBtn.attr('data-schedule-id');
		const scheduleInfo = schedulesArr.find(scheduleToBeEdited => scheduleToBeEdited._id === scheduleId);
		const editscheduleInputHTML = template.scheduleEditInputs(scheduleInfo);
		modal.renderFormContent(editscheduleInputHTML);
		modal.bindSubmitEvent(() => editschedule(tuitionId, courseId, batchId, scheduleId));
		modal.showModal();
	}

	async function addschedule(e) {
		try {
			e.preventDefault();
			const $form = $(e.target);
			const tuitionId = $form.attr('data-id');
			// FIXME: extract batchId for new schedule
			const serializedForm = $form.serialize();
			const batchId = $batchSelectMenu.val();
			const batchCode = getCourseCode(batchId);
			const newschedule = await requestAddschedule(tuitionId, courseId, batchId, serializedForm);
			newschedule.batchId = batchId;
			newschedule.batchCode = batchCode;
			newschedule.tuitionId = tuitionId;
			schedulesArr.push(newschedule);
			$form.trigger('reset');
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function getUniqueBatches(batchsArr) {
		if (Array.isArray(batchsArr) === false) throw new Error('Course provided is not an array');

		const uniqueCourseIds = {};
		const uniqueCourseArr = [];
		for (const i in batchsArr) {
			if (uniqueCourseIds[batchsArr[i]._id] !== true) {
				uniqueCourseArr.push({ _id: batchsArr[i]._id, code: batchsArr[i].code });
				uniqueCourseIds[batchsArr[i]._id] = true;
			}
		}
	}

	function bindEvents() {
		$addscheduleForm.submit(addschedule);
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteschedule);
	}

	function render() {
		const cardsHtml = template.scheduleCard({ schedules: schedulesArr });
		$scheduleContainer.html(cardsHtml);

		// const batchOptionsHTML = template.batchOptions({ batchs: distinctBatchesArr });
		// $batchSelectMenu.html(batchOptionsHTML).selectpicker('refresh');
	}

	function refresh(schedules) {
		if (schedules) schedulesArr = schedules;
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init(schedules, batches) {
		if (schedules === undefined) throw new Error('schedules not provided');
		if (Array.isArray(schedules) === false) throw new Error('schedules not an array');

		if (batches === undefined) throw new Error('batches not provided');
		if (Array.isArray(batches) === false) throw new Error('batches not an array');

		schedulesArr = schedules;
		// distinctBatchesArr = getUniqueBatches(batches);

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	return { init };
})();
