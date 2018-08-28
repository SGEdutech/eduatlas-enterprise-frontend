const claimModal = (() => {
    let userInfo;
    let $claimModalContainer;
    let $claimModal;
    let $claimConfirmButton;
    let $claimButton;
    let queryObj;

    function cacheDom() {
        $claimModalContainer = $('#claim_modal_container');
        $claimButton = $('#claimButton');
    }

    function cacheDynamicDom() {
        $claimModal = $('#claimModal');
        $claimConfirmButton = $("#claimConfirmButton");
    }

    function getHtml() {
        const url = 'claim-modal.html';
        const dataType = 'html';
        return $.get({url, dataType}); // Returns Promise
    }

    function updateUserInfo(info) {
        userInfo = info;
        updateClaimButtonModal(info);
    }

    function updateQueryObj(obj) {
        queryObj = obj;
    }

    function claimListing(typeOfInfo) {
        //now update tuition by adding claimedBy
        const updateTuitionPromise = $.ajax({
            url: `/${typeOfInfo}/${queryObj._id}`,
            type: 'PUT',
            data: {claimedBy: userInfo._id}
        });
        //now update user by inserting id of tuition to tuitionsOwned array
        const updateUserPromise = $.ajax({
            url: `/user/add/${typeOfInfo}sOwned/${userInfo._id}`,
            type: 'POST',
            data: {string: queryObj._id}
        });

        Promise.all([updateTuitionPromise, updateUserPromise]).then(() => {
            window.location.assign('User-dashboard.html')
        }).catch(err => console.error(err))
    }

    function updateClaimButtonModal(userInfo) {
        if (userInfo) {
            $claimButton.attr('data-toggle', 'modal');
            $claimButton.attr('data-target', '#claimModal');
        } else {
            $claimButton.attr('data-toggle', 'modal');
            $claimButton.attr('data-target', '#loginModal');
        }
    }

    function bindEvents(typeOfInfo) {
        $claimConfirmButton.click(() => claimListing(typeOfInfo));
    }

    function render() {
        return new Promise((resolve, reject) => {
            getHtml().then(html => {
                $claimModalContainer.html(html);
                resolve();
            }).catch(err => reject(err));
        })
    }

    function init(typeOfInfo) {
        cacheDom();
        render().then(() => {
            cacheDynamicDom();
            bindEvents(typeOfInfo)
        });
    }

    return {init, updateUserInfo, updateQueryObj};
})();