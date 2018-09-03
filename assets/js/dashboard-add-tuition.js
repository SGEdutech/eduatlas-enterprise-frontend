const dashboardAddTuition = (() => {
    let $addTuitionForm;
    let $claimedByInput;

    function cache() {
        $addTuitionForm = $('#addTuition');
        $claimedByInput = $('#claimedByInput');
    }

    function bindEvents(user) {
        $addTuitionForm.submit(e => {
            e.preventDefault();

            // todo - this thing below won't protect our server from user-less entries
            // todo - apply a check at server side and prevent this
            let tuitionSavedPromise = submitTuition(user);
            updateUser(user, tuitionSavedPromise);
        });
    }

    function submitTuition(user) {
        $claimedByInput.val(user._id);
        const formData = new FormData($addTuitionForm[0]);
        return $.ajax({
            type: $addTuitionForm.attr('method'),
            url: $addTuitionForm.attr('action'),
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
        })
    }

    function updateUser(user, tuitionSavedPromise) {
        // console.log('tuition saved');
        tuitionSavedPromise.then((data) => {
            // console.log(userData);
            const tuitionIdCreated = data._id;
            const userUpdatedPromise = $.ajax({
                // todo - need to fix
                url: '/user/add/tuitionsOwned/' + user._id,
                method: 'POST',
                data: {
                    string: data._id
                }
            });

            redirectToEditTuition(userUpdatedPromise, tuitionIdCreated);

        }).catch(err => {
            console.log(err);
        });
    }

    function redirectToEditTuition(userUpdatedPromise, tuitionId) {
        userUpdatedPromise.then((data) => {
            // console.log('user updated');
            // console.log(data);
            window.location.assign('./user-edit-tuition.html?a=' + tuitionId)
        }).catch(err => {
            console.log(err);
        });
    }

    function init(user) {
        cache();
        bindEvents(user);
    }

    return {init};
})();