PubSub.subscribe('user', (msg, userInfo) => {
    navigationBar.render(userInfo);
    redirectOnLogout.init(userInfo);
});

PubSub.subscribeOnce('query.load', (msg, queryObject) => {
    redirectTabs.init(queryObject);
});

user.getInfo().then(userInfo => {
    navigationBar.init(userInfo, {
        colorOnScroll: true
    });
    userImgAndName.init(userInfo);
    userClaimed.init(userInfo);
    dashboardBookmarks.init(userInfo);
    dashboardReviews.init(userInfo);
    dashboardEditProfile.init(userInfo);
    dashboardAddTuition.init(userInfo);
    dashboardAddSchool.init(userInfo);
    dashboardAddEvent.init(userInfo);
});

dashboardHideSubMenu.init();
queryString.loadQueryString();