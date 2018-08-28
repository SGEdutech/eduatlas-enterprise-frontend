const galleryTab = (() => {
    let $form;
    let $saveAndExitButton;

    function cache() {
        $form = $('#galleryForm');
        $saveAndExitButton = $('#saveNExit')
    }

    function bindEvents(typeOfInfo, instituteId) {
        $saveAndExitButton.click(() => addGallery(typeOfInfo,instituteId));
    }

    function addGallery(typeOfInfo, instituteId) {
        /*const formData = new FormData($form[0]);
        // data is in Form
        // form id is newFaculty
        // get the data and send it in post request
        const promise = $.ajax({
            url: `/${typeOfInfo}/add/gallery/${instituteId}`,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        });

        promise.then((data) => {
            // alert("Gallery added successfully")
            window.location.assign('User-dashboard.html');
        }).catch((err) => {
            console.error(err);
            alert("Gallery addition failed")
        })*/

        window.location.assign('User-dashboard.html');
    }

    function init(typeOfInfo, instituteInfo) {
        cache();
        bindEvents(typeOfInfo, instituteInfo._id);
    }

    return {init};
})();