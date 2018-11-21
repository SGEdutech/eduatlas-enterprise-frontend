const schedule = (() => {
	let distinctBatchesArr;
	let $scheduleContainer;
	let $scheduleRow;
	let $editButton;
	let $deleteButton;
	let $fromDate;
	let $toDate;
	let $addClassEntryBtn;
	let $dayDropdown;
	let $addScheduleContainer;
	let $saveScheduleBtn;
	let $timePicker;
	let $datePicker;
	let $batchCheckboxContainer;
	let $clonedRows;
	let $staticScheduleCol;
	let $staticInps;
	let $staticSelects;
	let $validationForm;

	// function getCourseCode(batchId) {
	// 	let batchCode;
	// 	distinctBatchesArr.forEach(batchInfo => {
	// 		if (batchId === batchInfo._id) batchCode = batchInfo.code;
	// 	});
	// 	return batchCode;
	// }

	//FIXME: Optimise
	function initDateTimePicker() {
		const icons = {
			time: 'fa fa-clock-o',
			date: 'fa fa-calendar',
			up: 'fa fa-chevron-up',
			down: 'fa fa-chevron-down',
			previous: 'fa fa-chevron-left',
			next: 'fa fa-chevron-right',
			today: 'fa fa-screenshot',
			clear: 'fa fa-trash',
			close: 'fa fa-remove'
		}

		$timePicker.datetimepicker({ format: 'LT', icons });
		$datePicker.datetimepicker({ format: 'L', icons });
	}

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

	function updateTodate(fromDate, tuitionId) {
		const nextSunday = dateAndTime.getNextSunday(fromDate);
		$toDate.filter(`[data-tuition-id="${tuitionId}"]`).val(nextSunday.format('DD MM YYYY'));
	}

	function updateDays(fromDate, tuitionId) {
		const allDaysTillSunday = dateAndTime.getDaysTillSunday(fromDate);
		$dayDropdown.filter(`[data-tuition-id="${tuitionId}"]`).html(template.daySelectOptions({ days: allDaysTillSunday }));
	}

	function updateTodateAndSelectDays(event) {
		const $fromDateInp = $(event.target);
		const tuitionId = $fromDateInp.attr('data-tuition-id');
		const fromDate = new Date($fromDateInp.val());
		updateTodate(fromDate, tuitionId);
		updateDays(fromDate, tuitionId);
	}

	function appendMoreAddScheduleInputs(event) {
		const $button = $(event.target);
		const tuitionId = $button.attr('data-tuition-id');
		$scheduleRow.filter(`[data-tuition-id="${tuitionId}"]`).last().clone().addClass('cloned-row').appendTo($addScheduleContainer.filter(`[data-tuition-id="${tuitionId}"]`));
		$timePicker.datetimepicker('destroy');
		$datePicker.datetimepicker('destroy');
		cacheDynamic();
		bindDynamicEvents();
		initDateTimePicker();
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

	function cacheDynamic() {
		$editButton = $('.schedule-edit');
		$deleteButton = $('.delete-schedule-btn');
		$addScheduleContainer = $('.add-schedule-container');
		$scheduleRow = $addScheduleContainer.find('.schedule-row');
		$timePicker = $('.time-picker');
		$datePicker = $('.date-picker');
		$dayDropdown = $('.day-dropdown');
		$checkedBatchesInput = $('.batches:checkbox:checked');
		$clonedInp = $('.cloned-inp');
		$clonedRows = $('.cloned-row');
	}

	function submitEditRequest(tuitionId, courseId, batchId, scheduleId, editedData) {
		return tuitionApiCalls.editScheduleInBatch(tuitionId, courseId, batchId, scheduleId, editedData);
	}

	async function editschedule(event, tuitionId, courseId, batchId, scheduleId) {
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
			notification.push('Schedule has been successfully deleted');
			console.log('Schedule was successfully deleted');
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
		modal.bindSubmitEvent(e => editschedule(e, tuitionId, courseId, batchId, scheduleId));
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

	async function addSchedule(event) {
		try {
			event.preventDefault();
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
				const tuitionId = $checkedBatch.attr('data-tuition-id');
				const courseId = $checkedBatch.attr('data-course-id');
				const batchId = $checkedBatch.val();
				batchIdsSequence.push(batchId);
				addSchedulesPromiseArr.push(tuitionApiCalls.putScheduleInBatch(tuitionId, courseId, batchId, schedulesToBeAddedArr));
			});
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

	function bindEvents() {
		$addClassEntryBtn.click(appendMoreAddScheduleInputs);
		$validationForm.submit(addSchedule);
		$fromDate.on('input paste', updateTodateAndSelectDays);
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteSchedule);
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

	function refresh() {
		injectClassDateInSchedules();
		injectBatchIdAndTuitionId();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init(batches) {
		if (batches === undefined) throw new Error('Batches not provided');
		if (Array.isArray(batches) === false) throw new Error('Batches not an array');

		distinctBatchesArr = JSON.parse(JSON.stringify(batches));

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
		initDateTimePicker();
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

	return { init };
})();
