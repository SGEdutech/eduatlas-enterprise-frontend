try {
	PubSub.subscribe('user', (msg, userInfo) => {
		navigationBar.render(userInfo);
		redirectOnLogout.init(userInfo);
	});

	PubSub.subscribeOnce('query', (msg, queryObject) => {
		getDetails.returnData('tuition', queryObject).then((tuitionInfo) => {
            redirectTabs.init(queryObject);
			// coverImage.init('tuition', tuitionInfo);
			basicDetails.init('tuition', tuitionInfo);
			facilitiesDescriptionCategory.init('tuition', tuitionInfo);
			contactUs.init('tuition', tuitionInfo);
			// courses.init(tuitionInfo);
			results.init('tuition', tuitionInfo);
			faculty.init('tuition', tuitionInfo);
			galleryTab.init('tuition', tuitionInfo);
		});
	});

	user.getInfo().then(userInfo => {
		navigationBar.init(userInfo);
	});

	queryString.loadQueryString();
} catch (error) {
	console.error(error);
}