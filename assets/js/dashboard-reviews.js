const dashboardReviews = (() => {
    let $userReviews;
    let $deleteReviewButton;

    function cache() {
        $userReviews = $("#userReviews");
    }

    function cacheDynamic() {
        $deleteReviewButton = $(".delete-review-button");
    }

    function bindEvents() {
        $deleteReviewButton.click(e => deleteReview(e))
    }

    function getReviewsInfo(reviewInfoObj) {
        let url = `/${reviewInfoObj.category}`;
        return $.ajax({
            url,
            method: 'GET',
            data: {
                _id: reviewInfoObj.outerId
            }
            // demands: 'name reviews'
        });
    }

    function getUserReviewsHtml(user) {
        const reviewsOwned = user.reviewsOwned;
        const instituteInfoPromiseArr = [];
        const tuitionSchoolSequence = [];
        reviewsOwned.forEach(review => {
            tuitionSchoolSequence.push(review.category);
            instituteInfoPromiseArr.push(getReviewsInfo(review))
        });

        let cardsHtml = '';

        return new Promise((resolve, reject) => {
            Promise.all(instituteInfoPromiseArr)
                .then(instituteInfoArr => {
                    instituteInfoArr.forEach((info, index) => {
                            //first find which review belongs to current user
                            let reviewWeNeed = '';
                            info.reviews.forEach(review => {
                                if (review.owner == user._id) {
                                    reviewWeNeed = review;
                                }
                            });
                            let context = {
                                category: tuitionSchoolSequence[index],
                                tuitionId: info._id,
                                reviewId: reviewWeNeed._id,
                                userId: user._id,
                                name: info.name,
                                rating: reviewWeNeed.rating,
                                description: reviewWeNeed.description
                            };
                            cardsHtml += template.dashboardReviews(context);
                        }
                    );
                    resolve(cardsHtml);
                }).catch(err => reject(err));
        });
    }

    function deleteReview(event) {
        let tuitionId = $(event.target).attr('data-tuition-id');
        let userId = $(event.target).attr('data-user-id');
        let reviewId = $(event.target).attr('data-review-id');
        let category = $(event.target).attr('data-category');

        let updateTuitionPromise = $.ajax({
            url: `/${category}/delete/${tuitionId}/reviews`,
            type: 'DELETE',
            data: {
                owner: userId
            }
        });

        let updateUserPromise = $.ajax({
            url: '/user/delete/reviewsOwned/' + userId,
            method: 'DELETE',
            data: {
                outerId: tuitionId
            }
        });

        Promise.all([updateTuitionPromise, updateUserPromise]).then(() => {
            eagerRemoveCard(reviewId);
        }).catch(err => console.error(err))
    }

    function eagerRemoveCard(cardId) {
        //todo - cache properly
        $('#' + cardId).remove()
    }

    function render(user) {
        if (user) {
            getUserReviewsHtml(user).then(cardsHtml => {
                $userReviews.append(cardsHtml);
                cacheDynamic();
                bindEvents();
            });
        }
    }

    function init(user) {
        cache();
        render(user);
    }

    return {init};
})();