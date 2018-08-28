const reportModal = (() => {
    let tuitionId;
    let userInfo;
    let $reportModalContainer;
    let $reportModal;
    let $reportSubmitButton;
    let $form;
    let $tuitionIdInput;

    function cacheDom() {
        $reportModalContainer = $('#report_modal_container');
        $reportSubmitButton = $('#reportButton');
    }

    function cacheDynamicDom() {
        $reportModal = $('#reportModal');
        $form = $('#issueForm');
        $tuitionIdInput = $('#idOfTuition');
    }

    function getHtml() {
        const url = 'report-modal.html';
        const dataType = 'html';
        return $.get({url, dataType}); // Returns Promise
    }

    function updateUserInfo(info) {
        userInfo = info;
    }

    function updateTuitionInfo(info) {
        tuitionId = info._id;
    }

    function updateHiddenInputs() {
        $tuitionIdInput.val(tuitionId);
    }

    function submitForm(event) {
        event.preventDefault();
        let formData = $form.serialize();
        $.post({
            url: $form.attr('action'),
            data: formData,
        }).then(data => {
            $reportModal.modal('hide');
            alert('Issue submitted successful. ISSUE ID =' + data._id)
        }).catch(err => console.error(err));
    }

    function bindEvents() {
        $form.submit(submitForm);
    }

    function render() {
        return new Promise((resolve, reject) => {
            getHtml().then(html => {
                $reportModalContainer.html(html);
                resolve();
            }).catch(err => reject(err));
        })
    }

    function init() {
        cacheDom();
        render().then(() => {
            cacheDynamicDom();
            bindEvents();
            updateHiddenInputs();
        });
    }

    return {init, updateUserInfo, updateTuitionInfo};
})();