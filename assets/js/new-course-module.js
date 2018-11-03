const course = (() => {
	let coursesArr;
	let $courseContainers;
	let $addCourseForm;
	let $editButton;
	let $deleteButton;
	let $codeInp;
	let $feeInp
	let $gstInp;
	let $totalFee;
	let $inclusiveTaxCheckbox;

	function calcTotalFee(fee, gstPercentage) {
		if (fee === undefined) throw new Error('Fee not provided!');
		gstPercentage = gstPercentage || 0;

		return fee + fee * (gstPercentage / 100);
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
			notification.push('Course has been successfully edited');
			editedCourse.tuitionId = tuitionId;
			coursesArr = coursesArr.map(courseObj => courseObj._id === courseId ? editedCourse : courseObj)
			PubSub.publish('course.edit', editedCourse);
			refresh();
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
			notification.push('Course has been successfully deleted');
			coursesArr = coursesArr.filter(courseObj => courseObj._id !== courseId);
			PubSub.publish('course.delete', deletedTuition);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const courseId = $editBtn.attr('data-course-id');
		const courseInfo = coursesArr.find(courseToBeEdited => courseToBeEdited._id === courseId);
		courseInfo.tatalFee = calcTotalFee(courseInfo.fees, courseInfo.gstPercentage);
		const editCourseInputHTML = template.courseEditInputs(courseInfo);
		modal.renderFormContent(editCourseInputHTML);
		modal.bindSubmitEvent(() => editCourse(tuitionId, courseId));
		modal.cacheAndBindCoursesStuff();
		modal.showModal();
	}

	function isDuplicateCode(tuitionId) {
		const code = $codeInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const coursesOfThisTuition = coursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
		let isCodeDuplicate = false;
		coursesOfThisTuition.forEach(courseObj => {
			if (courseObj.code === code) isCodeDuplicate = true;
		});
		return isCodeDuplicate;
	}

	async function addCourse(event) {
		event.preventDefault();
		const $form = $(event.target);
		const tuitionId = $form.attr('data-id');
		if (isDuplicateCode(tuitionId)) {
			alert('A course with same code has already been added');
			return;
		}
		const newCourse = await submitAddCourse(tuitionId, $form.serialize());
		notification.push('Course has been successfully added');
		newCourse.tuitionId = tuitionId;
		coursesArr.push(newCourse);
		PubSub.publish('course.add', newCourse);
		$form.trigger('reset');
		refresh();
	}

	function updateTotalFee(event) {
		// FIXME: Too many $totalFee
		// FIXME: Wrong event.target
		const $input = $(event.target);
		const tuitionId = $input.attr('data-tuition-id');
		let courseFee = $feeInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		let gstPercentage = $gstInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		courseFee = parseInt(courseFee, 10) || 0;
		gstPercentage = parseInt(gstPercentage, 10) || 0;
		const totalFee = calcTotalFee(courseFee, gstPercentage);
		$totalFee.filter(`[data-tuition-id="${tuitionId}"]`).val(totalFee);
	}

	function toggleGstInp(event) {
		const $taxCheckbox = $(event.target);
		const tuitionId = $taxCheckbox.attr('data-tuition-id');
		const isChecked = $taxCheckbox.prop('checked');

		if (isChecked) {
			$gstInp.filter(`[data-tuition-id="${tuitionId}"]`).prop('disabled', true);
			$gstInp.filter(`[data-tuition-id="${tuitionId}"]`).val(0);
		} else {
			$gstInp.filter(`[data-tuition-id="${tuitionId}"]`).prop('disabled', false);
		}
	}

	function injectTotalFees(arrayOfCourses) {
		arrayOfCourses.forEach(courseObj => courseObj.totalFee = calcTotalFee(courseObj.fees, courseObj.gstPercentage));
	}

	function cache() {
		$addCourseForm = $('.add_course_form');
		$courseContainers = $('.active-course-container');
		$codeInp = $('.add-course-code-input');
		$feeInp = $('.fee-inp');
		$gstInp = $('.gst-inp');
		$totalFee = $('.total-fee');
		$inclusiveTaxCheckbox = $('.gst-checkbox');
	}

	function cacheDynamic() {
		$editButton = $('.course-edit');
		$deleteButton = $('.delete-course-btn');
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteCourse);
	}

	function bindEvents() {
		$addCourseForm.submit(addCourse);
		$feeInp.blur(updateTotalFee);
		$gstInp.blur(updateTotalFee);
		$inclusiveTaxCheckbox.change(toggleGstInp);
	}

	function render() {
		$courseContainers.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const coursesOfThisTuition = coursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
			injectTotalFees(coursesOfThisTuition);
			const cardsHtml = template.courseCard({ courses: coursesOfThisTuition });
			$container.html(cardsHtml);
		});
	}

	function refresh() {
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
