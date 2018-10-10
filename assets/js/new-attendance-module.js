const attendance = (() => {
	let distinctBatchesArr;
	let studentsArr;
	let $batchDropDown;
	let $scheduleDropDown;
	let $absentStudentForm;
	let $saveAttendance;
	let $studentsContainer;
	let $checkboxInputs;

	async function submitAttendance(event) {
		try {
			event.preventDefault();
			cacheDynamic();
			const absentArr = $absentStudentForm.serialize();
			const batchId = $batchDropDown.val();
			const scheduleId = $scheduleDropDown.val();
			let courseId;
			let tuitionId;
			distinctBatchesArr.forEach(batchInfo => {
				if (batchInfo._id === batchId) {
					courseId = batchInfo.courseId;
					tuitionId = batchInfo.tuitionId
				}
			});
			const newAbsentArr = await tuitionApiCalls.replaceAttendanceInSchedule(tuitionId, courseId, batchId, scheduleId, absentArr);
			distinctBatchesArr.forEach(batchObj => {
				if (batchObj._id === batchId) {
					batchObj.schedules.forEach(scheduleObj => {
						if (scheduleObj._id === scheduleId) {
							scheduleObj.studentsAbsent = newAbsentArr;
						}
					});
				}
			});
			refresh();
		} catch (error) {
			console.error(error);
		}
	}

	function renderScheduleDropDown() {
		const batchId = $batchDropDown.val();
		distinctBatchesArr.forEach(batch => {
			if (batch._id === batchId) {
				const scheduleOptionsHTML = template.scheduleOptions({ schedules: batch.schedules });
				$scheduleDropDown.html(scheduleOptionsHTML);
			}
		});
		renderStudentAttandencePallet();
	}

	function cache() {
		$batchDropDown = $('#batchDropdown');
		$scheduleDropDown = $('#scheduleDropdown');
		$markAttendanceForm = $('.mark-attendance-form');
		$absentStudentForm = $('#absent_student_form');
		$saveAttendance = $('#save_attendance_btn');
		$studentsContainer = $('#students_container');
	}

	function cacheDynamic() {
		$checkboxInputs = $absentStudentForm.find('.student-absent');
	}

	function renderStudentAttandencePallet() {
		const batchId = $batchDropDown.val();
		const scheduleId = $scheduleDropDown.val();
		let studentsAbsent;
		const batchStudentsInfo = [];

		distinctBatchesArr.forEach(batch => {
			if (batch._id === batchId) {
				batch.schedules.forEach(scheduleObj => {
					if (scheduleObj._id === scheduleId) studentsAbsent = scheduleObj.studentsAbsent;
				});
				if (studentsAbsent === undefined) throw new Error('No such schedule found');
				batch.students.forEach(studentId => {
					studentsArr.forEach(studentInfo => {
						if (studentInfo._id === studentId) {
							const jsonString = JSON.stringify(studentInfo);
							const duplicateStudentInfo = JSON.stringify(jsonString);
							duplicateStudentInfo.isAbsent = studentsAbsent.indexOf(duplicateStudentInfo._id) !== -1;
							batchStudentsInfo.push(duplicateStudentInfo);
						}
					});
				});
			}
		});
		const studentTableHtml = template.studentsTable({ students: batchStudentsInfo });
		$studentsContainer.html(studentTableHtml);
	}

	function bindEvents() {
		$batchDropDown.change(renderScheduleDropDown);
		$scheduleDropDown.change(renderStudentAttandencePallet);
		$saveAttendance.click(submitAttendance);
	}

	function renderBatchDropdown() {
		const batchDropDownHtml = template.batchOptions({ batches: distinctBatchesArr });
		$batchDropDown.html(batchDropDownHtml);
	}

	function refresh() {
		renderStudentAttandencePallet();
		cacheDynamic();
	}

	function render() {
		renderBatchDropdown();
		renderScheduleDropDown();
		renderStudentAttandencePallet();
	}

	function init(batches, students) {
		if (batches === undefined) throw new Error('Batches array not provided!');
		if (students === undefined) throw new Error('Students array not provided!');

		distinctBatchesArr = batches;
		studentsArr = students;
		cache();
		bindEvents();
		render();
		cacheDynamic();
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
		distinctBatchesArr = distinctBatchesArr.map(batchObj => batchObj.courseId === batchedited._id ? batchedited : batchObj);
		refresh();
	});

	PubSub.subscribe('batch.delete', (msg, batchDeleted) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj._id !== batchDeleted._id);
		refresh();
	});

	PubSub.subscribe('students.add', (msg, studentAdded) => {
		studentsArr.push(studentAdded);
		refresh();
	});

	PubSub.subscribe('students.edit', (msg, studentEdited) => {
		studentsArr = studentsArr.map(studentObj => studentObj._id === studentEdited._id ? studentEdited : studentObj);
		refresh();
	});

	PubSub.subscribe('students.delete', (msg, studentDeleted) => {
		studentsArr = studentsArr.filter(studentObj => studentObj._id !== studentDeleted._id);
		refresh();
	});

	return { init };
})();
