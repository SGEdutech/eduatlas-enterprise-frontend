const dashboardEditProfile = (() => {
	let $profilePicContainer;
	let $basicContainer;
	let $userSocialLinksContainer;
	let $saveForm1, $saveForm2;
	let $Form1, $Form2;

	function cache() {
		$profilePicContainer = $('#img_container');
		$basicContainer = $("#basicContainer");
		$userSocialLinksContainer = $("#userSocialLinksContainer");
		$saveForm0 = $('#saveFrom0');
		$saveForm1 = $('#saveFrom1');
		$saveForm2 = $('#saveFrom2');
	}

	function cacheDynamicDom() {
		$Form0 = $('#Form0');
		$Form1 = $('#Form1');
		$Form2 = $('#Form2');
	}

	function bindEvents(user) {
		$saveForm0.click(() => submitForm(user, 0));
		$saveForm1.click(() => submitForm(user, 1));
		$saveForm2.click(() => submitForm(user, 2));
	}

	function submitForm(user, formNumber) {
		// console.log(formNumber);
		let formToSubmit;
		if (formNumber === 1) {
			formToSubmit = $Form1;
		} else if (formNumber === 2) {
			formToSubmit = $Form2;
		} else if (formNumber === 0) {
			formToSubmit = $Form0;
		}
		// console.log(formToSubmit)
		let data;
		if (formNumber === 0) {
			data = formToSubmit;
		} else {
			data = formToSubmit.serialize();
		}

		const editUserPromise = userApiCalls.updateInUser(user._id, data, formNumber === 0);

		editUserPromise.then(data => {
			// console.log(data);
			alert("Saved SuccessFully")
		}).catch((err) => {
			console.log(err);
			alert("failed")
		})
	}

	function getProfileEditor(user) {
		let picPath = '';
		if (user.img_userProfilePic === '' || user.img_userProfilePic === undefined) {
			picPath = `/assets/img/logo.png`;
		} else {
			picPath = `/images/${user.img_userProfilePic}`;
		}
		let result0 = template.userProfilePicInput({ path: picPath });
		$profilePicContainer.append(result0);

		if (user.gender === 'male') {
			user.maleChecked = 'checked'
		} else if (user.gender = 'female') {
			user.femaleChecked = 'checked'
		} else if (user.gender = 'other') {
			user.otherChecked = 'checked'
		}

		if (user.primaryRole == 'student') {
			//if user is student
			user.studentChecked = 'checked'
		} else if (user.primaryRole == 'parent') {
			//if user is parent
			user.parentChecked = 'checked'
		} else if (user.primaryRole == 'enterprise') {
			//if user is a institute
			user.instituteChecked = 'checked'
		}

		let result1 = template.userProfileInput(user);
		$basicContainer.append(result1);

		let contextSocial = {
			fbLink: "",
			twitterLink: "",
			youtubeLink: "",
			instaLink: "",
			linkedinLink: "",
		};

		contextSocial.fbLink = user.fbLink;
		contextSocial.twitterLink = user.twitterLink;
		contextSocial.youtubeLink = user.youtubeLink;
		contextSocial.instaLink = user.instaLink;
		contextSocial.linkedinLink = user.linkedinLink;

		let result2 = template.userSocialInput(contextSocial);
		$userSocialLinksContainer.append(result2);
	}

	function render(user) {
		getProfileEditor(user);
	}

	function init(user) {
		cache();
		render(user);
		cacheDynamicDom();
		bindEvents(user);
	}

	return { init };
})();