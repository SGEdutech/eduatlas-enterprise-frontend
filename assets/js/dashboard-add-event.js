const dashboardAddEvent = (() => {
    let $addEventForm;
    let $ownerUserIdInput;

    function cache() {
        $addEventForm = $('#addEvent');
        $ownerUserIdInput = $('#event_owner_id_input');
    }

    function bindEvents(user) {
        $addEventForm.submit(e => {
            e.preventDefault();
            let eventSavedPromise = submitEvent(user);
            updateUser(user, eventSavedPromise);
        });
    }

    function submitEvent(user) {
        console.log(user);
        console.log($ownerUserIdInput);
        $ownerUserIdInput.val(user._id);
        const formData = new FormData($addEventForm[0]);
        return $.ajax({
            type: $addEventForm.attr('method'),
            url: $addEventForm.attr('action'),
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
        })
    }

    function updateUser(user, eventSavedPromise) {
        // console.log('tuition saved');
        eventSavedPromise.then((data) => {
            const eventIdCreated = data._id;
            const userUpdatedPromise = $.ajax({
                url: '/user/add/claims/' + user._id,
                method: 'POST',
                data: {
                    category: "event",
                    objectId: data._id
                }
            });
            redirectToDashboard(userUpdatedPromise);
        }).catch(err => {
            console.log(err);
        });
    }

    function redirectToDashboard(userUpdatedPromise) {
        userUpdatedPromise.then((data) => {
            window.location.assign('./Dashboard-Pro.html')
        }).catch(err => {
            console.log(err);
        });
    }

    function init(user) {
        cache();
        bindEvents(user);
    }

    return {
        init
    };
})();