const announcement = (() => {
	let distinctNotificationArr;
	let studentsArr;
	let distinctBatchesArr;
	let $newAnnouncementForm;
	let $selectStudentContainer;
	let $selectBatchContainer;
	let $sendBtn;
	let $studentCheckbox;
	let $batchCheckbox;
	let $selectWholeInstitute;
	let $announcementText;
	let $studentSearchInp;
	let $studentSearchResetBtn;
	let $notificationDisplayContainer;

	async function addNotification(event) {
		try {
			const $button = $(event.target);
			const tuitionId = $button.attr('data-tuition-id');

			const userEmails = [];
			const $checkedStudentCheckbox = $studentCheckbox.filter(`[data-tuition-id="${tuitionId}"]:checked`);
			if ($checkedStudentCheckbox.length === 0) {
				alert('Please select atleast one student to send notification to');
				return;
			}
			$checkedStudentCheckbox.each((__, inp) => {
				const $inp = $(inp);
				userEmails.push($inp.val());
			});
			const newNotification = await notificationApiCalls.putNewNotification(tuitionId, $announcementText.val(), userEmails);
			notification.push('Your announcement has been successfully sent');
			distinctNotificationArr.push(newNotification);
			$announcementText.val('');
			refresh({ renderTuitionId: tuitionId });
		} catch (err) {
			console.error(err);
		}
	}

	function markOrUnmarkBatchStudents(event) {
		const $checkBox = $(event.target);
		const tuitionId = $checkBox.attr('data-tuition-id');

		const isChecked = $checkBox.is(':checked');
		const batchId = $checkBox.val();
		const batch = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
		$studentCheckbox.filter(`[data-tuition-id="${tuitionId}"]`)
			.each((__, checkbox) => {
				$checkbox = $(checkbox);
				const studentId = $checkbox.attr('data-student-id');
				const studentFound = Boolean(batch.students.find(idOfStudent => idOfStudent === studentId));
				if (studentFound) {
					if (isChecked) {
						$checkbox.prop('checked', true);
					} else {
						$checkbox.prop('checked', false);
					}
				}
			});
	}

	function cache() {
		$newAnnouncementForm = $('.new_announcement_form');
		$selectStudentContainer = $('.select-announcement-students');
		$selectBatchContainer = $('.select-announcement-batches');
		$sendBtn = $('.send-announcement-btn');
		$selectWholeInstitute = $('.select-institute');
		$announcementText = $('.announcement-text');
		$studentSearchInp = $('.announcement-student-search-inp');
		$studentSearchResetBtn = $('.announcement-student-search-reset');
		$notificationDisplayContainer = $('.recent-notification-container');
	}

	function cacheDynamic() {
		$studentCheckbox = $selectStudentContainer.find('input:checkbox');
		$batchCheckbox = $selectBatchContainer.find('input:checkbox');
	}

	function bindDynamic() {
		$batchCheckbox.off().change(markOrUnmarkBatchStudents);
	}

	function filterAndRenderSearceResults(event) {
		const $input = $(event.target);
		const tuitionId = $input.attr('data-tuition-id');
		const searchStr = $studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const searchResultsArr = randomScripts.getStudentSearchResults(studentsArr, searchStr);
		refresh({ renderStudentsArr: searchResultsArr, renderTuitionId: tuitionId });
	}

	function resetSearchResults(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		$studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val('');
		refresh({ renderTuitionId: tuitionId })
	}

	function render(opts) {
		opts = opts || {};
		opts.renderStudentsArr = opts.renderStudentsArr || studentsArr;
		$selectStudentContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.renderTuitionId && opts.renderTuitionId !== tuitionId) return

			const studentsOfThisInstitute = opts.renderStudentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			const studentsOptionsHtml = template.announcementStudentsTable({ students: studentsOfThisInstitute });
			$container.html(studentsOptionsHtml);
		});

		$selectBatchContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.tuitionId && opts.tuitionId !== tuitionId) return

			const batchesOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
			const batchesOptionsHtml = template.batchesTable({ batches: batchesOfThisInstitute });
			$container.html(batchesOptionsHtml);
		});

		$notificationDisplayContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.tuitionId && opts.tuitionId !== tuitionId) return
			const notificationOfThisTuitionArr = distinctNotificationArr.filter(notificationObj => notificationObj.senderId === tuitionId);
			notificationOfThisTuitionArr.forEach(notificationObj => {
				notificationObj.fromNow = moment(notificationObj.createdAt).fromNow();
			})
			const notificationDisplayCardsHtml = template.notificationCard({ notifications: notificationOfThisTuitionArr });
			$container.html(notificationDisplayCardsHtml)
		});
	}

	function markOrUnmarkAllStudents(event) {
		const $checkBox = $(event.target);
		const tuitionId = $checkBox.attr('data-tuition-id');
		if ($checkBox.is(':checked')) {
			$studentCheckbox.filter(`[data-tuition-id="${tuitionId}"]`).prop('checked', true);
		} else {
			$studentCheckbox.filter(`[data-tuition-id="${tuitionId}"]`).prop('checked', false);
		}
	}

	function bindEvents() {
		$sendBtn.click(addNotification);
		$selectWholeInstitute.change(markOrUnmarkAllStudents);
		$studentSearchInp.on('input paste', filterAndRenderSearceResults);
		$studentSearchResetBtn.click(resetSearchResults);
	}

	function refresh(opts) {
		render(opts);
		cacheDynamic();
		bindDynamic();
	}

	function init(notificationArr, batchesArr, students) {
		if (batchesArr === undefined) throw new Error('Batch array not provided!');
		if (Array.isArray(batchesArr) === false) throw new Error('Batches not an array');

		if (students === undefined) throw new Error('Students array not provided!');
		if (Array.isArray(students) === false) throw new Error('Students not an array');

		if (notificationArr === undefined) throw new Error('Notification array not provided!');
		if (Array.isArray(students) === false) throw new Error('Notification not an array');

		distinctNotificationArr = JSON.parse(JSON.stringify(notificationArr));
		studentsArr = JSON.parse(JSON.stringify(students));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchesArr));

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	PubSub.subscribe('course.edit', (msg, editedCourse) => {
		distinctBatchesArr.forEach(batchObj => {
			if (editedCourse._id === batchObj.courseId) batchObj.courseCode = editedCourse.code;
		});
		refresh();
	});

	PubSub.subscribe('course.delete', (msg, deletedCourse) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj.courseId !== deletedCourse._id);
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

	PubSub.subscribe('student.add', (msg, studentAdded) => {
		if (Array.isArray(studentAdded)) {
			studentsArr = studentsArr.concat(studentAdded);
		} else {
			studentsArr.push(studentAdded);
		}
		refresh();
	});

	PubSub.subscribe('student.edit', (msg, studentEdited) => {
		studentsArr = studentsArr.map(studentObj => studentObj._id === studentEdited._id ? studentEdited : studentObj);
		refresh();
	});

	PubSub.subscribe('student.delete', (msg, studentDeleted) => {
		studentsArr = studentsArr.filter(studentObj => studentObj._id !== studentDeleted._id);
		refresh();
	});

	return { init };
})();
