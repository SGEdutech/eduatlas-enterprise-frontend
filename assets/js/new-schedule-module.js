const schedule = (() => {
	let distinctBatchesArr;
	let $scheduleContainer;
	let $scheduleRow;
	let $editButton;
	let $deleteButton;
	let $fromDate;
	let $addClassEntryBtn;
	let $dayDropdown;
	let $addScheduleContainer;
	let $fromTime;
	let $toTime;
	let $saveScheduleBtn;
	let $timePicker;
	let $datePicker;
	let $batchCheckboxContainer;

	// function getCourseCode(batchId) {
	// 	let batchCode;
	// 	distinctBatchesArr.forEach(batchInfo => {
	// 		if (batchId === batchInfo._id) batchCode = batchInfo.code;
	// 	});
	// 	return batchCode;
	// }
	function inverseMinutesFromMidnight(minutesFromMidnight) {
		const dt = new Date(0, 0, 0);
		const time = new Date(dt.getTime() + minutesFromMidnight * 60000);
		return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	}

	function minutesFromMidnight(time) {
		if (time instanceof Date === false) throw new Error('Time should be an instance of date');
		return (time.getHours() * 60) + time.getMinutes();
	}

	function getInputsValues($container) {
		const $inputs = $container.find('input');
		const nameToValueMap = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			nameToValueMap[name] = value;
		})
		return nameToValueMap;
	}

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

	function twelveHourToMinutesFromMidnight(timeStr) {
		if (timeStr === undefined) throw new Error('Time not provided');
		const twentyFourHourTime = convertTo24Hours(timeStr);
		const timeDateObj = new Date();
		timeDateObj.setHours(twentyFourHourTime.hours);
		timeDateObj.setMinutes(twentyFourHourTime.minutes);
		return minutesFromMidnight(timeDateObj);
	}

	function getInputsValues($container) {
		const $inputs = $container.find('input');
		const nameToValueMap = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			nameToValueMap[name] = value;
		})
		return nameToValueMap;
	}

	function convertTo24Hours(timeToConvert) {
		if (timeToConvert === undefined || timeToConvert === '') {
			return
		}
		const time = timeToConvert;
		if (time.slice(-2) === 'AM' || time.slice(-2) === 'PM') {
			let hours = Number(time.match(/^(\d+)/)[1]);
			const minutes = Number(time.match(/:(\d+)/)[1]);
			const AMPM = time.match(/\s(.*)$/)[1];
			if (AMPM === 'PM' && hours < 12) hours += 12;
			if (AMPM === 'AM' && hours === 12) hours -= 12;
			return {
				hours,
				minutes
			}
		}
		const temp = time.split(':');
		const hours = parseInt(temp[0], 10);
		const minutes = parseInt(temp[1], 10);
		return {
			hours,
			minutes
		}
	}

	function addDays(date, days) {
		if (date instanceof Date === false) throw new Error('Type of date must be a date');
		if (typeof days !== 'number') throw new Error('Type of days must be a number');

		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	function getDaysTillSunday(date) {
		if (date instanceof Date === false) throw new Error('Time should be an instance of date');

		const resultArr = [];
		const dayIndexToDayNameMap = {
			0: 'sunday',
			1: 'monday',
			2: 'tuesday',
			3: 'wednesday',
			4: 'thursday',
			5: 'friday',
			6: 'saturday'
		};
		const givenDateIndex = date.getDay();

		for (let i = givenDateIndex, numeberOfDaysPassed = 0; i <= 7; i++, numeberOfDaysPassed++) {
			dateIndex = i % 7;
			resultArr.push({
				day: dayIndexToDayNameMap[dateIndex],
				date: addDays(date, numeberOfDaysPassed)
			});
		}
		return resultArr;
	}

	function getNextSunday(date) {
		if (date instanceof Date === false) throw new Error('Type of date must be a date');

		const numberOfDayToBeAdded = 7 - date.getDay();
		return addDays(date, numberOfDayToBeAdded)
	}

	function updateTodate(fromDate, tuitionId) {
		const nextSunday = getNextSunday(fromDate);
		$toDate.filter(`[data-tuition-id="${tuitionId}"]`).val(nextSunday.toISOString().split('T')[0]);
		console.log($toDate.filter(`[data-tuition-id="${tuitionId}"]`));
	}

	function updateDays(fromDate, tuitionId) {
		const allDaysTillSunday = getDaysTillSunday(fromDate);
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
		$scheduleRow.filter(`[data-tuition-id="${tuitionId}"]`).last().clone().appendTo($addScheduleContainer.filter(`[data-tuition-id="${tuitionId}"]`));
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
	}

	function cacheDynamic() {
		$editButton = $('.schedule-edit');
		$deleteButton = $('.delete-schedule-btn');
		$addScheduleContainer = $('.add-schedule-container');
		$scheduleRow = $addScheduleContainer.find('.schedule-row');
		$fromDate = $('.from-date');
		$toDate = $('.to-date');
		$timePicker = $('.time-picker');
		$datePicker = $('.date-picker');
		$scheduleRow = $('.schedule-row');
		$dayDropdown = $('.day-dropdown');
		$checkedBatchesInput = $('.batches:checkbox:checked');
	}

	function requestAddschedule(tuitionId, courseId, batchId, newScheduleDetails) {
		return tuitionApiCalls.putscheduleInCourseInTuition(tuitionId, courseId, batchId, newScheduleDetails);
	}

	function submitEditRequest(tuitionId, courseId, batchId, scheduleId, editedData) {
		return tuitionApiCalls.editScheduleInBatch(tuitionId, courseId, batchId, scheduleId, editedData);
	}

	async function editschedule(tuitionId, courseId, batchId, scheduleId) {
		try {
			const editedData = modal.getInputValues();
			editedData.fromTime = twelveHourToMinutesFromMidnight(editedData.fromTime);
			editedData.toTime = twelveHourToMinutesFromMidnight(editedData.toTime);
			const editedschedule = await submitEditRequest(tuitionId, courseId, batchId, scheduleId, editedData);
			modal.hideModal();
			editedschedule.fromTime = inverseMinutesFromMidnight(editedschedule.fromTime);
			editedschedule.toTime = inverseMinutesFromMidnight(editedschedule.toTime);
			console.log('Schedule was successfully edited');
			distinctBatchesArr.forEach(batchObj => {
				if (batchObj._id !== batchId) return;
				batchObj.schedules = batchObj.schedules.filter(scheduleObj => scheduleObj._id !== scheduleId);
				batchObj.schedules.push(editedschedule);
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
			console.log('Schedule was successfully deleted');
			distinctBatchesArr.forEach(batchObj => {
				if (batchObj._id === batchId) {
					batchObj.schedules = batchObj.schedules.filter(scheduleObj => scheduleObj._id !== scheduleId);
				}
			});
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
		const editscheduleInputHTML = template.scheduleEditInputs(scheduleInfo);
		modal.renderFormContent(editscheduleInputHTML);
		modal.bindSubmitEvent(() => editschedule(tuitionId, courseId, batchId, scheduleId));
		modal.initDatetimepicker();
		modal.showModal();
	}

	async function addschedule(event) {
		try {
			event.preventDefault();
			const $form = $(event.target);
			const tuitionId = $form.attr('data-tuition-id');
			const schedulesToBeAddedArr = [];
			const batchIdsSequence = [];
			$scheduleRow.filter(`[data-tuition-id="${tuitionId}"]`).each((__, inputsGroup) => {
				const inputsValues = getInputsValues($(inputsGroup));
				inputsValues.fromTime = twelveHourToMinutesFromMidnight(inputsValues.fromTime)
				inputsValues.toTime = twelveHourToMinutesFromMidnight(inputsValues.toTime)
				schedulesToBeAddedArr.push(inputsValues);
			});
			cacheDynamic();
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
				schedulesOfThisBatch.forEach(schedule => {
					if (schedule.fromTime) schedule.fromTime = inverseMinutesFromMidnight(schedule.fromTime);
					if (schedule.toTime) schedule.toTime = inverseMinutesFromMidnight(schedule.toTime);
				})
				let batchInfo;
				distinctBatchesArr.forEach(batchObj => {
					if (batchObj._id === batchId) batchInfo = batchObj;
				});
				batchInfo.schedules = batchInfo.schedules.concat(schedulesOfThisBatch);
			});
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function bindEvents() {
		$addClassEntryBtn.click(appendMoreAddScheduleInputs);
		$saveScheduleBtn.click(addschedule);
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteSchedule);
		$fromDate.blur(updateTodateAndSelectDays);
	}

	//FIXME: Optimise
	function render() {
		$scheduleContainer.each((index, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const batchOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);

			const cardsHtml = template.scheduleCard({ batches: batchOfThisInstitute });
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
				scheduleInfo.fromTime = inverseMinutesFromMidnight(scheduleInfo.fromTime);
				scheduleInfo.toTime = inverseMinutesFromMidnight(scheduleInfo.toTime);
			});
		});

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
