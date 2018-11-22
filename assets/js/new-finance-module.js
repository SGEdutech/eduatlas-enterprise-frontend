const finance = (() => {
	let distinctStudentsArr;
	let distinctBatchesArr;
	let distinctCoursesArr;
	let distinctDiscountsArr;
	let $studentSearchInp;
	let $batchCheckboxes;
	let $resetBtn;
	let $studentsContainer;
	let $studentCards;
	let $batchCheckboxContainer;
	let $landingContainer;
	let $detailsContainer;
	let $detailsDisplayContainer;
	let $backBtn;
	let $paymentEditBtn;
	let $deletePaymentBtn;
	let $financeCourseSelect;
	let $addPaymentForm;
	let $addInstallmentForm;
	let $modeOfPaymentSelect;
	let $modeOfPaymentDetailsContainer;
	let $deleteInstallmentBtn;
	let $editInstallmentBtn;
	let $financeDiscountSelect;
	let $courseFeeInp;
	let $discountAmountInp;
	let $discountReasonInp;
	let $netFeeInp;
	let $additionalDiscountInp;

	function getCourseFee(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuition Id is not provided');

		const courseId = $financeCourseSelect.filter(`[data-tuition-id="${tuitionId}"]`).val();
		if (Boolean(courseId) === false) return 0;
		return distinctCoursesArr.find(courseObj => courseObj._id === courseId).fees;
	}

	function getTotalDiscountAmount(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuition Id is not provided');
		let totalDiscount = 0;
		const discountId = $financeDiscountSelect.filter(`[data-tuition-id="${tuitionId}"]`).val();
		if (discountId) {
			const { amount, isPercent } = distinctDiscountsArr.find(discountObj => discountObj._id === discountId);
			const baseFee = getCourseFee(tuitionId);
			totalDiscount += randomScripts.calcTotalDiscountedAmount({ baseFee, discount: amount, isPercent });
		}
		let additionalDiscount = $additionalDiscountInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		additionalDiscount = parseInt(additionalDiscount, 10) || 0;
		totalDiscount += additionalDiscount;
		return totalDiscount;
	}

	function renderNetFee() {
		$netFeeInp.each((__, inp) => {
			const $inp = $(inp);
			const tuitionId = $inp.attr('data-tuition-id');
			const baseFee = getCourseFee(tuitionId);
			const totalDiscountAmount = getTotalDiscountAmount(tuitionId);
			$inp.val(baseFee - totalDiscountAmount);
		});
	}

	function renderDiscountReason() {
		$discountReasonInp.each((__, inp) => {
			const $inp = $(inp);
			const tuitionId = $inp.attr('data-tuition-id');
			let discountReason = '';
			const discountId = $financeDiscountSelect.filter(`[data-tuition-id="${tuitionId}"]`).val();
			const additionalDiscount = $additionalDiscountInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
			if (discountId) {
				let { code } = distinctDiscountsArr.find(discountObj => discountObj._id === discountId);
				code = code.toUpperCase();
				discountReason = code;
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

	function renderDiscountAmount() {
		$discountAmountInp.each((__, inp) => {
			const $inp = $(inp);
			const tuitionId = $inp.attr('data-tuition-id');
			const totalDiscount = getTotalDiscountAmount(tuitionId);
			$inp.val(totalDiscount);
		});
	}

	function renderCourseFee() {
		$courseFeeInp.each((__, inp) => {
			const $inp = $(inp);
			const tuitionId = $inp.attr('data-tuition-id');
			const courseFee = getCourseFee(tuitionId);
			$inp.val(courseFee);
		});
	}

	async function deleteInstallemnt(event) {
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
			unbindAllDetailsElements(tuitionId);
			renderDetails(tuitionId, studentId);
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
		const studentToEdit = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
		const paymentInfo = studentToEdit.payments.find(paymentObj => paymentObj._id === paymentId);
		const installmentInfo = paymentInfo.installments.find(installmentObj => installmentObj._id === installmentId);
		const editInstallmentInputHTML = template.installmentEditInputs(installmentInfo);
		modal.renderFormContent(editInstallmentInputHTML);
		modal.bindSubmitEvent(e => editInstallment(e, tuitionId, studentId, paymentId, installmentId));
		modal.showModal();
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
			unbindAllDetailsElements(tuitionId);
			notification.push('Installment has been successfully edited');
			renderDetails(tuitionId, studentId);
		} catch (err) {
			console.error(err);
		}
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
		$modeOfPaymentDetailsContainer.filter(`[data-tuition-id='${tuitionId}']`).html(inputsHTML);
	}

	// FIXME: Find a more efficient way to unbind
	function unbindAllDetailsElements(tuitionId) {
		if (tuitionId) {
			$detailsDisplayContainer.filter(`[data-tuition-id='${tuitionId}']`).find('*').off();
		} else {
			$detailsDisplayContainer.filter(`[data-tuition-id='${tuitionId}']`).find('*').off();
		}
	}

	async function addInstallment(event) {
		try {
			event.preventDefault();
			const $form = $(event.target);
			const tuitionId = $form.attr('data-tuition-id');
			const studentId = $form.attr('data-student-id');
			const paymentId = $form.attr('data-payment-id');
			const addedInstallment = await tuitionApiCalls.putInstallmentInStudent(tuitionId, studentId, paymentId, $form.serialize());
			distinctStudentsArr.forEach((studentObj, stuIndex) => {
				if (studentObj._id === studentId) {
					studentObj.payments.forEach((paymentObj, payIndex) => {
						if (paymentObj._id === paymentId) {
							distinctStudentsArr[stuIndex].payments[payIndex].installments.push(addedInstallment);
						}
					})
				}
			})
			notification.push('Installment has been successfully added');
			renderDetails(tuitionId, studentId);
		} catch (err) {
			console.error(err);
		}
	}

	async function addPayment(event) {
		try {
			event.preventDefault();
			const $form = $(event.target);
			const tuitionId = $form.attr('data-tuition-id');
			const studentId = $form.attr('data-student-id');
			const addedPayment = await tuitionApiCalls.putPaymentDetailsInStudent(tuitionId, studentId, $form.serialize());
			const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
			studentInfo.payments.push(addedPayment);
			notification.push('Payment Details has been successfully added');
			unbindAllDetailsElements(tuitionId);
			renderDetails(tuitionId, studentId);
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
			unbindAllDetailsElements(tuitionId);
			notification.push('Payment Details has been successfully edited');
			renderDetails(tuitionId, studentId);
		} catch (err) {
			console.error(err);
		}
	}

	async function deletePayment(event) {
		try {
			event.preventDefault();
			$btn = $(event.target);
			const tuitionId = $btn.attr('data-tuition-id');
			const studentId = $btn.attr('data-student-id');
			const paymentId = $btn.attr('data-payment-id');
			await tuitionApiCalls.deletePaymentDetailsInStudent(tuitionId, studentId, paymentId);
			const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
			studentInfo.payments = studentInfo.payments.filter(paymentObj => paymentObj._id !== paymentId);
			notification.push('Payment Details has been successfully deleted');
			unbindAllDetailsElements(tuitionId);
			renderDetails(tuitionId, studentId);
		} catch (err) {
			console.error(err);
		}
	}

	function initPaymentEditModal(event) {
		$btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		const studentId = $btn.attr('data-student-id');
		const paymentId = $btn.attr('data-payment-id');
		const studentToEdit = distinctStudentsArr.filter(studentObj => studentObj._id === studentId);
		let paymentInfo;
		studentToEdit[0].payments.forEach(paymentObj => {
			if (paymentObj._id === paymentId) {
				paymentInfo = paymentObj;
			}
		})
		const editPaymentInputHTML = template.paymentEditInputs(paymentInfo);
		modal.renderFormContent(editPaymentInputHTML);
		modal.bindSubmitEvent(e => editPayment(e, tuitionId, studentId, paymentId));
		modal.showModal();
	}

	function showLandingAndDistroyDatailsDisplay(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		unbindAllDetailsElements(tuitionId);
		$detailsDisplayContainer.filter(`[data-tuition-id='${tuitionId}']`).html('');
		$landingContainer.filter(`[data-tuition-id='${tuitionId}']`).removeClass('d-none');
		$detailsContainer.filter(`[data-tuition-id='${tuitionId}']`).addClass('d-none');
	}

	function initCourseSelect(tuitionId) {
		const courseList = distinctCoursesArr.filter(obj => obj.tuitionId === tuitionId);
		const courseOptionsHTML = template.financeCourseOptions({ courses: courseList });
		$financeCourseSelect.filter(`[data-tuition-id='${tuitionId}']`).html(courseOptionsHTML);
	}

	function initDiscountSelect(tuitionId) {
		const discountList = distinctDiscountsArr.filter(discountObj => discountObj.tuitionId === tuitionId);
		const dicountOptionsHTML = template.discountSelectOptions({ discounts: discountList });
		$financeDiscountSelect.filter(`[data-tuition-id='${tuitionId}']`).html(dicountOptionsHTML);
	}

	function fixDateFormatAndCalculateFee(studentInfo) {
		studentInfo.payments.forEach(paymentObj => {
			if (paymentObj.nextInstallmentDate) {
				paymentObj.nextInstallmentDate = moment(paymentObj.nextInstallmentDate).format('MMM Do');
			}
			if (paymentObj.discountAmount && paymentObj.courseFee) {
				paymentObj.netFee = paymentObj.courseFee - paymentObj.discountAmount;
			}
			let totalFeeCollected = 0;
			paymentObj.installments.forEach(installmentObj => {
				if (installmentObj.feeCollected) {
					totalFeeCollected += installmentObj.feeCollected;
				}
				if (installmentObj.nextInstallment) {
					installmentObj.nextInstallment = moment(installmentObj.nextInstallment).format('MMM Do');
				}
				if (installmentObj.dateOfCheque) {
					installmentObj.dateOfCheque = moment(installmentObj.dateOfCheque).format('MMM Do');
				}
			});
			if (paymentObj.discountAmount && paymentObj.courseFee) {
				paymentObj.pendingBalance = paymentObj.netFee - totalFeeCollected;
			}
		});
	}

	function renderDetails(tuitionId, studentId) {
		const studentInfo = distinctStudentsArr.find(studentObj => studentObj._id === studentId);
		fixDateFormatAndCalculateFee(studentInfo);
		const detailsHtml = template.financeDetailView(studentInfo);
		$detailsDisplayContainer.filter(`[data-tuition-id='${tuitionId}']`).html(detailsHtml);
		cacheDynamic();
		bindDynamic();
		initCourseSelect(tuitionId);
		initDiscountSelect(tuitionId);
	}

	function showDetails() {
		const $card = $(this);
		const studentId = $card.attr('data-student-id');
		const tuitionId = $card.attr('data-tuition-id');
		renderDetails(tuitionId, studentId);
		$landingContainer.filter(`[data-tuition-id='${tuitionId}']`).addClass('d-none');
		$detailsContainer.filter(`[data-tuition-id='${tuitionId}']`).removeClass('d-none');
	}

	function renderAllStudents(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		refresh({ renderTuitionId: tuitionId });
	}

	function getStudentFromSelectedBatchArr(selectedBatchesArr) {
		if (selectedBatchesArr === undefined) throw new Error('Selected batch array not provided');
		// Return all students if no batch is selected
		if (selectedBatchesArr.length === 0) return distinctStudentsArr;
		const studentsArr = [];
		selectedBatchesArr.forEach(batchId => {
			const batchInfo = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
			batchInfo.students.forEach(studentId => {
				studentsArr.push(distinctStudentsArr.find(studentObj => studentObj._id === studentId));
			});
		});
		return studentsArr;
	}

	function getSelectedBatchesArr(tuitionId) {
		if (tuitionId === undefined) throw new Error('Tuition id not provided');
		const selectedBatchesArr = [];
		const $selectedBatchesOfThisTuition = $batchCheckboxes.filter(`[data-tuition-id='${tuitionId}']:checked`);
		$selectedBatchesOfThisTuition.each((__, checkbox) => {
			const $checkbox = $(checkbox);
			selectedBatchesArr.push($checkbox.val());
		});
		return selectedBatchesArr;
	}

	function injectCheckedBatchInfo(batchInfoArr, checkedBatchesIdArr) {
		if (batchInfoArr === undefined) throw new Error('Batch info array not provided');
		if (checkedBatchesIdArr === undefined) throw new Error('Checked batches array not provided');

		if (Array.isArray(batchInfoArr) === false) throw new Error('Batch info is not an array');
		if (Array.isArray(checkedBatchesIdArr) === false) throw new Error('Checked Batches is not an array');

		batchInfoArr.forEach(batchObj => batchObj.isChecked = checkedBatchesIdArr.indexOf(batchObj._id) !== -1);
	}

	function renderFilteredStudents(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		const selectedBatchesArr = getSelectedBatchesArr(tuitionId);
		const studentsOfSelectedBatchArr = getStudentFromSelectedBatchArr(selectedBatchesArr);
		const searchStr = $studentSearchInp.filter(`[data-tuition-id='${tuitionId}']`).val();
		const regex = new RegExp(searchStr, 'i');
		const searchResultArr = studentsOfSelectedBatchArr.filter(studentObj => regex.test(studentObj.name));
		refresh({ studentsArr: searchResultArr, renderTuitionId: tuitionId, batchesArr: selectedBatchesArr });
	}

	function renderStudents(opts) {
		opts = opts || {};
		const studentsArr = opts.studentsArr || distinctStudentsArr;
		$studentsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.renderTuitionId && opts.renderTuitionId !== tuitionId) return;

			const studentsOfThisTuition = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			const studentsCardsHtml = template.financeCard({ students: studentsOfThisTuition });
			$container.html(studentsCardsHtml);
		});
	}

	function renderBatchCheckboxes(opts) {
		opts = opts || {};
		opts.batchesArr = opts.batchesArr || [];
		$batchCheckboxContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.tuitionId && opts.tuitionId !== tuitionId) return;

			const batchesOfThisTuition = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
			const clonedBatchesOfThisTuition = JSON.parse(JSON.stringify(batchesOfThisTuition));
			injectCheckedBatchInfo(clonedBatchesOfThisTuition, opts.batchesArr);
			const batchesCheckboxHtml = template.financeBatchesCheckboxes({ batches: clonedBatchesOfThisTuition });
			$container.html(batchesCheckboxHtml);
		});
	}

	function render(opts) {
		renderStudents(opts);
		renderBatchCheckboxes(opts);
	}

	function cache() {
		$studentSearchInp = $('.finance-search-inp');
		$resetBtn = $('.finance-search-reset');
		$studentsContainer = $('.finance-student-container');
		$batchCheckboxContainer = $('.finance-batch-container');
		$landingContainer = $('.finance-landing-container');
		$detailsContainer = $('.finance-detail-container');
		$detailsDisplayContainer = $('.finance-dynamic-container');
		$backBtn = $('.landing-view-btn');
	}

	function cacheDynamic() {
		$batchCheckboxes = $('.finance-batches');
		$studentCards = $('.finance-card');
		$paymentEditBtn = $('.payment-edit-btn');
		$deletePaymentBtn = $('.delete-payment-btn');
		$financeCourseSelect = $('.finance-course-select');
		$addPaymentForm = $('.add-payment-form');
		$addInstallmentForm = $('.add-installment-form');
		$modeOfPaymentSelect = $('.finance-mode-of-payment-select');
		$modeOfPaymentDetailsContainer = $('.finance-mode-of-payment-details-container');
		$deleteInstallmentBtn = $('.delete-installment-btn');
		$editInstallmentBtn = $('.installment-edit-btn');
		$financeDiscountSelect = $('.finance-discount-select');
		$courseFeeInp = $('.finance-course-fee');
		$discountAmountInp = $('.finance-discount-amount');
		$discountReasonInp = $('.finance-discount-reason');
		$netFeeInp = $('.finance-net-fee');
		$additionalDiscountInp = $('.finance-additional-discount');
	}

	function bindEvents() {
		$studentSearchInp.on('input paste', renderFilteredStudents);
		$resetBtn.click(renderAllStudents);
		$backBtn.click(showLandingAndDistroyDatailsDisplay);
	}

	function bindDynamic() {
		$studentCards.click(showDetails);
		$batchCheckboxes.change(renderFilteredStudents);
		$paymentEditBtn.click(initPaymentEditModal);
		$deletePaymentBtn.click(deletePayment);
		$addPaymentForm.submit(addPayment);
		$addInstallmentForm.submit(addInstallment);
		$modeOfPaymentSelect.change(showModeOfPaymentDetailsInputs);
		$deleteInstallmentBtn.click(deleteInstallemnt);
		$editInstallmentBtn.click(initInstallmentEditModal);

		$financeCourseSelect.change(renderCourseFee);
		$financeCourseSelect.change(renderNetFee);

		$financeDiscountSelect.change(renderDiscountAmount);
		$financeDiscountSelect.change(renderDiscountReason);
		$financeDiscountSelect.change(renderNetFee);

		$additionalDiscountInp.on('input paste', renderDiscountAmount);
		$additionalDiscountInp.on('input paste', renderDiscountReason);
		$additionalDiscountInp.on('input paste', renderNetFee);
	}

	function refresh(opts) {
		unbindAllDetailsElements()
		render(opts);
		cacheDynamic();
		bindDynamic();
	}

	function init(studentsArr, coursesArr, batchesArr, discountsArr) {
		if (studentsArr === undefined) throw new Error('Students not provided');
		if (Array.isArray(studentsArr) === false) throw new Error('Students array must be an array');

		if (coursesArr === undefined) throw new Error('Courses not provided');
		if (Array.isArray(coursesArr) === false) throw new Error('Courses array must be an array');

		if (batchesArr === undefined) throw new Error('Batches not provided');
		if (Array.isArray(batchesArr) === false) throw new Error('Batches array must be an array');

		if (discountsArr === undefined) throw new Error('Discounts is not provided');
		if (Array.isArray(discountsArr) === false) throw new Error('Discounts is not an array');

		distinctStudentsArr = JSON.parse(JSON.stringify(studentsArr));
		distinctCoursesArr = JSON.parse(JSON.stringify(coursesArr));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchesArr));
		distinctDiscountsArr = JSON.parse(JSON.stringify(discountsArr));

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	PubSub.subscribe('student.add', (msg, studentAdded) => {
		if (Array.isArray(studentAdded)) {
			distinctStudentsArr = studentsArr.concat(studentAdded);
		} else {
			distinctStudentsArr.push(studentAdded);
		}
		refresh();
	});

	PubSub.subscribe('student.edit', (msg, studentEdited) => {
		distinctStudentsArr = distinctStudentsArr.map(studentObj => studentObj._id === studentEdited._id ? studentEdited : studentObj);
		refresh();
	});

	PubSub.subscribe('student.delete', (msg, studentDeleted) => {
		distinctStudentsArr = distinctStudentsArr.filter(studentObj => studentObj._id !== studentDeleted._id);
		refresh();
	});

	PubSub.subscribe('course.delete', (msg, deletedCourse) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj.courseId !== deletedCourse._id);
		refresh();
	});

	return { init };
})();
