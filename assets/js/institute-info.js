const instituteInfo = (() => {
	// this module renders all info about claimed tuitions/schools
	let $navPillsList;
	let $tabContainer;

	function cache() {
		$navPillsList = $('#nav-pills-list');
		$tabContainer = $('#tab-container');
	}

	async function renderPills(tuitionArr, ifJustPills) {
		const instituteDataArr = tuitionArr;
		for (let index = 0; index < instituteDataArr.length; index++) {
			const element = instituteDataArr[index];
			const tabNumber = (index + 1) * 10;
			element.tabNumber = tabNumber;
			if (ifJustPills === false) {
				renderCorrespondingTabs(element);
			}
			let shortName = element.name;
			if (element.name.length > 20) {
				shortName = element.name.substr(0, 18) + '..';
			}
			if (ifJustPills === false) {
				$navPillsList.append(`<li class="nav-item">
                <a class="nav-link rounded-0 text-left" href="#tab${tabNumber}" data-toggle="tab">${shortName}</a>
                </li>`);
			} else {
				$navPillsList.append(`<li class="nav-item">
                <a class="nav-link rounded-0 text-left" href="/Dashboard-Pro.html?tab=${tabNumber}">${shortName}</a>
                </li>`);
			}
		}
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
		const date = new Date();
		const currentYear = date.getFullYear();
		const currentMonth = date.getMonth();
		const viewsThisMonth = [];
		totalViewsArray.forEach(date => {
			date = new Date(date);
			if (date.getFullYear() === currentYear) {
				if (date.getMonth() === currentMonth) {
					viewsThisMonth.push(date);
				}
			}
		})

		const map = {};
		for (let index = 1; index < 32; index++) {
			map[index] = 0;
		}
		viewsThisMonth.forEach(d => {
			const temp = parseInt(d.getDate(), 10);
			map[temp]++;
		});

		if (instituteData.promotedHome) {
			createChartFor(tabNumber, map);
		}
		if (instituteData.promotedSearch) {
			createChartFor(tabNumber + '1', map);
		}
		if (instituteData.promotedRelated) {
			createChartFor(tabNumber + '2', map);
		}
	}

	function getName(claimObj) {
		if (claimObj.listingCategory === 'tuition') {
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

	function init(tuitionArr, ifJustPills = false) {
		cache();
		renderPills(tuitionArr, ifJustPills);
	}

	return { init };
})();