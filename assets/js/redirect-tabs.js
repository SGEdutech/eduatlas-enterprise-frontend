const redirectTabs = (() => {
	let $addTuitionTab, $addSchoolTab, $addEventTab, $secondStepTuition, $secondStepSchool, $editProfile;

	function cache() {
		$addTuitionTab = $('.nav-item a[href="#tab6"]');
		$addSchoolTab = $('.nav-item a[href="#tab7"]');
		$addEventTab = $('.nav-item a[href="#tab8"]');
		$secondStepTuition = $('.nav-item a[href="#tab2"]');
		$secondStepSchool = $('.nav-item a[href="#tab2"]');
		$editProfile = $('.nav-item a[href="#tab3"]');
	}

	function showTab(queryObject) {
		if (queryObject.tab === 'addTuition') {
			$addTuitionTab.tab('show');
		} else if (queryObject.tab === 'addSchool') {
			$addSchoolTab.tab('show');
		} else if (queryObject.tab === 'addEvent') {
			$addEventTab.tab('show');
		} else if (queryObject.tab === '2ndStepTuition') {
			$secondStepTuition.tab('show');
		} else if (queryObject.tab === '2ndStepSchool') {
			$secondStepSchool.tab('show');
		} else if (queryObject.tab === 'editProfile') {
			$editProfile.tab('show');
		} else {
			$(`.nav-item a[href="#tab${queryObject.tab}"]`).tab('show');
		}
	}

	function init(queryObject) {
		cache();
		showTab(queryObject);
	}

	return {
		init
	};
})();