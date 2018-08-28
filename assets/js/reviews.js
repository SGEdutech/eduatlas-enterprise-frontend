const reviews = (() => {
    let userInfo;
    let instituteId;
    let $reviewOwnerInput;
    let $reviewRatingInput;
    let $reviewDescriptionInput;
    let $loginModal;
    let $s1, $s2, $s3, $s4, $s5;
    let $submitReviewButton;
    let $reviewDiv;
    let $reviewForm;
    let $savedReviews;

    function cacheDom() {
        $s1 = $('#s1');
        $s2 = $('#s2');
        $s3 = $('#s3');
        $s4 = $('#s4');
        $s5 = $('#s5');
        $submitReviewButton = $('#submitReviewButton');
        $reviewOwnerInput = $('#reviewOwnerInput');
        $reviewRatingInput = $('#reviewRatingInput');
        $reviewDescriptionInput = $('#reviewDescriptionInput');
        $reviewDiv = $('#reviewCardbody');
        $reviewForm = $('#reviewForm');
        $savedReviews = $("#savedReviews");
    }

    function bindEvents(typeOfInfo) {
        $submitReviewButton.click(() => submitReview(typeOfInfo));
        $s1.click(() => changeColor(1));
        $s2.click(() => changeColor(2));
        $s3.click(() => changeColor(3));
        $s4.click(() => changeColor(4));
        $s5.click(() => changeColor(5));
    }

    function cacheDynamicDom() {
        $loginModal = $('#loginModal');
    }

    function updateInstituteInfo(info) {
        instituteId = info._id;
    }

    function updateUserInfo(info) {
        userInfo = info;
        updateReviewDiv();
    }

    function updateReviewDiv() {
        if (userInfo === undefined || userInfo === '') {
            $reviewDiv.click(() => {
                $loginModal.modal('show')
            })
        } else {
            // user logged in
            $reviewDiv.off('click')
        }
    }

    function changeColor(rating) {
        $('#reviewRatingInput').val(rating);
        let array = [$s1, $s2, $s3, $s4, $s5];
        array.forEach(btn => {
            btn.css('color', 'black')
        });
        for (let i = 0; i < rating; i++) {
            array[i].css('color', '#00bcd4')
        }
    }

    function submitReview(typeOfInfo) {
        if ($reviewRatingInput.val() === '' || $reviewRatingInput.val() === undefined) {
            alert('please give some rating by clicking on stars')
        } else {
            //check if a review already there
            let reviewAlredythere = false;
            userInfo.reviewsOwned.forEach(obj => {
                if (obj.category == typeOfInfo && obj.outerId == instituteId) {
                    reviewAlredythere = true;
                }
            });
            if (reviewAlredythere) {
                //do nothing
                alert('you have already submitted a review')
            } else {
                // submit review then update user
                $reviewOwnerInput.val(userInfo._id);

                let reviewToShow = {
                    rating: $('#reviewRatingInput').val(),
                    description: $('#reviewDescriptionInput').val()
                };

                $.ajax({
                    url: `/${typeOfInfo}/add/reviews/${instituteId}`,
                    method: 'POST',
                    data: $reviewForm.serialize()
                }).then((institute) => {
                    let addedReviewID = '';
                    institute.reviews.forEach(obj => {
                        if (obj.owner == userInfo._id) {
                            addedReviewID = obj._id;
                        }
                    });
                    // update user now
                    $.ajax({
                        url: '/user/add/reviewsOwned/' + userInfo._id,
                        method: 'POST',
                        data: {
                            category: typeOfInfo,
                            outerId: institute._id,
                            innerId: addedReviewID
                        }
                    }).then(updatedUser => {
                        let HTML = template.tuitionReviews(reviewToShow);
                        $savedReviews.append(HTML);
                        $reviewForm[0].reset();
                        alert('review added success')
                    })
                }).catch(err => console.error(err))
            }

        }
    }

    function init(typeOfInfo) {
        cacheDom();
        cacheDynamicDom();
        bindEvents(typeOfInfo);
        updateReviewDiv();
    }

    return {init, updateUserInfo, updateInstituteInfo};
})();