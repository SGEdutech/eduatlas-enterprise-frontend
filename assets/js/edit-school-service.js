PubSub.subscribe('user', (msg, userInfo) => {
    navigationBar.render(userInfo);
    redirectOnLogout.init(userInfo);
});

PubSub.subscribeOnce('query.load', (msg, queryObject) => {
    getDetails.returnData('school', queryObject).then((schoolInfo) => {
        coverImage.init('school', schoolInfo);
        basicDetails.init('school', schoolInfo);
        facilitiesDescriptionCategory.init('school', schoolInfo);
        contactUs.init('school', schoolInfo);
        activities.init(schoolInfo);
        admissionDetails.init(schoolInfo);
        results.init('school', schoolInfo);
        faculty.init('school', schoolInfo);
        galleryTab.init('school', schoolInfo);
    });
});

user.getInfo().then(userInfo => {
    navigationBar.init(userInfo);
});

queryString.loadQueryString();
