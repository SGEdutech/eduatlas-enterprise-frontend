const dashboardAddSchool = (() => {
    let $addSchoolForm;
    let $claimedByInput;

    function cache() {
        $addSchoolForm = $('#addSchool');
        $claimedByInput = $('#claimedByInputSchool');
    }

    function bindEvents(user) {
        $addSchoolForm.submit(e => {
            e.preventDefault();
            let tuitionSavedPromise = submitTuition(user);
            updateUser(user, tuitionSavedPromise);
        });
    }

    function submitTuition(user) {
        $claimedByInput.val(user._id);
        const formData = new FormData($addSchoolForm[0]);
        return schoolApiCalls.putNewSchool(formData, true)
    }

    function updateUser(user, tuitionSavedPromise) {
        tuitionSavedPromise.then((data) => {
            const schoolIdCreated = data._id;
            const userUpdatedPromise = userApiCalls.putInArrayInUser(user._id, "claims", {
                listingCategory: "school",
                listingId: data._id
            });
            redirectToEditTuition(userUpdatedPromise, schoolIdCreated);
        }).catch(err => {
            console.log(err);
        });
    }

    function redirectToEditTuition(userUpdatedPromise, schoolId) {
        userUpdatedPromise.then((data) => {
            window.location.assign('./user-edit-school.html?a=' + schoolId)
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