const coverImage = (() => {
	let $coverImgContainer;

	function cache() {
		$coverImgContainer = $("#coverImgContainer");
	}

	function render(typeOfInfo, tuitionInfo) {
		let imagePath;
		if (typeOfInfo === 'tuition') {
			imagePath = 'images/' + tuitionInfo.img_tuitionCoverPic;
		} else if (typeOfInfo === 'school') {
			imagePath = 'images/' + tuitionInfo.img_schoolCoverPic;
		} else if (typeOfInfo === 'event') {
			if (tuitionInfo.img_eventCoverPic) {
				imagePath = 'images/' + tuitionInfo.img_eventCoverPic;
			} else {
				imagePath = 'assets/img/preview.jpg';
			}
		}
		$coverImgContainer.attr('src', imagePath);
	}

	// function getCoverHtml(path) {
	//     return template.userEditTuitionCover({
	//         path: path
	//     });
	// }

	function init(typeOfInfo, tuitionInfo) {
		cache();
		render(typeOfInfo, tuitionInfo);
	}

	return {
		init
	};
})();