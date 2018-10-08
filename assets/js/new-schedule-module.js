const schedule = (() => {
	let schedulesArr;
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

	function getAllInputValues($container) {
		const $inputs = $container.find('input');
		const nameToValueMap = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			nameToValueMap[name] = value;
		})
		console.log(nameToValueMap);
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

	function getAllInputValues($container) {
		const $inputs = $container.find('input');
		const nameToValueMap = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			nameToValueMap[name] = value;
		})
		console.log(nameToValueMap);
		return nameToValueMap;
	}

	function convertTo24Hours(timeToConvert) {
		if (timeToConvert === undefined || timeToConvert === '') {
			return
		}
		const time = timeToConvert;
		if (time.slice(-2) == 'AM' || time.slice(-2) == 'PM') {
			let hours = Number(time.match(/^(\d+)/)[1]);
			const minutes = Number(time.match(/:(\d+)/)[1]);
			const AMPM = time.match(/\s(.*)$/)[1];
			if (AMPM === 'PM' && hours < 12) hours += 12;
			if (AMPM === 'AM' && hours == 12) hours -= 12;
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

	function updateTodate(fromDate) {
		const nextSunday = getNextSunday(fromDate);
		// update toDate Inp
		$toDate.val(nextSunday.toISOString().split('T')[0]);
	}

	function updateDays(fromDate) {
		const allDaysTillSunday = getDaysTillSunday(fromDate);
		$dayDropdown.html(template.daySelectOptions({ days: allDaysTillSunday }));
	}

	function updateTodateAndSelectDays(event) {
		const $fromDateInp = $(event.target);
		const fromDate = new Date($fromDateInp.val());
		updateTodate(fromDate)
		updateDays(fromDate);
	}

	function appendMoreAddScheduleInputs() {
		$lastAddScheduleInputsGroup.clone().appendTo($addScheduleContainer);
		$timePicker.datetimepicker('destroy');
		$datePicker.datetimepicker('destroy');
		cacheDynamic();
		bindDynamicEvents();
		initDateTimePicker();
	}

	function cache() {
		$saveScheduleBtn = $('#save_schedule_btn');
		$scheduleContainer = $('#active_schedule_container');
		$addClassEntryBtn = $('.add-class-entry');
		$batchCheckboxContainer = $('#batch_checkbox_container');
	}

	function cacheDynamic() {
		$editButton = $('.schedule-edit');
		$deleteButton = $('.delete-schedule-btn');
		$addScheduleContainer = $('#add-schedule-container');
		$scheduleRow = $addScheduleContainer.find('.schedule-row');
		$lastAddScheduleInputsGroup = $scheduleRow.last();
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
			const schedulesToBeAddedArr = [];
			$scheduleRow.each((__, inputsGroup) => schedulesToBeAddedArr.push(getAllInputValues($(inputsGroup))))
			cacheDynamic();
			const addSchedulesPromiseArr = [];
			$checkedBatchesInput.each((__, checkedBatch) => {
				const $checkedBatch = $(checkedBatch);
				const tuitionId = checkedBatch.attr('data-tuition-id');
				const courseId = checkedBatch.attr('data-course-id');
				const batchId = checkedBatch.attr('data-b-id');
				addSchedulesPromiseArr.push(tuitionApiCalls.putScheduleInBatch(tuitionId, courseId, batchId, schedulesArr));
			})
const newSchedulesArr = 						
			
			const newSchedule = await tuitionApiCalls.putScheduleInBatch(tuitionId, courseId, batchId, schedulesArr)
						
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
		$deleteButton.click(deleteschedule);
		$fromDate.blur(updateTodateAndSelectDays);
	}

	function render() {
		const cardsHtml = template.scheduleCard({ schedules: schedulesArr });
		$scheduleContainer.html(cardsHtml);

		const batchCheckBoxesHTML = template.batchesCheckbox({ batches: distinctBatchesArr });
		$batchCheckboxContainer.html(batchCheckBoxesHTML);
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

		if (batches === undefined) throw new Error('Batches not provided');
		if (Array.isArray(batches) === false) throw new Error('Batches not an array');

		schedulesArr = schedules;
		distinctBatchesArr = batches;

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
		initDateTimePicker();
	}

	return { init };
})();
