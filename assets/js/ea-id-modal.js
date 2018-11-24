// const eaIdModal = (() => {
// 	let $eaIdModal;
// 	let $eAIdInp;
// 	let $suceedBtn;
// 	let tuitionId;
// 	let $form;

// 	async function populateInps(event) {
// 		try {
// 			event.preventDefault();
// 			const eAIdRegex = new RegExp('^[a-zA-z]{3}\\d{5}$', 'i');

// 			if (eAIdRegex.test($eaIdInput.val()) === false) {
// 				alert('Not a valid EA ID!');
// 				return;
// 			}

// 			const eANumber = eAIdsAndNumbers.eAIdToNumber($eAIdInp.val());
// 			const userInfo = await userApiCalls.getSpecificUser({ eANumber })
// 			if (userInfo.firstName) $studentNameInp.val(userInfo.firstName);
// 			if (userInfo.middleName) $studentNameInp.val(`${$studentNameInp.val()} ${userInfo.middleName}`);
// 			if (userInfo.lastName) $studentNameInp.val(`${$studentNameInp.val()} ${userInfo.lastName}`);

// 			if (userInfo.primaryEmail) $studentEmailInp.val(userInfo.primaryEmail);
// 			if (userInfo.phone) $studentNumberInp.val(userInfo.phone);

// 			if (userInfo.addressLine1) $studentAddressInp.val(userInfo.addressLine1);
// 			if (userInfo.addressLine2) $studentAddressInp.val(`${$studentAddressInp.val()} ${userInfo.addressLine2}`);
// 			if (userInfo.city) $studentAddressInp.val(`${$studentAddressInp.val()} ${userInfo.city}`);
// 			if (userInfo.state) $studentAddressInp.val(`${$studentAddressInp.val()} ${userInfo.state}`);
// 			if (userInfo.pin) $studentAddressInp.val(`${$studentAddressInp.val()} ${userInfo.pin}`);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}

// 	function cache() {
// 		$eaIdModal = $('#ea_id_modal');
// 		$eAIdInp = $('#ea_id_inp');
// 		$form = $('#ea-form');
// 		$suceedBtn = $('#get_student_details_btn');
// 	}

// 	function bindevents() {
// 		console.log($form);
// 		$form.submit(populateInps)
// 	}

// 	function refresh() {
// 		render();
// 		cacheDynamic();
// 		bindDynamic();
// 	}

// 	function showModal(event) {
// 		const $initBtn = $(event.target);
// 		tuitionId = $initBtn.attr('data-tuition-id');
// 	}

// 	function init() {
// 		cache();
// 		bindevents();
// 	}
// 	return { init };
// })();
