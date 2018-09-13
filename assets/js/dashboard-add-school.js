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
        return $.ajax({
            type: $addSchoolForm.attr('method'),
            url: $addSchoolForm.attr('action'),
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
        })
    }

    function updateUser(user, tuitionSavedPromise) {
        tuitionSavedPromise.then((data) => {
            const schoolIdCreated = data._id;
            const userUpdatedPromise = $.ajax({
                url: '/user/add/claims/' + user._id,
                method: 'POST',
                data: {
                    category: "school",
                    objectId: data._id
                }
            });
            redirectToEditTuition(userUpdatedPromise, schoolIdCreated);

        }).catch(err => {
            console.log(err);
        });
    }

    function redirectToEditTuition(userUpdatedPromise, schoolId) {
        userUpdatedPromise.then((data) => {
            window.location.assign('./User-editSchool.html?a=' + schoolId)
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