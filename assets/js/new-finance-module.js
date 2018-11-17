const finance = (() => {
	let distinctStudentsArr;
	let distinctBatchesArr;
	let $studentSearchInp;
	let $batchCheckboxes;
	let $resetBtn;
	let $studentsContainer;
	let $studentCards;
	let $batchCheckboxContainer;
	let $landingContainer;
	let $detailsContainer;
	let $detailsDisplayContainer;
	let $backBtn;

	function showLandingAndDistroyDatailsDisplay() {
		$detailsDisplayContainer.html('');
		$landingContainer.removeClass('d-none');
		$detailsContainer.addClass('d-none');
	}

	function renderDetails(studentId) {
		const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
		const detailsHtml = template.financeDetailView({ student: studentInfo });
		$detailsDisplayContainer.html(detailsHtml);
	}

	function showDetails() {
		const $card = $(this);
		const studentId = $card.attr('data-student-id');
		renderDetails(studentId);
		$landingContainer.addClass('d-none');
		$detailsContainer.removeClass('d-none');
	}

	function renderAllStudents(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		refresh({ renderTuitionId: tuitionId });
	}

	function getStudentFromSelectedBatchArr(selectedBatchesArr) {
		if (selectedBatchesArr === undefined) throw new Error('Selected batch array not provided');
		// Return all students if no batch is selected
		if (selectedBatchesArr.length === 0) return distinctStudentsArr;
		const studentsArr = [];
		selectedBatchesArr.forEach(batchId => {
			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			batchInfo.students.forEach(studentId => {
				studentsArr.push(distinctStudentsArr.find(studentObj => studentObj._id === studentId));
			});
		});
		return studentsArr;
	}

	function getSelectedBatchesArr(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuition id not provided');
		const selectedBatchesArr = [];
		const $selectedBatchesOfThisTuition = $batchCheckboxes.filter(`[data-tuition-id="${tuitionId}"]:checked`);
		$selectedBatchesOfThisTuition.each((__, checkbox) => {
			const $checkbox = $(checkbox);
			selectedBatchesArr.push($checkbox.val());
		});
		return selectedBatchesArr;
	}

	function injectCheckedBatchInfo(batchInfoArr, checkedBatchesIdArr) {
		if (batchInfoArr === undefined) throw new Error('Batch info array not provided');
		if (checkedBatchesIdArr === undefined) throw new Error('Checked batches array not provided');

		if (Array.isArray(batchInfoArr) === false) throw new Error('Batch info is not an array');
		if (Array.isArray(checkedBatchesIdArr) === false) throw new Error('Checked Batches is not an array');

		batchInfoArr.forEach(batchObj => batchObj.isChecked = checkedBatchesIdArr.indexOf(batchObj._id) !== -1);
	}

	function renderFilteredStudents(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		const selectedBatchesArr = getSelectedBatchesArr(tuitionId);
		const studentsOfSelectedBatchArr = getStudentFromSelectedBatchArr(selectedBatchesArr);
		const searchStr = $studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const regex = new RegExp(searchStr, 'i');
		const searchResultArr = studentsOfSelectedBatchArr.filter(studentObj => regex.test(studentObj.name));
		refresh({ studentsArr: searchResultArr, renderTuitionId: tuitionId, batchesArr: selectedBatchesArr });
	}

	function renderStudents(opts) {
		opts = opts || {};
		const studentsArr = opts.studentsArr || distinctStudentsArr;
		$studentsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.renderTuitionId && opts.renderTuitionId !== tuitionId) return;

			const studentsOfThisTuition = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			const studentsCardsHtml = template.financeCard({ students: studentsOfThisTuition });
			$container.html(studentsCardsHtml);
		});
	}

	function renderBatchCheckboxes(opts) {
		opts = opts || {};
		opts.batchesArr = opts.batchesArr || [];
		$batchCheckboxContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.tuitionId && opts.tuitionId !== tuitionId) return;

			const batchesOfThisTuition = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
			const clonedBatchesOfThisTuition = JSON.parse(JSON.stringify(batchesOfThisTuition));
			injectCheckedBatchInfo(clonedBatchesOfThisTuition, opts.batchesArr);
			const batchesCheckboxHtml = template.financeBatchesCheckboxes({ batches: clonedBatchesOfThisTuition });
			$container.html(batchesCheckboxHtml);
		});
	}

	function render(opts) {
		renderStudents(opts);
		renderBatchCheckboxes(opts);
	}

	function cache() {
		$studentSearchInp = $('.finance-search-inp');
		$resetBtn = $('.finance-search-reset');
		$studentsContainer = $('.finance-student-container');
		$batchCheckboxContainer = $('.finance-batch-container');
		$landingContainer = $('.finance-landing-container');
		$detailsContainer = $('.finance-detail-container');
		$detailsDisplayContainer = $('.finance-dynamic-container');
		$backBtn = $('.landing-view-btn');
	}

	function cacheDynamic() {
		$batchCheckboxes = $('.finance-batches');
		$studentCards = $('.finance-card');
	}

	function bindEvents() {
		$studentSearchInp.on('input paste', renderFilteredStudents);
		$resetBtn.click(renderAllStudents);
		$backBtn.click(showLandingAndDistroyDatailsDisplay);
	}

	function bindDynamic() {
		$studentCards.click(showDetails);
		$batchCheckboxes.change(renderFilteredStudents);
	}

	function refresh(opts) {
		render(opts);
		cacheDynamic();
		bindDynamic();
	}

	function init(studentsArr, batchesArr) {
		if (studentsArr === undefined) throw new Error('Students not provided');
		if (Array.isArray(studentsArr) === false) throw new Error('Students array must be an array');

		if (batchesArr === undefined) throw new Error('Batches not provided');
		if (Array.isArray(batchesArr) === false) throw new Error('Batches array must be an array');

		distinctStudentsArr = JSON.parse(JSON.stringify(studentsArr));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchesArr));

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	PubSub.subscribe('students.add', (msg, studentAdded) => {
		if (Array.isArray(studentAdded)) {
			distinctStudentsArr = studentsArr.concat(studentAdded);
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

	PubSub.subscribe('batch.add', (msg, addedBatch) => {
		distinctBatchesArr.push(addedBatch);
		refresh();
	});

	PubSub.subscribe('batch.edit', (msg, editedBatch) => {
		distinctBatchesArr = distinctBatchesArr.map(batchObj => batchObj._id === editedBatch._id ? editedBatch : batchObj);
		refresh();
	});

	PubSub.subscribe('batch.delete', (msg, removedBatch) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj._id !== removedBatch._id);
		refresh();
	});

	PubSub.subscribe('course.delete', (msg, deletedCourse) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj.courseId !== deletedCourse._id);
		refresh();
	});

	return { init };
})();
