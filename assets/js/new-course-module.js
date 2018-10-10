const course = (() => {
	let coursesArr;
	let $courseContainer;
	let $addCourseForm;
	let $editButton;
	let $deleteButton;

	function cache() {
		$addCourseForm = $('.add_course_form');
		$courseContainer = $('#active_course_container');
	}

	function cacheDynamic() {
		$editButton = $('.course-edit');
		$deleteButton = $('.delete-course-btn');
	}

	function submitAddCourse(tuitionId, newCourseDetails) {
		return tuitionApiCalls.putCourseInTuition(tuitionId, newCourseDetails);
	}

	function submitEditRequest(tuitionId, courseId, editedData) {
		return tuitionApiCalls.editCourseInTuition(tuitionId, courseId, editedData);
	}

	async function editCourse(tuitionId, courseId) {
		try {
			const editedData = modal.serializeForm();
			const editedCourse = await submitEditRequest(tuitionId, courseId, editedData);
			modal.hideModal();
			console.log('Course was successfully edited');
			editedCourse.tuitionId = tuitionId;
			const newCourseArr = coursesArr.map(courseObj => courseObj._id === courseId ? editedCourse : courseObj)
			PubSub.publish('course.edit', editedCourse);
			refresh(newCourseArr);
		} catch (err) {
			console.error(err);
		}
	}

	function submitDeleteRequest(tuitionId, courseId) {
		return tuitionApiCalls.deleteCourseInTuition(tuitionId, courseId);
	}

	async function deleteCourse(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const courseId = $deleteBtn.attr('data-course-id');
			const deletedTuition = await submitDeleteRequest(tuitionId, courseId);
			console.log('Tuition was successfully deleted');
			newCourseArr = coursesArr.filter(courseObj => courseObj._id !== courseId);
			PubSub.publish('course.delete', deletedTuition);
			refresh(newCourseArr);
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const courseId = $editBtn.attr('data-course-id');
		const courseInfo = coursesArr.find(courseToBeEdited => courseToBeEdited._id === courseId);
		const editCourseInputHTML = template.courseEditInputs(courseInfo);
		modal.renderFormContent(editCourseInputHTML);
		modal.bindSubmitEvent(() => editCourse(tuitionId, courseId));
		modal.showModal();
	}

	async function addCourse(e) {
		e.preventDefault();
		const $form = $(e.target);
		const tuitionId = $form.attr('data-id');
		const newCourse = await submitAddCourse(tuitionId, $form.serialize());
		newCourse.tuitionId = tuitionId;
		coursesArr.push(newCourse);
		PubSub.publish('course.add', newCourse);
		$form.trigger('reset');
		refresh();
	}

	function bindEvents() {
		$addCourseForm.submit(addCourse);
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteCourse);
	}

	function render() {
		const cardsHtml = template.courseCard({ courses: coursesArr });
		$courseContainer.html(cardsHtml);
	}

	function refresh(courses) {
		if (courses) coursesArr = courses;
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init(courses) {
		if (Array.isArray(courses) === false) throw new Error('Courses must be an array');
		coursesArr = courses;

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	return { init };
})();
