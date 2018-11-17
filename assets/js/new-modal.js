const modal = (() => {
	let $submitBtn;
	let $modal;
	let $modalForm;
	let $courseFeeEdit;
	let $gstPercentageEdit;
	let $totalFeeEdit;
	let $gstCheckbox;
	let $modalFormBody;
	let $studentRow;
	let $searchInp;
	let $formInputs;

	function cacheDynamic() {
		$timePicker = $modalForm.find('.edit-time-picker');
		$datePicker = $modalForm.find('.edit-date-picker');
		$studentRow = $modalForm.find('.student-row');
		$searchInp = $modalForm.find('.edit-batch-student-search-inp');
		$formInputs = $modalForm.find('input');
	}

	function cache() {
		$submitBtn = $('#submit_edit_form_btn');
		$modal = $('#edit_modal');
		$modalForm = $('#edit_form');
		$modalFormBody = $('#modal_form_body');
	}

	function unbindEvents() {
		console.log('yooo');
		$submitBtn.off();
		$modalForm.off();
		$searchInp.off();
	}

	function bindEvent() {
		$modal.on('hidden.bs.modal', unbindEvents);
	}

	function showModal() {
		$modal.modal('show');
	}

	function hideModal() {
		$modal.modal('hide');
	}

	function renderFormContent(html) {
		$modalFormBody.html(html);
	}

	function bindSubmitEvent(cb) {
		$modalForm.submit(cb);
	}

	function renderSearchResults(e) {
		const $inp = $(e.target);
		let filter = $inp.val();
		filter = filter.toLowerCase();
		$studentRow.each((__, row) => {
			const $row = $(row);
			$row.html().toLowerCase().includes(filter) ? $row.removeClass('d-none') : $row.addClass('d-none');
		});
	}

	function bindSearchForStudents() {
		$searchInp.on('input paste', renderSearchResults);
	}

	function calcTotalCourseFee(fee, gstPercentage) {
		if (fee === undefined) throw new Error('Fee not provided!');
		fee = parseFloat(fee, 10);
		gstPercentage = parseFloat(gstPercentage, 10) || 0;

		return fee + fee * (gstPercentage / 100);
	}

	function toggleGstInpAndUpdateTotalFee() {
		const isChecked = $gstCheckbox.prop('checked');

		if (isChecked) {
			$gstPercentageEdit.prop('disabled', true);
			$gstPercentageEdit.val(0);
			updateTotalFee();
		} else {
			$gstPercentageEdit.prop('disabled', false);
		}
	}

	// FIXME: Has been copied from other module! Centralise!!
	function updateTotalFee() {
		const totalFee = calcTotalCourseFee($courseFeeEdit.val(), $gstPercentageEdit.val());
		$totalFeeEdit.val(totalFee);
	}

	// Is intended to call after cache
	function cacheCourseDomElements() {
		$courseFeeEdit = $modalForm.find('#course_fee_edit');
		$gstPercentageEdit = $modalForm.find('#gst_precentage_edit');
		$totalFeeEdit = $modalForm.find('#total_fee_edit');
		$gstCheckbox = $('.edit-gst-checkbox');
	}

	function bindCoursesEvents() {
		$courseFeeEdit.blur(updateTotalFee);
		$gstPercentageEdit.blur(updateTotalFee);
		$gstCheckbox.change(toggleGstInpAndUpdateTotalFee);
	}

	function cacheAndBindCoursesStuff() {
		cacheCourseDomElements();
		bindCoursesEvents();
	}

	function serializeForm() {
		return $modalForm.serialize();
	}

	function getInputsDataObj() {
		cacheDynamic();
		return randomScripts.getInputsDataObj($formInputs);
	}

	function getInputValues() {
		const $inputs = $modalForm.find('input');
		const nameToValueMap = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			nameToValueMap[name] = value;
		});
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
		bindSearchForStudents,
		serializeForm,
		getInputsDataObj,
		getInputValues,
		initDatetimepicker,
		cacheAndBindCoursesStuff,
		cacheDynamic,
		init
	}
})();
