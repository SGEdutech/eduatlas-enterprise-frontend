const instituteForum = (() => {
	let $newPostForm;
	// let $recentAnnouncementsContainer;
	// let $deleteButtons;

	function cache() {
		$newPostForm = $('.new_post_form');
	}

	function cacheNewStudentContainer(tabNumber) {
		// $recentAnnouncementsContainer = $(`#recent_announcemnt_container${tabNumber}`);
	}

	function cacheDynamic() {
		// $deleteButtons = $('.delete-announcement-btn');
	}

	function render() {}

	function bindEvents() {
		$newPostForm.submit(function(e) {
			e.preventDefault();
			addPost($(this));
		});

		// $deleteButtons.click(function(e) {
		// 	e.preventDefault();
		// 	deleteStudent($(this))
		// });
	}

	function cacheNBindDeleteButtons() {
		/* cacheDynamic();
		$deleteButtons.click(function(e) {
			e.preventDefault();
			deleteStudent($(this));
		}); */
	}

	function deleteAnnouncement($element) {
		// let cardId = $element.attr('data-id');
		// let idOfTuition = $element.attr('data-tuition');
		// tuitionApiCalls.deleteInArrayInTuition(idOfTuition, "students", { _id: cardId }).then(data => {
		//     console.log(data);
		// 	eagerRemoveCard(cardId);
		// }).catch(err => console.error(err));
	}

	function eagerRemoveCard(cardId) {
		//todo - cache properly
		$('#' + cardId).remove()
	}

	function eagerLoadAnnouncement(context) {
		/* context.col4 = true;
		$activeStudentContainer.append(template.instituteStudentCard(context))
		cacheNBindDeleteButtons(); */
	}

	function addPost($form) {
		if (!$form) { return }
		const idOfTuition = $form.attr("data-id");
		const serializedArrayForm = $form.serializeArray()
		let bodyObj = {};
		serializedArrayForm.forEach(obj => {
			bodyObj[obj.name] = obj.value;
		})
		// cacheNewStudentContainer(tabNumber);
		tuitionApiCalls.putPostInForum(idOfTuition, bodyObj).then((result) => {
			alert("success")
		}).catch((err) => console.error(err));
	}

	function getHtml() {}

	function init() {
		cache();
		render();
		cacheDynamic();
		bindEvents();
	}

	return { init };
})();