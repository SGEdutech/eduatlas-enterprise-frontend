PubSub.subscribe('user', (msg, userInfo) => {
	navigationBar.render(userInfo);
	if (userInfo === undefined || userInfo === '') {
		window.location.assign('https://eduatlas.com');
	} else {
		window.location.reload();
	}
});

Handlebars.registerHelper('inc', (value, options) => {
	return parseInt(value, 10) + 1;
});

Handlebars.registerHelper('ifEquals', (arg1, arg2, options) => {
	return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

user.getInfo().then(userInfo => {
	navigationBar.init(userInfo, {
		colorOnScroll: false,
		activeElementId: 'home_nav'
	});
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
		promiseArr.push(tuitionApiCalls.getAllClaimedDiscounts());
		promiseArr.push(notificationApiCalls.getClaimedNotifications());
		promiseArr.push(tuitionApiCalls.getAllClaimedResourses());
		promiseArr.push(tuitionApiCalls.getAllClaimedLeads());
		promiseArr.push(user.getInfo());

		const [claimedCourses, claimedBatches, claimedStudents, claimedInstitute, claimedSchools, claimedEvents, claimedForums, claimedDiscounts, claimedNotifications, claimedResourses, claimedLeads, userInfo] =
		await Promise.all(promiseArr);

		instituteInfo.init(claimedInstitute);
		course.init(claimedCourses);
		batch.init(claimedBatches, claimedCourses, claimedStudents);
		student.init(claimedStudents, claimedCourses, claimedBatches, claimedDiscounts, claimedInstitute);
		schedule.init(claimedBatches, claimedStudents);
		attendance.init(claimedBatches, claimedStudents);
		forum.init(claimedForums);
		announcement.init(claimedNotifications, claimedBatches, claimedStudents);
		redirectTabs.init(queryString.loadQueryString());
		discounts.init(claimedDiscounts);
		finance.init(claimedStudents, claimedCourses, claimedBatches, claimedDiscounts);
		resourses.init(claimedResourses, claimedBatches, claimedStudents);
		recieptConfig.init(claimedInstitute);
		leads.init(claimedLeads, claimedCourses);

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
		notification.init();
	} catch (err) {
		console.error(err);
	}
}



initModules();
setTimeout(loginModal.init());

// setTimeout(promoterModal.init());
