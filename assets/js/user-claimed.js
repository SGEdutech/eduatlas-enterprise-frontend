const userClaimed = (() => {
	let $claimedTuitionContainer;
	let $claimedSchoolContainer;
	let $claimedEventContainer;
	let $unclaimButons;

	function cache() {
		$claimedTuitionContainer = $('#userOwnedTuitionContainer');
		$claimedSchoolContainer = $('#userOwnedSchoolContainer');
		$claimedEventContainer = $('#userOwnedEventContainer');
	}

	function cacheDynamic() {
		$unclaimButons = $('.unclaim-button');
	}

	function bindEvents() {
		$unclaimButons.click((event) => unclaimListing(event))
	}

	function unclaimListing(event) {
		let tuitionId = $(event.target).attr('data-id');
		let typeOfInfo = $(event.target).attr('data-category');
		let promise = userApiCalls.removeClaim(typeOfInfo, tuitionId);
		promise.then(() => window.location.assign('/Dashboard-Pro.html')).catch(err => console.error(err))
	}

	function getInstituteCardHtml(typeOfInfo, instituteInfoArr, $container) {
		$container.append(`<div class="card-title col-12">
                                                 Manage Your ${typeOfInfo}
                                           </div>`)
		let cardsHtml = '';

		instituteInfoArr.forEach((tuitionInfo, index) => {
			const averageRating = helperScripts.calcAverageRating(tuitionInfo.reviews);
			tuitionInfo.averageRating = averageRating === -1 ? 2.5 : averageRating;
			tuitionInfo.col4 = true;
			tuitionInfo.manageClaimed = true;
			tuitionInfo.hideFooter = true;
			tuitionInfo.typeOfInfo = typeOfInfo;
			if (tuitionInfo.typeOfInfo === "tuition") {
				tuitionInfo.tabNumber = (index + 1) * 10;
			}
			if (tuitionInfo.typeOfInfo === "school") {
				tuitionInfo.tabNumber = 1000 + (index + 1) * 10;
			}
			if (tuitionInfo.typeOfInfo === "event") {
				tuitionInfo.event = true;
				tuitionInfo.averageRating = null;
				tuitionInfo.claimedBy = null;
				tuitionInfo.tabNumber = 2000 + (index + 1) * 10;
			}
			cardsHtml += template.smoothCardHomePage(tuitionInfo);
		});

		return cardsHtml;
	}

	function render(claimedInstitutes, claimedSchools, claimedEvents) {
		let cardsHtml = getInstituteCardHtml('tuition', claimedInstitutes, $claimedTuitionContainer)
		if (!cardsHtml) {
			const context = {
				title: "No Data",
				description: "please add your tuition if you own one."
			}
			cardsHtml = template.noDataCard(context);
			$claimedTuitionContainer.append(cardsHtml);
		} else {
			$claimedTuitionContainer.append(cardsHtml);
		}
		let cardsHtml2 = getInstituteCardHtml('school', claimedSchools, $claimedSchoolContainer);
		if (!cardsHtml2) {
			const context = {
				title: "No Data",
				description: "please add your school if you own one."
			}
			cardsHtml2 = template.noDataCard(context);
			$claimedSchoolContainer.append(cardsHtml2);
		} else {
			$claimedSchoolContainer.append(cardsHtml2);
		}
		let cardsHtml3 = getInstituteCardHtml('event', claimedEvents, $claimedEventContainer);
		if (!cardsHtml3) {
			const context = {
				title: "No Data",
				description: "please add your event if you own one."
			}
			cardsHtml3 = template.noDataCard(context);
			$claimedEventContainer.append(cardsHtml3);
		} else {
			$claimedEventContainer.append(cardsHtml3);
		}
	}

	function init(claimedInstitutes, claimedSchools, claimedEvents) {
		cache();
		render(claimedInstitutes, claimedSchools, claimedEvents);
		cacheDynamic();
		bindEvents();
	}

	return {
		init
	};
})();