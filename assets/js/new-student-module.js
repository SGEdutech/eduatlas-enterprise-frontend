const student = (() => {
	let studentsArr;
	let $addStudentForm;
	let $editButton;
	let $deleteButton;
	let $studentContainer;

	async function editStudent(tuitionId, studentId) {
		try {
			const editedData = modal.serializeForm();
			// TODO: Replace with tuition API calls
			const editedStudent = await tuitionApiCalls.updateInArrayInTuition(tuitionId, 'students', studentId, editedData);
			modal.hideModal();
			console.log('Course was successfully edited');
			editedStudent.tuitionId = tuitionId;
			const newStudentArr = studentsArr.map(studentObj => studentObj._id === studentId ? editedStudent : studentObj)
			refresh(newStudentArr);
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit() {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const studentId = $editBtn.attr('data-student-id');
		const studentInfo = studentsArr.find(studedntToBeEdited => studedntToBeEdited._id === studentId);
		const editStudentInputHTML = template.studentEditInputs(studentInfo);
		modal.renderFormContent(editStudentInputHTML);
		modal.bindSubmitEvent(() => editStudent(tuitionId, courseId));
		modal.showModal();
	}

	async function addStudent(event) {
		try {
			event.preventDefault();
			const $form = $(e.target);
			const tuitionId = $form.attr('data-id');
			const newStudent = await tuitionApiCalls.putInArrayInTuition(idOfTuition, 'students', $form.serialize());
			studentsArr.push(newStudent);
			refresh(studentsArr);
		} catch (err) {
			console.error(err);
		}
	}

	function cache() {
		$addStudentForm = $('.add-student-form');
		$studentContainer = $('#student_container');
	}

	function bindevents() {
		$addStudentForm.submit(addStudent);
	}

	function cacheDynamic() {
		$editButton = $('.batch-edit');
		$deleteButton = $('.delete-batch-btn');
	}

	function bindDynamic() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteStudent);
	}

	function render() {
		const cardsHtml = template.studentCard({ students: studentsArr });
		$studentContainer.html(cardsHtml);
	}

	function refresh(newStudentsArray) {
		if (newStudentsArray) studentsArr = newStudentsArray;
		render();
		cacheDynamic();
		bindDynamic();
	}

	function init(studentsArray) {
		if (studentsArr === undefined) throw new Error('Students array not defined');
		studentsArr = studentsArray;

		cache();
		bindevents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	return { init };
})();
