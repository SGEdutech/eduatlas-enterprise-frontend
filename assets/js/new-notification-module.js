const notification = (() => {
	let $notificationBar;

	function cache() {
		$notificationBar = $('#custom_alert');
	}

	function cacheDynamic() {

	}

	function bindEvents() {

	}

	function bindDynamic() {

	}

	function hideAndEmptyNotification() {
		$notificationBar.css({ transform: 'translate(-50%, 0)' })
	}

	function renderAndShowNotification(content) {
		if (content === undefined) throw new Error('Cannot push notification without content');
		$notificationBar.html(content);
		$notificationBar.css({ transform: 'translate(-50%, -110%)' });
	}

	function render() {

	}

	function push(content) {
		renderAndShowNotification(content)
		setTimeout(hideAndEmptyNotification, 2500);
	}

	function init() {
		cache();
	}

	return { init, push };
})();
