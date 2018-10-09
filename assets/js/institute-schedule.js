const instituteSchedules = (() => {
	let $classEntries;
	let $classTables;
	let $addClassEntryBtn;
	let $fromDate;
	let $toDate;
	let $dayDropdown;
	let $newScheduleForm;
	let $deleteScheduleBtn;

	function cache() {
		$classEntries = $('.class-row');
		$classTables = $('.class-table');
		$addClassEntryBtn = $('.add-class-entry');
		$fromDate = $('.from-date');
		$toDate = $('.to-date');
		$dayDropdown = $('.day-dropdown');
		$newScheduleForm = $('.new-schedule-form');
		$deleteScheduleBtn = $('.delete-schedule-btn')
	}

	function cacheDynamic() {}

	function render() {}

	function bindEvents() {
		$addClassEntryBtn.click(function(e) {
			e.preventDefault();
			addNewClassinput($(this));
		});

		$fromDate.blur(function(e) {
			// e.preventDefault();
			updateToDate($(this));
		});

		$newScheduleForm.submit(function(e) {
			e.preventDefault();
			addSchedule($(this));
		});

		$deleteScheduleBtn.click(function(e) {
			e.preventDefault();
			deleteSchedule($(this))
		});
	}

	function updateToDate($element) {
		const tabNumber = $element.attr("data-tabNumber");
		const fromDate = new Date($element.val());
		const nextSunday = getNextSunday(fromDate);
		// find corresponding toDate input
		let $toDateInp;
		$.each($toDate, function(indexInArray, valueOfElement) {
			if ($(valueOfElement).attr("data-tabNumber") === tabNumber) {
				$toDateInp = $(valueOfElement);
			}
		});

		// update toDate Inp
		$toDateInp.val(nextSunday.toISOString().split('T')[0]);

		// find all dropdowns to change
		let allDropDownsRequired = [];
		$.each($dayDropdown, function(indexInArray, valueOfElement) {
			if ($(valueOfElement).attr("data-tabNumber") === tabNumber) {
				allDropDownsRequired.push($(valueOfElement));
			}
		});

		// update all dropdowns according to new limits
		const validDaysArr = getDaysTillSunday(fromDate);
		allDropDownsRequired.forEach($dropdown => {
			$dayDropdown.html("");
			validDaysArr.forEach(obj => {
				$dropdown.append(`<option value="${obj.date}">${obj.day}</option>`)
			})
		});

		// refresh all dropdowns
		PubSub.publish("refreshCourseSelect");
	}

	function addDays(date, days) {
		if (date instanceof Date === false) throw new Error('Type of date must be a date');
		if (typeof days !== 'number') throw new Error('Type of days must be a number');

		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	function getNextSunday(date) {
		if (date instanceof Date === false) throw new Error('Type of date must be a date');

		const numberOfDayToBeAdded = 7 - date.getDay();
		return addDays(date, numberOfDayToBeAdded)
	}

	function getMinutesSinceMidnight(time) {
		if (time instanceof Date === false) throw new Error('Time should be an instance of date');

		return (time.getHours() * 60) + time.getMinutes();
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

	function addNewClassinput($element) {
		const tabNumber = $element.attr("data-tabNumber");
		let $tableRequired;
		$classTables.each(function(i, val) {
			// console.log($(val).attr("data-tabNumber"));
			if ($(val).attr("data-tabNumber") === tabNumber) {
				$tableRequired = $(val);
			}
		})
		let rowRequired;
		const $rowArr = $tableRequired.children('tr');
		const lastindex = $rowArr.length - 1;
		$rowArr.each(function(i, val) {
			if (i === lastindex) {
				rowRequired = val;
			}
		});
		$(rowRequired).clone().insertAfter($(rowRequired));
	}

	function cacheNBindDeleteButtons(tuitionId) {
		// cacheDynamic();
		// $deleteButtons.click(function(e) {
		// 	e.preventDefault();
		// 	deleteSchedule($(this));
		// });
	}

	function deleteSchedule($element) {
		let cardId = $element.attr('data-schedule');
		let idOfCourse = $element.attr('data-course');
		let idOfTuition = $element.attr('data-tuition');
		let idOfBatch = $element.attr('data-batch');
		tuitionApiCalls.deleteScheduleInBatch(idOfTuition, idOfCourse, idOfBatch, cardId).then(data => {
			eagerRemoveCard(cardId);
			alert("successfully deleted");
		}).catch(err => console.error(err));
	}

	function eagerRemoveCard(cardId) {
		//todo - cache properly
		$('#' + cardId).remove()
	}

	function eagerLoadSchedule(context) {
		// PubSub.publish('newSchedule.load', context);
		// context.col4 = true;
		// $activeScheduleContainer.append(template.instituteScheduleCard(context))
		// cacheNBindDeleteButtons();
		// alert("Schedule added successfully")
	}

	function addSchedule(form) {
		if (!form) { return }

		const serializedArrayForm = form.serializeArray()
		let bodyObj = {};

		let dateArr = [],
			fromTimeArr = [],
			toTimeArr = [],
			topicArr = [],
			facultyArr = [],
			batchesArr = [],
			coursesArr = [],
			tuitionsArr = [];

		serializedArrayForm.forEach(obj => {
			if (obj.name === "date") {
				dateArr.push(obj.value);
			} else if (obj.name === "fromTime") {
				fromTimeArr.push(obj.value);
			} else if (obj.name === "toTime") {
				toTimeArr.push(obj.value);
			} else if (obj.name === "topic") {
				topicArr.push(obj.value);
			} else if (obj.name === "faculty") {
				facultyArr.push(obj.value);
			} else if (obj.name === "batches") {
				batchesArr.push(obj.value);
			} else if (obj.name === "courses") {
				coursesArr.push(obj.value);
			} else if (obj.name === "tuitions") {
				tuitionsArr.push(obj.value);
			} else {
				bodyObj[obj.name] = obj.value;
			}
		});

		// get minutes from midnight
		let newForTimeArr = []
		fromTimeArr.forEach(date => {
			const d = new Date();
			d.setHours(parseInt(date.split(":")[0]));
			d.setMinutes(parseInt(date.split(":")[1]));
			newForTimeArr.push(getMinutesSinceMidnight(d));
			// console.log(fromMinutes);
		});
		let newToTimeArr = [];
		toTimeArr.forEach(date => {
			const d = new Date();
			d.setHours(parseInt(date.split(":")[0]));
			d.setMinutes(parseInt(date.split(":")[1]));
			newToTimeArr.push(getMinutesSinceMidnight(d));
			// console.log(fromMinutes);
		});

		let schedulesArr = [];
		dateArr.forEach((date, i) => {
			schedulesArr.push({
				date: date,
				fromTime: newForTimeArr[i],
				toTime: newToTimeArr[i],
				topic: topicArr[i],
				faculty: facultyArr[i]
			})
		})
		console.log(schedulesArr);
		batchesArr.forEach((batchId, outerIndex) => {
			tuitionApiCalls.putScheduleInBatch(tuitionsArr[outerIndex], coursesArr[outerIndex], batchId, schedulesArr).then(data => {
				alert("success")
				eagerLoadSchedule(bodyObj)
			}).catch(err => console.error(err));
		})
	}

	function editSchedule(form) {
		// if (!form) { return }
		// const tabNumber = form.attr("data-tabNumber");
		// const tuitionId = form.attr("data-tuition");
		// const ScheduleId = form.attr("data-Schedule");
		// const modalId = form.attr("data-modal");

		// const serializedArrayForm = form.serializeArray()
		// let bodyObj = {};
		// serializedArrayForm.forEach(obj => {
		// 	bodyObj[obj.name] = obj.value;
		// })

		// tuitionApiCalls.editScheduleInTuition(tuitionId, ScheduleId, bodyObj).then(data => {
		// 	$('#' + modalId).modal('toggle');
		// 	alert("success");
		// }).catch(err => console.error(err));
	}

	function getHtml() {
		// return template.userEditTuitionSchedules(context);
	}

	function init() {
		cache();
		render();
		cacheDynamic();
		bindEvents();
	}

	return {
		init
	};
})();
