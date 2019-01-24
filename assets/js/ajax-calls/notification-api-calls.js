const notificationApiCalls = (() => {
	const validArrayNames = {
		receivers: true
	};
	const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

	function getUserNotifications() {
		return $.ajax({
			type: 'GET',
			url: '/notification/user-notification',
		});
	}

	function putNewNotification(senderId, message, receivers) {
		if (!checkForHexRegExp.test(senderId)) {
			console.error('Not a valid idOfSender');
		}
		if (receivers) {
			if (receivers.length === 0) {
				console.error('receiversArr empty');
			}
		}
		return $.ajax({
			type: 'POST',
			url: '/notification',
			data: {
				senderId,
				message,
				receivers
			}
		});
	}

	function markNotificationsAsRead(idsArr) {
		if (idsArr) {
			if (idsArr.length === 0) {
				console.error('idsArr empty');
			}
		}
		return $.ajax({
			type: 'PUT',
			url: '/notification/user-read',
			data: {
				ids: idsArr,
			},
		});
	}

	function getClaimedNotifications() {
		return $.ajax({
			type: 'GET',
			url: '/notification/claimed',
		});
	}

	function clearAllUserNotifications() {
		return $.ajax({
			type: "DELETE",
			url: `/notification/user-notification`,
		});
	}

	return {
		getUserNotifications,
		putNewNotification,
		markNotificationsAsRead,
		getClaimedNotifications,
		clearAllUserNotifications
	};
})();
