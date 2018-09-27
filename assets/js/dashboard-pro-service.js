PubSub.subscribe('user', (msg, userInfo) => {
    navigationBar.render(userInfo);
    redirectOnLogout.init(userInfo);
});

PubSub.subscribe('instituteTabs.load', (msg) => {
    instituteCourses.init();
    instituteBatches.init();
    instituteStudents.init();
    refreshSelectInput.init();
});

PubSub.subscribeOnce('query.load', (msg, queryObject) => {
    redirectTabs.init(queryObject);
});

user.getInfo().then(userInfo => {
    navigationBar.init(userInfo, {
        colorOnScroll: false
    });
    userClaimed.init(userInfo);
    instituteInfo.init(userInfo);
    dashboardEditProfile.init(userInfo);
    dashboardAddTuition.init(userInfo);
    dashboardAddSchool.init(userInfo);
    dashboardAddEvent.init(userInfo);
});

setTimeout(loginModal.init());
setTimeout(promoterModal.init());