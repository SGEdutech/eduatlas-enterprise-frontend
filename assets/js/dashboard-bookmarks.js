const dashboardBookmarks = (() => {
    let $userTuitionBookmarks;
    let $userSchoolBookmarks;

    function cache() {
        $userTuitionBookmarks = $("#userTuitionBookmarks");
        $userSchoolBookmarks = $("#userSchoolBookmarks");
    }

    function cacheDynamic() {
        $removeBookmarkButtons = $('.remove-bookmark-button');
    }

    function bindEvents(userInfo) {
        $removeBookmarkButtons.click(e => removeBookmarks(e, userInfo))
    }

    function getTuitionsInfo(typeOfInfo, instituteId) {
        let url = `/${typeOfInfo}`;
        return $.ajax({
            url,
            method: 'GET',
            data: {
                _id: instituteId
            }
            // demands: 'name addressLine1 addressLine2 city state primaryNumber email category reviews'
        });
    }

    function getUserBookmarksHtml(typeOfInfo, ids) {
        const instituteInfoPromiseArr = [];
        ids.forEach(instituteId => instituteInfoPromiseArr.push(getTuitionsInfo(typeOfInfo, instituteId)));

        let cardsHtml = '';

        return new Promise((resolve, reject) => {
            Promise.all(instituteInfoPromiseArr)
                .then(instituteInfoArr => {
                    instituteInfoArr.forEach(instituteInfo => {
                            const averageRating = helperScripts.calcAverageRating(instituteInfo.reviews);
                            instituteInfo.averageRating = averageRating === -1 ? 2.5 : averageRating;
                            instituteInfo.col4 = true;
                            instituteInfo.hideFooter = true;
                            instituteInfo.manageBookmarks = true;
                            instituteInfo.typeOfInfo = typeOfInfo;
                            cardsHtml += template.smoothCardHomePage(instituteInfo);
                        }
                    );
                    resolve(cardsHtml);
                }).catch(err => reject(err));
        });
    }

    function removeBookmarks(event, userInfo) {
        let tuitionId = $(event.target).attr('data-id');
        let typeOfInfo = $(event.target).attr('data-category');
        // make first character UpperCase
        typeOfInfo = typeOfInfo.charAt(0).toUpperCase() + typeOfInfo.substr(1);
        $.ajax({
            url: `/user/delete/bookmark${typeOfInfo}s/${userInfo._id}`,
            method: 'DELETE',
            data: {
                string: tuitionId
            }
        }).then(data => {
            eagerRemoveCard(tuitionId);
        })
    }

    function eagerRemoveCard(cardId) {
        //todo - cache properly
        $('#' + cardId).remove()
    }

    function render(user) {
        if (user.bookmarkTuitions) {
            getUserBookmarksHtml('tuition', user.bookmarkTuitions).then(cardsHtml => {
                $userTuitionBookmarks.append(cardsHtml);
                cacheDynamic();
                bindEvents(user);
            });
        }
        if (user.bookmarkSchools) {
            getUserBookmarksHtml('school', user.bookmarkSchools).then(cardsHtml => {
                $userSchoolBookmarks.append(cardsHtml);
                cacheDynamic();
                bindEvents(user);
            });
        }
    }

    function init(user) {
        cache();
        render(user);
    }

    return {init};
})();