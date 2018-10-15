const galleryTab = (() => {
	let $newImageform;
	let $addNewImageButton;
	let $galleryContainer;
	let $deleteButtons;
	let $saveAndExitButton;
	let $newImageModal;
	let imgPath;
	let $galleryBackBtn, $lastTab;

	function cache() {
		$newImageform = $('#newImageForm');
		$addNewImageButton = $('#add_new_image_button');
		$galleryContainer = $("#galleryContainer");
		$galleryImgInp = $('#galleryImgInp');
		$newImageModal = $('#new_image_modal');
		$saveAndExitButton = $('#saveNExit');
		$galleryBackBtn = $('#gallery_back_btn');
		$lastTab = $(`[href = "#tab5"]`);
	}

	function cacheDynamic() {
		$deleteButtons = $('.delete-image-button');
	}

	function cacheNBindDeleteButtons(typeOfInfo, instituteId) {
		cacheDynamic();
		$deleteButtons.click(function() {
			deleteImage(typeOfInfo, this, instituteId)
		});
	}

	function bindEvents(typeOfInfo, institute) {
		$addNewImageButton.click(() => addImage(typeOfInfo, institute));
		$saveAndExitButton.click(() => redirectToDashboard());
		$galleryImgInp.change(function() {
			let reader = new FileReader();
			reader.onload = function(e) {
				// get loaded data and render thumbnail.
				imgPath = e.target.result;
			};
			// read the image file as a data URL.
			reader.readAsDataURL(this.files[0]);
		});
		$deleteButtons.click(function() {
			deleteImage(typeOfInfo, this, institute._id)
		});

		$galleryBackBtn.click(openLastTab);
	}

	function openLastTab(e) {
		e.preventDefault();
		$lastTab.tab('show');
		//scroll 100 pixels
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	function render(typeOfInfo, institute) {
		let html = getHtml(typeOfInfo, institute);
		$galleryContainer.html(html);
	}

	function getHtml(typeOfInfo, institute) {
		if (!institute) {
			return
		}

		let context = {
			images: institute.gallery ? institute.gallery : []
		};

		let counter = 1;
		context.images.forEach((obj) => {
			obj.id = counter;
			counter++;
		});

		return template.userEditTuitionGallery(context);
	}

	function addImage(typeOfInfo, institute) {
		// console.log(institute._id);
		const form = $newImageform;
		eagerLoadImage(form.serializeArray());

		const formData = new FormData(form[0]);
		// get the data and send it in post request
		let promise;
		if (typeOfInfo === "tuition") {
			promise = tuitionApiCalls.putInArrayInTuition(institute._id, "gallery", formData, true)
		} else if (typeOfInfo === "school") {
			promise = schoolApiCalls.putInArrayInSchool(institute._id, "gallery", formData, true)
		} else {
			promise = eventApiCalls.putInArrayInEvent(institute._id, "gallery", formData, true)
		}

		promise.then((data) => {
			cacheNBindDeleteButtons(typeOfInfo, institute._id);
			$newImageform.trigger('reset');
			// alert(data);
			// init(typeOfInfo, institute);
		}).catch((err) => {
			console.log(err);
			alert("image addition failed")
		})
	}

	function deleteImage(typeOfInfo, element, instituteId) {
		const $element = $(element);
		let album = $element.attr('data-album');
		let cardId = $element.attr('data-image-id');
		// console.log(album);
		// console.log(cardId);

		eagerRemoveCard(cardId);
		let tempPromise;
		if (typeOfInfo === "tuition") {
			tempPromise = tuitionApiCalls.deleteInArrayInTuition(instituteId, "gallery", {
				album: album
			})
		} else if (typeOfInfo === "school") {
			tempPromise = schoolApiCalls.deleteInArrayInSchool(instituteId, "gallery", {
				album: album
			})
		} else {
			tempPromise = eventApiCalls.deleteInArrayInEvent(instituteId, "gallery", {
				album: album
			})
		}
		tempPromise.then(() => {
			// alert("image deleted successfully")
		}).catch((err) => {
			console.log(err);
			alert("image deletion failed")
		});
	}

	function eagerRemoveCard(cardId) {
		// console.log(cardId);
		//todo - cache properly
		$('#' + cardId).remove()
	}

	function eagerLoadImage(serializedForm) {
		$newImageModal.modal('hide');
		let contextInner = {};
		serializedForm.forEach(obj => contextInner[obj.name] = obj.value);
		//give _id to contextInner
		contextInner._id = Math.floor(Math.random() * (50000 - 100) + 100);
		contextInner.img_path = imgPath;
		contextInner.eagerLoad = true;
		let contextOuter = {
			images: [contextInner]
		};
		$galleryContainer.append(template.userEditTuitionGallery(contextOuter));
	}

	function redirectToDashboard() {
		window.location.assign('Dashboard-Pro.html');
	}

	function init(typeOfInfo, instituteInfo) {
		cache();
		render(typeOfInfo, instituteInfo);
		cacheDynamic();
		bindEvents(typeOfInfo, instituteInfo);
	}

	return { init };
})();