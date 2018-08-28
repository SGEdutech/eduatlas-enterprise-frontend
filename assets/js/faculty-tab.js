const faculty = (() => {
    let $facultyContainer;
    let $newFacultyForm;
    let $addNewFacultyButton;
    let $galleryTabButton;
    let $galleryTab;
    let $newFacultyModal;
    let $deleteButtons;

    function cache() {
        $facultyContainer = $("#facultyContainer");
        $newFacultyForm = $('#newFaculty');
        $addNewFacultyButton = $('#add_new_faculty_button');
        $galleryTabButton = $('#next_Tab_Button3');
        $galleryTab = $(`[href = "#tab6"]`);
        $newFacultyModal = $('#new_faculty_modal');
    }

    function cacheDynamic() {
        $deleteButtons = $('.delete-faculty-button');
    }

    function render(institute) {
        let html = getHtml(institute);
        $facultyContainer.append(html);
    }

    function bindEvents(typeOfInfo, tuitionId) {
        $addNewFacultyButton.click(() => addFaculty(typeOfInfo, tuitionId));
        $galleryTabButton.click(() => helperScripts.showNextTab($galleryTab));
        $deleteButtons.click(function () {
            deleteFaculty(typeOfInfo, this, tuitionId)
        });
    }

    function cacheNBindDeleteButtons(instituteId) {
        cacheDynamic();
        $deleteButtons.click(function () {
            deleteFaculty(this, instituteId)
        });
    }

    function deleteFaculty(typeOfInfo, element, tuitionId) {
        const $element = $(element);
        let name = $element.attr('data-name');
        let cardId = $element.attr('data-faculty-id');
        eagerRemoveCard(cardId);

        $.ajax({
            url: `/${typeOfInfo}/delete/${tuitionId}/team`,
            type: 'DELETE',
            data: {
                name: name
            }
        }).then((data) => {
            // alert("faculty deleted successfully")
        }).catch((err) => {
            console.log(err);
            alert("faculty deletion failed")
        });
    }

    function eagerRemoveCard(cardId) {
        console.log(cardId);
        //todo - cache properly
        $('#' + cardId).remove()
    }

    function eagerLoadFaculty(serializedForm) {
        $newFacultyModal.modal('hide');
        let contextInner = {};
        serializedForm.forEach(obj => contextInner[obj.name] = obj.value);
        //give _id to contextInner
        contextInner._id = Math.floor(Math.random() * (50000 - 100) + 100);

        let contextOuter = {
            faculty: [contextInner]
        };
        $facultyContainer.append(template.userEditTuitionFaculty(contextOuter));
    }

    function addFaculty(typeOfInfo, instituteId) {
        const form = $newFacultyForm;
        eagerLoadFaculty(form.serializeArray());

        const formData = new FormData(form[0]);
        // get the data and send it in post request
        const promise = $.ajax({
            url: `/${typeOfInfo}/add/team/${instituteId}`,
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
            alert("faculty addition failed")
        })
    }

    function getHtml(institute) {
        if (!institute) {
            return
        }
        let context = {
            faculty: institute.team ? institute.team : []
        };

        let counter = 1;
        context.faculty.forEach((obj) => {
            obj.id = counter;
            counter++;
        });

        return template.userEditTuitionFaculty(context);
    }

    function init(typeOfInfo, institute) {
        cache();
        render(institute);
        cacheDynamic();
        bindEvents(typeOfInfo, institute._id);
    }

    return {init};
})();