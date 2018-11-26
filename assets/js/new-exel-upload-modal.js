const excelUploadModal = (() => {
	let distinceStudentArr;
	let coursesOfThisTuition;
	let batchesOfThisTuition;
	let tuitionId;
	let $studentsDisplayModal;
	let $modalBody;
	let $uploadBtn;
	let $studentRows;
	let $form;
	let $courseSelectMenu;
	let $batchSelectMenu;

	function putPaymentStuffInArr(allInputsDataArr) {
		const paymentStuffArr = ['discountAmount', 'discountReason', 'feeCollected', 'modeOfPayment', 'bank', 'dateOfCheque', 'chequeNumber', 'cardNumber', 'transactionId', 'nextInstallment'];

		allInputsDataArr.forEach(studentObj => {
			const keys = Object.keys(studentObj);
			const paymentObj = {};
			keys.forEach(key => {
				const value = studentObj[key];
				if (paymentStuffArr.indexOf(key) !== -1) {
					paymentObj[key] = value;
					delete studentObj[key];
				}
			});
			studentObj.payments = [paymentObj];
		});
	}

	function getStudentDataArr() {
		const allInputsDataArr = [];
		$studentRows.each((__, studentRow) => {
			const $studentRow = $(studentRow);
			const rowNumber = $studentRow.attr('data-row-number');
			const inputsOfThisRow = $inputsInsideStudentRows.filter(`[data-row-number="${rowNumber}"]`);
			allInputsDataArr.push(randomScripts.getInputsAndSelectDataObj(inputsOfThisRow));
		});
		putPaymentStuffInArr(allInputsDataArr);
		return allInputsDataArr;
	}

	// Checks duplicate against a certain key
	function isDuplicateInStudentsDataArr(studentsDataArr, key) {
		if (studentsDataArr === undefined) throw new Error('Students array not provided');
		if (Array.isArray(studentsDataArr) === false) throw new Error('Student data array is not an array');
		if (key === undefined) throw new Error('Key not provided');
		if (typeof key !== 'string') throw new Error('Key must be a string');

		const allSuspectsArr = studentsDataArr.map(studentObj => studentObj[key]);
		let isDuplicate = false;
		allSuspectsArr.forEach((suspect, index) => {
			if (allSuspectsArr.indexOf(suspect) !== index) isDuplicate = true;
		});
		return isDuplicate;
	}

	function isRollNumberDuplicate(studentsDataArr) {
		return isDuplicateInStudentsDataArr(studentsDataArr, 'rollNumber');
	}

	function isEmailDuplicate(studentsDataArr) {
		return isDuplicateInStudentsDataArr(studentsDataArr, 'email');
	}

	function isAlreadyExist(studentsDataArr, key) {
		if (studentsDataArr === undefined) throw new Error('Students array not provided');
		if (Array.isArray(studentsDataArr) === false) throw new Error('Student data array is not an array');
		if (key === undefined) throw new Error('Key not provided');
		if (typeof key !== 'string') throw new Error('Key must be a string');

		let isDuplicate = false;
		studentsDataArr.forEach(studentObj => {
			const doesStudentWithSameInfoExist = distinceStudentArr.some(allStudentObj => allStudentObj[key] === studentObj[key]);
			if (doesStudentWithSameInfoExist) isDuplicate = true;
		});
		return isDuplicate;
	}

	function isRollNumberAlreadyExist(studentsDataArr) {
		return isAlreadyExist(studentsDataArr, 'rollNumber');
	}

	function isEmailAlreadyExist(studentsDataArr) {
		return isAlreadyExist(studentsDataArr, 'email');
	}

	function validateEntries(studentsDataArr) {
		if (isRollNumberDuplicate(studentsDataArr)) {
			alert('There are duplicate roll numbers!');
			return false;
		}
		if (isEmailDuplicate(studentsDataArr)) {
			alert('There are duplicate emails!');
			return false;
		}
		if (isRollNumberAlreadyExist(studentsDataArr)) {
			alert('One or more of the roll numbers that already exists!');
			return false;
		}
		if (isEmailAlreadyExist(studentsDataArr)) {
			alert('One or more of the emails that already exists!');
			return false;
		}
		return true;
	}

	async function submitStudents(event) {
		try {
			event.preventDefault();
			const data = {};
			const studentsDataArr = getStudentDataArr();
			if (validateEntries(studentsDataArr) === false) return;
			data.students = studentsDataArr;
			const batchId = $batchSelectMenu.val();
			if (batchId) {
				const batchInfo = {};
				batchInfo.courseId = $courseSelectMenu.val();
				batchInfo.batchId = batchId;
				data.batchInfo = batchInfo;
			}
			const newStudents = await tuitionApiCalls.putStudentInTuition(tuitionId, data);
			newStudents.forEach(studentObj => studentObj.tuitionId = tuitionId);
			PubSub.publish('student.add', newStudents);
			if (batchId) {
				const newStudentsIdArr = [];
				newStudents.forEach(studentObj => newStudentsIdArr.push(studentObj._id));
				const batchOfStudentsAdded = batchesOfThisTuition.find(batchObj => batchObj._id === batchId);
				batchOfStudentsAdded.students = batchOfStudentsAdded.students.concat(newStudentsIdArr);
				PubSub.publish('batch.edit', batchOfStudentsAdded);
			}
			hideModal();
		} catch (error) {
			console.error(error);
		}
	}

	function distroyModal() {
		tuitionId = undefined;
		unbindEvents();
	}

	function showModal() {
		$studentsDisplayModal.modal('show');
	}

	function hideModal() {
		$studentsDisplayModal.modal('hide');
	}

	function uploadData() {

	}

	function renderBatchOptions() {
		const courseId = $courseSelectMenu.val();
		batchesOfThisCourse = coursesOfThisTuition.find(courseObj => courseObj._id === courseId).batches;

		const batchOptionHtml = template.batchOptions({ batches: batchesOfThisCourse });
		$batchSelectMenu.html(batchOptionHtml).selectpicker('refresh');
	}

	function cache() {
		$studentsDisplayModal = $('#excel_upload_modal');
		$modalBody = $('#excel_upload_modal_body');
		$uploadBtn = $('#upload_excel_data');
		$form = $('#upload_student_form');
		$courseSelectMenu = $('#course_select_menu');
		$batchSelectMenu = $('#batch_select_menu');
	}

	function cacheDynamic() {
		$studentRows = $('.student-row');
		$inputsInsideStudentRows = $studentRows.find('input');
	}

	function bindEvents() {
		$uploadBtn.click(uploadData);
		$studentsDisplayModal.on('hidden.bs.modal', distroyModal);
		$form.submit(submitStudents);
		$courseSelectMenu.change(renderBatchOptions);
	}

	function unbindEvents() {
		$uploadBtn.off();
		$form.off();
		$courseSelectMenu.off();
	}

	function bindDynamic() {

	}

	function render(studentsData) {
		const courseOptionHtml = template.courseOptions({ courses: coursesOfThisTuition });
		$courseSelectMenu.html(courseOptionHtml).selectpicker('refresh');

		$batchSelectMenu.html('').selectpicker('refresh');

		const bodyHtml = template.studentExcelInputTable({ students: studentsData.data, courses: coursesOfThisTuition, batches: batchesOfThisTuition });
		$modalBody.html(bodyHtml);
	}

	function init(studentsData, allStudentsArr, courses, batches, idOfTuition) {
		if (studentsData === undefined) throw new Error('Student data not provided');
		if (courses === undefined) throw new Error('Courses not provided');
		if (batches === undefined) throw new Error('Batches Id not provided');
		if (idOfTuition === undefined) throw new Error('Tuition Id not provided');
		if (allStudentsArr === undefined) throw new Error('All students array not provided');
		if (Array.isArray(allStudentsArr) === false) throw new Error('All students array not an array');

		distinceStudentArr = JSON.parse(JSON.stringify(allStudentsArr));
		coursesOfThisTuition = courses.filter(courseObj => courseObj.tuitionId === idOfTuition);
		batchesOfThisTuition = batches.filter(batchObj => batchObj.tuitionId === idOfTuition);
		tuitionId = idOfTuition;
		cache();
		bindEvents();
		render(studentsData);
		cacheDynamic();
		showModal();
	}

	return { init };
})();
