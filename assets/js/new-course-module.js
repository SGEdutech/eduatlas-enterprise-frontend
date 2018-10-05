const course = (() => {
	let coursesArr;
	let $courseContainer;
	let $addCourseForm;
	let $editModal;
	let $editButton;

	function cache() {
		$addCourseForm = $('.add_course_form');
		$courseContainer = $('#active_course_container');
		$editModal = $('#edit_course_modal');
	}

	function cacheDynamic() {
		$editButton = $('.course-edit');
	}

	function addCourse(tuitionId, newCourseDetails) {
		return tuitionApiCalls.putCourseInTuition(tuitionId, newCourseDetails);
	}

	function hideEditModal() {
		$editModal.modal('hide');
	}

	function showEditModal() {
		$editModal.modal('show');
	}

	function renderEditModal(html) {
		$editModal.html(html);
	}

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const courseId = $editBtn.attr('data-course-id');
		const courseInfo = coursesArr.find(courseToBeEdited => courseToBeEdited._id === courseId);
		const editFormHTML = template.courseEditForm(courseInfo);
		renderEditModal(editFormHTML);
		showEditModal();
	}

	function submitForm(event) {
		event.preventDefault();
		const $form = $(event.target);
		const tuitionId = $form.attr('data-id');
		addCourse(tuitionId, $form.serialize());
	}

	function bindEvents() {
		$addCourseForm.submit(submitForm);
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
	}

	function render() {
		const cardsHtml = template.courseCard(coursesArr);
		$courseContainer.html(cardsHtml);
	}

	function init(courses) {
		coursesArr = courses;
		cache();
		render();
		cacheDynamic();
	}

	return {
		init
	};
})();
