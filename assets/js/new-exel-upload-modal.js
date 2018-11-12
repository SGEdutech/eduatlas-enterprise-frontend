const excelUploadModal = (() => {
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
		const paymentStuffArr = ['discountAmount', 'discountReason', 'feeCollected', 'modeOfPayment', 'bank', 'dateOfCheck', 'checkNumber', 'cardNumber', 'transactionId', 'nextInstallment'];

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

	function getInputValues($inputs) {
		if ($inputs === undefined) return [];
		if ($inputs instanceof $ === false) throw new Error('Inputs must be jquery object');

		const inputsDataObj = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			inputsDataObj[$input.attr('name')] = $input.val();
		});
		return inputsDataObj;
	}

	function getStudentDataArr() {
		const allInputsDataArr = [];
		$studentRows.each((__, studentRow) => {
			const $studentRow = $(studentRow);
			const rowNumber = $studentRow.attr('data-row-number');
			const inputsOfThisRow = $inputsInsideStudentRows.filter(`[data-row-number="${rowNumber}"]`);
			allInputsDataArr.push(getInputValues(inputsOfThisRow));
		});
		putPaymentStuffInArr(allInputsDataArr);
		return allInputsDataArr;
	}

	async function submitStudents(event) {
		try {
			event.preventDefault();
			const data = {};
			data.students = getStudentDataArr();
			if ($batchSelectMenu.val()) {
				const batchInfo = {};
				batchInfo.courseId = $courseSelectMenu.val();
				batchInfo.batchId = $batchSelectMenu.val();
				data.batchInfo = batchInfo;
			}
			const newStudents = await tuitionApiCalls.putStudentInTuition(tuitionId, data);
			newStudents.forEach(studentObj => studentObj.tuitionId = tuitionId);
			PubSub.publish('student.add', newStudents);
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

	function init(studentsData, courses, batches, idOfTuition) {
		if (studentsData === undefined) throw new Error('Student data not provided');
		if (courses === undefined) throw new Error('Courses not provided');
		if (batches === undefined) throw new Error('Batches Id not provided');
		if (idOfTuition === undefined) throw new Error('Tuition Id not provided');

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
