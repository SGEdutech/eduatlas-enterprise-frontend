// PubSub.subscribe('user', (msg, userInfo) => {
// 	navigationBar.render(userInfo);
// 	redirectOnLogout.init(userInfo);
// });

// PubSub.subscribe('instituteTabs.load', instituteInfo => {
// 	setTimeout(instituteCourses.init());
// });

// user.getInfo().then(userInfo => {
// 	const newClaimsArr = [];
// 	newClaimsArr.push(userInfo.claims[0].listingId);
// 	fetchTuitionData.init(newClaimsArr);
// 	fetchTuitionData.getClaimedInstitute().then(tuitionArr => {
// 		instituteInfo.init(tuitionArr);
// 		student.init(tuitionArr[0].students);
// 		tuitionApiCalls.getClaimedCourses().then(coursesArr => {
// 			course.init(coursesArr);
// 			tuitionApiCalls.getClaimedBatches().then(batchesArr => {
// 				batch.init(batchesArr, coursesArr);
// 			})
// 		})
// 	})

// 	modal.init();
// 	navigationBar.init(userInfo, { colorOnScroll: false });
// 	userClaimed.init(userInfo);
// 	userNotification.init();
// 	dashboardEditProfile.init(userInfo);
// 	dashboardAddTuition.init(userInfo);
// 	dashboardAddSchool.init(userInfo);
// 	dashboardAddEvent.init(userInfo);
// }).catch(err => console.error(err));

// setTimeout(loginModal.init());
// setTimeout(promoterModal.init());

course.init()
