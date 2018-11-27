const schedule = (() => {
	let distinctBatchesArr;
	let distinctStudentArr;
	let $scheduleContainer;
	let $scheduleRow;
	let $editButton;
	let $deleteButton;
	let $fromDate;
	let $toDate;
	let $fromTime;
	let $toTime;
	let $addClassEntryBtn;
	let $dayDropdown;
	let $addScheduleContainer;
	let $saveScheduleBtn;
	let $batchCheckboxContainer;
	let $clonedRows;
	let $staticScheduleCol;
	let $staticInps;
	let $staticSelects;
	let $validationForm;
	let $removeRowBtn;

	// FIXME: Use function made in randon script
	function getInputsValues($container) {
		const $inputs = $container.find('input, select');
		const nameToValueMap = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			nameToValueMap[name] = value;
		})
		return nameToValueMap;
	}

	function getStudentEmailIds(batchIds) {
		if (batchIds === undefined) throw new Error('Batch ids is not provided');
		// Forcing batchIds ot be an array if single batch id is provided
		if (Array.isArray(batchIds) === false) batchIds = [batchIds];
		let studentIdsArr = [];
		distinctBatchesArr.forEach(batchObj => {
			if (batchIds.indexOf(batchObj._id) === -1) return;
			studentIdsArr = studentIdsArr.concat(batchObj.students);
		});
		// Removing duplicate ids
		studentIdsArr = [...new Set(studentIdsArr)];
		const studentInfoArr = distinctStudentArr.filter(studentObj => studentIdsArr.indexOf(studentObj._id) !== -1);
		return studentInfoArr.map(studentObj => studentObj.email);
	}

	function removeScheduleRow(event) {
		const $closeBtn = $(event.target);
		const tuitionId = $closeBtn.attr('data-tuition-id');
		if ($scheduleRow.filter(`[data-tuition-id="${tuitionId}"]`).length === 1) return;
		let $possibleScheduleRow = $closeBtn;
		do {
			// Incase we reach outside html
			if ($possibleScheduleRow.length === 0) return;

			$possibleScheduleRow = $possibleScheduleRow.parent();
		} while ($possibleScheduleRow.hasClass('schedule-row') === false);
		$possibleScheduleRow.remove();
		cacheDynamic();
		bindDynamicEvents();
	}

	function updateTodate(fromDate, tuitionId) {
		const nextSunday = dateAndTime.getNextSunday(fromDate);
		$toDate.filter(`[data-tuition-id="${tuitionId}"]`).val(nextSunday.format('DD/MM/YYYY'));
	}

	function updateDays(fromDate, tuitionId) {
		const allDaysTillSunday = dateAndTime.getDaysTillSunday(fromDate);
		$dayDropdown.filter(`[data-tuition-id="${tuitionId}"]`).html(template.daySelectOptions({ days: allDaysTillSunday })).selectpicker('refresh');
	}

	function updateTodateAndSelectDays(event) {
		const $fromDateInp = $(event.target);
		const tuitionId = $fromDateInp.attr('data-tuition-id');
		const dateStr = $fromDateInp.val();
		const fromDate = randomScripts.getDateObjFromIsoDateStr(dateStr);
		updateTodate(fromDate, tuitionId);
		updateDays(fromDate, tuitionId);
	}

	function appendMoreAddScheduleInputs(event) {
		const $button = $(event.target);
		const tuitionId = $button.attr('data-tuition-id');
		$scheduleRow.filter(`[data-tuition-id="${tuitionId}"]`).last().clone().addClass('cloned-row').appendTo($addScheduleContainer.filter(`[data-tuition-id="${tuitionId}"]`));
		$fromTime.add($toTime);
		cacheDynamic();
		bindDynamicEvents();
	}

	function submitEditRequest(tuitionId, courseId, batchId, scheduleId, editedData) {
		return tuitionApiCalls.editScheduleInBatch(tuitionId, courseId, batchId, scheduleId, editedData);
	}

	async function editSchedule(event, tuitionId, courseId, batchId, scheduleId) {
		try {
			event.preventDefault();
			const editedData = modal.getInputValues();
			editedData.fromTime = dateAndTime.twelveHourToMinutesFromMidnight(editedData.fromTime);
			editedData.toTime = dateAndTime.twelveHourToMinutesFromMidnight(editedData.toTime);
			const editedschedule = await submitEditRequest(tuitionId, courseId, batchId, scheduleId, editedData);
			modal.hideModal();
			editedschedule.fromTime = dateAndTime.inverseMinutesFromMidnight(editedschedule.fromTime);
			editedschedule.toTime = dateAndTime.inverseMinutesFromMidnight(editedschedule.toTime);
			notification.push('Schedule has been successfully edited');
			const studentEmailIdsOfThisBatch = getStudentEmailIds(batchId);
			notificationApiCalls.putNewNotification(tuitionId, 'A class of your batch has been edited', studentEmailIdsOfThisBatch);
			let objToBePublished;
			distinctBatchesArr.forEach(batchObj => {
				if (batchObj._id !== batchId) return;
				batchObj.schedules = batchObj.schedules.filter(scheduleObj => scheduleObj._id !== scheduleId);
				batchObj.schedules.push(editedschedule);
				// Preparing new object to for PubSub
				objToBePublished = { batchId: batchObj._id, schedule: editedschedule };
				PubSub.publish('schedule.edit', objToBePublished);
			});
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function submitDeleteRequest(tuitionId, courseId, batchId, scheduleId) {
		return tuitionApiCalls.deleteScheduleInBatch(tuitionId, courseId, batchId, scheduleId);
	}

	async function deleteSchedule(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const batchId = $deleteBtn.attr('data-batch-id');
			const courseId = $deleteBtn.attr('data-course-id');
			const scheduleId = $deleteBtn.attr('data-schedule-id');
			const deletedSchedule = await submitDeleteRequest(tuitionId, courseId, batchId, scheduleId);
			const studentEmailIdsOfThisBatch = getStudentEmailIds(batchId);
			notificationApiCalls.putNewNotification(tuitionId, 'A class from your batch has been deleted', studentEmailIdsOfThisBatch);
			notification.push('Schedule has been successfully deleted');
			distinctBatchesArr.forEach(batchObj => {
				if (batchObj._id === batchId) {
					batchObj.schedules = batchObj.schedules.filter(scheduleObj => scheduleObj._id !== scheduleId);
				}
			});
			// Preparing object for PubSub
			const objToPublish = { batchId, schedule: deletedSchedule };
			PubSub.publish('schedule.delete', objToPublish);
			refresh();
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
		let scheduleInfo;
		distinctBatchesArr.forEach(batchObj => {
			if (batchObj._id === batchId) {
				scheduleInfo = batchObj.schedules.find(scheduleToBeEdited => scheduleToBeEdited._id === scheduleId);
			}
		});
		scheduleInfo.date = scheduleInfo.date.split('T')[0];
		const editscheduleInputHTML = template.scheduleEditInputs(scheduleInfo);
		modal.renderFormContent(editscheduleInputHTML);
		modal.bindSubmitEvent(e => editSchedule(e, tuitionId, courseId, batchId, scheduleId));
		modal.initDatetimepicker();
		modal.showModal();
	}

	function resetForm() {
		$clonedRows.remove();
		$staticInps.val('');
		$fromDate.val('');
		$toDate.val('');
		$staticSelects.html('');
	}

	// FIXME: Optimise (Atomicity)
	async function addSchedule(event) {
		try {
			event.preventDefault();
			// FIXME: Optimise
			cacheDynamic();
			if ($checkedBatchesInput.length === 0) {
				alert('Please select batch to add schedule');
				return;
			}
			const $form = $(event.target);
			const tuitionId = $form.attr('data-tuition-id');
			const schedulesToBeAddedArr = [];
			const batchIdsSequence = [];
			$scheduleRow.filter(`[data-tuition-id="${tuitionId}"]`).each((__, inputsGroup) => {
				const inputsValues = getInputsValues($(inputsGroup));
				inputsValues.fromTime = dateAndTime.twelveHourToMinutesFromMidnight(inputsValues.fromTime)
				inputsValues.toTime = dateAndTime.twelveHourToMinutesFromMidnight(inputsValues.toTime)
				schedulesToBeAddedArr.push(inputsValues);
			});
			const addSchedulesPromiseArr = [];
			$checkedBatchesInput.each((__, checkedBatch) => {
				const $checkedBatch = $(checkedBatch);
				// FIXME: Should always be same as upper scope tuitionId
				const tuitionId = $checkedBatch.attr('data-tuition-id');
				const courseId = $checkedBatch.attr('data-course-id');
				const batchId = $checkedBatch.val();
				batchIdsSequence.push(batchId);
				addSchedulesPromiseArr.push(tuitionApiCalls.putScheduleInBatch(tuitionId, courseId, batchId, schedulesToBeAddedArr));
			});
			const batchStudentsEmailIds = getStudentEmailIds(batchIdsSequence);
			notificationApiCalls.putNewNotification(tuitionId, 'Classes has been added to your batch', batchStudentsEmailIds);
			const newSchedulesArr = await Promise.all(addSchedulesPromiseArr);
			batchIdsSequence.forEach((batchId, index) => {
				const schedulesOfThisBatch = newSchedulesArr[index];
				schedulesOfThisBatch.forEach(scheduleObj => {
					if (scheduleObj.fromTime) scheduleObj.fromTime = dateAndTime.inverseMinutesFromMidnight(scheduleObj.fromTime);
					if (scheduleObj.toTime) scheduleObj.toTime = dateAndTime.inverseMinutesFromMidnight(scheduleObj.toTime);
				});
				let batchInfo;
				distinctBatchesArr.forEach(batchObj => {
					if (batchObj._id === batchId) batchInfo = batchObj;
				});
				batchInfo.schedules = batchInfo.schedules.concat(schedulesOfThisBatch);
				// Preparing object to emit PubSub event
				const schedulesWithBatchId = { batchId: batchInfo._id, schedules: schedulesOfThisBatch };
				notification.push('Schedule has been successfully added');
				PubSub.publish('schedule.add', schedulesWithBatchId);
			});
			cacheDynamic();
			resetForm();
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function sortByWeek(batchObj) {
		return batchObj.schedules.reduce((accumulator, scheduleObj) => {
			const yearWeek = moment(scheduleObj.date).startOf('isoweek').format('MMM Do') + '-' + moment(scheduleObj.date).endOf('isoweek').format("MMM Do");
			// const yearWeek = moment(scheduleObj.date).week() + '-' + moment(scheduleObj.date).year();
			// check if the week number exists
			if (typeof accumulator[yearWeek] === 'undefined') {
				accumulator[yearWeek] = [];
			}
			accumulator[yearWeek].push(scheduleObj);
			return accumulator;
		}, {});
	}

	function injectBatchCodeInSortedSchedulesObj(schedules, batchCode) {
		const keys = Object.keys(schedules);
		keys.forEach(key => schedules[key].forEach(scheduleObj => scheduleObj.batchCode = batchCode));
	}

	function injectClassDateInSchedules() {
		distinctBatchesArr.forEach(batchObj => {
			batchObj.schedules.forEach(schedulesObj => schedulesObj.classDate = (new Date(schedulesObj.date)).toDateString());
		});
	}

	function injectBatchIdAndTuitionId() {
		distinctBatchesArr.forEach(batchObj => {
			const batchId = batchObj._id;
			const tuitionId = batchObj.tuitionId;
			const courseId = batchObj.courseId;
			batchObj.schedules.forEach(scheduleObj => {
				scheduleObj.batchId = batchId;
				scheduleObj.tuitionId = tuitionId;
				scheduleObj.courseId = courseId;
			});
		});
	}

	function render() {
		$scheduleContainer.each((index, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			let cardsHtml = '';

			const batchOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);

			batchOfThisInstitute.forEach(batchObj => {
				const schedulesByWeek = sortByWeek(batchObj);
				injectBatchCodeInSortedSchedulesObj(schedulesByWeek, batchObj.code);
				cardsHtml += template.scheduleCard({ schedules: schedulesByWeek, batchCode: batchObj.code })
			});
			$container.html(cardsHtml);
		});

		$batchCheckboxContainer.each((index, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const batchOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);

			const batchCheckBoxesHTML = template.batchesCheckbox({ batches: batchOfThisInstitute });
			$container.html(batchCheckBoxesHTML);
		});
	}

	function cache() {
		$saveScheduleBtn = $('.save-schedule-btn');
		$scheduleContainer = $('.active-schedule-container');
		$addClassEntryBtn = $('.add-class-entry');
		$batchCheckboxContainer = $('.batch-checkbox-container');
		$staticScheduleCol = $('.schedule-col');
		$staticInps = $staticScheduleCol.find('input');
		$staticSelects = $staticScheduleCol.find('select');
		$validationForm = $('.schedule-validation-form');
		$fromDate = $('.from-date');
		$toDate = $('.to-date');
	}

	function bindEvents() {
		$addClassEntryBtn.click(appendMoreAddScheduleInputs);
		$validationForm.submit(addSchedule);
		$fromDate.blur(updateTodateAndSelectDays);

		// Datetimepicker
		$fromDate.datetimepicker(dateTimePickerConfig.datePicker);
	}

	function cacheDynamic() {
		$editButton = $('.schedule-edit');
		$deleteButton = $('.delete-schedule-btn');
		$addScheduleContainer = $('.add-schedule-container');
		$scheduleRow = $addScheduleContainer.find('.schedule-row');
		$fromTime = $('.from-time');
		$toTime = $('.to-time');
		$dayDropdown = $('.day-dropdown');
		// FIXME: Optimise
		$checkedBatchesInput = $('.batches:checkbox:checked');
		$clonedInp = $('.cloned-inp');
		$clonedRows = $('.cloned-row');
		$removeRowBtn = $('.remove-row-btn');
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteSchedule);
		$removeRowBtn.click(removeScheduleRow);

		// Time Picker
		$fromTime.add($toTime).datetimepicker(dateTimePickerConfig.timePicker);
	}

	function refresh() {
		injectClassDateInSchedules();
		injectBatchIdAndTuitionId();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init(batches, students) {
		if (batches === undefined) throw new Error('Batches not provided');
		if (Array.isArray(batches) === false) throw new Error('Batches not an array');

		distinctBatchesArr = JSON.parse(JSON.stringify(batches));
		distinctStudentArr = JSON.parse(JSON.stringify(students));

		// Parsing time
		distinctBatchesArr.forEach(batch => {
			batch.schedules.forEach(scheduleInfo => {
				scheduleInfo.fromTime = dateAndTime.inverseMinutesFromMidnight(scheduleInfo.fromTime);
				scheduleInfo.toTime = dateAndTime.inverseMinutesFromMidnight(scheduleInfo.toTime);
			});
		});

		injectClassDateInSchedules();
		injectBatchIdAndTuitionId();
		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	PubSub.subscribe('course.edit', (msg, editedCourse) => {
		distinctBatchesArr.forEach(batchObj => {
			if (editedCourse._id === batchObj.courseId) batchObj.courseCode = editedCourse.code;
		});
		refresh();
	});

	PubSub.subscribe('course.delete', (msg, deletedCourse) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => deletedCourse._id !== batchObj.courseId);
		refresh();
	});

	PubSub.subscribe('batch.add', (msg, addedBatch) => {
		distinctBatchesArr.push(addedBatch);
		refresh();
	});

	PubSub.subscribe('batch.edit', (msg, editedBatch) => {
		distinctBatchesArr = distinctBatchesArr.map(batchObj => {
			if (batchObj._id === editedBatch._id) return editedBatch;
			return batchObj;
		});
		refresh();
	});

	PubSub.subscribe('batch.delete', (msg, removedBatch) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj._id !== removedBatch._id);
		refresh();
	});

	PubSub.subscribe('students.add', (msg, studentAdded) => {
		if (Array.isArray(studentAdded)) {
			distinctStudentsArr = distinctStudentsArr.concat(studentAdded);
		} else {
			distinctStudentsArr.push(studentAdded);
		}
		refresh();
	});

	PubSub.subscribe('students.edit', (msg, studentEdited) => {
		distinctStudentsArr = distinctStudentsArr.map(studentObj => studentObj._id === studentEdited._id ? studentEdited : studentObj);
		refresh();
	});

	PubSub.subscribe('students.delete', (msg, studentDeleted) => {
		distinctStudentsArr = distinctStudentsArr.filter(studentObj => studentObj._id !== studentDeleted._id);
		refresh();
	});

	return { init };
})();
