const student = (() => {
	let distinctCoursesArr;
	let distinctBatchesArr;
	let studentsArr;
	let $addStudentForm;
	let $editButton;
	let $deleteButton;
	let $studentContainer;
	let $courseSelectContainer;
	let $batchSelectContainer;
	let $courseFee;
	let $netFee;
	let $discountAmount;
	let $feeCollected;
	let $balancePending;
	let $eaIdInput;
	let $studentNameInp;
	let $studentEmailInp;
	let $studentAddressInp;
	let $studentNumberInp;

	async function deleteStudent(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const studentId = $deleteBtn.attr('data-student-id');
			const deletedStudent = await tuitionApiCalls.deleteStudentInTuition(tuitionId, studentId);
			studentsArr = studentsArr.filter(studentObj => studentObj._id !== studentId);
			PubSub.publish('student.delete', deletedStudent);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	async function editStudent(tuitionId, studentId) {
		try {
			const editedData = modal.serializeForm();
			console.log(tuitionId);
			const editedStudent = await tuitionApiCalls.editStudentInTuition(tuitionId, studentId, editedData);
			modal.hideModal();
			console.log('Student was successfully edited');
			editedStudent.tuitionId = tuitionId;
			studentsArr = studentsArr.map(studentObj => studentObj._id === studentId ? editedStudent : studentObj)
			PubSub.publish('student.edit', editedStudent);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit() {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const studentId = $editBtn.attr('data-student-id');
		const studentInfo = studentsArr.find(studentToBeEdited => studentToBeEdited._id === studentId);
		if (studentInfo.nextInstallment) studentInfo.nextInstallment = studentInfo.nextInstallment.split('T')[0];
		const editStudentInputHTML = template.studentEditInputs(studentInfo);
		modal.renderFormContent(editStudentInputHTML);
		modal.bindSubmitEvent(() => editStudent(tuitionId, studentId));
		modal.showModal();
	}

	function alertForMoreOrLessFeeCollected() {
		if ($balancePending.val() < 0) alert('You are collecting more fee than necessary!');
	}

	async function addStudent(event) {
		try {
			event.preventDefault();
			alertForMoreOrLessFeeCollected();
			const $form = $(event.target);
			const tuitionId = $form.attr('data-id');
			const newStudent = await tuitionApiCalls.putStudentInTuition(tuitionId, $form.serialize());
			newStudent.tuitionId = tuitionId;
			studentsArr.push(newStudent);
			PubSub.publish('student.add', newStudent);
			$form.trigger('reset');
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function renderNetFee() {
		$netFee.each((__, input) => {
			const $input = $(input);
			const tuitionId = $input.attr('data-tuition-id');

			const courseFee = $courseFee.filter(`[data-tuition-id="${tuitionId}"]`).val() || 0;
			const discountAmount = $discountAmount.filter(`[data-tuition-id="${tuitionId}"]`).val() || 0;

			$input.val(courseFee - discountAmount);
		});
	}

	function renderBalancePending() {
		// FIXME: Make a function for calculation of net fee
		$balancePending.each((__, input) => {
			const $input = $(input);
			const tuitionId = $input.attr('data-tuition-id');

			const netFee = $netFee.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const feeCollected = $feeCollected.filter(`[data-tuition-id="${tuitionId}"]`).val();

			$input.val(netFee - feeCollected);
		});
	}

	function renderCourseFee() {
		$courseFee.each((__, input) => {
			const $input = $(input);
			const tuitionId = $input.attr('data-tuition-id');

			const courseId = $courseSelectContainer.filter(`[data-tuition-id="${tuitionId}"]`).val();
			let courseFee = 0;
			distinctCoursesArr.forEach(courseObj => {
				if (courseObj._id === courseId) {
					const fees = parseInt(courseObj.fees, 10) || 0;
					const gstPercentage = parseInt(courseObj.gstPercentage, 10) || 0;
					courseFee = fees + (fees * (gstPercentage / 100));
				}
			});
			$input.val(courseFee);
		});
	}

	async function fetchAndRenderUserInfoFromEaId() {
		try {
			const eAIdRegex = new RegExp('^[a-zA-z]{3}\\d{5}$', 'i');
			if (eAIdRegex.test($eaIdInput.val())) {
				const eANumber = eAIdsAndNumbers.eAIdToNumber($eaIdInput.val());
				const userInfo = await userApiCalls.getSpecificUser({ eANumber })
				if (userInfo.firstName) $studentNameInp.val(userInfo.firstName);
				if (userInfo.middleName) $studentNameInp.val(`${$studentNameInp.val()} ${userInfo.middleName}`);
				if (userInfo.lastName) $studentNameInp.val(`${$studentNameInp.val()} ${userInfo.lastName}`);

				if (userInfo.primaryEmail) $studentEmailInp.val(userInfo.primaryEmail);
				if (userInfo.phone) $studentNumberInp.val(userInfo.phone);

				if (userInfo.addressLine1) $studentAddressInp.val(userInfo.addressLine1);
				if (userInfo.addressLine2) $studentAddressInp.val(`${$studentAddressInp.val()} ${userInfo.addressLine2}`);
				if (userInfo.city) $studentAddressInp.val(`${$studentAddressInp.val()} ${userInfo.city}`);
				if (userInfo.state) $studentAddressInp.val(`${$studentAddressInp.val()} ${userInfo.state}`);
				if (userInfo.pin) $studentAddressInp.val(`${$studentAddressInp.val()} ${userInfo.pin}`);
			}
		} catch (error) {
			console.error(error);
		}
	}

	function cache() {
		$addStudentForm = $('.add-student-form');
		$studentContainer = $('.student-container');
		$courseSelectContainer = $('.student-course-select-menu');
		$batchSelectContainer = $('.student-batch-select-menu');
		$courseFee = $('.student-course-fee');
		$netFee = $('.student-net-fee');
		$discountAmount = $('.student-discount-amount');
		$feeCollected = $('.student-fee-colected');
		$balancePending = $('.student-balance-pending');
		$eaIdInput = $('.ea-id-inp');
		$studentNameInp = $('.student-name-inp');
		$studentEmailInp = $('.student-email-inp');
		$studentAddressInp = $('.student-address-inp');
		$studentNumberInp = $('.student-phone-inp');
	}

	function cacheDynamic() {
		$editButton = $('.student-edit');
		$deleteButton = $('.delete-student-btn');
	}

	function bindevents() {
		// Sort this mess
		$addStudentForm.submit(addStudent);
		$courseSelectContainer.change(renderBatchSelectMenu);
		$courseSelectContainer.change(renderCourseFee);
		$courseSelectContainer.change(renderNetFee);
		$courseSelectContainer.change(renderBalancePending);
		$discountAmount.blur(renderNetFee);
		$discountAmount.blur(renderBalancePending);
		$feeCollected.blur(renderBalancePending);
		$eaIdInput.blur(fetchAndRenderUserInfoFromEaId);
	}

	function bindDynamic() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteStudent);
	}

	function renderBatchSelectMenu() {
		$batchSelectContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			const courseId = $courseSelectContainer.filter(`[data-tuition-id="${tuitionId}"]`).val();

			const batchesOfThisCourse = distinctBatchesArr.filter(batchObj => batchObj.courseId === courseId);
			// FIXME: Template Name
			const batchOptionsHTML = template.courseOptions({ courses: batchesOfThisCourse });
			$container.html(batchOptionsHTML).selectpicker('refresh');
		});
	}

	function render() {
		$studentContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const studentsOfThisTuition = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);

			const studentCardsHtml = template.studentCard({ students: studentsOfThisTuition });
			$container.html(studentCardsHtml);
		});

		$courseSelectContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const coursesOfThisTuition = distinctCoursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
			const courseOptionsHTML = template.courseOptions({ courses: coursesOfThisTuition });
			$container.html(courseOptionsHTML).selectpicker('refresh');
		});

		renderBatchSelectMenu();
		renderCourseFee();
		renderNetFee();
		renderBalancePending();
	}

	function refresh() {
		render();
		cacheDynamic();
		bindDynamic();
	}

	function init(studentsArray, courseArr, batchArr) {
		if (studentsArray === undefined) throw new Error('Students array not defined');
		studentsArr = JSON.parse(JSON.stringify(studentsArray));
		distinctCoursesArr = JSON.parse(JSON.stringify(courseArr));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchArr));
		cache();
		bindevents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	PubSub.subscribe('course.add', (msg, courseAdded) => {
		distinctCoursesArr.push(courseAdded);
		refresh();
	});

	PubSub.subscribe('course.edit', (msg, editedCourse) => {
		distinctCoursesArr.forEach(courseObj => {
			if (courseObj._id === editedCourse._id) courseObj.code = editedCourse.code;
		});
		distinctCoursesArr.forEach(batchObj => {
			if (editedCourse._id === batchObj.courseId) batchObj.courseCode = editedCourse.code;
		})
		refresh();
	});

	PubSub.subscribe('course.delete', (msg, deletedCourse) => {
		distinctCoursesArr = distinctCoursesArr.filter(courseObj => courseObj._id !== deletedCourse._id);
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj.courseId !== deletedCourse._id);
		refresh();
	});

	PubSub.subscribe('batch.add', (msg, addedBatch) => {
		distinctBatchesArr.push(addedBatch);
		refresh();
	});

	PubSub.subscribe('batch.edit', (msg, editedBatch) => {
		distinctBatchesArr = distinctBatchesArr.map(batchObj => {
			if (batchObj._id === editedBatch._id) return editedBatch;
			return batchObj;
		});
		refresh();
	});

	PubSub.subscribe('batch.delete', (msg, removedBatch) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj._id !== removedBatch._id);
		refresh();
	});

	return { init };
})();
