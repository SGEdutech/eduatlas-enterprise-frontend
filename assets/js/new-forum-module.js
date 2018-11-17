const forum = (() => {
	let forumArr;
	let $addForm;
	let $forumContainer;
	let $editForumBtn;
	let $deleteForumBtn;
	let $landingContainer;
	let $detailContainer;
	let $forumPostContainer;
	let $postHeading;
	let $backBtn;
	let $commentTextarea;
	let $addCommentBtn;

	function renderPost(postToShow) {
		const postHTML = template.forumPostBody(postToShow);
		$forumPostContainer.html(postHTML);
		cacheDynamic();
		bindDynamic();
	}

	function renderDetailsPage(event) {
		$heading = $(event.target);
		const postId = $heading.attr('data-post-id');
		const tuitionId = $heading.attr('data-tuition-id');
		const postToShow = forumArr.find(forumObj => forumObj._id === postId);
		postToShow.comments.forEach(commentObj => {
			if (commentObj.createdAt) {
				commentObj.fromNow = moment(commentObj.createdAt).fromNow();
			}
		});
		renderPost(postToShow);
		$landingContainer.filter(`[data-tuition-id="${tuitionId}"]`).addClass('d-none');
		$detailContainer.filter(`[data-tuition-id="${tuitionId}"]`).removeClass('d-none');
	}

	function showLandingPage(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		$forumPostContainer.html('');
		$landingContainer.filter(`[data-tuition-id="${tuitionId}"]`).removeClass('d-none');
		$detailContainer.filter(`[data-tuition-id="${tuitionId}"]`).addClass('d-none');
	}

	async function addAndRenderComment(event) {
		try {
			const $btn = $(event.target);
			const postId = $btn.attr('data-post-id');
			const tuitionId = $btn.attr('data-tuition-id');
			const commentContent = $commentTextarea.filter(`[data-post-id="${postId}"]`).val();
			const newComment = await tuitionApiCalls.putCommentInPost(tuitionId, postId, { content: commentContent });
			const updatedPost = forumArr.find(forumObj => forumObj._id === postId);
			updatedPost.comments.push(newComment);
			renderPost(updatedPost);
		} catch (e) {
			console.error(e);
		}
	}

	async function deleteCommentAndRenderPost(event) {
		try {
			const $btn = $(event.target);
			const postId = $btn.attr('data-post-id');
			const tuitionId = $btn.attr('data-tuition-id');
			const commentId = $btn.attr('data-comment-id');
			const deletedComment = await tuitionApiCalls.deleteCommentInPost(tuitionId, postId, commentId);
			notification.push('comment deleted successfully');
			const updatedPost = forumArr.find(forumObj => forumObj._id === postId);
			updatedPost.comments = updatedPost.comments.filter(commentObj => commentObj._id != commentId);
			renderPost(updatedPost);
		} catch (e) {
			console.error(e);
		}
	}

	function cache() {
		$addForm = $('.new-post-form');
		$forumContainer = $('.active-forum-container');
		$excelUploadHeaderRow = $('#header_row');
		$landingContainer = $('.forum-landing-container');
		$detailContainer = $('.forum-detail-container');
		$forumPostContainer = $('.forum-detail-body');
		$backBtn = $('.go-to-landing-page-btn');
	}

	function cacheDynamic() {
		$editForumBtn = $('.edit-forum-btn');
		$deleteForumBtn = $('.delete-forum-btn');
		$postHeading = $('.post-heading');
		$commentTextarea = $('.comment-content-textarea');
		$addCommentBtn = $('.add-comment-btn');
		$deleteCommentBtn = $('.delete-comment-btn');
	}

	function bindEvents() {
		$addForm.submit(submitAddForumRequest);
		$backBtn.click(showLandingPage);
	}

	function bindDynamic() {
		$editForumBtn.click(editModalInit);
		$deleteForumBtn.click(deleteForum);
		$postHeading.click(renderDetailsPage);
		$addCommentBtn.click(addAndRenderComment);
		$deleteCommentBtn.click(deleteCommentAndRenderPost);
	}

	async function submitAddForumRequest(event) {
		try {
			event.preventDefault();
			const $form = $(event.target);
			const forumData = $form.serialize();
			const tuitionId = $form.attr('data-tuition-id');
			const newForum = await tuitionApiCalls.putPostInForum(tuitionId, forumData);
			newForum.tuitionId = tuitionId;
			forumArr.push(newForum);
			$form.trigger('reset');
			refresh();
		} catch (error) {
			console.error(error);
		}
	}

	async function deleteForum(event) {
		try {
			const $deleteBtn = $(event.target);
			const forumId = $deleteBtn.attr('data-forum-id');
			const tuitionId = $deleteBtn.attr('data-tuition-id');

			const deletedForum = await tuitionApiCalls.deletePostInForum(tuitionId, forumId);
			forumArr = forumArr.filter(forumObj => forumObj._id !== deletedForum._id);
			console.log('Forum was successfully deleted');
			refresh();
		} catch (error) {
			console.error(error);
		}
	}

	async function editForum(event, tuitionId, forumId) {
		try {
			event.preventDefault();
			const editedData = modal.serializeForm();
			const editedForum = await tuitionApiCalls.editPostInForum(tuitionId, forumId, editedData);
			modal.hideModal();
			console.log('Forum was successfully edited');
			editedForum.tuitionId = tuitionId;
			forumArr = forumArr.map(forumObj => forumObj._id === forumId ? editedForum : forumObj)
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const forumId = $editBtn.attr('data-forum-id');
		const tuitionId = $editBtn.attr('data-tuition-id');
		const forumInfo = forumArr.find(forumToBeEdited => forumToBeEdited._id === forumId);
		const editForumInputHTML = template.forumEditInputs(forumInfo);
		modal.renderFormContent(editForumInputHTML);
		modal.bindSubmitEvent((e) => editForum(e, tuitionId, forumId));
		modal.showModal();
	}

	function refresh() {
		render();
		cacheDynamic();
		bindDynamic();
	}

	function render() {
		$forumContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const fourmsOfThisInstitutes = forumArr.filter(forumObj => forumObj.tuitionId === tuitionId);
			fourmsOfThisInstitutes.forEach(forumObj => {
				forumObj.fromNow = moment(forumObj.createdAt).fromNow()
			})
			const forumCardsHtml = template.forumCard({ forums: fourmsOfThisInstitutes });
			$container.html(forumCardsHtml);
		});
	}

	function init(claimedForums) {
		if (claimedForums === undefined) throw new Error('Foums array not provided!');
		if (Array.isArray(claimedForums) === false) throw new Error('Forums not an array');
		forumArr = claimedForums;
		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	return { init };
})();
