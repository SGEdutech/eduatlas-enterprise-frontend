try {
	PubSub.subscribe('user', (msg, userInfo) => {
		navigationBar.render(userInfo);
		redirectOnLogout.init(userInfo);
	});

	const queryObject = queryString.loadQueryString();

	getDetails.returnData('tuition', queryObject).then((tuitionInfo) => {
		redirectTabs.init(queryObject);
		// coverImage.init('tuition', tuitionInfo);
		basicDetails.init('tuition', tuitionInfo);
		facilitiesDescriptionCategory.init('tuition', tuitionInfo);
		contactUs.init('tuition', tuitionInfo);
		courses.init(tuitionInfo);
		results.init('tuition', tuitionInfo);
		faculty.init('tuition', tuitionInfo);
		galleryTab.init('tuition', tuitionInfo);
	});

	tuitionApiCalls.getAllClaimedTuitions().then(claimedInstitute => {
		instituteInfo.init(claimedInstitute, true);
	})

	user.getInfo().then(userInfo => {
		navigationBar.init(userInfo);
		userImgAndName.init(userInfo);
	});
} catch (error) {
	console.error(error);
}