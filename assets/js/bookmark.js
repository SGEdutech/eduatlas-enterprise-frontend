const bookmark = (() => {
    let userInfo;
    let $loginModal;
    let $bookmarkButtons;

    function bindEvents() {
        $bookmarkButtons.click(bookmarkTuition)
    }

    function cacheDynamicDom() {
        $loginModal = $('#loginModal');
        $bookmarkButtons = $('.bookmark-button')
    }

    function updateUserInfo(info) {
        userInfo = info;
    }

    function bookmarkTuition() {
        if (!userInfo) {
            $loginModal.modal('show');
        } else {
            $(this).html('bookmark');
            let tuitionId = $(this).attr('data-id');
            $.ajax({
                url: '/user/add/bookmarkTuitions/' + userInfo._id,
                method: 'POST',
                data: {
                    string: tuitionId
                }
            }).then(data => {
                alert('bookmarked successfully')
            })

        }
    }

    function init() {
        cacheDynamicDom();
        bindEvents();
    }

    return {init, updateUserInfo};
})();