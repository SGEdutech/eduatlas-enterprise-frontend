const dashboardAddEvent = (() => {
    let $addEventForm;

    function cache() {
        $addEventForm = $('#addEvent');
    }

    function bindEvents(user) {
        $addEventForm.submit(e => {
            e.preventDefault();
            let eventSavedPromise = submitEvent(user);
            updateUser(user, eventSavedPromise);
        });
    }

    function submitEvent(user) {
        const formData = new FormData($addEventForm[0]);
        return eventApiCalls.putNewEvent(formData, true);
    }

    function updateUser(user, eventSavedPromise) {
        eventSavedPromise.then((data) => {
            const eventIdCreated = data._id;
            const userUpdatedPromise = userApiCalls.addClaim("event", eventIdCreated);
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