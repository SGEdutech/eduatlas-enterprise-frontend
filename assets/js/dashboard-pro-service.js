let sampleUserData = {
    promoter: "2025-06-06T00:00:00.000Z",
    communicator: "2025-06-06T00:00:00.000Z",
    manager: false,
    claimedInstitutes: [{
        objId: 001,
        typeOfInfo: 'tuition',
        promoter_homepage: false,
        promoter_searchpage: false,
        promoter_category: false,
        promoter_related: "2025-06-06T00:00:00.000Z"
    }, {
        objId: 001,
        typeOfInfo: 'tuition',
        promoter_homepage: false,
        promoter_searchpage: false,
        promoter_category: "2025-06-06T00:00:00.000Z",
        promoter_related: "2025-06-06T00:00:00.000Z"
    }]
}

// imitate  user.getInfo.then(userInfo=>{})
setTimeout(() => {
    activeProducts.init(sampleUserData);
    promoter.init(sampleUserData);
}, 500);