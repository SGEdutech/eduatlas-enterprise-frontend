const results = (() => {
    let $resultsContainer;
    let $newResultForm;
    let $addNewResultButton;
    let $facultyTabButton;
    let $facultyTab;
    let $newResultModal;
    let $deleteButtons;

    function cache() {
        $resultsContainer = $("#resultsContainer");
        $newResultForm = $('#newResult');
        $addNewResultButton = $('#add_new_result_button');
        $facultyTabButton = $('#next_Tab_Button2');
        $facultyTab = $(`[href = "#tab5"]`);
        $newResultModal = $('#new_result_modal');
    }

    function cacheDynamic() {
        $deleteButtons = $('.delete-result-button');
    }

    function render(typeOfInfo, institute) {
        let html = getHtml(typeOfInfo, institute);
        $resultsContainer.append(html);
    }

    function bindEvents(typeOfInfo, instituteId) {
        $addNewResultButton.click(() => addResult(typeOfInfo, instituteId));
        $facultyTabButton.click(() => helperScripts.showNextTab($facultyTab));
        $deleteButtons.click(function () {
            deleteResult(typeOfInfo, this, instituteId)
        });
    }

    function cacheNBindDeleteButtons(instituteId) {
        cacheDynamic();
        $deleteButtons.click(function () {
            deleteResult(this, instituteId)
        });
    }

    function deleteResult(typeOfInfo, element, instituteId) {
        const $element = $(element);
        let title = $element.attr('data-title');
        let cardId = $element.attr('data-result-id');
        console.log(title);
        console.log(cardId);

        eagerRemoveCard(cardId);

        $.ajax({
            url: `/${typeOfInfo}/delete/${instituteId}/bragging`,
            type: 'DELETE',
            data: {
                title: title
            }
        }).then(() => {
            // alert("result deleted successfully")
        }).catch((err) => {
            console.log(err);
            alert("result deletion failed")
        });
    }

    function eagerRemoveCard(cardId) {
        console.log(cardId);
        //todo - cache properly
        $('#' + cardId).remove()
    }

    function eagerLoadResult(serializedForm) {
        $newResultModal.modal('hide');
        let contextInner = {};
        serializedForm.forEach(obj => contextInner[obj.name] = obj.value);
        //give _id to contextInner
        contextInner._id = Math.floor(Math.random() * (50000 - 100) + 100);

        let contextOuter = {
            results: [contextInner]
        };
        $resultsContainer.append(template.userEditTuitionResults(contextOuter));
    }

    function addResult(typeOfInfo, instituteId) {
        const form = $newResultForm;
        eagerLoadResult(form.serializeArray());

        const formData = new FormData(form[0]);
        // get the data and send it in post request
        const promise = $.ajax({
            url: `/${typeOfInfo}/add/bragging/${instituteId}`,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        });

        promise.then((data) => {
            cacheNBindDeleteButtons(instituteId);
            // alert("result added successfully");
        }).catch((err) => {
            console.log(err);
            alert("result addition failed")
        })
    }

    function getHtml(typeOfInfo, institute) {
        if (!institute) {
            return
        }

        let context = {
            results: institute.bragging ? institute.bragging : []
        };

        let counter = 1;
        context.results.forEach((obj) => {
            obj.id = counter;
            counter++;
        });

        return template.userEditTuitionResults(context);
    }

    function init(typeOfInfo, institute) {
        cache();
        render(typeOfInfo, institute);
        cacheDynamic();
        bindEvents(typeOfInfo, institute._id);
    }

    return {init};
})();