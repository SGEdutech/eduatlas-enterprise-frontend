const attendance = (() => {
	let distinctBatchesArr;
	let distinctStudentsArr;
	let $batchDropDown;
	let $scheduleDropDown;
	let $absentStudentForm;
	let $attendanceWeekDropdown;
	let $saveAttendance;
	let $studentsContainer;
	let $checkboxInputs;
	let $excelUploadInp;
	let $excelUploadParseBtn;
	let $excelUploadModal;
	let $excelUploadModalBody;
	let $excelUploadSubmitBtn;
	let $excelUploadStudentRows;
	let $excelUploadHeaderRow;
	let $scheduleCardsContainer;
	let $scheduleSelectForScheduleCards;
	let $scheduleContainerForScheduleCards;
	let $viewAttendanceBtn;
	let $absentStudentTableContainer;
	let $attendanceModal;

	function showAttendance() {
		// How the fuck is this working
		const $select = $(event.currentTarget);
		const tuitionId = $select.attr('data-tuition-id');
		const courseId = $select.attr('data-course-id');
		const batchId = $select.attr('data-batch-id');
		const scheduleId = $select.attr('data-schedule-id');
		// console.log(tuitionId, courseId, batchId, scheduleId);
		const batch = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
		const schedule = batch.schedules.find(scheduleObj => scheduleObj._id === scheduleId);
		const absentStudentIDs = schedule.studentsAbsent;
		const absenrStudentDetailsArr = distinctStudentsArr.filter(studentInfo => absentStudentIDs.includes(studentInfo._id));
		const tableHTML = template.absentStudentTable({ students: absenrStudentDetailsArr });
		$absentStudentTableContainer.html(tableHTML);
		$attendanceModal.modal('show');
	}

	function showSelectedScheduleContainer() {
		event.preventDefault();
		const $select = $(event.target);
		const tuitionId = $select.attr('data-tuition-id');
		const batchCode = $select.attr('data-batch-code');
		const selectedWeek = $select.val();

		const $containersOfSelectedWeek = $scheduleContainerForScheduleCards.filter(`[data-tuition-id="${tuitionId}"]`).filter(`[data-batch-code="${batchCode}"]`);
		const $containerToShow = $containersOfSelectedWeek.filter(`[data-schedule-week="${selectedWeek}"]`);
		$containersOfSelectedWeek.addClass('d-none');
		$containerToShow.removeClass('d-none')
	}

	function getAbsentStudentArr(tuitionId) {
		const absentStudentArr = [];
		$checkboxInputs.filter(`[data-tuition-id="${tuitionId}"]:checked`).each((__, checkbox) => {
			const $checkbox = $(checkbox);
			absentStudentArr.push($checkbox.val());
		});
		return absentStudentArr;
	}

	async function submitAttendanceAndReRender(tuitionId, courseId, batchId, scheduleId, absentStudentArr) {
		try {
			const newAbsentArr = await tuitionApiCalls.replaceAttendanceInSchedule(tuitionId, courseId, batchId, scheduleId, absentStudentArr);
			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			const scheduleInfo = batchInfo.schedules.find(scheduleObj => scheduleObj._id === scheduleId);
			scheduleInfo.studentsAbsent = newAbsentArr;
			notification.push('Attendance has been recorded!');
			refresh();
		} catch (error) {
			console.error(error);
		}
	}

	function submitAttendance(event) {
		event.preventDefault();

		const $button = $(event.target);
		const tuitionId = $button.attr('data-tuition-id');
		const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const scheduleId = $scheduleDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
		if (scheduleId === null) {
			alert('Please select a class');
			return;
		}
		const absentStudentArr = getAbsentStudentArr(tuitionId);
		const courseId = distinctBatchesArr.find(batchObj => batchObj._id === batchId).courseId;
		submitAttendanceAndReRender(tuitionId, courseId, batchId, scheduleId, absentStudentArr);
	}

	function getStudentPresentFromModal() {
		const studentsPresentArr = [];
		$excelUploadStudentRows.each((__, row) => {
			const $row = $(row);
			$row.attr('data-student-id')
			studentsPresentArr.push($row.attr('data-student-id'));
		});
		return studentsPresentArr;
	}

	async function uploadExcelData() {
		const tuitionId = $excelUploadHeaderRow.attr('data-tuition-id');
		const batchId = $batchDropDown.val();
		const courseId = distinctBatchesArr.find(batchObj => batchObj._id === batchId).courseId;
		const scheduleId = $scheduleDropDown.val();
		const studentsIdsOfThisBatch = distinctBatchesArr.find(batchObj => batchObj._id === batchId).students;
		const studentsPresentInThisBatch = getStudentPresentFromModal();
		const studentsAbsent = studentsIdsOfThisBatch.filter(studentId => studentsPresentInThisBatch.indexOf(studentId) === -1);
		await submitAttendanceAndReRender(tuitionId, courseId, batchId, scheduleId, studentsAbsent);
		$excelUploadModal.modal('hide');
	}

	function changeformatOfDate(schedulesArr) {
		schedulesArr.forEach(scheduleObj => {
			if (scheduleObj.date) scheduleObj.date = moment(scheduleObj.date).format('MMM Do');
		})
	}

	// Does not change the actual object
	function sortByWeek(batchObj) {
		return batchObj.schedules.reduce((accumulator, scheduleObj) => {
			const weekOptions = moment(scheduleObj.date).startOf('isoWeek').format('MMM Do') + '-' + moment(scheduleObj.date).endOf('isoWeek').format('MMM Do');
			// check if the week number exists
			if (typeof accumulator[weekOptions] === 'undefined') accumulator[weekOptions] = [];
			accumulator[weekOptions].push(scheduleObj);
			return accumulator;
		}, {});
	}

	function cache() {
		$batchDropDown = $('.attendance-batch-dropdown');
		$scheduleDropDown = $('.attendance-schedule-dropdown');
		$markAttendanceForm = $('.mark-attendance-form');
		$absentStudentForm = $('.absent-student-form');
		$saveAttendance = $('.save-attendance-btn');
		$studentsContainer = $('.students-container');
		$attendanceWeekDropdown = $('.attendance-week-dropdown');
		$excelUploadInp = $('.attendance-exel-file-upload');
		$excelUploadParseBtn = $('.add-attendance-from-excel-btn');
		$excelUploadModal = $('#attendance_upload_modal');
		$excelUploadModalBody = $('#attendance_upload_modal_body');
		$excelUploadSubmitBtn = $('#submit_attendace_btn');
		$scheduleCardsContainer = $('.attendance-schedule-cards-container');
		$attendanceModal = $('#show_attendance_modal');
		$absentStudentTableContainer = $('#absent_student_table_container');
	}

	function cacheDynamic() {
		$excelUploadHeaderRow = $('#header_row');
		$checkboxInputs = $absentStudentForm.find('.student-absent');
		$excelUploadStudentRows = $('.attendace-student-row');
		$scheduleSelectForScheduleCards = $('.week-select-for-schedule-cards-in-attendance');
		$scheduleContainerForScheduleCards = $('.schedule-container-for-schedule-cards-in-attendance');
		$viewAttendanceBtn = $('.view-attendance-btn');
	}

	function getBatchCodeOfStudent(idOfStudent) {
		let batchCodeOfStudent;
		distinctBatchesArr.forEach(batchObj => {
			batchObj.students.forEach(studentId => {
				if (studentId === idOfStudent) batchCodeOfStudent = batchObj.code;
			});
		});
		return batchCodeOfStudent;
	}

	function getStudentDataAndErros(rollNumberArr, batchId) {
		const studentDataObjsArr = [];
		const studentsErrorObjsArr = [];
		const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
		const studentsIdsOfThisBatch = distinctStudentsArr.filter(studentObj => batchInfo.students.indexOf(studentObj._id) !== -1)
			.map(studentObj => studentObj._id);
		rollNumberArr.forEach(rollNumber => {
			const dataObj = { rollNumber };
			const studentInfo = distinctStudentsArr.find(studentObj => studentObj.rollNumber === rollNumber);
			if (studentInfo) {
				if (studentsIdsOfThisBatch.indexOf(studentInfo._id) !== -1) {
					dataObj._id = studentInfo._id;
					dataObj.name = studentInfo.name;
					studentDataObjsArr.push(dataObj);
				} else {
					const batchCode = getBatchCodeOfStudent(studentInfo._id);
					if (batchCode) {
						dataObj.message = `This student belongs in batch ${batchCode}!`;
						studentsErrorObjsArr.push(dataObj);
					} else {
						dataObj.message = 'This student does not belong in any batch';
						studentsErrorObjsArr.push(dataObj);
					}
				}
			} else {
				dataObj.message = 'This student does not belong in this institute!';
				studentsErrorObjsArr.push(dataObj);
			}
		});
		return { studentDataObjsArr, studentsErrorObjsArr };
	}

	function renderModalAttendance(dataArr, tuitionId, batchId) {
		let rollNumberArr = [];
		dataArr.forEach(data => rollNumberArr.push(data['Roll Number*']));
		rollNumberArr = rollNumberArr.filter(rollNumber => rollNumber);
		const { studentDataObjsArr, studentsErrorObjsArr } = getStudentDataAndErros(rollNumberArr, batchId);
		const excelUploadTableHtml = template.attendanceExcel({ students: studentDataObjsArr, errors: studentsErrorObjsArr, tuitionId });
		$excelUploadModalBody.html(excelUploadTableHtml);
		cacheDynamic();
	}

	function displayAttendance(dataArr, tuitionId) {
		const batchId = $batchDropDown.val();
		const scheduleId = $scheduleDropDown.val();
		if (batchId === null || scheduleId === null) {
			alert('Please select batch and schedule');
			return;
		}
		renderModalAttendance(dataArr, tuitionId, batchId);
		$excelUploadModal.modal('show');
	}

	function parseAndDisplayAttandance(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		$excelUploadInp.filter(`[data-tuition-id="${tuitionId}"]`).parse({ config: { complete: parsedData => displayAttendance(parsedData.data, tuitionId), header: true } });
	}

	function distroyModal() {
		$excelUploadModalBody.html('');
	}

	function injectClassDateInSchedules() {
		distinctBatchesArr.forEach(batchObj => {
			batchObj.schedules.forEach(schedulesObj => schedulesObj.classDate = (new Date(schedulesObj.date)).toDateString());
		});
	}

	function sortByDateAndTime() {
		// requires fromTime as Integer
		distinctBatchesArr.forEach(batch => {
			batch.schedules.forEach(scheduleInfo => {
				if (scheduleInfo.date) {
					scheduleInfo.milliSec = parseInt(moment(scheduleInfo.date).valueOf(), 10);
				}
			});
			batch.schedules.sort((a, b) => {
				if (a.milliSec > b.milliSec) return 1
				if (a.milliSec < b.milliSec) return -1
				return a.fromTime - b.fromTime;
			});
		});
	}

	function parseFromAndToTime() {
		distinctBatchesArr.forEach(batch => {
			batch.schedules.forEach(scheduleInfo => {
				if (typeof scheduleInfo.fromTime === 'number') scheduleInfo.fromTime = dateAndTime.inverseMinutesFromMidnight(scheduleInfo.fromTime);
				if (typeof scheduleInfo.toTime === 'number') scheduleInfo.toTime = dateAndTime.inverseMinutesFromMidnight(scheduleInfo.toTime);
			});
		});
	}

	function injectBatchCodeInSortedSchedulesObj(schedules, batchCode) {
		const keys = Object.keys(schedules);
		keys.forEach(key => schedules[key].forEach(scheduleObj => scheduleObj.batchCode = batchCode));
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

	function renderScheduleCards() {
		$scheduleCardsContainer.each((index, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			let cardsHtml = '';

			const batchOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);

			batchOfThisInstitute.forEach(batchObj => {
				const schedulesByWeek = sortByWeek(batchObj);
				injectBatchCodeInSortedSchedulesObj(schedulesByWeek, batchObj.code);
				if (Object.keys(schedulesByWeek).length === 0) {

				} else {
					cardsHtml += template.scheduleCardsForAttendance({ schedules: schedulesByWeek, batchCode: batchObj.code, tuitionId: tuitionId })
				}
			});
			$container.html(cardsHtml);
		});
	}

	function renderBatchDropdown() {
		$batchDropDown.each((__, dropdown) => {
			const $dropdown = $(dropdown);
			const tuitionId = $dropdown.attr('data-tuition-id');
			const batchesOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
			const batchDropDownHtml = template.batchOptions({ batches: batchesOfThisInstitute });
			$dropdown.html(batchDropDownHtml).selectpicker('refresh');
		});
	}

	function renderWeekDropdown() {
		$attendanceWeekDropdown.each((__, dropdown) => {
			const $dropdown = $(dropdown);
			const tuitionId = $dropdown.attr('data-tuition-id');
			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			if (batchInfo === undefined) {
				$dropdown.html('').selectpicker('refresh');
				return;
			}
			const schedulesByWeek = sortByWeek(batchInfo);
			const scheduleOptionsHTML = template.scheduleOptions({ schedules: schedulesByWeek });
			$dropdown.html(scheduleOptionsHTML).selectpicker('refresh');
		});
	}

	function renderScheduleDropdown() {
		$scheduleDropDown.each((__, dropdown) => {
			const $dropdown = $(dropdown);
			const tuitionId = $dropdown.attr('data-tuition-id');
			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			if (batchInfo === undefined) {
				$dropdown.html('');
				return;
			}
			const schedulesByWeek = sortByWeek(batchInfo);
			const selectedWeek = $attendanceWeekDropdown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const schedulesArr = schedulesByWeek[selectedWeek];
			// Terminate function if selected week has no classes scheduled
			if (schedulesArr === undefined) return;
			const clonedSchedulesArr = JSON.parse(JSON.stringify(schedulesArr));
			changeformatOfDate(clonedSchedulesArr);
			const scheduleOptionsHtml = template.scheduleOptions2({ schedules: clonedSchedulesArr });
			$dropdown.html(scheduleOptionsHtml).selectpicker('refresh');
		});
	}

	function renderAttandancePallet() {
		$studentsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const scheduleId = $scheduleDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();

			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			let scheduleInfo;
			if (batchInfo) scheduleInfo = batchInfo.schedules.find(scheduleObj => scheduleObj._id === scheduleId);
			if (batchInfo && scheduleInfo) {
				const studentsOfThisInstituteArr = distinctStudentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
				const studentsOfThisBatch = studentsOfThisInstituteArr.filter(studentObj => batchInfo.students.indexOf(studentObj._id) !== -1);
				const studentsOfThisBatchAbsentInfo = studentsOfThisBatch.map(studentObj => {
					const cloneStudentObj = JSON.parse(JSON.stringify(studentObj));
					cloneStudentObj.isAbsent = scheduleInfo.studentsAbsent.indexOf(studentObj._id) !== -1;
					return cloneStudentObj;
				});
				const studentTableHtml = template.studentsTable({ students: studentsOfThisBatchAbsentInfo });
				$container.html(studentTableHtml);
			} else {
				$container.html('');
			}
		});
		cacheDynamic();
	}

	function render() {
		renderBatchDropdown();
		renderWeekDropdown();
		renderScheduleDropdown();
		renderAttandancePallet();
		renderScheduleCards();
	}

	function bindEvents() {
		$batchDropDown.change(renderWeekDropdown);
		$batchDropDown.change(renderScheduleDropdown);
		$batchDropDown.change(renderAttandancePallet);

		$attendanceWeekDropdown.change(renderScheduleDropdown);
		$attendanceWeekDropdown.change(renderAttandancePallet);

		$scheduleDropDown.change(renderAttandancePallet);

		$saveAttendance.click(submitAttendance);
		$excelUploadParseBtn.click(parseAndDisplayAttandance);
		$excelUploadModal.on('hidden.bs.modal', distroyModal);
	}

	function bindDynamic() {
		$excelUploadSubmitBtn.click(uploadExcelData);
		$scheduleSelectForScheduleCards.change(showSelectedScheduleContainer);
		$viewAttendanceBtn.click(showAttendance);
		$scheduleSelectForScheduleCards.selectpicker();
	}

	function refresh() {
		sortByDateAndTime();
		parseFromAndToTime();
		injectClassDateInSchedules();
		injectBatchIdAndTuitionId();
		render();
		cacheDynamic();
		bindDynamic();
	}

	function init(batches, students) {
		if (batches === undefined) throw new Error('Batches array not provided!');
		if (students === undefined) throw new Error('Students array not provided!');

		distinctBatchesArr = JSON.parse(JSON.stringify(batches));
		distinctStudentsArr = JSON.parse(JSON.stringify(students));
		cache();
		bindEvents();
		sortByDateAndTime();
		parseFromAndToTime();
		injectClassDateInSchedules();
		injectBatchIdAndTuitionId();
		render();
		cacheDynamic();
		bindDynamic();
	}

	PubSub.subscribe('course.delete', (msg, courseAdded) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj.courseId !== courseAdded._id);
		refresh();
	});

	PubSub.subscribe('batch.add', (msg, batchAdded) => {
		distinctBatchesArr.push(batchAdded);
		refresh();
	});

	PubSub.subscribe('batch.edit', (msg, batchedited) => {
		distinctBatchesArr = distinctBatchesArr.map(batchObj => batchObj._id === batchedited._id ? batchedited : batchObj);
		refresh();
	});

	PubSub.subscribe('batch.delete', (msg, batchDeleted) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj._id !== batchDeleted._id);
		refresh();
	});

	PubSub.subscribe('schedule.add', (msg, scheduleAddedWithBatchId) => {
		// Deep cloning to avoid any mutation in original objects or array
		scheduleAddedWithBatchId = JSON.parse(JSON.stringify(scheduleAddedWithBatchId));
		distinctBatchesArr.forEach(batchObj => {
			if (batchObj._id === scheduleAddedWithBatchId.batchId) {
				batchObj.schedules = batchObj.schedules.concat(scheduleAddedWithBatchId.schedules);
			}
		});
		refresh();
	});

	PubSub.subscribe('schedule.edit', (msg, scheduleInfo) => {
		// Cloning schedules so we don't end up messing with it
		const editedSchedule = JSON.parse(JSON.stringify(scheduleInfo.schedule));
		distinctBatchesArr.forEach(batchObj => {
			if (batchObj._id === scheduleInfo.batchId) {
				batchObj.schedules.forEach((schedule, index) => {
					if (schedule._id === scheduleInfo.schedule._id) {
						batchObj.schedules[index] = editedSchedule;
					}
				});
			}
		});
		refresh();
	});

	PubSub.subscribe('schedule.delete', (msg, deletedScheduleInfo) => {
		distinctBatchesArr.forEach(batchObj => {
			if (batchObj._id === deletedScheduleInfo.batchId) {
				batchObj.schedules.forEach((scheduleObj, index) => {
					if (scheduleObj._id === deletedScheduleInfo.schedule._id) {
						batchObj.schedules.splice(index, 1);
					}
				});
			}
		});
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
