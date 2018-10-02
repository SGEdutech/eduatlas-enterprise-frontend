PubSub.subscribe('user', (msg, userInfo) => {
	navigationBar.render(userInfo);
	redirectOnLogout.init(userInfo);
});

PubSub.subscribe('instituteTabs.load', (msg) => {
	setTimeout(instituteCourses.init());
	setTimeout(instituteBatches.init());
	setTimeout(instituteStudents.init());
	setTimeout(instituteAnnouncement.init());
	setTimeout(instituteForum.init());
	setTimeout(instituteSchedules.init());
	// TODO: check if this working properly after adding setTimeOut to above 3 module calls
	setTimeout(refreshSelectInput.init());
});

PubSub.subscribe('newCourse.load', (msg, courseObj) => {
	setTimeout(instituteBatches.addNewCourse(courseObj));
});

PubSub.subscribe('refreshCourseSelect', (msg) => {
	setTimeout(refreshSelectInput.init());
});

PubSub.subscribeOnce('query.load', (msg, queryObject) => {
	redirectTabs.init(queryObject);
});

user.getInfo().then(userInfo => {
	navigationBar.init(userInfo, {
		colorOnScroll: false
	});
	userClaimed.init(userInfo);
	userNotification.init();
	instituteInfo.init(userInfo);
	dashboardEditProfile.init(userInfo);
	dashboardAddTuition.init(userInfo);
	dashboardAddSchool.init(userInfo);
	dashboardAddEvent.init(userInfo);
});

setTimeout(loginModal.init());
setTimeout(promoterModal.init());