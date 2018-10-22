const userImgAndName = (() => {
    let $profilePic;
    let $userNameContainer;
    function cache() {
        $profilePic = $('#profile_pic');
        $userNameContainer = $('#userIdContainer');
    }

    function render(user) {
        // handle google pic
        if (user.img_userProfilePic) {
            $profilePic.attr('src', `images/${user.img_userProfilePic}`);
        } else {
            $profilePic.attr('src', 'assets/img/logo.png');
        }

        if (user.firstName) {
            $userNameContainer.html(user.firstName);
        } else {
            $userNameContainer.html('Unknown unicorn');
        }
    }

    function init(user) {
        cache();
        render(user);
    }

    return {init};
})();