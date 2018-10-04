const course = (() => {
	let coursesArr;
	let $courseContainer;
	let $addCourseForm;

	function cache() {
		$addCourseForm = $('.add_course_form');
		$courseContainer = $('#active_course_container');
	}

	function addCourse(tuitionId, newCourseDetails) {
		tuitionApiCalls.putCourseInTuition(tuitionId, newCourseDetails)
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

	function render() {
		const cardsHtml = template.courseCard(coursesArr);
		$courseContainer.html(cardsHtml);
	}

	function init(courses) {
		coursesArr = courses;
		cache();
		render();
	}

	return {
		init
	};
})();
