const scroll = (() => {
	let promoterNav;
	let managerNav;
	let communicatorNav;

	let $htmlBody;

	function cache() {
		$htmlBody = $('html, body');
		$promoterNav = $('#promoter_nav');
		$managerNav = $('#manager_nav');
		$communicatorNav = $('#communicator_nav');
		$promoterContainer = $('#promoter_explain');
		$communicatorContainer = $('#communicator_explain');
		$managerContainer = $('#manager_explain');
	}

	function bindEvents() {
		$promoterNav.click(() => scrollToElement(scrollToElement($promoterContainer)));
		$communicatorNav.click(() => scrollToElement(scrollToElement($communicatorContainer)));
		$managerNav.click(() => scrollToElement(scrollToElement($managerContainer)));
	}

	function scrollToElement($element, duration = 1000) {
		if ($element === undefined) {
			console.warn('Element not provided');
			return;
		}
		$htmlBody.animate({
			scrollTop: $element.offset()
				.top
		}, 1000);
	}

	function init() {
		cache();
		bindEvents();
	}

	return { init };
})();
