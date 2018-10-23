const userImgAndName = (() => {
	let $profilePic;
	let $userNameContainer;
	let $eaIdContainer;

	function cache() {
		$profilePic = $('#profile_pic');
		$userNameContainer = $('#userIdContainer');
		$eaIdContainer = $('#ea_id_container');
	}

	function render(user) {
		// handle google pic
		if (user.img_userProfilePic) {
			$profilePic.attr('src', `images/${user.img_userProfilePic}`);
		} else {
			$profilePic.attr('src', 'assets/img/logo.png');
		}

		if (user.firstName) {
			$userNameContainer.html(user.firstName);
		} else {
			$userNameContainer.html('Unknown unicorn');
		}

		if (user.eANumber) {
			$eaIdContainer.html(eAIdsAndNumbers.numberToEaId(user.eANumber))
		} else {
			$eaIdContainer.html('No EA Id')
		}
	}

	function init(user) {
		cache();
		render(user);
	}

	return { init };
})();
