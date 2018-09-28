const userNotification = (() => {
	let $notificationContainer;

	function cache() {
		$notificationContainer = $('#notification-container')
	}

	function render() {
		notificationApiCalls.getUserNotifications().then((result) => {
			if (result) {
				$notificationContainer.html(template.userNotification(result));
			} else {
				const context = { col4: true, title: "No Notifications" };
				$notificationContainer.html(template.noDataCard(context));
			}
		}).catch((err) => console.error(err));
	}

	function init() {
		cache();
		render();
	}

	return { init };
})();