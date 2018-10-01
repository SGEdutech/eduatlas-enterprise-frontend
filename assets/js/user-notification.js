const userNotification = (() => {
	let $notificationContainer;
	let $notificationNumber;
	let $notificationUpdateForm;
	let $notificationReadTrigger;

	function cache() {
		$notificationContainer = $('#notification-container');
		$notificationNumber = $('#notification-number');
		$notificationUpdateForm = $('#notification-update-form');
		$notificationReadTrigger = $('#notification-read-trigger')
	}

	function bindEvents() {
		$notificationReadTrigger.click(function(e) {
			// e.preventDefault();
			markAsRead();

		});
	}

	function render() {
		notificationApiCalls.getUserNotifications().then((result) => {
			if (result) {
				if (result.length === 0) {
					// nothing to show
					const context = { col4: false, title: "No Notifications" };
					$notificationContainer.html(template.noDataCard(context));
				} else {
					// notifications to show 
					result.forEach(item => {
						const dateObj = helperScripts.getDateObj(item.createdAt);
						item.createdAt = dateObj.date + " " + dateObj.monthName;
						$notificationContainer.append(template.userNotification(item));
					})
					// update notifiaction number pill
					$notificationNumber.html(result.length);
				}
			} else {
				// nothing to show
				const context = { col4: false, title: "No Notifications" };
				$notificationContainer.html(template.noDataCard(context));
			}
		}).catch((err) => console.error(err));
	}

	function markAsRead() {
		const serializedArrayForm = $notificationUpdateForm.serializeArray();
		let idsArr = [];
		serializedArrayForm.forEach(obj => {
			if (obj.name === "ids") {
				idsArr.push(obj.value);
			}
		})
		notificationApiCalls.markNotificationsAsRead(idsArr).then(data => {
			// console.log("all notifiactions updated successfully");
		}).catch(err => console.error(err))
	}

	function init() {
		cache();
		render();
		bindEvents();
	}

	return { init };
})();