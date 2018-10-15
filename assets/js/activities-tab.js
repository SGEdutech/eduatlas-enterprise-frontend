const activities = (() => {
	let $newActivityForm;
	let $nextTabButton;
	let $saveActivityBtn;
	let $nextTab;
	let $activityInput;
	let $activityBackBtn, $lastTab;

	function cache() {
		$newActivityForm = $('#activityForm');
		$nextTabButton = $('#next_Tab_Button');
		$saveActivityBtn = $('#save_sctivity_btn');
		$nextTab = $('[href = "#tab7"]');
		$activityInput = $('#acitivitiesInput')
		$activityBackBtn = $('#activities_back_btn');
		$lastTab = $('[href = "#tab2"]')
	}

	function render(school) {
		$activityInput.val(school.activities);
	}

	function saveActivities(schoolId, $form, ifSaveOnly) {
		const inputObj = $form.serializeArray();
		let activitiesArr = inputObj[0].value;
		activitiesArr = activitiesArr.split(',');
		schoolApiCalls.deleteArrayInSchool("activities", {
			_id: schoolId
		}).then(() => {
			// console.log('deleted old array');
			submitActivity(schoolId, activitiesArr, ifSaveOnly)
		});
	}

	function submitActivity(schoolId, activitiesArr, ifSaveOnly) {
		const promiseArr = [];
		activitiesArr.forEach(entry => {
			promiseArr.push(
				schoolApiCalls.putInArrayInSchool(schoolId, "activities", {
					string: entry
				})
			)
		});
		Promise.all(promiseArr).then(() => {
			// console.log('added all activities');
			if (ifSaveOnly) {
				alert("activities saved successfully");
			} else {
				helperScripts.showNextTab($nextTab);
			}
		})
	}

	function openLastTab(e) {
		e.preventDefault();
		$lastTab.tab('show');
		//scroll 100 pixels
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	function bindEvents(instituteId) {
		$nextTabButton.click(() => {
			saveActivities(instituteId, $newActivityForm, false);
		})
		$saveActivityBtn.click(() => {
			saveActivities(instituteId, $newActivityForm, true);
		})

		$activityBackBtn.click(openLastTab);
	}

	function init(school) {
		cache();
		render(school);
		bindEvents(school._id);
	}

	return {
		init
	};
})();