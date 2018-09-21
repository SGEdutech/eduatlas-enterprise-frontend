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
        return eventApiCalls.putNewEvent(formData, true)
    }

    function updateUser(user, eventSavedPromise) {
        // console.log('event saved');
        eventSavedPromise.then((data) => {
            const eventIdCreated = data._id;
            const userUpdatedPromise = userApiCalls.putInArrayInUser(user._id, "claims", {
                listingCategory: "event",
                listingId: data._id
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