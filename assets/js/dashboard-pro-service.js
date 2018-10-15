PubSub.subscribe('user', (msg, userInfo) => {
	navigationBar.render(userInfo);
	redirectOnLogout.init(userInfo);
});

PubSub.subscribeOnce('query', (msg, queryObj) => {
	redirectTabs.init(queryObj);
});

user.getInfo().then(userInfo => {
	modal.init();
	navigationBar.init(userInfo, { colorOnScroll: false });
	userClaimed.init(userInfo);
	userNotification.init();
	dashboardEditProfile.init(userInfo);
	dashboardAddTuition.init(userInfo);
	dashboardAddSchool.init(userInfo);
	dashboardAddEvent.init(userInfo);
}).catch(err => console.error(err));

async function initModules() {
	try {
		const promiseArr = [];
		promiseArr.push(tuitionApiCalls.getClaimedCourses());
		promiseArr.push(tuitionApiCalls.getClaimedBatches());
		promiseArr.push(tuitionApiCalls.getClaimedStudents());
		promiseArr.push(tuitionApiCalls.getAllClaimedTuitions());
		promiseArr.push(tuitionApiCalls.getAllClaimedForums());

		const [claimedCourses, claimedBatches, claimedStudents, claimedInstitute, claimedForums] =
		await Promise.all(promiseArr);

		instituteInfo.init(claimedInstitute);
		course.init(claimedCourses);
		batch.init(claimedBatches, claimedCourses, claimedStudents);
		student.init(claimedStudents, claimedCourses, claimedBatches);
		schedule.init(claimedBatches);
		attendance.init(claimedBatches, claimedStudents);
		forum.init(claimedForums);
		announcement.init(claimedBatches, claimedStudents);
	} catch (err) {
		console.error(err);
	}
}

initModules();

setTimeout(loginModal.init());
setTimeout(queryString.loadQueryString());
// setTimeout(promoterModal.init());
