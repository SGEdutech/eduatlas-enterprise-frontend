const attendance = (() => {
	let distinctBatchesArr;
	let studentsArr;
	let $batchDropDown;
	let $scheduleDropDown;
	let $absentStudentForm;
	let $saveAttendance;
	let $studentsAbsent;
	let $studentsContainer;

	async function submitAttendance(event) {
		try {
			event.preventDefault();
			cacheDynamic();
			const absentArr = $absentStudentForm.serialize();
			console.log($absentStudentForm);
			console.log(absentArr);
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
			tuitionApiCalls.putAttendanceInSchedule(tuitionId, courseId, batchId, scheduleId, absentArr);
		} catch (error) {
			console.error(error);
		}
	}

	function renderScheduleDropDown(event) {
		const $element = $(event.target);
		const batchId = $element.val();
		distinctBatchesArr.forEach(batch => {
			if (batch._id === batchId) {
				const scheduleOptionsHTML = template.scheduleOptions({ schedules: batch.schedules });
				$scheduleDropDown.html(scheduleOptionsHTML);
			}
		})
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
		$studentsAbsent = $('.student-absent:checkbox:checked');
	}

	function renderStudentAttandencePallet() {
		const batchId = $batchDropDown.val();
		const scheduleId = $scheduleDropDown.val();
		const batchStudentsInfo = [];

		distinctBatchesArr.forEach(batch => {
			if (batch._id === batchId) {
				batch.students.forEach(studentId => {
					studentsArr.forEach(studentInfo => {
						if (studentInfo._id === studentId) batchStudentsInfo.push(studentInfo);
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

	function cacheNBindDeleteButtons() {
		// cacheDynamic();
		// $deleteButton.click(function(e) {
		// 	e.preventDefault();
		// 	deletePost($(this));
		// });
	}

	function eagerLoadPost(context) {
		// context.col4 = false;
		// $postsContainer.append(template.institutePostCard(context))
		// cacheNBindDeleteButtons();
	}

	function renderBatchDropdown() {
		const batchDropDownHtml = template.batchOptions({ batches: distinctBatchesArr });
		$batchDropDown.html(batchDropDownHtml);
	}

	function refresh() {
		renderBatchDropdown();
		cacheDynamic();
	}

	function init(batches, students) {
		if (batches === undefined) throw new Error('Batches array not provided!');
		if (students === undefined) throw new Error('Students array not provided!');

		distinctBatchesArr = batches;
		studentsArr = students;
		cache();
		bindEvents();
		renderBatchDropdown();
		cacheDynamic();
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

	return { init };
})();
