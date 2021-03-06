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

	function submitAddCourse(tuitionId, newCourseDetails) {
		return tuitionApiCalls.putCourseInTuition(tuitionId, newCourseDetails);
	}

	function submitEditRequest(tuitionId, courseId, editedData) {
		return tuitionApiCalls.editCourseInTuition(tuitionId, courseId, editedData);
	}

	function isEditedCodeDuplicate(code, courseId, tuitionId) {
		if (code === undefined) throw new Error('Code not provided');
		if (courseId === undefined) throw new Error('Course ID not provided');
		if (tuitionId === undefined) throw new Error('Tuition ID not provided');
		if (typeof courseId !== 'string') throw new Error('Course ID must be a string');

		const coursesOfThisInstitute = coursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
		return randomScripts.isDuplicate(coursesOfThisInstitute, 'code', code, courseId);
	}

	function isEditedDataValid(editedData, courseId, tuitionId) {
		if (editedData === undefined) throw new Error('Edited data not provided');
		if (courseId === undefined) throw new Error('Course ID not provided');
		if (tuitionId === undefined) throw new Error('Tuition ID not provided');
		if (typeof editedData !== 'object') throw new Error('Edited data must be an object');
		if (typeof courseId !== 'string') throw new Error('Course ID must be a string');

		if (isEditedCodeDuplicate(editedData.code, courseId, tuitionId)) {
			alert('A Course with same code exists');
			return false;
		}
		return true;
	}

	async function editCourse(event, tuitionId, courseId) {
		try {
			event.preventDefault();
			const editedData = modal.getInputsDataObj();
			if (isEditedDataValid(editedData, courseId, tuitionId) === false) return;
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

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const courseId = $editBtn.attr('data-course-id');
		const courseInfo = coursesArr.find(courseToBeEdited => courseToBeEdited._id === courseId);
		courseInfo.tatalFee = randomScripts.calcTotalCourseFee(courseInfo.fees, courseInfo.gstPercentage);
		const editCourseInputHTML = template.courseEditInputs(courseInfo);
		modal.renderFormContent(editCourseInputHTML);
		modal.bindSubmitEvent(e => editCourse(e, tuitionId, courseId));
		modal.cacheAndBindCoursesStuff();
		modal.showModal();
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

	function isDuplicateCode(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuition id not provided');
		if (typeof tuitionId !== 'string') throw new Error('Tuition id must be a string');
		const code = $codeInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const courseOfThisTuition = coursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
		return randomScripts.isDuplicate(courseOfThisTuition, 'code', code);
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
		$gstInp.filter(`[data-tuition-id="${tuitionId}"]`).prop('disabled', false);
		$form.trigger('reset');
		refresh();
	}

	function updateTotalFee(tuitionId) {
		// FIXME: Too many $totalFee
		let courseFee = $feeInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		let gstPercentage = $gstInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		courseFee = parseFloat(courseFee, 10) || 0;
		gstPercentage = parseFloat(gstPercentage, 10) || 0;
		const totalFee = randomScripts.calcTotalCourseFee(courseFee, gstPercentage);
		$totalFee.filter(`[data-tuition-id="${tuitionId}"]`).val(totalFee);
	}

	function initUpdateTotalFee(event) {
		const $input = $(event.target);
		const tuitionId = $input.attr('data-tuition-id');

		updateTotalFee(tuitionId);
	}

	function toggleGstInp(tuitionId, isChecked) {
		if (tuitionId === undefined) throw new Error('Tuition fee not provided');
		if (isChecked === undefined) throw new Error('Is Checked not provided');
		if (typeof isChecked !== 'boolean') throw new Error('Is checked is not boolean');

		if (isChecked) {
			$gstInp.filter(`[data-tuition-id="${tuitionId}"]`).prop('disabled', true);
			$gstInp.filter(`[data-tuition-id="${tuitionId}"]`).val(0);
		} else {
			$gstInp.filter(`[data-tuition-id="${tuitionId}"]`).prop('disabled', false);
		}
	}

	function toggleGstInpAndUpdateTotalFee(event) {
		const $taxCheckbox = $(event.target);
		const tuitionId = $taxCheckbox.attr('data-tuition-id');
		const isChecked = $taxCheckbox.prop('checked');

		toggleGstInp(tuitionId, isChecked);
		updateTotalFee(tuitionId);
	}

	function injectTotalFees(arrayOfCourses) {
		arrayOfCourses.forEach(courseObj => courseObj.totalFee = randomScripts.calcTotalCourseFee(courseObj.fees, courseObj.gstPercentage));
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
		$feeInp.on('input paste', initUpdateTotalFee);
		$gstInp.on('input paste', initUpdateTotalFee);
		$inclusiveTaxCheckbox.change(toggleGstInpAndUpdateTotalFee);
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

	PubSub.subscribe('batch.add', (msg, batchAdded) => {
		const courseInfo = coursesArr.find(courseObj => courseObj._id === batchAdded.courseId);
		// Assuming courseInfo won't be undefined as all batches have parent course
		courseInfo.batches.push(batchAdded);
		refresh();
	});

	PubSub.subscribe('batch.delete', (msg, batchDeleted) => {
		const courseInfo = coursesArr.find(courseObj => courseObj._id === batchDeleted.courseId);
		// Assuming courseInfo won't be undefined as all batches have parent course
		courseInfo.batches.forEach((batchObj, index) => {
			if (batchObj._id === batchDeleted._id) courseInfo.batches.splice(index, 1);
		});
		refresh();
	});

	return { init };
})();
