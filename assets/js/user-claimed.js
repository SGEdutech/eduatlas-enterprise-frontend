const userClaimed = (() => {
    let $claimedTuitionContainer;
    let $claimedSchoolContainer;
    let $claimedEventContainer;
    let $unclaimButons;

    function cache() {
        $claimedTuitionContainer = $('#userOwnedTuitionContainer');
        $claimedSchoolContainer = $('#userOwnedSchoolContainer');
        $claimedEventContainer = $('#userOwnedEventContainer');
    }

    function cacheDynamic() {
        $unclaimButons = $('.unclaim-button');
    }

    function bindEvents(userInfo) {
        $unclaimButons.click((event) => unclaimListing(event, userInfo))
    }

    function unclaimListing(event, userInfo) {
        let tuitionId = $(event.target).attr('data-id');
        let typeOfInfo = $(event.target).attr('data-category');
        //now update tuition by removing claimedBy
        
        let updateTuitionPromise = $.ajax({
            url: `/${typeOfInfo}/empty/claimedBy`,
            type: 'DELETE',
            data: {_id: tuitionId}
        });

        //now update user by deleting id of tuition/school from tuitionsOwned/schoolsOwned array
        //todo - we need to delete from array
        let updateUserPromise = $.ajax({
            url: `/user/delete/${typeOfInfo}sOwned/${userInfo._id}`,
            type: 'DELETE',
            data: {string: tuitionId}
        });

        Promise.all([updateTuitionPromise, updateUserPromise]).then(() => window.location.assign('User-dashboard.html')).catch(err => console.error(err))
    }

    function getTuitionsInfo(typeOfInfo, tuitionId) {
        let url = `/${typeOfInfo}`;
        // demands = `name addressLine1 addressLine2 city state primaryNumber email
        // category description claimedBy dayAndTimeOfOperation reviews`,

        return $.get({
            url,
            data: {_id: tuitionId}
        });
    }

    function getInstituteCardHtml(typeOfInfo, instituteIdArr, $container) {
        if (instituteIdArr.length === 0) {
            $container.append(`<div class="card-title col-12">
                                                 Claim or List your institute if you own one
                                           </div>`)
        } else {
            $container.append(`<div class="card-title col-12">
                                                 Manage Your ${typeOfInfo}
                                           </div>`)
        }
        const instituteInfoPromiseArr = [];
        instituteIdArr.forEach(instituteId => instituteInfoPromiseArr.push(getTuitionsInfo(typeOfInfo, instituteId)));

        let cardsHtml = '';

        return new Promise((resolve, reject) => {
            Promise.all(instituteInfoPromiseArr)
                .then(tuitionInfoArr => {
                    tuitionInfoArr.forEach(tuitionInfo => {
                            const averageRating = helperScripts.calcAverageRating(tuitionInfo.reviews);
                            tuitionInfo.averageRating = averageRating === -1 ? 2.5 : averageRating;
                            tuitionInfo.col4 = true;
                            tuitionInfo.manageClaimed = true;
                            tuitionInfo.hideFooter = true;
                            tuitionInfo.typeOfInfo = typeOfInfo;
                            cardsHtml += template.smoothCardHomePage(tuitionInfo);
                        }
                    );
                    resolve(cardsHtml);
                }).catch(err => reject(err));
        })
    }

    function render(userInfo) {
        getInstituteCardHtml('tuition', userInfo.tuitionsOwned, $claimedTuitionContainer).then(cardsHtml => {
            $claimedTuitionContainer.append(cardsHtml);
            cacheDynamic();
            bindEvents(userInfo);
        });
        getInstituteCardHtml('school', userInfo.schoolsOwned, $claimedSchoolContainer).then(cardsHtml => {
            $claimedSchoolContainer.append(cardsHtml);
            cacheDynamic();
            bindEvents(userInfo);
        });
        getInstituteCardHtml('event', userInfo.eventsOwned, $claimedEventContainer).then(cardsHtml => {
            $claimedEventContainer.append(cardsHtml);
            cacheDynamic();
            bindEvents(userInfo);
        })
    }

    function init(userInfo) {
        cache();
        render(userInfo);
    }

    return {init};
})();