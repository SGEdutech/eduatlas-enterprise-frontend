const instituteInfo = (() => {
	// this module renders all info about claimed tuitions/schools
	let $navPillsList;
	let $tabContainer;

	function cache() {
		$navPillsList = $('#nav-pills-list');
		$tabContainer = $('#tab-container');
	}

	function renderPills(userInfo) {
		const maxLength = userInfo.claims.length;
		userInfo.claims.forEach((obj, index) => {
			getName(obj).then((instituteData) => {
				if (instituteData[0]) {
					instituteData = instituteData[0];
				}
				let tabNumber = (index + 1) * 10;

				const shortName = instituteData.name.substr(0, 7) + "..";

				$navPillsList.append(`<li class="nav-item">
                <a class="nav-link" href="#tab${tabNumber}" data-toggle="tab">${shortName}</a>
                </li>`);

				instituteData.tabNumber = tabNumber;
				const promiseArr = [];

				promiseArr.push(promotedHomepageApiCalls.getSpecificAd({
					category: obj.category,
					listingId: obj.objectId
				}))

				promiseArr.push(promotedSearchPageApiCalls.getSpecificAd({
					category: obj.category,
					listingId: obj.objectId
				}))

				promiseArr.push(promotedRelatedApiCalls.getSpecificAd({
					category: obj.category,
					listingId: obj.objectId
				}))

				Promise.all(promiseArr).then(resultArr => {
					const homeResult = resultArr[0];
					const searchResult = resultArr[1];
					const relatedResult = resultArr[2];
					if (homeResult) {
						instituteData.promotedHome = true;
					}
					if (searchResult) {
						instituteData.promotedSearch = true;
					}
					if (relatedResult) {
						instituteData.promotedRelated = true;
					}
					console.log("rendered one tab");
					instituteData.category = obj.category;
					let allBatches = [];
					const allStudentsArr = instituteData.students;
					if (instituteData.courses) {
						instituteData.courses.forEach(course => {
							course.parentId = instituteData._id;
							if (course.batches) {
								course.batches.forEach(batch => {
									batch.tuitionId = instituteData._id;
									batch.courseId = course._id;
									batch.parentCourse = course.code;
									batch.allstudents = allStudentsArr;

									// fix schedules date and time format
									if (batch.schedules) {
										batch.schedules.forEach(schdeuleObj => {
											const dateObj = helperScripts.getDateObj(schdeuleObj.date);
											schdeuleObj.date = dateObj.date + " " + dateObj.monthName + " " + dateObj.year;
											const fromTime = helperScripts.getTimeFromMinutes(schdeuleObj.fromTime);
											schdeuleObj.fromTime = fromTime.hour + " hours " + fromTime.minute + " minutes";
											const toTime = helperScripts.getTimeFromMinutes(schdeuleObj.toTime);
											schdeuleObj.toTime = toTime.hour + " hours " + toTime.minute + " minutes";
										})
									}

									// lets replace all studentsId in batches with their real info
									let newStudentsArr = [];
									if (batch.students) {
										batch.students.forEach(studentId => {
											allStudentsArr.forEach(studentObj => {
												if (studentObj._id === studentId) {
													// FIXME: time wasted here = 1 hour
													studentObj.batchId = batch._id;
													newStudentsArr.push(studentObj);
												}
											})
										})
									}
									batch.students = newStudentsArr;
									allBatches.push(batch);
								})
							}
						});
					}
					if (instituteData.students) {
						instituteData.students.forEach(studentObj => {
							studentObj.tuitionId = instituteData._id;
						})
					}
					if (instituteData.forums) {
						instituteData.forums.forEach(postObj => {
							postObj.tuitionId = instituteData._id;
							postObj.tuitionName = instituteData.name;
							postObj.numComments = postObj.comments.length;
						})
					}
					instituteData.batches = allBatches;

					renderCorrespondingTabs(instituteData);
					calculateViewsNHits(instituteData, tabNumber)
					if (index === maxLength - 1) {
						setTimeout(() => {
							console.log("event published");
							PubSub.publish('instituteTabs.load', null)
						}, 600);
					}
				})
			}).catch((err) => {
				console.error(err);
			});
		})
	}

	function renderCorrespondingTabs(instituteData) {
		$tabContainer.append(template.instituteTab(instituteData))
	}

	function calculateViewsNHits(instituteData, tabNumber) {
		if (!instituteData.views) {
			return
		}
		if (!instituteData.views.total) {
			return
		}
		const totalViewsArray = instituteData.views.total;
		let date = new Date();
		let currentYear = date.getFullYear();
		let currentMonth = date.getMonth();
		let viewsThisMonth = [];
		totalViewsArray.forEach(date => {
			date = new Date(date);
			if (date.getFullYear() === currentYear) {
				if (date.getMonth() === currentMonth) {
					viewsThisMonth.push(date);
				}
			}
		})

		let map = {};
		for (let index = 1; index < 32; index++) {
			map[index] = 0;
		}
		viewsThisMonth.forEach(d => {
			let temp = parseInt(d.getDate());
			map[temp]++;
		});

		if (instituteData.promotedHome) {
			createChartFor(tabNumber, map);
		}
		if (instituteData.promotedSearch) {
			createChartFor(tabNumber + "1", map);
		}
		if (instituteData.promotedRelated) {
			createChartFor(tabNumber + "2", map);
		}
	}

	function getName(claimObj) {
		if (claimObj.listingCategory === "tuition") {
			return tuitionApiCalls.getSpecificTuition({ _id: claimObj.listingId })
		} else {
			/* return $.ajax({
				type: "GET",
				url: `/${claimObj.category}`,
				data: {
					_id: claimObj.objectId
				},
			}); */
		}
	}

	function init(userInfo) {
		cache();
		renderPills(userInfo);
	}

	return {
		init
	};
})();