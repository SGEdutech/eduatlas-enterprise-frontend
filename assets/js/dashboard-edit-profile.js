const dashboardEditProfile = (() => {
    let $profilePicContainer;
    let $basicContainer;
    let $userSocialLinksContainer;
    let $saveForm1, $saveForm2;
    let $Form1, $Form2;

    function cache() {
        $profilePicContainer = $('#profilePicContainer');
        $basicContainer = $("#basicContainer");
        $userSocialLinksContainer = $("#userSocialLinksContainer");
        $saveForm1 = $('#saveFrom1');
        $saveForm2 = $('#saveFrom2');
    }

    function cacheDynamicDom() {
        $Form1 = $('#Form1');
        $Form2 = $('#Form2');
    }

    function bindEvents(user) {
        $saveForm1.click(() => submitForm(user, 1));
        $saveForm2.click(() => submitForm(user, 2));
    }

    function submitForm(user, formNumber) {
        console.log(formNumber);
        let formToSubmit;
        if (formNumber === 1) {
            formToSubmit = $Form1;
        } else if (formNumber === 2) {
            formToSubmit = $Form2;
        }
        console.log(formToSubmit)
        const editUserPromise = $.ajax({
            url: '/user/' + user._id,
            type: 'PUT',
            data: formToSubmit.serialize()
        });

        editUserPromise.then(data => {
            console.log(data);
            alert("Saved SuccessFully")
        }).catch((err) => {
            console.log(err);
            alert("failed")
        })
    }

    function getProfileEditor(user) {
        let pic = '';
        if (user.img_userProfilePic === '' || user.img_userProfilePic === undefined) {
            pic = `<img src="/assets/img/logo.png" alt="...">`;
        } else {
            pic = `<img src="images/${user.img_userProfilePic}" alt="..." class="image profilePic rounded">`;
        }
        $profilePicContainer.html(pic);

        if (user.isMale) {
            //if user is male
            user.maleChecked = 'checked'
        } else {
            //if user is female
            user.femaleChecked = 'checked'
        }

        if (user.primaryRole == 'Student') {
            //if user is student
            user.studentChecked = 'checked'
        } else if (user.primaryRole == 'Parent') {
            //if user is parent
            user.parentChecked = 'checked'
        } else {
            //if user is a institute
            user.instituteChecked = 'checked'
        }

        let result1 = template.userProfileInput(user);
        $basicContainer.append(result1);

        let contextSocial = {
            fbLink: "",
            twitterLink: "",
            youtubeLink: "",
            instaLink: "",
            linkedinLink: "",
        };

        contextSocial.fbLink = user.fbLink;
        contextSocial.twitterLink = user.twitterLink;
        contextSocial.youtubeLink = user.youtubeLink;
        contextSocial.instaLink = user.instaLink;
        contextSocial.linkedinLink = user.linkedinLink;

        let result2 = template.userSocialInput(contextSocial);
        $userSocialLinksContainer.append(result2);
    }

    function render(user) {
        getProfileEditor(user);
    }

    function init(user) {
        cache();
        render(user);
        cacheDynamicDom();
        bindEvents(user);
    }

    return {init};
})();