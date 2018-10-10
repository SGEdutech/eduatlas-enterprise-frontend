const modal = (() => {
	let $submitBtn;
	let $modal;
	let $modalForm;

	function cacheDynamic() {
		$timePicker = $modalForm.find('.edit-time-picker');
		$datePicker = $modalForm.find('.edit-date-picker');
	}

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

	function getInputValues() {
		const $inputs = $modalForm.find('input');
		const nameToValueMap = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			nameToValueMap[name] = value;
		})
		return nameToValueMap;
	}

	function initDatetimepicker() {
		cacheDynamic();
		const icons = {
			time: 'fa fa-clock-o',
			date: 'fa fa-calendar',
			up: 'fa fa-chevron-up',
			down: 'fa fa-chevron-down',
			previous: 'fa fa-chevron-left',
			next: 'fa fa-chevron-right',
			today: 'fa fa-screenshot',
			clear: 'fa fa-trash',
			close: 'fa fa-remove'
		};
		$timePicker.datetimepicker({ format: 'LT', icons });
		$datePicker.datetimepicker({ format: 'L', icons });
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
		getInputValues,
		initDatetimepicker,
		init
	}
})();