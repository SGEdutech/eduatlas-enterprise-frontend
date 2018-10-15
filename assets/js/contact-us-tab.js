const contactUs = (() => {
	let $contactPersonContainer;
	let $socialLinkContainer;
	let $opration_hours_containers;
	let $saveBtn;
	let $saveNProceedBtn;
	let $coursesTab;
	let $activitiesTab;
	let $contactUsAndSocialLinksForm;
	let $monForm, $tueForm, $wedForm, $thuForm, $friForm, $satForm, $sunForm;
	let $cloneToAllBtn;
	let $contactUsBackBtn, $lastTab;

	function cache() {
		$contactPersonContainer = $("#contactPersonContainer");
		$socialLinkContainer = $("#socialLinkContainer");
		$opration_hours_containers = $("#opration_hours_containers");
		$saveBtn = $('#save_time_btn');
		$saveNProceedBtn = $('#save_proceed_time_btn');
		$coursesTab = $(`[href = "#tab3"]`);
		$activitiesTab = $(`[href = "#tab3"]`);
		$contactUsBackBtn = $('#contact_us_back_btn');
		$lastTab = $('[href = "#tab1"]')
	}

	function cacheDynamic(typeOfInfo) {
		$contactUsAndSocialLinksForm = $('#contactUsForm');
		if (typeOfInfo === 'tuition') {
			$monForm = $('#monForm');
			$tueForm = $('#tueForm');
			$wedForm = $('#wedForm');
			$thuForm = $('#thrForm');
			$friForm = $('#friForm');
			$satForm = $('#satForm');
			$sunForm = $('#sunForm');
		}
		$cloneToAllBtn = $('.clone-to-all-btn');
	}

	function bindEvents(typeOfInfo, instituteId) {
		$saveNProceedBtn.click(() => { saveEverything(typeOfInfo, instituteId, false) });

		$saveBtn.click(() => { saveEverything(typeOfInfo, instituteId, true) });

		$cloneToAllBtn.click((event) => cloneTimming(event, typeOfInfo, instituteId));

		$contactUsBackBtn.click(openLastTab);
	}

	function openLastTab(e) {
		e.preventDefault();
		$lastTab.tab('show');
		//scroll 100 pixels
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	function cloneTimming(event, typeOfInfo, instituteId) {
		const typeOfOperation = $(event.target).attr("data-time-type");

		if (typeOfOperation === 'tuition_normal') {
			const mondayTimeValues = JSON.parse(JSON.stringify($monForm.serializeArray()));
			const context = {
				fromTime: mondayTimeValues[1].value,
				toTime: mondayTimeValues[2].value
			}
			const clonedTimmingsHTML = template.userEditTuitionHoursClone(context)
			$opration_hours_containers.html(clonedTimmingsHTML);
		} else if (typeOfOperation === 'school_normal') {
			const mondayTimeValues = JSON.parse(JSON.stringify($monFormSchool.serializeArray()));
			const context = {
				fromTime: mondayTimeValues[1].value,
				toTime: mondayTimeValues[2].value,
				school: true
			}
			const clonedTimmingsHTML = template.userEditTuitionHoursClone(context)
			$schoolTimingContainer.html(clonedTimmingsHTML);
		} else if (typeOfOperation === 'school_office') {
			const mondayTimeValues = JSON.parse(JSON.stringify($monFormSchoolOffice.serializeArray()));
			const context = {
				fromTime: mondayTimeValues[1].value,
				toTime: mondayTimeValues[2].value,
				school: true,
				office: 'Office'
			}
			const clonedTimmingsHTML = template.userEditTuitionHoursClone(context)
			$officeTimingContainer.html(clonedTimmingsHTML);
		}

		refresh(typeOfInfo, instituteId);
	}

	function saveEverything(typeOfInfo, instituteId, ifSaveOnly) {
		addAllTimes(typeOfInfo, instituteId);
		if (typeOfInfo === "tuition") {
			if (ifSaveOnly) {
				helperScripts.saveDetails(typeOfInfo, $contactUsAndSocialLinksForm, "saveOnly", instituteId);
			} else {
				helperScripts.saveDetails(typeOfInfo, $contactUsAndSocialLinksForm, $coursesTab, instituteId);
			}
		} else if (typeOfInfo === "school") {
			if (ifSaveOnly) {
				helperScripts.saveDetails(typeOfInfo, $contactUsAndSocialLinksForm, "saveOnly", instituteId);
			} else {
				helperScripts.saveDetails(typeOfInfo, $contactUsAndSocialLinksForm, $activitiesTab, instituteId);
			}
		}
	}

	function render(typeOfInfo, user) {
		let contactPersonHtml = getContactPHtml(user);
		let socialHtml = getSocialHtml(user);
		if (typeOfInfo === 'tuition') {
			let dayNTimeHtml = getDayNTimeHtml(typeOfInfo, false, user.dayAndTimeOfOperation);
			$opration_hours_containers.html(dayNTimeHtml);
		}
		$contactPersonContainer.append(contactPersonHtml);
		$socialLinkContainer.append(socialHtml);

	}

	function getContactPHtml(context) {
		return template.userEditTuitionContactP(context);
	}

	function getSocialHtml(context) {
		return template.userEditTuitionSocial(context);
	}

	function getDayNTimeHtml(typeOfInfo, isOffice, dayNtimeInfo) {
		let context = {
			monFrom: '',
			monTo: '',
			tueFrom: '',
			tueTo: '',
			wedFrom: '',
			wedTo: '',
			thrFrom: '',
			thrTo: '',
			friFrom: '',
			friTo: '',
			satFrom: '',
			satTo: '',
			sunFrom: '',
			sunTo: '',
		};
		if (dayNtimeInfo) {
			dayNtimeInfo.forEach((obj) => {
				let expr = obj.day.toLowerCase();
				switch (expr) {
					case 'monday':
						context.monFrom = obj.fromTime ? obj.fromTime : '';
						context.monTo = obj.toTime ? obj.toTime : '';
						break;
					case 'tuesday':
						context.tueFrom = obj.fromTime ? obj.fromTime : '';
						context.tueTo = obj.toTime ? obj.toTime : '';
						break;
					case 'wednesday':
						context.wedFrom = obj.fromTime ? obj.fromTime : '';
						context.wedTo = obj.toTime ? obj.toTime : '';
						break;
					case 'thursday':
						context.thrFrom = obj.fromTime ? obj.fromTime : '';
						context.thrTo = obj.toTime ? obj.toTime : '';
						break;
					case 'friday':
						context.friFrom = obj.fromTime ? obj.fromTime : '';
						context.friTo = obj.toTime ? obj.toTime : '';
						break;
					case 'saturday':
						context.satFrom = obj.fromTime ? obj.fromTime : '';
						context.satTo = obj.toTime ? obj.toTime : '';
						break;
					case 'sunday':
						context.sunFrom = obj.fromTime ? obj.fromTime : '';
						context.sunTo = obj.toTime ? obj.toTime : '';
						break;
				}
			});
		}
		if (typeOfInfo === 'school') {
			context.school = true;
		}
		if (isOffice) {
			context.office = 'Office';
		}
		return template.userEditTuitionHours(context);
	}

	async function addAllTimes(typeOfInfo, instituteId) {
		if (typeOfInfo === 'tuition') {
			try {
				const deleteData = await tuitionApiCalls.deleteArrayInTuition("dayAndTimeOfOperation", {
					_id: instituteId
				})
				const addTimepromiseArr = [
					await addDayAndTimeOfOperation(typeOfInfo, $monForm, instituteId, "dayAndTimeOfOperation"),
					await addDayAndTimeOfOperation(typeOfInfo, $tueForm, instituteId, "dayAndTimeOfOperation"),
					await addDayAndTimeOfOperation(typeOfInfo, $wedForm, instituteId, "dayAndTimeOfOperation"),
					await addDayAndTimeOfOperation(typeOfInfo, $thuForm, instituteId, "dayAndTimeOfOperation"),
					await addDayAndTimeOfOperation(typeOfInfo, $friForm, instituteId, "dayAndTimeOfOperation"),
					await addDayAndTimeOfOperation(typeOfInfo, $satForm, instituteId, "dayAndTimeOfOperation"),
					await addDayAndTimeOfOperation(typeOfInfo, $sunForm, instituteId, "dayAndTimeOfOperation")
				];
				const dataReturned = Promise.all(addTimepromiseArr)
				console.log('tuition time saved sucessfully');
			} catch (err) {
				console.error(err);
			}
		}
	}

	function addDayAndTimeOfOperation(typeOfInfo, $form, tuitionId, arrayName) {
		// data is in $form
		// get the data and send it in post request
		if (typeOfInfo === "tuition") {
			return tuitionApiCalls.putInArrayInTuition(tuitionId, arrayName, $form.serialize())
		}
	}

	function refresh(typeOfInfo, instituteId) {
		$saveNProceedBtn.off();
		$saveBtn.off();
		cacheDynamic(typeOfInfo);
		bindEvents(typeOfInfo, instituteId);
	}

	function init(typeOfInfo, instituteInfo) {
		cache();
		render(typeOfInfo, instituteInfo);
		cacheDynamic(typeOfInfo);
		bindEvents(typeOfInfo, instituteInfo._id);
	}

	return {
		init
	};
})();