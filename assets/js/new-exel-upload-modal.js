const excelUploadModal = (() => {
	let tuitionId;
	let $studentsDisplayModal;
	let $modalBody;
	let $uploadBtn;
	let $studentRows;
	let $form;

	function getInputValues($inputs) {
		if ($inputs === undefined) return [];
		if ($inputs instanceof $ === false) throw new Error('Inputs must be jquery object');

		const inputsDataObj = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			inputsDataObj[$input.attr('name')] = $input.val();
		});
		return inputsDataObj;
	}

	function getStudentDataArr() {
		const allInputsDataArr = [];
		$studentRows.each((__, studentRow) => {
			const $studentRow = $(studentRow);
			const rowNumber = $studentRow.attr('data-row-number');
			const inputsOfThisRow = $inputsInsideStudentRows.filter(`[data-row-number="${rowNumber}"]`);
			allInputsDataArr.push(getInputValues(inputsOfThisRow));
		});
		return allInputsDataArr;
	}

	async function submitStudents(event) {
		try {
			event.preventDefault();
			const newStudents = await tuitionApiCalls.putStudentInTuition(tuitionId, { students: getStudentDataArr() });
			newStudents.forEach(studentObj => studentObj.tuitionId = tuitionId);
			PubSub.publish('student.add', newStudents);
			hideModal();
		} catch (error) {
			console.error(error);
		}
	}

	function distroyModal() {
		tuitionId = undefined;
		unbindEvents();
	}

	function showModal() {
		$studentsDisplayModal.modal('show');
	}

	function hideModal() {
		$studentsDisplayModal.modal('hide');
	}

	function uploadData() {

	}

	function cache() {
		$studentsDisplayModal = $('#excel_upload_modal');
		$modalBody = $('#excel_upload_modal_body');
		$uploadBtn = $('#upload_excel_data');
		$form = $('#upload_student_form');
	}

	function cacheDynamic() {
		$studentRows = $('.student-row');
		$inputsInsideStudentRows = $studentRows.find('input');
	}

	function bindEvents() {
		$uploadBtn.click(uploadData);
		$studentsDisplayModal.on('hidden.bs.modal', distroyModal);
		$form.submit(submitStudents);
	}

	function unbindEvents() {
		$uploadBtn.off();
		$form.off();
	}

	function bindDynamic() {

	}

	function render(studentsData) {
		const bodyHtml = template.studentExcelInputTable({ students: studentsData.data });
		$modalBody.html(bodyHtml);
	}

	function init(studentsData, idOfTuition) {
		if (studentsData === undefined) throw new Error('Student data not provided');
		if (idOfTuition === undefined) throw new Error('Tuition Id not provided');

		tuitionId = idOfTuition;
		cache();
		bindEvents();
		render(studentsData);
		cacheDynamic();
		showModal();
	}

	return { init };
})();
