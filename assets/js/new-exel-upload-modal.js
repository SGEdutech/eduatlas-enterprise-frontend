const excelUploadModal = (() => {
	let $studentsDisplayModal;
	let $modalBody;
	let $uploadBtn;
	let $studentRows;
	let $form;

	function submitStudents() {
		
	}

	function distroyModal() {
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
	}

	function bindEvents() {
		$uploadBtn.click(uploadData);
		$studentsDisplayModal.on('hidden.bs.modal', distroyModal);
		$form.submit(submitStudents);
	}

	function unbindEvents() {
		$uploadBtn.off();
	}

	function bindDynamic() {

	}

	function render(studentsData) {
		const bodyHtml = template.studentExcelInputTable({ students: studentsData.data });
		$modalBody.html(bodyHtml);
	}

	function init(studentsData) {
		cache();
		bindEvents();
		render(studentsData);
		showModal();
	}

	return { init };
})();
