const attendance = (() => {
	let distinctBatchesArr;
	let studentsArr;
	let $batchDropDown;
	let $scheduleDropDown;
	let $absentStudentForm;
	let $attendanceWeekDropdown;
	let $saveAttendance;
	let $studentsContainer;

	async function submitAttendance(event) {
		try {
			event.preventDefault();
			cacheDynamic();

			const $button = $(event.target);
			const tuitionId = $button.attr('data-tuition-id');
			const absentArr = $absentStudentForm.filter(`[data-tuition-id="${tuitionId}"]`).serialize();
			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const scheduleId = $scheduleDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			let courseId;
			distinctBatchesArr.forEach(batchInfo => {
				if (batchInfo._id === batchId) {
					courseId = batchInfo.courseId;
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

	function sortByWeek(batchObj) {
		return batchObj.schedules.reduce((accumulator, scheduleObj) => {
			const weekOptions = moment(scheduleObj.date).week().startOf('isoWeek') + '-' + moment(scheduleObj.date).week().startOf('isoWeek');
			// check if the week number exists
			if (typeof accumulator[weekOptions] === 'undefined') {
				accumulator[weekOptions] = [];
			}
			accumulator[weekOptions].push(scheduleObj);
			return accumulator;
		}, {});
	}

	function renderWeekDropDownAndAttendancePallet() {
		$scheduleDropDown.each((__, dropdown) => {
			const $dropdown = $(dropdown);
			const tuitionId = $dropdown.attr('data-tuition-id');

			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			distinctBatchesArr.forEach(batch => {
				if (batch._id === batchId) {
					const schedulesByWeek = sortByWeek(batch);
					const scheduleOptionsHTML = template.scheduleOptions({ schedules: schedulesByWeek });
					$dropdown.html(scheduleOptionsHTML);
				}
			});
		})
		renderStudentAttandencePallet();
	}

	function renderScheduleDropDown() {
		$scheduleDropDown.each((__, dropdown) => {
			const $dropdown = $(dropdown);
			const tuitionId = $dropdown.attr('data-tuition-id');

			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			distinctBatchesArr.forEach(batch => {
				if (batch._id === batchId) {
					const schedulesByWeek = sortByWeek(batch);
					const scheduleOptionsHTML = template.scheduleOptions({ schedules: schedulesByWeek });
					$dropdown.html(scheduleOptionsHTML);
				}
			});
		})
	}

	function cache() {
		$batchDropDown = $('.attendance-batch-dropdown');
		$scheduleDropDown = $('.attendance-schedule-dropdown');
		$markAttendanceForm = $('.mark-attendance-form');
		$absentStudentForm = $('.absent-student-form');
		$saveAttendance = $('.save-attendance-btn');
		$studentsContainer = $('.students-container');
		$attendanceWeekDropdown = $('.attendance-week-dropdown');
	}

	function cacheDynamic() {
		$checkboxInputs = $absentStudentForm.find('.student-absent');
	}

	function renderStudentAttandencePallet() {
		$studentsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const batchId = $batchDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const scheduleId = $scheduleDropDown.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const studentsOfThisInstitute = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			let studentsAbsent;
			const batchStudentsInfo = [];

			distinctBatchesArr.forEach(batch => {
				if (batch._id === batchId) {
					batch.schedules.forEach(scheduleObj => {
						if (scheduleObj._id === scheduleId) studentsAbsent = scheduleObj.studentsAbsent;
					});
					studentsAbsent = studentsAbsent || [];
					batch.students.forEach(studentId => {
						studentsOfThisInstitute.forEach(studentInfo => {
							if (studentInfo._id === studentId) {
								const jsonString = JSON.stringify(studentInfo);
								const duplicateStudentInfo = JSON.parse(jsonString);
								duplicateStudentInfo.isAbsent = studentsAbsent.indexOf(duplicateStudentInfo._id) !== -1;
								batchStudentsInfo.push(duplicateStudentInfo);
							}
						});
					});
				}
			});
			const studentTableHtml = template.studentsTable({ students: batchStudentsInfo });
			$container.html(studentTableHtml);
		})
	}

	function bindEvents() {
		$batchDropDown.change(renderWeekDropDownAndAttendancePallet);
		$attendanceWeekDropdown.change(renderScheduleDropDown);
		$scheduleDropDown.change(renderStudentAttandencePallet);
		$saveAttendance.click(submitAttendance);
	}

	function renderBatchDropdown() {
		$batchDropDown.each((__, dropdown) => {
			const $dropdown = $(dropdown);
			const tuitionId = $dropdown.attr('data-tuition-id');

			const batchesOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);

			const batchDropDownHtml = template.batchOptions({ batches: batchesOfThisInstitute });
			$dropdown.html(batchDropDownHtml);
		})
	}

	function refresh() {
		cacheDynamic();
		renderBatchDropdown();
		renderWeekDropDownAndAttendancePallet();
	}

	function render() {
		renderBatchDropdown();
		renderWeekDropDownAndAttendancePallet();
	}

	function init(batches, students) {
		if (batches === undefined) throw new Error('Batches array not provided!');
		if (students === undefined) throw new Error('Students array not provided!');

		distinctBatchesArr = JSON.parse(JSON.stringify(batches));
		studentsArr = JSON.parse(JSON.stringify(students));
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
