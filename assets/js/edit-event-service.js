PubSub.subscribe('user', (msg, userInfo) => {
	navigationBar.render(userInfo);
	redirectOnLogout.init(userInfo);
});


const queryObject = queryString.loadQueryString();
getDetails.returnData('event', queryObject).then((eventInfo) => {
	// coverImage.init('event', eventInfo);
	eventDetails.init(eventInfo);
	galleryTab.init('event', eventInfo);
});

user.getInfo().then(userInfo => {
	navigationBar.init(userInfo);
	userImgAndName.init(userInfo);
});