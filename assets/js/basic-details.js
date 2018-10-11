const basicDetails = (() => {
	let $basicContainer;
	let $form;
	let $saveDetailsBtn;
	let $saveNProceedDetailsBtn;
	let $contactUsTab;

	function cache() {
		$basicContainer = $("#basicContainer");
		$form = $('#aboutUsForm');
		$saveDetailsBtn = $('#save_basic_details_btn');
		$saveNProceedDetailsBtn = $('#save_proceed_basic_details_btn');
		$contactUsTab = $(`[href = "#tab2"]`);
	}

	function bindEvents(typeOfInfo, tuitionId) {
		$saveDetailsBtn.click(() => helperScripts.saveDetails(typeOfInfo, $form, "saveOnly", tuitionId));
		$saveNProceedDetailsBtn.click(() => helperScripts.saveDetails(typeOfInfo, $form, $contactUsTab, tuitionId))
	}

	function render(tuitionInfo) {
		let html = getHtml(tuitionInfo);
		$basicContainer.append(html);
	}

	function getHtml(context) {
		return template.userEditTuitionBasic(context);
	}

	function init(typeOfInfo, tuitionInfo) {
		cache();
		render(tuitionInfo);
		bindEvents(typeOfInfo, tuitionInfo._id);
	}

	return { init };
})();