const dashboardAddTuition = (() => {
	let $addTuitionForm;
	let $addOtherFacility;
	let $otherFacilityContainer;
	let $otherFacilityInput;
	let $addFacilityModal;
	let $addFacilityBtn;

	function cache() {
		$addTuitionForm = $('#addTuition');
		$addOtherFacility = $('#add_other_facility');
		$otherFacilityContainer = $('#other_facility_container');
		$otherFacilityInput = $('#other_facility_input');
		$addFacilityModal = $('#add_facility_modal');
		$addFacilityBtn = $('#add_facility_btn');
	}

	function bindEvents(user) {
		$addTuitionForm.submit(function(e) {
			e.preventDefault();
			let tuitionSavedPromise = submitTuition(user);
			updateUser(user, tuitionSavedPromise);
		});
		$addOtherFacility.click(openModal);
		$addFacilityBtn.click(otherFacilityAddition);
	}

	function openModal() {
		$otherFacilityInput.val('');
		$addFacilityModal.modal('toggle');
	}

	function otherFacilityAddition() {
		$addFacilityModal.modal('toggle');
		const nameToBeAdded = $otherFacilityInput.val();
		const otherFacilityHTML = template.otherFacilityCheckbox({ name: nameToBeAdded });
		$otherFacilityContainer.append(otherFacilityHTML)
	}

	function submitTuition(user) {
		const formData = new FormData($addTuitionForm[0]);
		// console.log(formData);
		return tuitionApiCalls.putNewTuition(formData, true)
	}

	function updateUser(user, tuitionSavedPromise) {
		// console.log('tuition saved');
		tuitionSavedPromise.then((data) => {
			const tuitionIdCreated = data._id;
			const userUpdatedPromise = userApiCalls.addClaim("tuition", data._id);

			redirectToEditTuition(userUpdatedPromise, tuitionIdCreated);
		}).catch(err => {
			console.log(err);
		});
	}

	function redirectToEditTuition(userUpdatedPromise, tuitionId) {
		userUpdatedPromise.then((data) => {
			// console.log('user updated');
			window.location.assign(`./user-edit-tuition.html?a=${tuitionId}&tab=2ndStepTuition`)
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