const resourses = (() => {
	let distinctFilesArr
	let studentsArr;
	let distinctBatchesArr;
	let $selectStudentContainer;
	let $selectBatchContainer;
	let $uploadAndShareBtn;
	let $studentCheckbox;
	let $batchCheckbox;
	let $selectWholeInstitute;
	let $resourseTitleInp;
	let $resourseDescriptionInp;
	let $studentSearchInp;
	let $studentSearchResetBtn;
	let $allUploadedFilesContainer;

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
		$selectStudentContainer = $('.select-resourses-students');
		$selectBatchContainer = $('.select-resourses-batches');
		$uploadAndShareBtn = $('.upload-and-share-resourse-btn');
		$selectWholeInstitute = $('.resourses-select-institute');
		$resourseTitleInp = $('.resourse-title-inp');
		$resourseDescriptionInp = $('.resourse-description-inp');
		$studentSearchInp = $('.resourses-student-search-inp');
		$studentSearchResetBtn = $('.resourses-student-search-reset');
		$allUploadedFilesContainer = $('.all-uploaded-files-container');
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

		// $notificationDisplayContainer.each((__, container) => {
		// 	const $container = $(container);
		// 	const tuitionId = $container.attr('data-tuition-id');
		// 	if (opts.tuitionId && opts.tuitionId !== tuitionId) return
		// 	const notificationOfThisTuitionArr = distinctNotificationArr.filter(notificationObj => notificationObj.senderId === tuitionId);
		// 	notificationOfThisTuitionArr.forEach(notificationObj => {
		// 		notificationObj.fromNow = moment(notificationObj.createdAt).fromNow();
		// 	})
		// 	const notificationDisplayCardsHtml = template.notificationCard({ notifications: notificationOfThisTuitionArr });
		// 	$container.html(notificationDisplayCardsHtml)
		// });
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
		// $sendBtn.click(addNotification);
		$selectWholeInstitute.change(markOrUnmarkAllStudents);
		$studentSearchInp.on('input paste', filterAndRenderSearceResults);
		$studentSearchResetBtn.click(resetSearchResults);
	}

	function refresh(opts) {
		render(opts);
		cacheDynamic();
		bindDynamic();
	}

	function init(filesArr, batchesArr, students) {
		if (batchesArr === undefined) throw new Error('Batch array not provided!');
		if (Array.isArray(batchesArr) === false) throw new Error('Batches not an array');

		if (students === undefined) throw new Error('Students array not provided!');
		if (Array.isArray(students) === false) throw new Error('Students not an array');

		if (filesArr === undefined) throw new Error('Files array not provided!');
		if (Array.isArray(filesArr) === false) throw new Error('Files not an array');

		// const autoGeneratedMessages = [
		// 	'You have been added to our Study Monitor',
		// 	'You have been removed from our Study Monitor',
		// 	'Classes has been added to your batch',
		// 	'A class of your batch has been edited',
		// 	'A class from your batch has been deleted'
		// ];

		// notificationArr = notificationArr.filter(notificationObj => autoGeneratedMessages.indexOf(notificationObj.message) === -1);
		distinctFilesArr = JSON.parse(JSON.stringify(filesArr));
		studentsArr = JSON.parse(JSON.stringify(students));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchesArr));

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	return { init };
})();