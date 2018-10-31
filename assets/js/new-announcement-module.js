const announcement = (() => {
	let studentsArr;
	let distinctBatchesArr;
	let $newAnnouncementForm;
	let $selectStudentContainer;
	let $selectBatchContainer;
	let $sendBtn;
	let $studentCheckbox;
	let $batchCheckbox;
	// Delete 2 below
	let $checkedStudents;
	let $checkedBatches;
	let $selectWholeInstitute;
	let $announcementText;

	function addNotification(event) {
		cacheDynamic();
		const $button = $(event.target);
		const tuitionId = $button.attr('data-tuition-id');

		const userEmails = [];
		const batchesArr = [];
		$checkedStudents.filter(`[data-tuition-id="${tuitionId}"]`).each((__, inp) => {
			const $inp = $(inp);
			userEmails.push($inp.val());
		})
		$checkedBatches.filter(`[data-tuition-id="${tuitionId}"]`).each((__, inp) => {
			const $inp = $(inp);
			batchesArr.push($inp.val());
		});
		const allInstitute = $selectWholeInstitute.filter(`[data-tuition-id="${tuitionId}"]`).prop('checked');

		tuitionIdIfSendToAllTuition = allInstitute ? tuitionId : null;

		notificationApiCalls.putNewNotification(tuitionId, $announcementText.val(), userEmails, batchesArr[0], tuitionIdIfSendToAllTuition);
	}

	function cache() {
		$newAnnouncementForm = $('.new_announcement_form');
		$selectStudentContainer = $('.select-announcement-students');
		$selectBatchContainer = $('.select-announcement-batches');
		$sendBtn = $('.send-announcement-btn');
		$selectWholeInstitute = $('.select-institute');
		$announcementText = $('.announcement-text');
	}

	function cacheDynamic() {
		$studentCheckbox = $selectStudentContainer.find('input:checkbox');
		$batchCheckbox = $selectBatchContainer.find('input:checkbox');
		$checkedStudents = $selectStudentContainer.find('input:checkbox:checked');
		$checkedBatches = $selectBatchContainer.find('input:checkbox:checked');
	}

	function render() {
		$selectStudentContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const studentsOfThisInstitute = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			const studentsOptionsHtml = template.studentsTable({ students: studentsOfThisInstitute });
			$container.html(studentsOptionsHtml);
		});

		$selectBatchContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const batchesOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
			const batchesOptionsHtml = template.batchesTable({ batches: batchesOfThisInstitute });
			$container.html(batchesOptionsHtml);
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
		// $a
	}

	function refresh() {
		render();
		cacheDynamic();
	}

	function init(batchesArr, students) {
		if (batchesArr === undefined) throw new Error('Batch array not provided!');
		if (Array.isArray(batchesArr) === false) throw new Error('Batches not an array');

		if (students === undefined) throw new Error('Students array not provided!');
		if (Array.isArray(students) === false) throw new Error('Students not an array');

		studentsArr = JSON.parse(JSON.stringify(students));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchesArr));

		cache();
		bindEvents();
		render();
		cacheDynamic();
	}

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
