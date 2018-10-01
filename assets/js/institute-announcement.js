const instituteAnnouncement = (() => {
	let $newAnnouncementForm;
	// let $recentAnnouncementsContainer;
	// let $deleteButtons;

	function cache() {
		$newAnnouncementForm = $('.new_announcement_form');
	}

	function cacheNewStudentContainer(tabNumber) {
		// $recentAnnouncementsContainer = $(`#recent_announcemnt_container${tabNumber}`);
	}

	function cacheDynamic() {
		// $deleteButtons = $('.delete-announcement-btn');
	}

	function render() {}

	function bindEvents() {
		$newAnnouncementForm.submit(function(e) {
			e.preventDefault();
			addAnnouncement($(this));
		});

		// $deleteButtons.click(function(e) {
		// 	e.preventDefault();
		// 	deleteStudent($(this))
		// });
	}

	function cacheNBindDeleteButtons() {
		/* cacheDynamic();
		$deleteButtons.click(function(e) {
			e.preventDefault();
			deleteStudent($(this));
		}); */
	}

	function deleteAnnouncement($element) {
		// let cardId = $element.attr('data-id');
		// let idOfTuition = $element.attr('data-tuition');
		// tuitionApiCalls.deleteInArrayInTuition(idOfTuition, "students", { _id: cardId }).then(data => {
		//     console.log(data);
		// 	eagerRemoveCard(cardId);
		// }).catch(err => console.error(err));
	}

	function eagerRemoveCard(cardId) {
		//todo - cache properly
		$('#' + cardId).remove()
	}

	function eagerLoadAnnouncement(context) {
		/* context.col4 = true;
		$activeStudentContainer.append(template.instituteStudentCard(context))
		cacheNBindDeleteButtons(); */
	}

	function addAnnouncement(form) {
		if (!form) { return }
		// const tabNumber = form.attr("data-tabNumber");
		const idOfTuition = form.attr("data-id");
		// cacheNewStudentContainer(tabNumber);

		const serializedArrayForm = form.serializeArray()
		let bodyObj = {};
		let newReceiversArr = [];
		let batchArr = [];
		serializedArrayForm.forEach(obj => {
			if (obj.name === "receivers") {
				newReceiversArr.push(obj.value);
			} else if (obj.name === "batchId") {
				batchArr.push(obj.value);
			} else {
				bodyObj[obj.name] = obj.value;
			}
		})
		bodyObj.receivers = newReceiversArr;
		bodyObj.batchArr = batchArr;
		// console.log(bodyObj);
		if (bodyObj.instituteId) {
			// highest priority to all students
			notificationApiCalls.putNewNotification(idOfTuition, bodyObj.message, null, null, bodyObj.instituteId).then(data => {
				alert("successfully sent to all students of your institute");
			}).catch(err => console.error(err));
		} else {
			if (bodyObj.batchArr.length > 0) {
				// high priority to batches
				bodyObj.batchArr.forEach(batchId => {
					notificationApiCalls.putNewNotification(idOfTuition, bodyObj.message, null, batchId).then(data => {})
				})
				alert("successfully sent to selected batches of your institute");
			} else {
				if (bodyObj.receivers.length > 0) {
					// low priority to students
					notificationApiCalls.putNewNotification(idOfTuition, bodyObj.message, bodyObj.receivers).then(data => {
						alert("successfully sent to selected students of your institute");
					}).catch(err => console.error(err));
				} else {
					alert("choose atleast one receiver");
				}
			}
		}
	}

	function getHtml() {}

	function init() {
		cache();
		render();
		cacheDynamic();
		bindEvents();
	}

	return { init };
})();