const dashboardAddSchool = (() => {
	let $addSchoolForm;
	let $selectAllGrades;
	let $gradesOptions;
	let $gradesSelect;
	let $addOtherFacility, $otherFacilityContainer, $otherFacilityInput, $addFacilityModal, $addFacilityBtn;

	function cache() {
		$addSchoolForm = $('#addSchool');
		$selectAllGrades = $('#select_all_grades');
		$gradesOptions = $('#grades_for_school option');
		$gradesSelect = $('#grades_for_school');

		$addOtherFacility = $('#add_other_facility_school');
		$otherFacilityContainer = $('#other_facility_container_school');
		$otherFacilityInput = $('#other_facility_input');
		$addFacilityModal = $('#add_facility_modal');
		$addFacilityBtn = $('#add_facility_btn');
	}

	function bindEvents(user) {
		$addSchoolForm.submit(e => {
			e.preventDefault();
			let tuitionSavedPromise = submitTuition(user);
			updateUser(user, tuitionSavedPromise);
		});

		$selectAllGrades.click(selectAllGrades);
		$addOtherFacility.click(openModal);
		$addFacilityBtn.click(otherFacilityAddition);
	}

	function openModal() {
		$otherFacilityInput.val('');
		$addFacilityModal.modal('toggle');
		$addFacilityBtn.attr('data-target', 'school');
	}

	function otherFacilityAddition(e) {
		e.preventDefault();
		const $target = $(e.target);
		const targetString = $target.attr('data-target');
		$addFacilityModal.modal('toggle');
		const nameToBeAdded = $otherFacilityInput.val();
		const otherFacilityHTML = template.otherFacilityCheckbox({ name: nameToBeAdded });
		if (targetString === 'school') {
			$otherFacilityContainer.append(otherFacilityHTML)
		}
	}

	function selectAllGrades(e) {
		e.preventDefault();
		$gradesOptions.prop('selected', true);
		$gradesSelect.selectpicker('refresh');
	}

	function submitTuition(user) {
		const formData = new FormData($addSchoolForm[0]);
		return schoolApiCalls.putNewSchool(formData, true)
	}

	function updateUser(user, tuitionSavedPromise) {
		tuitionSavedPromise.then((data) => {
			const schoolIdCreated = data._id;
			const userUpdatedPromise = userApiCalls.addClaim("school", data._id);
			redirectToEditTuition(userUpdatedPromise, schoolIdCreated);
		}).catch(err => {
			console.log(err);
		});
	}

	function redirectToEditTuition(userUpdatedPromise, schoolId) {
		userUpdatedPromise.then((data) => {
			window.location.assign(`./user-edit-school.html?a=${schoolId}&tab=2ndStepTuition`)
		}).catch(err => {
			console.log(err);
		});
	}

	function init(user) {
		cache();
		bindEvents(user);
	}

	return {
		init
	};
})();