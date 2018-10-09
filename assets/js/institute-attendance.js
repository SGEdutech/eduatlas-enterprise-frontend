const instituteAttendance = (() => {
	let $markAttendanceForm;

	function cache() {
		$markAttendanceForm = $('.mark-attendance-form');
	}

	function cacheDynamic() {}

	function render() {}

	function bindEvents() {
		$markAttendanceForm.submit(function(e) {
			e.preventDefault();
			markAttendance($(this));
		});

		// $editPostForm.submit(function(e) {
		// 	e.preventDefault();
		// 	editPost($(this));
		// });

		// $deleteCommentForm.submit(function(e) {
		// 	e.preventDefault();
		// 	deleteComment($(this));
		// });
	}

	function cacheNBindDeleteButtons() {
		// cacheDynamic();
		// $deleteButton.click(function(e) {
		// 	e.preventDefault();
		// 	deletePost($(this));
		// });
	}


	function eagerRemoveCard(cardId) {
		//todo - cache properly
		$('#' + cardId).remove()
	}

	function eagerLoadPost(context) {
		// context.col4 = false;
		// $postsContainer.append(template.institutePostCard(context))
		// cacheNBindDeleteButtons();
	}

	function markAttendance($form) {
		if (!$form) { return }
		const idOfTuition = $form.attr("data-tuition");
		const serializedArrayForm = $form.serializeArray()
		let bodyObj = {};
		let absentArr = [];
		serializedArrayForm.forEach(obj => {
			if (obj.name === "students") {
				absentArr.push(obj.value);
			} else {
				bodyObj[obj.name] = obj.value;
			}
		})
		const idsArr = bodyObj.courseBatchSchedule.split("-");
		// // cacheNewStudentContainer(tabNumber);
		tuitionApiCalls.putAttendanceInSchedule(idOfTuition, idsArr[0], idsArr[1], idsArr[2], absentArr).then((result) => {
			// cachePostContainer(tabNumber);
			// eagerLoadPost(bodyObj);
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