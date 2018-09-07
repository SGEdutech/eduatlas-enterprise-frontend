const admissionDetails = (() => {
    let $admissionFeeDetailsForm;
    let $nextTabButton;
    let $nextTab;
    let $admissionStartDateForm;
    let $admissionEndDateForm;
    let $sessionStartDateForm;
    let $feeInput, $admissionProcess, $eligibilityCriteria;
    let $admissionStartDateInput, $admissionEndDateInput, $sessionStartDateInput;

    function cache() {
        $admissionFeeDetailsForm = $('#admission_details_form');
        $nextTabButton = $('#next_tab');
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
    }

    function cacheDynamic() {
    }

    function render(school) {
        $feeInput.val(school.fee);
        $admissionProcess.val(school.admissionProcess);
        $eligibilityCriteria.val(school.eligibilityCriteria);
        school.importantDates.forEach(obj => {
            if (obj.title === 'Admission Start Date') {
                obj.date = obj.date.split('T')[0];
                $admissionStartDateInput.val(obj.date);
            }
            else if (obj.title === 'Admission End Date') {
                obj.date = obj.date.split('T')[0];
                $admissionEndDateInput.val(obj.date);
            }
            else if (obj.title === 'Session Start Date') {
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
    }

    function saveImportantDetails(instituteId) {
        let promiseArr = [];
        let dataArr = [];
        dataArr.push(new FormData($admissionStartDateForm[0]));
        dataArr.push(new FormData($admissionEndDateForm[0]));
        dataArr.push(new FormData($sessionStartDateForm[0]));

        $.ajax({
            url: `/school/empty/importantDates`,
            type: 'DELETE',
            data: {
                _id: instituteId
            }
        }).then(() => {
            dataArr.forEach(formData => {
                promiseArr.push(
                    $.ajax({
                        url: `/school/add/importantDates/${instituteId}`,
                        type: 'POST',
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                    })
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

    return {init};
})();