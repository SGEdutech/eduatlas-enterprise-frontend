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
	let $monFormSchool, $tueFormSchool, $wedFormSchool, $thuFormSchool, $friFormSchool, $satFormSchool, $sunFormSchool;
	let $monFormSchoolOffice, $tueFormSchoolOffice, $wedFormSchoolOffice, $thuFormSchoolOffice, $friFormSchoolOffice,
		$satFormSchoolOffice, $sunFormSchoolOffice;
	let $schoolTimingContainer, $officeTimingContainer;

	function cache() {
		$contactPersonContainer = $("#contactPersonContainer");
		$socialLinkContainer = $("#socialLinkContainer");
		$opration_hours_containers = $("#opration_hours_containers");
		$saveBtn = $('#save_time_btn');
		$saveNProceedBtn = $('#save_proceed_time_btn');
		$coursesTab = $(`[href = "#tab3"]`);
		$activitiesTab = $(`[href = "#tab3"]`);
		$schoolTimingContainer = $('#school_timing_containers');
		$officeTimingContainer = $('#office_timing_containers');
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

		if (typeOfInfo === 'school') {
			$monFormSchool = $('#monFormSchool');
			$tueFormSchool = $('#tueFormSchool');
			$wedFormSchool = $('#wedFormSchool');
			$thuFormSchool = $('#thrFormSchool');
			$friFormSchool = $('#friFormSchool');
			$satFormSchool = $('#satFormSchool');
			$sunFormSchool = $('#sunFormSchool');

			$monFormSchoolOffice = $('#monFormSchoolOffice');
			$tueFormSchoolOffice = $('#tueFormSchoolOffice');
			$wedFormSchoolOffice = $('#wedFormSchoolOffice');
			$thuFormSchoolOffice = $('#thrFormSchoolOffice');
			$friFormSchoolOffice = $('#friFormSchoolOffice');
			$satFormSchoolOffice = $('#satFormSchoolOffice');
			$sunFormSchoolOffice = $('#sunFormSchoolOffice');
		}
	}

	function bindEvents(typeOfInfo, instituteId) {
		$saveNProceedBtn.click(()=>{saveEverything(typeOfInfo, instituteId, false)});

		$saveBtn.click(()=>{saveEverything(typeOfInfo, instituteId, true)});
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
			$opration_hours_containers.append(dayNTimeHtml);
		}
		if (typeOfInfo === 'school') {
			let dayNTimeHtml = getDayNTimeHtml(typeOfInfo, false, user.schoolTiming);
			$schoolTimingContainer.append(dayNTimeHtml);
			let dayNTimeHtml2 = getDayNTimeHtml(typeOfInfo, true, user.officeTiming);
			$officeTimingContainer.append(dayNTimeHtml2);
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

	function addAllTimes(typeOfInfo, instituteId) {
		// temporary - let's delete the time and operation first and add new
		if (typeOfInfo === 'tuition') {
			tuitionApiCalls.deleteArrayInTuition("dayAndTimeOfOperation", {
				_id: instituteId
			}).then((data) => {
				return Promise.all([
					addDayAndTimeOfOperation(typeOfInfo, $monForm, instituteId, "dayAndTimeOfOperation"),
					addDayAndTimeOfOperation(typeOfInfo, $tueForm, instituteId, "dayAndTimeOfOperation"),
					addDayAndTimeOfOperation(typeOfInfo, $wedForm, instituteId, "dayAndTimeOfOperation"),
					addDayAndTimeOfOperation(typeOfInfo, $thuForm, instituteId, "dayAndTimeOfOperation"),
					addDayAndTimeOfOperation(typeOfInfo, $friForm, instituteId, "dayAndTimeOfOperation"),
					addDayAndTimeOfOperation(typeOfInfo, $satForm, instituteId, "dayAndTimeOfOperation"),
					addDayAndTimeOfOperation(typeOfInfo, $sunForm, instituteId, "dayAndTimeOfOperation")
				])
			}).then(() => console.log('Time save successful')).catch(err => {
				console.log(err);
				alert("time addition failed")
			});
		}

		if (typeOfInfo === 'school') {
			schoolApiCalls.deleteArrayInSchool("schoolTiming", {
				_id: instituteId
			}).then((data) => {
				return Promise.all([
					addDayAndTimeOfOperation(typeOfInfo, $monFormSchool, instituteId, "schoolTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $tueFormSchool, instituteId, "schoolTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $wedFormSchool, instituteId, "schoolTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $thuFormSchool, instituteId, "schoolTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $friFormSchool, instituteId, "schoolTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $satFormSchool, instituteId, "schoolTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $sunFormSchool, instituteId, "schoolTiming")
				])
			}).then(() => console.log('school Time save successful')).catch(err => {
				console.log(err);
				alert("time addition failed")
			});

			schoolApiCalls.deleteArrayInSchool("officeTiming", {
				_id: instituteId
			}).then((data) => {
				return Promise.all([
					addDayAndTimeOfOperation(typeOfInfo, $monFormSchoolOffice, instituteId, "officeTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $tueFormSchoolOffice, instituteId, "officeTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $wedFormSchoolOffice, instituteId, "officeTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $thuFormSchoolOffice, instituteId, "officeTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $friFormSchoolOffice, instituteId, "officeTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $satFormSchoolOffice, instituteId, "officeTiming"),
					addDayAndTimeOfOperation(typeOfInfo, $sunFormSchoolOffice, instituteId, "officeTiming")
				])
			}).then(() => console.log('school office Time save successful')).catch(err => {
				console.log(err);
				alert("time addition failed")
			});
		}
	}

	function addDayAndTimeOfOperation(typeOfInfo, $form, tuitionId, arrayName) {
		// data is in $form
		// get the data and send it in post request
		if (typeOfInfo === "tuition") {
			return tuitionApiCalls.putInArrayInTuition(tuitionId, arrayName, $form.serialize())
		} else if (typeOfInfo === "school") {
			return schoolApiCalls.putInArrayInSchool(tuitionId, arrayName, $form.serialize())
		}
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