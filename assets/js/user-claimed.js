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
		console.log("unlaim function hit");
		promise.then(() => window.location.assign('/Dashboard-Pro.html')).catch(err => console.error(err))
	}

	function getTuitionsInfo(typeOfInfo, tuitionId) {
		let url = `/${typeOfInfo}`;
		// demands = `name addressLine1 addressLine2 city state primaryNumber email
		// category description claimedBy dayAndTimeOfOperation reviews`,

		return $.get({
			url,
			data: {
				_id: tuitionId
			}
		});
	}

	function getInstituteCardHtml(typeOfInfo, instituteIdArr, $container) {
		$container.append(`<div class="card-title col-12">
                                                 Manage Your ${typeOfInfo}
                                           </div>`)
		const instituteInfoPromiseArr = [];
		instituteIdArr.forEach(object => {
			if (object.listingCategory === typeOfInfo) {
				instituteInfoPromiseArr.push(getTuitionsInfo(typeOfInfo, object.listingId))
			}
		});
		let cardsHtml = '';

		return new Promise((resolve, reject) => {
			Promise.all(instituteInfoPromiseArr)
				.then(tuitionInfoArr => {
					tuitionInfoArr.forEach(tuitionInfo => {
						const averageRating = helperScripts.calcAverageRating(tuitionInfo.reviews);
						tuitionInfo.averageRating = averageRating === -1 ? 2.5 : averageRating;
						tuitionInfo.col4 = true;
						tuitionInfo.manageClaimed = true;
						tuitionInfo.hideFooter = true;
						tuitionInfo.typeOfInfo = typeOfInfo;
						if (tuitionInfo.typeOfInfo === "event") {
							tuitionInfo.event = true;
							tuitionInfo.averageRating = null;
							tuitionInfo.claimedBy = null;
						}
						cardsHtml += template.smoothCardHomePage(tuitionInfo);
					});
					resolve(cardsHtml);
				}).catch(err => reject(err));
		})
	}

	function render(userInfo) {
		getInstituteCardHtml('tuition', userInfo.claims, $claimedTuitionContainer).then(cardsHtml => {
			if (!cardsHtml) {
				const context = {
					title: "No Data",
					description: "please add your tuition if you own one."
				}
				cardsHtml = template.noDataCard(context);
				$claimedTuitionContainer.append(cardsHtml);
			} else {
				$claimedTuitionContainer.append(cardsHtml);
				cacheDynamic();
				bindEvents();
			}
		});
		getInstituteCardHtml('school', userInfo.claims, $claimedSchoolContainer).then(cardsHtml => {
			if (!cardsHtml) {
				const context = {
					title: "No Data",
					description: "please add your school if you own one."
				}
				cardsHtml = template.noDataCard(context);
				$claimedSchoolContainer.append(cardsHtml);
			} else {
				$claimedSchoolContainer.append(cardsHtml);
				cacheDynamic();
				bindEvents();
			}
		});
		getInstituteCardHtml('event', userInfo.claims, $claimedEventContainer).then(cardsHtml => {
			if (!cardsHtml) {
				const context = {
					title: "No Data",
					description: "please add your event if you own one."
				}
				cardsHtml = template.noDataCard(context);
				$claimedEventContainer.append(cardsHtml);
			} else {
				$claimedEventContainer.append(cardsHtml);
				cacheDynamic();
				bindEvents();
			}
		})
	}

	function init(userInfo) {
		cache();
		render(userInfo);
	}

	return {
		init
	};
})();