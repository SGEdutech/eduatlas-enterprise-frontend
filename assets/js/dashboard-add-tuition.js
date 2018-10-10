const dashboardAddTuition = (() => {
	let $addTuitionForm;

	function cache() {
		$addTuitionForm = $('#addTuition');
	}

	function bindEvents(user) {
		$addTuitionForm.submit(function(e) {
			e.preventDefault();
			let tuitionSavedPromise = submitTuition(user);
			updateUser(user, tuitionSavedPromise);
		});
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
