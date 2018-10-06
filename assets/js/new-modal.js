const modal = (() => {
	let $submitBtn;
	let $modal;
	let $modalForm;

	function cache() {
		$submitBtn = $('#submit_edit_form_btn');
		$modal = $('#edit_modal');
		$modalForm = $('#edit_form');
	}

	function bindEvent() {
		$modal.on('hidden.bs.modal', () => $submitBtn.off())
	}

	function showModal() {
		$modal.modal('show');
	}

	function hideModal() {
		$modal.modal('hide');
	}

	function renderFormContent(html) {
		$modalForm.html(html);
	}

	function bindSubmitEvent(cb) {
		$submitBtn.click(cb);
	}

	function serializeForm() {
		return $modalForm.serialize();
	}

	function init() {
		cache();
		bindEvent();
	}

	return {
		showModal,
		hideModal,
		renderFormContent,
		bindSubmitEvent,
		serializeForm,
		init
	}
})();
