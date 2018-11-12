const triggerPills = (() => {
	let $userEditProfilebtn;
	let $dashboardNavPills;
	let $triggerForDashboardNavPills;

	function cache() {
		$userEditProfilebtn = $('#user_edit_profile');
		$dashboardNavPills = $('.dashboard-nav-pills');
		$triggerForDashboardNavPills = $('.trigger-dashboard-pills');
	}

	function bindEvents() {
		$triggerForDashboardNavPills.click(triggerCorrespondingNavPill);
		$userEditProfilebtn.click(showEditTab)
	}

	function showEditTab() {
		$dashboardNavPills.filter('[href = "#tab3"]').trigger('click');
	}


	function triggerCorrespondingNavPill() {
		const href = $(this).attr('href');
		$dashboardNavPills.filter(`[href = "${href}"]`).trigger('click');
	}

	function init() {
		cache();
		bindEvents();
	}

	return { init };
})();
