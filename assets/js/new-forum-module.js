const instituteForum = (() => {
	let $newPostForm;
	let $postsContainer;
	let $deleteButton;
	let $editPostForm;
	let $addCommentForm;
	let $deleteCommentForm;

	function cache() {
		$newPostForm = $('.new_post_form');
		$deleteButton = $('.delete-post-btn');
		$editPostForm = $('.edit-post-form');
		$addCommentForm = $('.add-comment-form');
		$deleteCommentForm = $('.delete-comment-form');
		$postsContainer = $(`#post-container-${tabNumber}`);
	}

	function cacheDynamic() {
		$deleteButton = $('.delete-post-btn');
		$editPostForm = $('.edit-post-form');
		$addCommentForm = $('.add-comment-form');
		$deleteCommentForm = $('.delete-comment-form');
	}

	function render() {}

	function bindEvents() {
		// $newPostForm.submit(function(e) {
		// 	e.preventDefault();
		// 	addPost($(this));
		// });

		// $editPostForm.submit(function(e) {
		// 	e.preventDefault();
		// 	editPost($(this));
		// });

		// $addCommentForm.submit(function(e) {
		// 	e.preventDefault();
		// 	addComment($(this));
		// });

		// $deleteCommentForm.submit(function(e) {
		// 	e.preventDefault();
		// 	deleteComment($(this));
		// });

		// $deleteButton.click(function(e) {
		// 	e.preventDefault();
		// 	deletePost($(this));
		// });

		// $deleteButton.click(function(e) {
		// 	e.preventDefault();
		// 	deletePost($(this));
		// });
	}

	function editPost($form) {
		// let cardId = $form.attr('data-post');
		// let idOfTuition = $form.attr('data-tuition');
		// let idOfModal = $form.attr('data-modal');
		// const serializedArrayForm = $form.serializeArray()
		// let bodyObj = {};
		// serializedArrayForm.forEach(obj => {
		// 	bodyObj[obj.name] = obj.value;
		// })
		// tuitionApiCalls.editPostInForum(idOfTuition, cardId, bodyObj).then(data => {
		// 	// console.log(data);
		// 	$('#' + idOfModal).modal('toggle');
		// 	alert("successfully updated, changes will appear after refreshing");
		// }).catch(err => console.error(err));
	}

	function addComment($form) {
		// let idOfPost = $form.attr('data-post');
		// let idOfTuition = $form.attr('data-tuition');
		// const serializedArrayForm = $form.serializeArray()
		// let bodyObj = {};
		// serializedArrayForm.forEach(obj => {
		// 	bodyObj[obj.name] = obj.value;
		// })
		// console.log(bodyObj);
		// tuitionApiCalls.putCommentInPost(idOfTuition, idOfPost, bodyObj).then(data => {
		// 	// console.log(data);
		// 	alert("successfully added comment, changes will appear after refreshing");
		// }).catch(err => console.error(err));
	}

	function deleteComment($form) {
		// let idOfPost = $form.attr('data-post');
		// let idOfTuition = $form.attr('data-tuition');
		// let idOfComment = $form.attr('data-comment');
		// tuitionApiCalls.deleteCommentInPost(idOfTuition, idOfPost, idOfComment).then(data => {
		// 	// console.log(data);
		// 	eagerRemoveCard(idOfComment);
		// 	alert("successfully deleted comment, changes will appear after refreshing");
		// }).catch(err => console.error(err));
	}

	function deletePost($element) {
		// let cardId = $element.attr('data-post');
		// let idOfTuition = $element.attr('data-tuition');
		// tuitionApiCalls.deletePostInForum(idOfTuition, cardId).then(data => {
		// 	// console.log(data);
		// 	eagerRemoveCard(cardId);
		// 	alert("success");
		// }).catch(err => console.error(err));
	}

	function addPost($form) {
		// if (!$form) { return }
		// const tabNumber = $form.attr("data-tabNumber");
		// const idOfTuition = $form.attr("data-id");
		// const serializedArrayForm = $form.serializeArray()
		// let bodyObj = {};
		// bodyObj.tuitionId = idOfTuition;
		// bodyObj.numComments = 0;
		// serializedArrayForm.forEach(obj => {
		// 	bodyObj[obj.name] = obj.value;
		// })
		// // cacheNewStudentContainer(tabNumber);
		// tuitionApiCalls.putPostInForum(idOfTuition, bodyObj).then((result) => {
		// 	bodyObj.tuitionName = result.name;
		// 	let idOfNewPost;
		// 	// FIXME: result received is old data
		// 	result.forums.forEach(postObj => {
		// 		if (bodyObj.title === postObj.title && bodyObj.body === postObj.body) {
		// 			idOfNewPost = postObj._id;
		// 		}
		// 	})
		// 	console.log(result.forums);
		// 	console.log(idOfNewPost);
		// 	bodyObj._id = idOfNewPost;
		// 	cachePostContainer(tabNumber);
		// 	eagerLoadPost(bodyObj);
		// 	alert("success")
		// }).catch((err) => console.error(err));
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
