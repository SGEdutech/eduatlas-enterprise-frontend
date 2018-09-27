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
					if (instituteData.courses) {
						instituteData.courses.forEach(course => {
							course.parentId = instituteData._id;
							if (course.batches) {
								course.batches.forEach(batch => {
									batch.tuitionId = instituteData._id;
									batch.courseId = course._id;
									batch.parentCourse = course.code;
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