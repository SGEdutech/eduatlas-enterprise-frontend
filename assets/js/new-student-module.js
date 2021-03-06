// FIXME: Datetimepicker initialized in bind events
const student = (() => {
	let distinctCoursesArr;
	let distinctBatchesArr;
	let distinctStudentsArr;
	let distinctDiscountsArr;
	let distinctTuitionsArr;
	let $addStudentForm;
	let $editButton;
	let $deleteButton;
	let $studentContainer;
	let $courseSelectContainer;
	let $batchSelectContainer;
	let $courseIdInp;
	let $gstPercentage;
	let $courseFee;
	let $netFee;
	let $grossFee;
	let $totalDiscountAmount;
	let $additionalDiscountInp;
	let $discountReason;
	let $taxAmount;
	let $feeCollectedInp;
	let $balancePending;
	let $studentNameInp;
	let $studentEmailInp;
	let $studentAddressInp;
	let $studentNumberInp;
	let $eAIdModalTriggerBtn;
	let $eAIdModal;
	let $eAIdInp;
	let $eASuceedBtn;
	let $eAForm;
	let $modeOfPaymentSelect;
	let $modeOfPaymentDetailsContainer;
	let $exelUploadInp;
	let $addStudentFromExcelBtn;
	let $studentSearchInp;
	let $studentSearchReset;
	let $installmentDateInp;
	let $discountSelectContainer;
	let $compulsoryFieldsContainer;
	let $addStudentBtn;
	let $additionalFieldsContainer;
	let $installmentDetailsContainers;
	let $studentInputs;
	let $rollNumberInp;
	let $installmentDetailsInputs;
	let $studentRecieptModal;
	let $studentReceiptDownloadBtn;
	let $studentReceiptPrintBtn;
	let $studentReceiptMailBtn;
	let $landingContainer;
	let $detailsContainer;
	let $viewDetailsBtn;
	let $backBtnDetails;
	let $detailsStudentEditBtn;
	let $detailsStudentDeleteBtn;
	let $detailsPaymentEditBtn;
	let $detailsPaymentDeleteBtn;
	let $detailsInstallmentEditBtn;
	let $detailsInstallmentDeleteBtn;
	let recieptEmail;
	let docDef;

	function getNameToValueObj($inputs) {
		if ($inputs === undefined) throw new Error('Inputs not provided');
		if ($inputs instanceof $ === false) throw new Error('Must be jquery element');

		const nameToValueObj = {};

		// FIXME: Check if all elements are inputs
		$inputs.each((__, input) => {
			const $input = $(input);
			const inputName = $input.attr('name');
			const inputValue = $input.val();
			if (inputName && inputValue) nameToValueObj[inputName] = inputValue;
		});
		return nameToValueObj;
	}

	function getTotalDiscountAmount(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuition Id is not provided')

		const baseFee = $courseFee.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const discountId = $discountSelectContainer.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const discountCoupenInfo = distinctDiscountsArr.find(discountObj => discountObj._id === discountId);
		let totalDiscount = 0;
		if (discountCoupenInfo) {
			const { amount, isPercent } = discountCoupenInfo;
			totalDiscount += randomScripts.calcTotalDiscountedAmount({ baseFee, discount: amount, isPercent });
		}
		const additionalDiscount = parseInt($additionalDiscountInp.filter(`[data-tuition-id="${tuitionId}"]`).val(), 10) || 0;
		totalDiscount += additionalDiscount;
		return totalDiscount;
	}

	function sortStudentArray(studentArr) {
		studentArr.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
	}

	function showDetailsContainer(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuiton id not provided');
		$landingContainer.filter(`[data-tuition-id="${tuitionId}"]`).addClass('d-none');
		$detailsContainer.filter(`[data-tuition-id="${tuitionId}"]`).removeClass('d-none');
	}

	function showLandingContainer(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuiton id not provided');
		$detailsContainer.filter(`[data-tuition-id="${tuitionId}"]`).addClass('d-none').html('');
		$landingContainer.filter(`[data-tuition-id="${tuitionId}"]`).removeClass('d-none');
	}

	function viewLandingContainer(event) {
		const $backBtn = $(event.currentTarget);
		const tuitionId = $backBtn.attr('data-tuition-id');
		showLandingContainer(tuitionId);
	}

	function renderStudentDetailsContainer(studentId, tuitionId) {
		if (studentId === undefined) throw new Error('Student id not provided');
		if (tuitionId === undefined) throw new Error('Tuition id not provided');

		const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
		const detailsHtml = template.configStudentDetails(studentInfo);
		$detailsContainer.filter(`[data-tuition-id="${tuitionId}"]`).html(detailsHtml);
	}

	function refreshStudentDetails(studentId, tuitionId) {
		if (studentId === undefined) throw new Error('Student id not provided');
		if (tuitionId === undefined) throw new Error('Tuition id not provided');

		renderStudentDetailsContainer(studentId, tuitionId);
		cacheDynamic();
		bindDynamic();
	}

	function initStudentDetails(event) {
		$viewBtn = $(event.currentTarget);
		const tuitionId = $viewBtn.attr('data-tuition-id');
		const studentId = $viewBtn.attr('data-student-id');
		renderStudentDetailsContainer(studentId, tuitionId);
		showDetailsContainer(tuitionId);
		cacheDynamic();
		bindDynamic();
	}

	async function deleteStudent(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const studentId = $deleteBtn.attr('data-student-id');
			const deletedStudent = await tuitionApiCalls.deleteStudentInTuition(tuitionId, studentId);
			// FIXME: add institute name in message
			notificationApiCalls.putNewNotification(tuitionId, 'You have been removed from our Study Monitor', [deletedStudent.email])
			distinctStudentsArr = distinctStudentsArr.filter(studentObj => studentObj._id !== studentId);
			notification.push(`${deletedStudent.name} has been successfully deleted`);
			PubSub.publish('student.delete', deletedStudent);
			// Closing details container if details container is open
			if ($detailsContainer.filter(`[data-tuition-id="${tuitionId}"]`).hasClass('d-none') === false) showLandingContainer(tuitionId);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function isEditedEmailDuplicate(email, idOfStudentBeingEdited, tuitionId) {
		if (email === undefined) throw new Error('Email not provided');
		if (idOfStudentBeingEdited === undefined) throw new Error('Id of student being edited is not provided')

		const studentsOfThisTuititon = distinctStudentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
		return randomScripts.isDuplicate(studentsOfThisTuititon, 'email', email, idOfStudentBeingEdited);
	}

	function isEditedRollNumberDuplicate(rollNumber, idOfStudentBeingEdited, tuitionId) {
		if (rollNumber === undefined) throw new Error('Roll number not provided');
		if (idOfStudentBeingEdited === undefined) throw new Error('Id of student being edited is not provided')
		if (tuitionId === undefined) throw new Error('Tutition id is not provided')

		const studentsOfThisTuititon = distinctStudentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
		return randomScripts.isDuplicate(studentsOfThisTuititon, 'rollNumber', rollNumber, idOfStudentBeingEdited);
	}

	function validateEditedData(editedData, idOfStudentBeingEdited, tuitionId) {
		if (editedData === undefined) throw new Error('Data not provide');
		if (typeof editedData !== 'object') throw new Error('Data must be an object');
		if (idOfStudentBeingEdited === undefined) throw new Error('Id of student being edited is not provided')
		if (tuitionId === undefined) throw new Error('Tutition id is not provided')

		if (isEditedRollNumberDuplicate(editedData.rollNumber, idOfStudentBeingEdited, tuitionId)) {
			alert('Roll number already exist');
			return false;
		}
		if (isEditedEmailDuplicate(editedData.email, idOfStudentBeingEdited, tuitionId)) {
			alert('Email already exist');
			return false;
		}
		return true;
	}

	async function editStudent(event, tuitionId, studentId) {
		try {
			event.preventDefault();
			const editedData = modal.getInputsDataObj();
			if (validateEditedData(editedData, studentId, tuitionId) === false) return;
			const editedStudent = await tuitionApiCalls.editStudentInTuition(tuitionId, studentId, editedData);
			modal.hideModal();
			notification.push('Student has been successfully edited');
			editedStudent.tuitionId = tuitionId;
			distinctStudentsArr = distinctStudentsArr.map(studentObj => studentObj._id === studentId ? editedStudent : studentObj)
			PubSub.publish('student.edit', editedStudent);
			// Refreshing student edit container if it's open
			if ($detailsContainer.filter(`[data-tuition-id="${tuitionId}"]`).hasClass('d-none') === false) refreshStudentDetails(studentId, tuitionId);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function studentEditModalInit(event) {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const studentId = $editBtn.attr('data-student-id');
		const studentInfo = distinctStudentsArr.find(studentToBeEdited => studentToBeEdited._id === studentId);
		if (studentInfo.nextInstallment) studentInfo.nextInstallment = studentInfo.nextInstallment.split('T')[0];
		const editStudentInputHTML = template.studentEditInputs(studentInfo);
		modal.renderFormContent(editStudentInputHTML);
		modal.bindSubmitEvent(e => editStudent(e, tuitionId, studentId));
		modal.showModal();
	}

	async function deletePayment(event) {
		try {
			$btn = $(event.target);
			const tuitionId = $btn.attr('data-tuition-id');
			const studentId = $btn.attr('data-student-id');
			const paymentId = $btn.attr('data-payment-id');
			await tuitionApiCalls.deletePaymentDetailsInStudent(tuitionId, studentId, paymentId);
			const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
			studentInfo.payments = studentInfo.payments.filter(paymentObj => paymentObj._id !== paymentId);
			notification.push('Payment Details has been successfully deleted');
			refreshStudentDetails(studentId, tuitionId);
		} catch (err) {
			console.error(err);
		}
	}

	async function editPayment(event, tuitionId, studentId, paymentId) {
		try {
			event.preventDefault();
			const editedData = modal.getInputsDataObj();
			const editedPayment = await tuitionApiCalls.editPaymentDetailsInStudent(tuitionId, studentId, paymentId, editedData);
			modal.hideModal();
			const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
			studentInfo.payments = studentInfo.payments.map(paymentObj => paymentObj._id === paymentId ? editedPayment : paymentObj);
			notification.push('Payment Details has been successfully edited');
			refreshStudentDetails(studentId, tuitionId);
		} catch (err) {
			console.error(err);
		}
	}

	async function deleteInstallment(event) {
		try {
			event.preventDefault();
			$btn = $(event.target);
			const tuitionId = $btn.attr('data-tuition-id');
			const studentId = $btn.attr('data-student-id');
			const paymentId = $btn.attr('data-payment-id');
			const installmentId = $btn.attr('data-installment-id');
			await tuitionApiCalls.deleteInstallmentInStudent(tuitionId, studentId, paymentId, installmentId);
			const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
			const paymentInfo = studentInfo.payments.find(paymentObj => paymentObj._id === paymentId);
			paymentInfo.installments = paymentInfo.installments.filter(installmentObj => installmentObj._id !== installmentId)
			notification.push('Installment has been successfully deleted');
			refreshStudentDetails(studentId, tuitionId);
		} catch (err) {
			console.error(err);
		}
	}

	async function editInstallment(event, tuitionId, studentId, paymentId, installmentId) {
		try {
			event.preventDefault();
			const editedData = modal.getInputsDataObj();
			const editedInstallment = await tuitionApiCalls.editInstallmentInStudent(tuitionId, studentId, paymentId, installmentId, editedData);
			modal.hideModal();
			const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
			const paymentInfo = studentInfo.payments.find(paymentObj => paymentObj._id === paymentId);
			paymentInfo.installments = paymentInfo.installments.map(installmentObj => installmentObj._id === installmentId ? editedInstallment : installmentObj);
			notification.push('Installment has been successfully edited');
			refreshStudentDetails(studentId, tuitionId);
		} catch (err) {
			console.error(err);
		}
	}

	function initInstallmentEditModal(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		const studentId = $btn.attr('data-student-id');
		const paymentId = $btn.attr('data-payment-id');
		const installmentId = $btn.attr('data-installment-id');
		const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
		const paymentInfo = studentInfo.payments.find(paymentObj => paymentObj._id === paymentId);
		const installmentInfo = paymentInfo.installments.find(installmentObj => installmentObj._id === installmentId);
		const editInstallmentInputHTML = template.installmentEditInputs(installmentInfo);
		modal.renderFormContent(editInstallmentInputHTML);
		modal.bindSubmitEvent(e => editInstallment(e, tuitionId, studentId, paymentId, installmentId));
		modal.showModal();
	}


	function paymentEditModalEdit(event) {
		$btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		const studentId = $btn.attr('data-student-id');
		const paymentId = $btn.attr('data-payment-id');
		const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
		const paymentInfo = studentInfo.payments.find(paymentObj => paymentObj._id === paymentId);
		const editPaymentInputHTML = template.paymentEditInputs(paymentInfo);
		modal.renderFormContent(editPaymentInputHTML);
		modal.bindSubmitEvent(e => editPayment(e, tuitionId, studentId, paymentId));
		modal.showModal();
	}

	async function emailReciept() {
		try {
			await tuitionApiCalls.emailReciept({ email: recieptEmail, docDef: JSON.stringify(docDef) })
			notification.push(`Reciept has been mailed to ${recieptEmail}`);
		} catch (err) {
			console.error(err);
		}
	}

	function initRecieptModal(studentInfo) {
		if (studentInfo === undefined) throw new Error('Student info not provided');
		if (studentInfo.payments === undefined) throw new Error('Student payments info not provided');
		if (studentInfo.payments[0].installments === undefined) throw new Error('Student installments info not provided');

		const tuitionId = studentInfo.tuitionId;
		const tuition = distinctTuitionsArr.find(tuitionObj => tuitionObj._id === tuitionId);

		const paymentInfo = studentInfo.payments[0];
		const installmentInfo = studentInfo.payments[0].installments[0];

		const courseId = paymentInfo.courseId;
		const courseInfo = distinctCoursesArr.find(courseObj => courseObj._id === courseId);

		const gstPercentage = courseInfo.gstPercentage || 0;
		const netFee = courseInfo.fees - paymentInfo.discountAmount;
		const gstAmount = netFee * (gstPercentage / 100);
		const totalAmount = netFee + gstAmount;
		const balanceAmount = totalAmount - installmentInfo.feeCollected;


		docDef = getDocDef({
			businessName: tuition.recieptConfigBusinessName,
			addressLine1: tuition.recieptConfigAddressLine1,
			addressLine2: tuition.recieptConfigAddressLine2,
			pin: tuition.recieptConfigPinCode,
			city: tuition.recieptConfigCity,
			state: tuition.recieptConfigState,
			taxId: tuition.recieptConfigGstNumber,
			userName: studentInfo.name,
			productDescription: courseInfo.code,
			productAmount: courseInfo.fees,
			couponName: paymentInfo.discountReason,
			couponAmount: paymentInfo.discountAmount,
			gstPercentage: courseInfo.gstPercentage,
			gstAmount,
			totalAmount,
			// FIXME: Rename amount paid
			paidToDate: installmentInfo.feeCollected,
			balance: balanceAmount
		});
		recieptEmail = studentInfo.email;
		$studentRecieptModal.modal('show');
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

	// Returns discount amount if in percentage
	function calibrateDiscountAmount(courseFee, discountAmount) {
		if (discountAmount === undefined) return 0;
		if (typeof discountAmount !== 'string') throw new Error('Discount amount must be a string');
		if (discountAmount.charAt(discountAmount.length - 1) !== '%') return parseFloat(discountAmount);

		courseFee = parseFloat(courseFee);
		discountAmount = parseFloat(discountAmount);
		return courseFee * (discountAmount / 100);
	}

	function isDatePassed(installmentDate, tuitionId) {
		if (installmentDate === undefined) throw new Error('Installment date is not provided')
		if (installmentDate instanceof Date === false) throw new Error('Installment date must be date');
		if (tuitionId === undefined) throw new Error('Tuition id is not provided')

		// This allows todays date to be added
		installmentDate.setDate(installmentDate.getDate() + 1);
		return installmentDate.getTime() < Date.now();
	}

	function isRollNumberDuplicate(rollNumber, tuitionId) {
		if (rollNumber === undefined) throw new Error('Roll number is not provided')
		if (tuitionId === undefined) throw new Error('Tuition id is not provided')

		const studentsOfThisTuition = distinctStudentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
		return randomScripts.isDuplicate(studentsOfThisTuition, 'rollNumber', rollNumber);
	}

	function isEmailDuplicate(email, tuitionId) {
		if (email === undefined) throw new Error('Email is not provided')
		if (tuitionId === undefined) throw new Error('Tuition id is not provided')

		const studentsOfThisTuition = distinctStudentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
		return randomScripts.isDuplicate(studentsOfThisTuition, 'email', email);
	}

	// FIXME: Can be optimised if we filter students of this tuition in this function once
	function isNewStudentDataValid(newStudentData, tuitionId) {
		if (newStudentData === undefined) throw new Error('Student data is not provided')
		if (typeof newStudentData !== 'object') throw new Error('Student data must be an object')
		if (tuitionId === undefined) throw new Error('Tuition ID is not provided')

		const isNextinstallmentDateDefined = Boolean(newStudentData.payments &&
			typeof newStudentData.payments === 'object' &&
			typeof newStudentData.payments[0] === 'object' &&
			newStudentData.payments[0].nextInstallment);
		if (isNextinstallmentDateDefined) {
			const nextInstallmentDate = new Date(newStudentData.payments[0].nextInstallment);
			if (isDatePassed(nextInstallmentDate, tuitionId)) {
				alert('Installment date you have entered has already passed!');
				return false;
			}
		}
		if (isRollNumberDuplicate(newStudentData.rollNumber, tuitionId)) {
			alert('A student with same roll number already exist!');
			return false;
		}
		if (isEmailDuplicate(newStudentData.email, tuitionId)) {
			alert('A student with same email already exist!');
			return false;
		}
		return true;
	}

	async function addStudent(event) {
		try {
			event.preventDefault();
			alertForMoreOrLessFeeCollected();
			alertStudentEmailAlreadyLinked();
			const $btn = $(event.target);
			const tuitionId = $btn.attr('data-tuition-id');
			const studentObj = getNameToValueObj($studentInputs.filter(`[data-tuition-id="${tuitionId}"]`).not('.not-submit'));
			const payment = getNameToValueObj($paymentDetailsInputs.filter(`[data-tuition-id="${tuitionId}"]`).not('.not-submit'));
			const installment = getNameToValueObj($installmentDetailsInputs.filter(`[data-tuition-id="${tuitionId}"]`).not('.not-submit'));
			if (randomScripts.isObjEmpty(payment) === false) {
				if (payment.courseFee) {
					payment.discountAmount = calibrateDiscountAmount(payment.courseFee, payment.discountAmount);
					if (payment.nextInstallmentDate) payment.nextInstallmentDate = randomScripts.getDateObjFromIsoDateStr(payment.nextInstallmentDate);
					studentObj.payments = [payment];
					if (randomScripts.isObjEmpty(installment) === false) {
						payment.installments = [installment];
					}
				} else {
					alert('Payment details won\'t be updated as course fee is not provided');
				}
			} else if (randomScripts.isObjEmpty(installment) === false) {
				alert('Installment details won\'t be updated as you haven\'t setup payment details yet');
			}
			const batchInfo = getNameToValueObj($studentCourseBatchInputs.filter(`[data-tuition-id="${tuitionId}"]`).not('.not-submit'));
			let isBatchAllocated = false;
			if (batchInfo.courseId && batchInfo.batchId) {
				studentObj.batchInfo = batchInfo;
				isBatchAllocated = true;
			}
			if (isNewStudentDataValid(studentObj, tuitionId) === false) return;
			const newStudent = await tuitionApiCalls.putStudentInTuition(tuitionId, studentObj);
			// FIXME: add institute name in message
			notificationApiCalls.putNewNotification(tuitionId, 'You have been added to our Study Monitor', [studentObj.email])
			newStudent.tuitionId = tuitionId;
			PubSub.publish('student.add', newStudent);
			if (isBatchAllocated) {
				const batchOfStudentAdded = distinctBatchesArr.find(batchObj => batchObj._id === batchInfo.batchId);
				batchOfStudentAdded.students.push(newStudent._id);
				PubSub.publish('batch.edit', batchOfStudentAdded);
			}
			notification.push(`${newStudent.name} has been added`);
			// FIXME: Wtf is this for
			$btn.trigger('reset');
			refresh();
			if (newStudent.payments.length !== 0 && newStudent.payments[0].installments.length !== 0) initRecieptModal(newStudent);
		} catch (err) {
			console.error(err);
		}
	}

	function renderNetFee() {
		$netFee.each((__, input) => {
			const $input = $(input);
			const tuitionId = $input.attr('data-tuition-id');

			const courseId = $courseSelectContainer.filter(`[data-tuition-id="${tuitionId}"]`).val();
			if (Boolean(courseId) === false) {
				$input.val(0);
				return;
			}
			const courseFee = distinctCoursesArr.find(courseObj => courseObj._id === courseId).fees;
			const totalDiscountAmount = getTotalDiscountAmount(tuitionId);
			$input.val(courseFee - totalDiscountAmount);
		});
	}

	function renderBalancePending() {
		$balancePending.each((__, input) => {
			const $input = $(input);
			const tuitionId = $input.attr('data-tuition-id');

			const grossFee = parseInt($grossFee.filter(`[data-tuition-id="${tuitionId}"]`).val(), 10);
			const feeCollected = parseInt($feeCollectedInp.filter(`[data-tuition-id="${tuitionId}"]`).val(), 10) || 0;

			const balancePending = (grossFee - feeCollected).toFixed(2);
			$input.val(balancePending);
		});
	}

	function renderDiscountReason() {
		$discountReason.each((__, inp) => {
			const $inp = $(inp);
			const tuitionId = $inp.attr('data-tuition-id');
			const discountId = $discountSelectContainer.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const additionalDiscount = $additionalDiscountInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
			let discountReason = '';
			if (discountId) {
				let discountCode = distinctDiscountsArr.find(discountObj => discountObj._id === discountId).code;
				discountCode = discountCode.toUpperCase();
				discountReason = discountCode;
			}
			if (additionalDiscount) {
				if (discountReason) {
					discountReason = `${discountReason} + Additional Discount(${additionalDiscount})`
				} else {
					discountReason = `Additional Discount(${additionalDiscount})`
				}
			}
			$inp.val(discountReason);
		});
	}

	function renderTaxAmount() {
		$taxAmount.each((__, inp) => {
			const $inp = $(inp);
			const tuitionId = $inp.attr('data-tuition-id');
			const courseId = $courseSelectContainer.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const courseInfo = distinctCoursesArr.find(courseObj => courseObj._id === courseId);
			if (courseInfo === undefined) return;
			const netFee = parseInt($netFee.filter(`[data-tuition-id="${tuitionId}"]`).val());
			const gstPercentage = courseInfo.gstPercentage || 0;
			const taxAmount = netFee * (gstPercentage / 100);
			$inp.val(taxAmount);
		});
	}

	function renderGrossFee() {
		$grossFee.each((__, inp) => {
			const $inp = $(inp);
			const tuitionId = $inp.attr('data-tuition-id');
			const netFee = parseInt($netFee.filter(`[data-tuition-id="${tuitionId}"]`).val(), 10);
			const taxAmount = parseInt($taxAmount.filter(`[data-tuition-id="${tuitionId}"]`).val(), 10);
			$inp.val(netFee + taxAmount);
		});
	}

	function renderCourseId(event) {
		const $select = $(event.target);
		const courseId = $select.val();
		const tuitionId = $select.attr('data-tuition-id');
		$courseIdInp.filter(`[data-tuition-id="${tuitionId}"]`).val(courseId);
	}

	function renderCourseGstPercentage(event) {
		const $select = $(event.target);
		const courseId = $select.val();
		const tuitionId = $select.attr('data-tuition-id');
		const gstPercentage = distinctCoursesArr.find(courseObj => courseObj._id === courseId).gstPercentage || 0;
		$gstPercentage.filter(`[data-tuition-id="${tuitionId}"]`).val(gstPercentage);
	}

	function renderCourseFee() {
		$courseFee.each((__, input) => {
			const $input = $(input);
			const tuitionId = $input.attr('data-tuition-id');

			const courseId = $courseSelectContainer.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const courseInfo = distinctCoursesArr.find(courseObj => courseObj._id === courseId);
			if (courseInfo === undefined) {
				$input.val('');
				return;
			}
			$input.val(courseInfo.fees);
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

	async function fetchAndRenderUserInfoAndCloseModal(event) {
		try {
			event.preventDefault();
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
		// FIXME
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
		} else if (selectedModeOfPayment === 'cash') {
			inputsHTML = template.modeOfPaymentCashInputs();
		}
		$modeOfPaymentDetailsContainer.filter(`[data-tuition-id="${tuitionId}"]`).html(inputsHTML);
	}

	function sanitizeStudentExcelData(data) {
		if (data === undefined) throw new Error('Student data not provided');
		if (Array.isArray(data) === false) throw new Error('Student data must be an array');

		data.forEach((studentDetailObj, index) => {
			if (!studentDetailObj['Roll Number*'] || !studentDetailObj['Name*'] || !studentDetailObj['E-Mail*'] || !studentDetailObj['Contact Number*']) {
				data.splice(index, 1);
			}
		});
	}

	function displaystudents(studentsDetails, tuitionId) {
		sanitizeStudentExcelData(studentsDetails.data);
		excelUploadModal.init(studentsDetails, distinctStudentsArr, distinctCoursesArr, distinctBatchesArr, tuitionId);
	}

	function parseAndDisplayStudents(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		$exelUploadInp.filter(`[data-tuition-id="${tuitionId}"]`).parse({ config: { complete: data => displaystudents(data, tuitionId), header: true } });
	}

	function renderTotalDiscountAmount() {
		$totalDiscountAmount.each((__, inp) => {
			const $inp = $(inp);
			const tuitionId = $inp.attr('data-tuition-id');

			const totalDiscountAmount = getTotalDiscountAmount(tuitionId);
			$inp.val(totalDiscountAmount);
		});
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

	function cache() {
		$addStudentForm = $('.new-student-form');
		$studentContainer = $('.student-container');
		$courseSelectContainer = $('.student-course-select-menu');
		$batchSelectContainer = $('.student-batch-select-menu');
		$courseFee = $('.student-course-fee');
		$courseIdInp = $('.student-course-id');
		$gstPercentage = $('.student-gst-percentage');
		$netFee = $('.student-net-fee');
		$grossFee = $('.student-gross-fee');
		$totalDiscountAmount = $('.student-total-discount-amount');
		$taxAmount = $('.student-tax');
		$additionalDiscountInp = $('.student-additional-discount');
		$feeCollectedInp = $('.student-fee-colected');
		$balancePending = $('.student-balance-pending');
		$studentNameInp = $('.student-name-inp');
		$studentEmailInp = $('.student-email-inp');
		$studentAddressInp = $('.student-address-inp');
		$studentNumberInp = $('.student-phone-inp');
		$eAIdModal = $('#ea_id_modal');
		$eAIdInp = $('#ea_id_inp');
		$eAForm = $('#ea-form');
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
		$discountReason = $('.student-discount-reason');
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
		$rollNumberInp = $('.student-roll-number');
		$installmentDetailsContainers = $('.student-fee-container');
		$installmentDetailsInputs = $installmentDetailsContainers.find('input');
		$studentRecieptModal = $('#student_receipt_modal');
		$studentReceiptDownloadBtn = $('#student_receipt_download_btn');
		$studentReceiptPrintBtn = $('#student_receipt_print_btn');
		$studentReceiptMailBtn = $('#student_receipt_mail_btn');
		$landingContainer = $('.student-landing-container');
		$detailsContainer = $('.student-details-container');
	}

	function bindevents() {
		// Sort this mess
		$addStudentForm.submit(addStudent)
		$eAIdModalTriggerBtn.click(initEAIdModal);
		$eAForm.submit(fetchAndRenderUserInfoAndCloseModal);
		$modeOfPaymentSelect.change(showModeOfPaymentDetailsInputs);
		$addStudentFromExcelBtn.click(parseAndDisplayStudents);
		$studentSearchReset.click(clearSearch);
		$studentSearchInp.on('input paste', renderSearchResults);

		$courseSelectContainer.change(renderBatchSelectMenu);
		$courseSelectContainer.change(renderCourseId);
		$courseSelectContainer.change(renderCourseGstPercentage);
		$courseSelectContainer.change(renderCourseFee);
		$courseSelectContainer.change(renderNetFee);
		$courseSelectContainer.change(renderTaxAmount);
		$courseSelectContainer.change(renderGrossFee);
		$courseSelectContainer.change(renderBalancePending);

		$additionalDiscountInp.on('input paste', renderNetFee);
		$additionalDiscountInp.on('input paste', renderTotalDiscountAmount);
		$additionalDiscountInp.on('input paste', renderDiscountReason);
		$additionalDiscountInp.on('input paste', renderTaxAmount);
		$additionalDiscountInp.on('input paste', renderGrossFee);
		$additionalDiscountInp.on('input paste', renderBalancePending);

		$discountSelectContainer.change(renderTotalDiscountAmount);
		$discountSelectContainer.change(renderNetFee);
		$discountSelectContainer.change(renderDiscountReason);
		$discountSelectContainer.change(renderTaxAmount);
		$discountSelectContainer.change(renderGrossFee);
		$discountSelectContainer.change(renderBalancePending);

		$feeCollectedInp.on('input paste', renderBalancePending);

		$studentRecieptModal.on('hidden.bs.modal', () => {
			docDef = undefined;
			recieptEmail = undefined;
		});
		$studentReceiptDownloadBtn.click(() => pdfMake.createPdf(docDef).download('receipt.pdf'));
		$studentReceiptPrintBtn.click(() => pdfMake.createPdf(docDef).print());
		$studentReceiptMailBtn.click(emailReciept);
		// Datetimepicker
		$installmentDateInp.datetimepicker(dateTimePickerConfig.datePicker);
	}

	function cacheDynamic() {
		$editButton = $('.student-edit');
		$deleteButton = $('.delete-student-btn');
		$viewDetailsBtn = $('.view-student-btn');
		$backBtnDetails = $('.student-landing-view-btn');
		$detailsStudentEditBtn = $('.config-student-edit-btn');
		$detailsStudentDeleteBtn = $('.config-student-delete-btn');
		$detailsPaymentEditBtn = $('.student-payment-edit-btn');
		$detailsPaymentDeleteBtn = $('.student-payment-delete-btn');
		$detailsInstallmentEditBtn = $('.student-installment-edit-btn');
		$detailsInstallmentDeleteBtn = $('.student-installment-delete-btn');
	}

	function bindDynamic() {
		$editButton.click(studentEditModalInit);
		$deleteButton.click(deleteStudent);
		$viewDetailsBtn.click(initStudentDetails);
		$backBtnDetails.click(viewLandingContainer);
		$detailsStudentEditBtn.click(studentEditModalInit);
		$detailsStudentDeleteBtn.click(deleteStudent);
		$detailsPaymentEditBtn.click(paymentEditModalEdit);
		$detailsPaymentDeleteBtn.click(deletePayment);
		$detailsInstallmentEditBtn.click(initInstallmentEditModal);
		$detailsInstallmentDeleteBtn.click(deleteInstallment);
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
		const searchStr = $studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const searchResultsArr = randomScripts.getStudentSearchResults(distinctStudentsArr, searchStr);
		refresh(searchResultsArr, tuitionId);
	}

	function render(studentsArr, renderTuitionId) {
		$studentContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			if (renderTuitionId && renderTuitionId !== tuitionId) return;

			const studentsOfThisTuition = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			const studentCardsHtml = template.studentCard({ students: studentsOfThisTuition });
			$container.html(studentCardsHtml);

			const modeOfPaymentDetailInputsHTML = template.modeOfPaymentCashInputs();
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
		$batchSelectContainer.selectpicker('refresh');
	}

	function refresh(studentsArr, renderTuitionId) {
		studentsArr = studentsArr || distinctStudentsArr;
		sortStudentArray(studentsArr);
		render(studentsArr, renderTuitionId);
		cacheDynamic();
		bindDynamic();
	}

	function init(studentsArray, courseArr, batchArr, discountArr, tuitionsArr) {
		if (studentsArray === undefined) throw new Error('Students array not defined');
		sortStudentArray(studentsArray);
		distinctStudentsArr = JSON.parse(JSON.stringify(studentsArray));
		distinctCoursesArr = JSON.parse(JSON.stringify(courseArr));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchArr));
		distinctDiscountsArr = JSON.parse(JSON.stringify(discountArr));
		distinctTuitionsArr = JSON.parse(JSON.stringify(tuitionsArr));
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
		distinctCoursesArr = distinctCoursesArr.map(courseObj => courseObj._id === editedCourse._id ? editedCourse : courseObj);
		distinctBatchesArr.forEach(batchObj => {
			if (batchObj.courseId === editedCourse._id) batchObj.courseCode = editedCourse.code;
		});
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

	PubSub.subscribe('tuition.edit', (msg, editedTuition) => {
		distinctTuitionsArr = distinctTuitionsArr.map(tuitionObj => tuitionObj._id === editedTuition._id ? editedTuition : tuitionObj);
		refresh();
	});

	return { init };
})();
