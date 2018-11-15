const student = (() => {
	let distinctCoursesArr;
	let distinctBatchesArr;
	let distinctStudentsArr;
	let distinctDiscountsArr;
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
	let $studentNameInp;
	let $studentEmailInp;
	let $studentAddressInp;
	let $studentNumberInp;
	let $eAIdModalTriggerBtn;
	let $eAIdModal;
	let $eAIdInp;
	let $eASuceedBtn;
	let $modeOfPaymentSelect;
	let $modeOfPaymentDetailsContainer;
	let $exelUploadInp;
	let $addStudentFromExcelBtn;
	let $studentSearchInp;
	let $studentSearchReset;
	let $installmentDateInp;
	let $discountSelectContainer;
	let $calculateFeeBtn;
	let $compulsoryFieldsContainer;
	let $addStudentBtn;
	let $additionalFieldsContainer;
	let $studentInputs;

	function calibrateBackslasses(str) {
		return str.replace(/\\/g, '\\\\');
	}

	function getNameToValueObj($inputs) {
		if ($inputs === undefined) throw new Error('Inputs not provided');
		if ($inputs instanceof $ === false) throw new Error('Must be jquery element');

		const nameToValueObj = {};

		// FIXME: Check if all elements are inputs
		$inputs.each((__, input) => {
			const $input = $(input);
			nameToValueObj[$input.attr('name')] = $input.val();
		});
		return nameToValueObj;
	}

	function getDiscountedAmount(totalAmount, discount) {
		discount = discount.toString();
		const isPercentage = discount.charAt(discount.length - 1) === '%';
		discount = parseInt(discount, 10);

		if (isPercentage) {
			return totalAmount - (totalAmount * (discount / 100));
		}
		return totalAmount - discount;
	}

	function sortStudentArray(studentArr) {
		studentArr.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
	}

	async function deleteStudent(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const studentId = $deleteBtn.attr('data-student-id');
			const deletedStudent = await tuitionApiCalls.deleteStudentInTuition(tuitionId, studentId);
			distinctStudentsArr = distinctStudentsArr.filter(studentObj => studentObj._id !== studentId);
			notification.push(`${deletedStudent.name} has been successfully deleted`);
			PubSub.publish('student.delete', deletedStudent);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	async function editStudent(event, tuitionId, studentId) {
		try {
			event.preventDefault();
			const editedData = modal.serializeForm();
			const editedStudent = await tuitionApiCalls.editStudentInTuition(tuitionId, studentId, editedData);
			modal.hideModal();
			notification.push('Student has been successfully edited');
			editedStudent.tuitionId = tuitionId;
			distinctStudentsArr = distinctStudentsArr.map(studentObj => studentObj._id === studentId ? editedStudent : studentObj)
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
		const studentInfo = distinctStudentsArr.find(studentToBeEdited => studentToBeEdited._id === studentId);
		if (studentInfo.nextInstallment) studentInfo.nextInstallment = studentInfo.nextInstallment.split('T')[0];
		const editStudentInputHTML = template.studentEditInputs(studentInfo);
		modal.renderFormContent(editStudentInputHTML);
		modal.bindSubmitEvent(event => editStudent(event, tuitionId, studentId));
		modal.showModal();
	}

	function alertForMoreOrLessFeeCollected() {
		if ($balancePending.val() < 0) alert('You are collecting more fee than necessary!');
	}

	async function alertStudentEmailAlreadyLinked() {
		const studentEmail = $studentEmailInp.val();
		const studentInfoIfExists = await userApiCalls.getSpecificUser({ primaryEmail: studentEmail });
		if (studentInfoIfExists) {
			const EAID = eAIdsAndNumbers.numberToEaId(studentInfoIfExists.eANumber);
			alert(`this email already linked with Name: ${studentInfoIfExists.firstName} , EA id: ${EAID}`)
		}
	}

	function isInstallmentDatePassed(tuitionId) {
		const installmentDate = new Date($installmentDateInp.filter(`[data-tuition-id="${tuitionId}"]`).val());
		// This allows todays date to be added
		installmentDate.setDate(installmentDate.getDate() + 1);
		return installmentDate.getTime() < Date.now();
	}

	async function addStudent(event) {
		try {
			event.preventDefault();
			alertForMoreOrLessFeeCollected();
			alertStudentEmailAlreadyLinked();
			const $btn = $(event.target);
			const tuitionId = $btn.attr('data-tuition-id');
			if (isInstallmentDatePassed(tuitionId)) {
				alert('Installment date you have entered has already passed!');
				return;
			}
			const studentObj = getNameToValueObj($studentInputs.filter(`[data-tuition-id="${tuitionId}"]`));
			studentObj.payments = [getNameToValueObj($paymentDetailsInputs.filter(`[data-tuition-id="${tuitionId}"]`))];
			const batchInfo = getNameToValueObj($studentCourseBatchInputs.filter(`[data-tuition-id="${tuitionId}"]`));
			let isBatchAllocated = false;
			if (batchInfo.courseId && batchInfo.batchId) {
				studentObj.batchInfo = batchInfo;
				isBatchAllocated = true;
			}
			const newStudent = await tuitionApiCalls.putStudentInTuition(tuitionId, studentObj);
			newStudent.tuitionId = tuitionId;
			PubSub.publish('student.add', newStudent);
			if (isBatchAllocated) {
				const batchOfStudentAdded = distinctBatchesArr.find(batchObj => batchObj._id === batchInfo.batchId);
				batchOfStudentAdded.students.push(newStudent._id);
				PubSub.publish('batch.edit', batchOfStudentAdded);
			}
			notification.push(`${newStudent.name} has been added`);
			$btn.trigger('reset');
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

			$input.val(getDiscountedAmount(courseFee, discountAmount));
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

	function clearAndHideEaModal() {
		$eAIdInp.val('');
		$eAIdModal.modal('hide');
	}

	function showEaModal() {
		$eAIdModal.modal('show');
	}

	function populateStudentInfo(userInfo, tuitionId) {
		if (userInfo.firstName) $studentNameInp.filter(`[data-tuition-id="${tuitionId}"]`).val(userInfo.firstName);
		if (userInfo.middleName) $studentNameInp.filter(`[data-tuition-id="${tuitionId}"]`).val(`${$studentNameInp.filter(`[data-tuition-id="${tuitionId}"]`).val()} ${userInfo.middleName}`);
		if (userInfo.lastName) $studentNameInp.filter(`[data-tuition-id="${tuitionId}"]`).val(`${$studentNameInp.filter(`[data-tuition-id="${tuitionId}"]`).val()} ${userInfo.lastName}`);

		if (userInfo.primaryEmail) $studentEmailInp.filter(`[data-tuition-id="${tuitionId}"]`).val(userInfo.primaryEmail);
		if (userInfo.phone) $studentNumberInp.filter(`[data-tuition-id="${tuitionId}"]`).val(userInfo.phone);

		if (userInfo.addressLine1) $studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val(userInfo.addressLine1);
		if (userInfo.addressLine2) $studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val(`${$studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val()} ${userInfo.addressLine2}`);
		if (userInfo.city) $studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val(`${$studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val()} ${userInfo.city}`);
		if (userInfo.state) $studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val(`${$studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val()} ${userInfo.state}`);
		if (userInfo.pin) $studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val(`${$studentAddressInp.filter(`[data-tuition-id="${tuitionId}"]`).val()} ${userInfo.pin}`);
	}

	async function fetchAndRenderUserInfoAndCloseModal() {
		try {
			const eAIdRegex = new RegExp('^[a-zA-z]{3}\\d{5}$', 'i');
			if (eAIdRegex.test($eAIdInp.val()) === false) {
				alert('Not a valid EA ID!');
				return
			}
			const tuitionId = $eASuceedBtn.attr('data-tuition-id');

			const eANumber = eAIdsAndNumbers.eAIdToNumber($eAIdInp.val());
			const userInfo = await userApiCalls.getSpecificUser({ eANumber });
			populateStudentInfo(userInfo, tuitionId);
			clearAndHideEaModal();
		} catch (error) {
			console.error(error);
		}
	}

	function initEAIdModal(event) {
		showEaModal();
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		$eASuceedBtn.attr('data-tuition-id', tuitionId);
	}

	function showModeOfPaymentDetailsInputs(event) {
		const $modeSelect = $(event.target);
		const tuitionId = $modeSelect.attr('data-tuition-id');
		const selectedModeOfPayment = $modeSelect.val();
		let inputsHTML = '';
		if (selectedModeOfPayment === 'cheque') {
			inputsHTML = template.modeOfPaymentChequeInputs();
		} else if (selectedModeOfPayment === 'card') {
			inputsHTML = template.modeOfPaymentCardInputs();
		} else if (selectedModeOfPayment === 'other') {
			inputsHTML = template.modeOfPaymentOtherInputs();
		}
		$modeOfPaymentDetailsContainer.filter(`[data-tuition-id="${tuitionId}"]`).html(inputsHTML);
	}

	function sanitizeStudentExcelData(data) {
		if (data === undefined) throw new Error('Student data not provided');
		if (Array.isArray(data) === false) throw new Error('Student data must be an array');

		data.forEach((studentDetailObj, index) => {
			if (!studentDetailObj['Roll Number*'] || !studentDetailObj['Name*'] || !studentDetailObj['E-Mail*']) {
				data.splice(index, 1);
			}
		});
	}

	function displaystudents(studentsDetails, tuitionId) {
		sanitizeStudentExcelData(studentsDetails.data);
		excelUploadModal.init(studentsDetails, distinctCoursesArr, distinctBatchesArr, tuitionId);
	}

	function parseAndDisplayStudents(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		$exelUploadInp.filter(`[data-tuition-id="${tuitionId}"]`).parse({ config: { complete: data => displaystudents(data, tuitionId), header: true } });
	}

	function renderDiscountAmount() {
		$discountSelectContainer.each((__, selectInp) => {
			const $selectInp = $(selectInp);
			const tuitionId = $selectInp.attr('data-tuition-id');
			const discount = $selectInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
			$discountAmount.filter(`[data-tuition-id="${tuitionId}"]`).val(discount);
		});
	}

	function renderDiscountAmountNetFeeAndBalancePending() {
		renderDiscountAmount();
		renderNetFee();
		renderBalancePending();
	}

	function cache() {
		$addStudentForm = $('.new-student-form');
		$studentContainer = $('.student-container');
		$courseSelectContainer = $('.student-course-select-menu');
		$batchSelectContainer = $('.student-batch-select-menu');
		$courseFee = $('.student-course-fee');
		$netFee = $('.student-net-fee');
		$discountAmount = $('.student-discount-amount');
		$feeCollected = $('.student-fee-colected');
		$balancePending = $('.student-balance-pending');
		$studentNameInp = $('.student-name-inp');
		$studentEmailInp = $('.student-email-inp');
		$studentAddressInp = $('.student-address-inp');
		$studentNumberInp = $('.student-phone-inp');
		$eAIdModal = $('#ea_id_modal');
		$eAIdInp = $('#ea_id_inp');
		$eASuceedBtn = $('#get_student_details_btn');
		$eAIdModalTriggerBtn = $('.ea-id-modal-trigger');
		$modeOfPaymentSelect = $('.mode-of-payment-select');
		$modeOfPaymentDetailsContainer = $('.mode-of-payment-details-container');
		$exelUploadInp = $('.exel-file-upload');
		$addStudentFromExcelBtn = $('.add-students-from-excel-btn');
		$studentSearchInp = $('.student-search-inp');
		$studentSearchReset = $('.student-search-reset');
		$installmentDateInp = $('.student-installment-date-inp');
		$discountSelectContainer = $('.student-discount-code-select');
		$calculateFeeBtn = $('.calculate-fee-btn');
		$compulsoryFieldsContainer = $('.compulsory-fields-container');
		$compulsoryFieldsInputs = $compulsoryFieldsContainer.find('input');
		$paymentDetailsContainer = $('.payment-details-container');
		$paymentDetailsInputs = $paymentDetailsContainer.find('input');
		$addStudentBtn = $('.add-student-btn');
		$additionalFieldsContainer = $('.additional-fields-container');
		$additionalFieldsInputs = $additionalFieldsContainer.find('input');
		$studentCourseBatchContainer = $('.student-course-batch-container');
		$studentCourseBatchInputs = $studentCourseBatchContainer.find('select');
		$studentInputs = $compulsoryFieldsInputs.add($additionalFieldsInputs);
	}

	function cacheDynamic() {
		$editButton = $('.student-edit');
		$deleteButton = $('.delete-student-btn');
	}

	function testFunction() {
		console.log("hi");
	}

	function bindevents() {
		// Sort this mess
		$addStudentForm.submit(addStudent)
		$courseSelectContainer.change(renderBatchSelectMenu);
		$eAIdModalTriggerBtn.click(initEAIdModal);
		$eASuceedBtn.click(fetchAndRenderUserInfoAndCloseModal);
		$modeOfPaymentSelect.change(showModeOfPaymentDetailsInputs);
		$addStudentFromExcelBtn.click(parseAndDisplayStudents);
		$studentSearchReset.click(clearSearch);
		$calculateFeeBtn.click(renderBalancePending);
		$calculateFeeBtn.click(renderNetFee);
		$studentSearchInp.on('paste keyup', renderSearchResults);
		$courseFee.on('textInput input', testFunction);
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
			const batchOptionsHTML = template.batchOptions({ batches: batchesOfThisCourse });
			$container.html(batchOptionsHTML).selectpicker('refresh');
		});
	}

	function clearSearch(event) {
		$btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		$studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val('');
		refresh(distinctStudentsArr, tuitionId);
	}

	function renderSearchResults(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		let searchStr = $studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		searchStr = calibrateBackslasses(searchStr);
		const regex = new RegExp(searchStr, 'i');

		const searchStudentArr = distinctStudentsArr.filter(studentObj => regex.test(studentObj.name));
		refresh(searchStudentArr, tuitionId);
	}

	function render(studentsArr, renderTuitionId) {
		$studentContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			if (renderTuitionId && renderTuitionId !== tuitionId) return;

			const studentsOfThisTuition = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			const studentCardsHtml = template.studentCard({ students: studentsOfThisTuition });
			$container.html(studentCardsHtml);

			const modeOfPaymentDetailInputsHTML = template.modeOfPaymentChequeInputs();
			$modeOfPaymentDetailsContainer.html(modeOfPaymentDetailInputsHTML);
		});

		$courseSelectContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const coursesOfThisTuition = distinctCoursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
			const courseOptionsHTML = template.courseOptions({ courses: coursesOfThisTuition });
			$container.html(courseOptionsHTML).selectpicker('refresh');
		});

		$discountSelectContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const discountsOfThisTuition = distinctDiscountsArr.filter(discountObj => discountObj.tuitionId === tuitionId);
			const discountOptionsHTML = template.discountSelectOptions({ discounts: discountsOfThisTuition });
			$container.html(discountOptionsHTML).selectpicker('refresh');
		});

		renderBatchSelectMenu();
		renderCourseFee();
		renderNetFee();
		renderBalancePending();
	}

	function refresh(studentsArr, renderTuitionId) {
		studentsArr = studentsArr || distinctStudentsArr;
		sortStudentArray(studentsArr);
		render(studentsArr, renderTuitionId);
		cacheDynamic();
		bindDynamic();
	}

	function init(studentsArray, courseArr, batchArr, discountArr) {
		if (studentsArray === undefined) throw new Error('Students array not defined');
		sortStudentArray(studentsArray);
		distinctStudentsArr = JSON.parse(JSON.stringify(studentsArray));
		distinctCoursesArr = JSON.parse(JSON.stringify(courseArr));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchArr));
		distinctDiscountsArr = JSON.parse(JSON.stringify(discountArr));
		cache();
		bindevents();
		render(distinctStudentsArr);
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

	PubSub.subscribe('discount.add', (msg, addedDiscount) => {
		distinctDiscountsArr.push(addedDiscount);
		refresh();
	});

	PubSub.subscribe('discount.edit', (msg, editedDiscount) => {
		distinctDiscountsArr = distinctDiscountsArr.map(discountObj => {
			if (discountObj._id === editedDiscount._id) return editedDiscount;
			return discountObj;
		});
		refresh();
	});

	PubSub.subscribe('discount.delete', (msg, removenDiscount) => {
		distinctDiscountsArr = distinctDiscountsArr.filter(discountObj => discountObj._id !== removenDiscount._id);
		refresh();
	});

	PubSub.subscribe('student.add', (msg, newStudent) => {
		if (Array.isArray(newStudent)) {
			distinctStudentsArr = distinctStudentsArr.concat(newStudent);
		} else {
			distinctStudentsArr.push(newStudent);
		}
		refresh();
	});

	return { init };
})();
