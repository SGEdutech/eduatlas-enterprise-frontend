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
			notification.push('Attendance has been recorded!')
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
		const studentsAbsent = studentsIdsOfThisBatch.filter(studentId => studentsPresentInThisBatch.indexOf(studentId) !== -1);
		await submitAttendanceAndReRender(tuitionId, courseId, batchId, scheduleId, studentsAbsent);
		$excelUploadModal.modal('hide');
	}

	function changeformatOfDateAndFromTime(schedulesArr) {
		// console.log(schedulesArr);
		schedulesArr.forEach(scheduleObj => {
			if (scheduleObj.date) {
				scheduleObj.date = moment(scheduleObj.date).format('MMM Do');
			}
			if (scheduleObj.fromTime) {
				scheduleObj.fromTime = dateAndTime.inverseMinutesFromMidnight(scheduleObj.fromTime);
			}
		})
	}

	function renderScheduleDropdown() {
		$scheduleDropDown.each((__, dropdown) => {
			const $dropdown = $(dropdown);
			const tuitionId = $dropdown.attr('data-tuition-id');
			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			if (batchInfo) {
				const schedulesByWeek = sortByWeek(batchInfo);
				const selectedWeek = $attendanceWeekDropdown.filter(`[data-tuition-id="${tuitionId}"]`).val();
				const schedulesArr = schedulesByWeek[selectedWeek];
				changeformatOfDateAndFromTime(schedulesArr);
				const scheduleOptionsHtml = template.scheduleOptions2({ schedules: schedulesArr });
				$dropdown.html(scheduleOptionsHtml).selectpicker('refresh');
			} else {
				$dropdown.html('');
			}
		});
	}

	function sortByWeek(batchObj) {
		return batchObj.schedules.reduce((accumulator, scheduleObj) => {
			const weekOptions = moment(scheduleObj.date).startOf('isoWeek').format('MMM Do') + '-' + moment(scheduleObj.date).endOf('isoWeek').format("MMM Do");
			// check if the week number exists
			if (typeof accumulator[weekOptions] === 'undefined') {
				accumulator[weekOptions] = [];
			}
			accumulator[weekOptions].push(scheduleObj);
			return accumulator;
		}, {});
	}

	function renderWeekDropDowScheduleAndAttendancePallet() {
		$attendanceWeekDropdown.each((__, dropdown) => {
			const $dropdown = $(dropdown);
			const tuitionId = $dropdown.attr('data-tuition-id');
			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			if (batchInfo) {
				const schedulesByWeek = sortByWeek(batchInfo);
				const scheduleOptionsHTML = template.scheduleOptions({ schedules: schedulesByWeek });
				$dropdown.html(scheduleOptionsHTML).selectpicker('refresh');
			} else {
				$dropdown.html('').selectpicker('refresh');
			}
		});
		renderScheduleDropdown();
		renderStudentAttandencePallet();
		cacheDynamic();
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
	}

	function cacheDynamic() {
		$excelUploadHeaderRow = $('#header_row');
		$checkboxInputs = $absentStudentForm.find('.student-absent');
		$excelUploadStudentRows = $('.attendace-student-row');
	}

	function renderStudentAttandencePallet() {
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

	function bindEvents() {
		$batchDropDown.change(renderWeekDropDowScheduleAndAttendancePallet);
		$attendanceWeekDropdown.change(renderScheduleDropdown);
		$scheduleDropDown.change(renderStudentAttandencePallet);
		$saveAttendance.click(submitAttendance);
		$excelUploadParseBtn.click(parseAndDisplayAttandance);
		$excelUploadModal.on('hidden.bs.modal', distroyModal);
	}

	function bindDynamic() {
		$excelUploadSubmitBtn.click(uploadExcelData);
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

	function refresh() {
		cacheDynamic();
		renderBatchDropdown();
		renderWeekDropDowScheduleAndAttendancePallet();
	}

	function render() {
		renderBatchDropdown();
		renderWeekDropDowScheduleAndAttendancePallet();
	}

	function init(batches, students) {
		if (batches === undefined) throw new Error('Batches array not provided!');
		if (students === undefined) throw new Error('Students array not provided!');

		distinctBatchesArr = JSON.parse(JSON.stringify(batches));
		distinctStudentsArr = JSON.parse(JSON.stringify(students));
		cache();
		bindEvents();
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
		distinctBatchesArr.forEach(batchObj => {
			if (batchObj._id === scheduleInfo.batchId) {
				batchObj.schedules.forEach((schedule, index) => {
					if (schedule._id === scheduleInfo.schedule._id) {
						batchObj.schedules[index] = scheduleInfo.schedule;
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
