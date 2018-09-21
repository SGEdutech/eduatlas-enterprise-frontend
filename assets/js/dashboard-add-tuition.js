const dashboardAddTuition = (() => {
    let $addTuitionForm;
    let $claimedByInput;

    function cache() {
        $addTuitionForm = $('#addTuition');
        $claimedByInput = $('#claimedByInput');
    }

    function bindEvents(user) {
        $addTuitionForm.submit(function (e) {
            e.preventDefault();
            let tuitionSavedPromise = submitTuition(user);
            updateUser(user, tuitionSavedPromise);
        });
    }

    function submitTuition(user) {
        $claimedByInput.val(user._id);
        const formData = new FormData($addTuitionForm[0]);
        // console.log(formData);
        return tuitionApiCalls.putNewTuition(formData, true)
    }

    function updateUser(user, tuitionSavedPromise) {
        // console.log('tuition saved');
        tuitionSavedPromise.then((data) => {
            const tuitionIdCreated = data._id;
            const userUpdatedPromise = userApiCalls.putInArrayInUser(user._id, "claims", {
                listingCategory: "tuition",
                listingId: data._id
            });

            redirectToEditTuition(userUpdatedPromise, tuitionIdCreated);
        }).catch(err => {
            console.log(err);
        });
    }

    function redirectToEditTuition(userUpdatedPromise, tuitionId) {
        userUpdatedPromise.then((data) => {
            // console.log('user updated');
            window.location.assign('./user-edit-tuition.html?a=' + tuitionId)
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