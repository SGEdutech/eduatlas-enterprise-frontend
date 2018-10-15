const announcement = (() => {
	let studentsArr;
	let distinctBatchesArr;
	let $newAnnouncementForm;
	let $selectStudentContainer;
	let $selectBatchContainer;
	let $sendBtn;
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

	function bindEvents() {
		$sendBtn.click(addNotification);
	}

	function deleteAnnouncement($element) {}

	function addAnnouncement(form) {}

	function refresh() {

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
		// bindDynamic();
	}

	return { init };
})();
