const results = (() => {
	let $resultsContainer;
	let $newResultForm;
	let $addNewResultButton;
	let $facultyTabButton;
	let $facultyTab;
	let $newResultModal;
	let $deleteButtons;
	let $resultImgInp;
	let imgPath;
	let $resultsBackBtn, $lastTabSchool, $lastTabTuition;

	function cache() {
		$resultsContainer = $("#resultsContainer");
		$newResultForm = $('#newResult');
		$addNewResultButton = $('#add_new_result_button');
		$facultyTabButton = $('#next_Tab_Button2');
		$facultyTab = $(`[href = "#tab5"]`);
		$newResultModal = $('#new_result_modal');
		$resultImgInp = $('#resultImageInp');
		$resultsBackBtn = $('#results_back_btn');
		$lastTabSchool = $(`[href = "#tab7"]`);
		$lastTabTuition = $(`[href = "#tab3"]`);
	}

	function cacheDynamic() {
		$deleteButtons = $('.delete-result-button');
	}

	function render(typeOfInfo, institute) {
		let html = getHtml(typeOfInfo, institute);
		$resultsContainer.append(html);
	}

	function bindEvents(typeOfInfo, instituteId) {
		$addNewResultButton.click(() => addResult(typeOfInfo, instituteId));
		$facultyTabButton.click(() => helperScripts.showNextTab($facultyTab));
		$resultImgInp.change(function() {
			let reader = new FileReader();
			reader.onload = function(e) {
				// get loaded data and render thumbnail.
				imgPath = e.target.result;
			};
			// read the image file as a data URL.
			reader.readAsDataURL(this.files[0]);
		});
		$deleteButtons.click(function() {
			deleteResult(typeOfInfo, this, instituteId)
		});

		$resultsBackBtn.click((e) => openLastTab(e, typeOfInfo));
	}

	function cacheNBindDeleteButtons(typeOfInfo, instituteId) {
		cacheDynamic();
		$deleteButtons.click(function() {
			deleteResult(typeOfInfo, this, instituteId)
		});
	}

	function openLastTab(e, typeOfInfo) {
		e.preventDefault();
		if (typeOfInfo === 'tuition') {
			$lastTabTuition.tab('show');
		} else if (typeOfInfo === 'school') {
			$lastTabSchool.tab('show');
		}
		//scroll 100 pixels
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}

	function deleteResult(typeOfInfo, element, instituteId) {
		const $element = $(element);
		console.log($element);
		let title = $element.attr('data-title');
		let cardId = $element.attr('data-result-id');
		// console.log(title);
		// console.log(cardId);

		eagerRemoveCard(cardId);

		let tempPromise;
		if (typeOfInfo === "tuition") {
			tempPromise = tuitionApiCalls.deleteInArrayInTuition(instituteId, "bragging", {
				title: title
			})
		} else if (typeOfInfo === "school") {
			tempPromise = schoolApiCalls.deleteInArrayInSchool(instituteId, "bragging", {
				title: title
			})
		}
		tempPromise.then(() => {
			// alert("result deleted successfully")
		}).catch((err) => {
			console.log(err);
			alert("result deletion failed")
		});
	}

	function eagerRemoveCard(cardId) {
		console.log(cardId);
		//todo - cache properly
		$('#' + cardId).remove()
	}

	function eagerLoadResult(serializedForm) {
		$newResultModal.modal('hide');
		let contextInner = {};
		serializedForm.forEach(obj => contextInner[obj.name] = obj.value);
		//give _id to contextInner
		contextInner._id = Math.floor(Math.random() * (50000 - 100) + 100);
		contextInner.img_cover = imgPath;
		contextInner.eagerLoad = true;
		let contextOuter = {
			results: [contextInner]
		};
		$resultsContainer.append(template.userEditTuitionResults(contextOuter));
	}

	function addResult(typeOfInfo, instituteId) {
		const form = $newResultForm;
		eagerLoadResult(form.serializeArray());

		const formData = new FormData(form[0]);
		// get the data and send it in post request
		let promise;
		if (typeOfInfo === "tuition") {
			promise = tuitionApiCalls.putInArrayInTuition(instituteId, "bragging", formData, true)
		} else if (typeOfInfo === "school") {
			promise = schoolApiCalls.putInArrayInSchool(instituteId, "bragging", formData, true)
		}

		promise.then((data) => {
			cacheNBindDeleteButtons(typeOfInfo, instituteId);
			$newResultForm.trigger('reset');
			// alert("result added successfully");
		}).catch((err) => {
			console.log(err);
			alert("result addition failed")
		})
	}

	function getHtml(typeOfInfo, institute) {
		if (!institute) {
			return
		}

		let context = {
			results: institute.bragging ? institute.bragging : []
		};

		let counter = 1;
		context.results.forEach((obj) => {
			obj.id = counter;
			counter++;
		});

		return template.userEditTuitionResults(context);
	}

	function init(typeOfInfo, institute) {
		cache();
		render(typeOfInfo, institute);
		cacheDynamic();
		bindEvents(typeOfInfo, institute._id);
	}

	return {
		init
	};
})();