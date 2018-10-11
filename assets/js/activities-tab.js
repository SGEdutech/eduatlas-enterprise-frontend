const activities = (() => {
	let $newActivityForm;
	let $nextTabButton;
	let $saveActivityBtn;
	let $nextTab;
	let $activityInput;

	function cache() {
		$newActivityForm = $('#activityForm');
		$nextTabButton = $('#next_Tab_Button');
		$saveActivityBtn = $('#save_sctivity_btn');
		$nextTab = $('[href = "#tab7"]');
		$activityInput = $('#acitivitiesInput')
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

	function bindEvents(instituteId) {
		$nextTabButton.click(() => {
			saveActivities(instituteId, $newActivityForm, false);
		})
		$saveActivityBtn.click(() => {
			saveActivities(instituteId, $newActivityForm, true);
		})
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