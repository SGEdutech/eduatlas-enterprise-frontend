const excelUploadModal = (() => {
	let $studentsDisplayModal;
	let $modalBody;
	let $uploadBtn;
	let $studentRow;

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
	}

	function cacheDynamic() {
		$studentRow = $('.student-row');
	}

	function bindEvents() {
		$uploadBtn.click(uploadData);
		$studentsDisplayModal.on('hidden.bs.modal', distroyModal);
	}

	function unbindEvents() {
		$uploadBtn.off();
	}

	function bindDynamic() {

	}

	function render(studentsData) {
		const bodyHtml = template.studentExcelInputTable({ students: studentsData.data });
		console.log(bodyHtml);
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
