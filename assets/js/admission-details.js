const admissionDetails = (() => {
	let $admissionFeeDetailsForm;
	let $nextTabButton;
	let $justSaveBtn;
	let $nextTab;
	let $admissionStartDateForm;
	let $admissionEndDateForm;
	let $sessionStartDateForm;
	let $feeInput, $admissionProcess, $eligibilityCriteria;
	let $admissionStartDateInput, $admissionEndDateInput, $sessionStartDateInput;
	let $admissionDetailsBackBtn, $lastTab;

	function cache() {
		$admissionFeeDetailsForm = $('#admission_details_form');
		$nextTabButton = $('#next_tab');
		$justSaveBtn = $('#save_admission_details_btn');
		$nextTab = $(`[href = "#tab4"]`);
		$admissionStartDateForm = $('#admission_start_date_form');
		$admissionEndDateForm = $('#admission_end_date_form');
		$sessionStartDateForm = $('#session_start_date_form');
		$feeInput = $('#fee');
		$admissionProcess = $('#admission_process');
		$eligibilityCriteria = $('#eligibility_criteria');
		$admissionStartDateInput = $('#admission_start_date');
		$admissionEndDateInput = $('#admission_end_date');
		$sessionStartDateInput = $('#session_start_date');
		$admissionDetailsBackBtn = $('#admission_details_back_btn');
		$lastTab = $(`[href = "#tab3"]`);
	}

	function cacheDynamic() {}

	function render(school) {
		$feeInput.val(school.fee);
		$admissionProcess.val(school.admissionProcess);
		$eligibilityCriteria.val(school.eligibilityCriteria);
		school.importantDates.forEach(obj => {
			if (obj.title === 'Admission Start Date') {
				obj.date = obj.date.split('T')[0];
				$admissionStartDateInput.val(obj.date);
			} else if (obj.title === 'Admission End Date') {
				obj.date = obj.date.split('T')[0];
				$admissionEndDateInput.val(obj.date);
			} else if (obj.title === 'Session Start Date') {
				obj.date = obj.date.split('T')[0];
				$sessionStartDateInput.val(obj.date);
			}
		});
	}

	function bindEvents(instituteId) {
		$nextTabButton.click(() => {
			saveImportantDetails(instituteId).then(() => {
				helperScripts.saveDetails('school', $admissionFeeDetailsForm, $nextTab, instituteId);
			});
		});
		$justSaveBtn.click(() => {
			saveImportantDetails(instituteId).then(() => {
				helperScripts.saveDetails('school', $admissionFeeDetailsForm, "saveOnly", instituteId);
			});
		});

		$admissionDetailsBackBtn.click(openLastTab);
	}

	function openLastTab(e) {
		e.preventDefault();
		$lastTab.tab('show');
		//scroll 100 pixels
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	function saveImportantDetails(instituteId) {
		let promiseArr = [];
		let dataArr = [];
		dataArr.push(new FormData($admissionStartDateForm[0]));
		dataArr.push(new FormData($admissionEndDateForm[0]));
		dataArr.push(new FormData($sessionStartDateForm[0]));
		schoolApiCalls.deleteArrayInSchool("importantDates", {
			_id: instituteId
		}).then(() => {
			dataArr.forEach(formData => {
				promiseArr.push(
					schoolApiCalls.putInArrayInSchool(instituteId, "importantDates", formData)
				)
			});
		});
		return Promise.all(promiseArr);
	}

	function init(school) {
		cache();
		render(school);
		cacheDynamic();
		bindEvents(school._id);
	}

	return {
		init
	};
})();