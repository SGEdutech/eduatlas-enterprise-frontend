PubSub.subscribe('user', (msg, userInfo) => {
	navigationBar.render(userInfo);
	redirectOnLogout.init(userInfo);
});

PubSub.subscribe('instituteTabs.load', instituteInfo => {
	setTimeout(instituteCourses.init());
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
		promiseArr.push(tuitionApiCalls.getClaimedSchedules());
		promiseArr.push(tuitionApiCalls.getAllClaimedTuitions());

		const [claimedCourses, claimedBatches, claimedStudents, claimedSchedules, claimedInstitute] =
		await Promise.all(promiseArr);

		instituteInfo.init(claimedInstitute);
		course.init(claimedCourses);
		batch.init(claimedBatches, claimedCourses, claimedStudents);
		student.init(claimedStudents);
		schedule.init(claimedSchedules, claimedBatches);
	} catch (err) {
		console.error(err);
	}
}

initModules();

setTimeout(loginModal.init());
// setTimeout(promoterModal.init());
