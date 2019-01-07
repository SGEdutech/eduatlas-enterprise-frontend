const dashboardAddTuition = (() => {
	let $addTuitionForm;
	let $addOtherFacility;
	let $otherFacilityContainer;
	let $otherFacilityInput;
	let $addFacilityModal;
	let $addFacilityBtn;
	let $addOtherTags;
	let $otherTagsContainer;
	let $otherTagsInput;
	let $addTagsModal;
	let $addTagsBtn;

	function cache() {
		$addTuitionForm = $('#addTuition');
		$addOtherFacility = $('#add_other_facility');
		$otherFacilityContainer = $('#other_facility_container');
		$otherFacilityInput = $('#other_facility_input');
		$addFacilityModal = $('#add_facility_modal');
		$addFacilityBtn = $('#add_facility_btn');
		$addOtherTags = $('#add_other_tags');
		$otherTagsContainer = $('#other_tags_container');
		$otherTagsInput = $('#other_tags_input');
		$addTagsModal = $('#add_tags_modal');
		$addTagsBtn = $('#add_tags_btn');
	}

	function bindEvents(user) {
		$addTuitionForm.submit(function(e) {
			e.preventDefault();
			let tuitionSavedPromise = submitTuition(user);
			updateUser(user, tuitionSavedPromise);
		});
		$addOtherFacility.click(openFacilityModal);
		$addOtherTags.click(openTagsModal);
		$addFacilityBtn.click(otherFacilityAddition);
		$addTagsBtn.click(otherTagsAddition);
	}

	function openFacilityModal() {
		$otherFacilityInput.val('');
		$addFacilityModal.modal('toggle');
		$addFacilityBtn.attr('data-target', 'tuition');
	}

	function openTagsModal() {
		$otherTagsInput.val('');
		$addTagsModal.modal('toggle');
		$addTagsBtn.attr('data-target', 'tuition');
	}

	function otherFacilityAddition(e) {
		e.preventDefault();
		const $target = $(e.target);
		const targetString = $target.attr('data-target');
		$addFacilityModal.modal('toggle');
		const nameToBeAdded = $otherFacilityInput.val();
		const otherFacilityHTML = template.otherFacilityCheckbox({ name: nameToBeAdded });
		if (targetString === 'tuition') {
			$otherFacilityContainer.append(otherFacilityHTML)
		}
	}

	function otherTagsAddition(e) {
		e.preventDefault();
		const $target = $(e.target);
		const targetString = $target.attr('data-target');
		$addTagsModal.modal('toggle');
		const nameToBeAdded = $otherTagsInput.val();
		const otherTagHTML = template.otherTagCheckbox({ name: nameToBeAdded });
		if (targetString === 'tuition') {
			$otherTagsContainer.append(otherTagHTML)
		}
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
			const userUpdatedPromise = userApiCalls.addClaim("tuition", tuitionIdCreated);

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