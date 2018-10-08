const student = (() => {
	let studentsArr;
	let $addStudentForm;
	let $editButton;
	let $deleteButton;
	let $studentContainer;

	async function deleteStudent(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const studentId = $deleteBtn.attr('data-student-id');
			const deletedStudent = await tuitionApiCalls.deleteStudentInTuition(tuitionId, studentId);
			newStudentsArr = studentsArr.filter(studentObj => studentObj._id !== studentId);
			refresh(newStudentsArr);
		} catch (err) {
			console.error(err);
		}
	}

	async function editStudent(tuitionId, studentId) {
		try {
			const editedData = modal.serializeForm();
			// TODO: Replace with tuition API calls
			console.log(tuitionId);
			const editedStudent = await tuitionApiCalls.editStudentInTuition(tuitionId, studentId, editedData);
			modal.hideModal();
			console.log('Student was successfully edited');
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
		const studentInfo = studentsArr.find(studentToBeEdited => studentToBeEdited._id === studentId);
		const editStudentInputHTML = template.studentEditInputs(studentInfo);
		modal.renderFormContent(editStudentInputHTML);
		modal.bindSubmitEvent(() => editStudent(tuitionId, studentId));
		modal.showModal();
	}

	async function addStudent(event) {
		try {
			event.preventDefault();
			const $form = $(event.target);
			const tuitionId = $form.attr('data-id');
			const newStudent = await tuitionApiCalls.putStudentInTuition(tuitionId, $form.serialize());
			studentsArr.push(newStudent);
			refresh(studentsArr);
			$form.trigger('reset');
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
		$editButton = $('.student-edit');
		$deleteButton = $('.delete-student-btn');
	}

	function bindDynamic() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteStudent);
	}

	function render() {
		const studentCardsHtml = template.studentCard({ students: studentsArr });
		$studentContainer.html(studentCardsHtml);
	}

	function refresh(newStudentsArray) {
		if (newStudentsArray) studentsArr = newStudentsArray;
		render();
		cacheDynamic();
		bindDynamic();
	}

	function init(studentsArray) {
		if (studentsArray === undefined) throw new Error('Students array not defined');
		studentsArr = studentsArray;

		cache();
		bindevents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	return { init };
})();