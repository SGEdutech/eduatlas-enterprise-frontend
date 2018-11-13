const finance = (() => {
	let distinctStudentsArr;
	let distinctBatchesArr;
	let $studentSearchInp;
	let $batchCheckboxes;
	let $searchBtn;
	let $resetBtn;
	let $studentsContainer;
	let $batchCheckboxContainer;

	function renderAllStudents(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		refresh({ renderTuitionId: tuitionId });
	}

	function getStudentFromSelectedBatchArr(selectedBatchesArr) {
		if (selectedBatchesArr === undefined) throw new Error('Selected batch array not provided');
		const studentsArr = [];
		selectedBatchesArr.forEach(batchId => {
			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			batchInfo.students.forEach(studentId => {
				studentsArr.push(distinctStudentsArr.find(studentObj => studentObj._id === studentId));
			});
		});
		return studentsArr;
	}

	// If no batch is selected then all batch ids are returned
	function getSelectedBatchesArr(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuition id not provided');
		const selectedBatchesArr = [];
		let $selectedBatchesOfThisTuition = $batchCheckboxes.filter(`[data-tuition-id="${tuitionId}"]:checked`);
		if ($selectedBatchesOfThisTuition.length === 0) $selectedBatchesOfThisTuition = $batchCheckboxes.filter(`[data-tuition-id="${tuitionId}"]`);
		$selectedBatchesOfThisTuition.each((__, checkbox) => {
			const $checkbox = $(checkbox);
			selectedBatchesArr.push($checkbox.val());
		});
		return selectedBatchesArr;
	}

	function renderFilteredStudents(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		const selectedBatchedArr = getSelectedBatchesArr(tuitionId);
		const studentsOfSelectedBatchArr = getStudentFromSelectedBatchArr(selectedBatchedArr);
		const searchStr = $studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const regex = new RegExp(searchStr, 'i');
		const searchResultArr = studentsOfSelectedBatchArr.filter(studentObj => regex.test(studentObj.name));
		refresh({ studentsArr: searchResultArr, renderTuitionId: tuitionId });
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

	function renderBatchCheckboxes() {
		$batchCheckboxContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const batchesOfThisTuition = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
			const batchesCheckboxHtml = template.financeBatchesCheckboxes({ batches: batchesOfThisTuition });
			$container.html(batchesCheckboxHtml);
		});
	}

	function render() {
		renderStudents();
		renderBatchCheckboxes();
	}

	function cache() {
		$studentSearchInp = $('.finance-search-inp');
		$searchBtn = $('.finance-search-trigger');
		$resetBtn = $('.finance-search-reset');
		$studentsContainer = $('.finance-student-container');
		$batchCheckboxContainer = $('.finance-batch-container');
	}

	function cacheDynamic() {
		$batchCheckboxes = $('.finance-batches');
	}

	function bindEvents() {
		$searchBtn.click(renderFilteredStudents);
		$resetBtn.click(renderAllStudents);
	}

	function bindDynamic() {

	}

	function refresh(opts) {
		opts = opts || {};
		renderStudents({ studentsArr: opts.studentsArr, renderTuitionId: opts.renderTuitionId });
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

	return { init };
})();
