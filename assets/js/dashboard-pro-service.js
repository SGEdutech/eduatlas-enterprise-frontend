PubSub.subscribe('user', (msg, userInfo) => {
	navigationBar.render(userInfo);
	redirectOnLogout.init(userInfo);
});

async function initModules() {
	try {
		const promiseArr = [];
		promiseArr.push(tuitionApiCalls.getClaimedCourses());
		promiseArr.push(tuitionApiCalls.getClaimedBatches());
		promiseArr.push(tuitionApiCalls.getClaimedStudents());
		promiseArr.push(tuitionApiCalls.getAllClaimedTuitions());
		promiseArr.push(schoolApiCalls.getAllClaimedSchools());
		promiseArr.push(eventApiCalls.getAllClaimedEvents());
		promiseArr.push(tuitionApiCalls.getAllClaimedForums());
		promiseArr.push(user.getInfo());

		const [claimedCourses, claimedBatches, claimedStudents, claimedInstitute, claimedSchools, claimedEvents, claimedForums, userInfo] =
		await Promise.all(promiseArr);

		instituteInfo.init(claimedInstitute);
		course.init(claimedCourses);
		batch.init(claimedBatches, claimedCourses, claimedStudents);
		student.init(claimedStudents, claimedCourses, claimedBatches);
		schedule.init(claimedBatches);
		attendance.init(claimedBatches, claimedStudents);
		forum.init(claimedForums);
		announcement.init(claimedBatches, claimedStudents);
		redirectTabs.init(queryString.loadQueryString());

		userImgAndName.init(userInfo);
		modal.init();
		navigationBar.init(userInfo, { colorOnScroll: false });
		userClaimed.init(claimedInstitute, claimedSchools, claimedEvents);
		userNotification.init();
		dashboardEditProfile.init(userInfo);
		dashboardAddTuition.init(userInfo);
		dashboardAddSchool.init(userInfo);
		dashboardAddEvent.init(userInfo);

		triggerPills.init();
	} catch (err) {
		console.error(err);
	}
}

initModules();

setTimeout(loginModal.init());
// setTimeout(promoterModal.init());