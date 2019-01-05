const resourses = (() => {
	let distinctResoursesArr
	let studentsArr;
	let distinctBatchesArr;
	let $selectStudentContainer;
	let $selectBatchContainer;
	let $studentCheckbox;
	let $batchCheckbox;
	let $selectWholeInstitute;
	let $studentSearchInp;
	let $studentSearchResetBtn;
	let $allUploadedFilesContainer;
	let $deleteResourseBtn;
	let $editResourseBtn;
	let $addResourseForm;

	async function deleteResourse(event) {
		try {
			const $btn = $(event.currentTarget);
			const tuitionId = $btn.attr('data-tuition-id');
			const resourseId = $btn.attr('data-resourse-id');
			const deletedResourse = await tuitionApiCalls.deleteResourseInTuition(tuitionId, resourseId);
			notification.push('Your resourse has been successfully deleted');
			distinctResoursesArr = distinctResoursesArr.filter(resourseObj => resourseObj._id !== deletedResourse._id);
			refresh();
		} catch (e) {
			console.error(e);
		}
	}

	async function addResourse(event) {
		try {
			event.preventDefault();
			const $form = $(event.currentTarget);
			const tuitionId = $form.attr('data-tuition-id');
			const formData = new FormData($form[0]);

			const userEmails = [];
			const $checkedStudentCheckbox = $studentCheckbox.filter(`[data-tuition-id="${tuitionId}"]:checked`);
			$checkedStudentCheckbox.each((__, inp) => {
				const $inp = $(inp);
				userEmails.push($inp.val());
			});
			if (userEmails.length === 0) {
				alert('Please select atleast one student');
				throw new Error('no user selected');
			}

			const newResourse = await tuitionApiCalls.putResourseInTuition(tuitionId, formData);
			newResourse.tuitionId = tuitionId;
			distinctResoursesArr.push(newResourse);
			notification.push('Your resourse has been successfully uploaded');
			$form.trigger('reset');
			refresh();
		} catch (e) {
			console.error(e);
		}
	}

	function markOrUnmarkBatchStudents(event) {
		const $checkBox = $(event.target);
		const tuitionId = $checkBox.attr('data-tuition-id');

		const isChecked = $checkBox.is(':checked');
		const batchId = $checkBox.val();
		const batch = distinctBatchesArr.find(batchObj => batchObj._id === batchId);
		$studentCheckbox.filter(`[data-tuition-id="${tuitionId}"]`)
			.each((__, checkbox) => {
				$checkbox = $(checkbox);
				const studentId = $checkbox.attr('data-student-id');
				const studentFound = Boolean(batch.students.find(idOfStudent => idOfStudent === studentId));
				if (studentFound) {
					if (isChecked) {
						$checkbox.prop('checked', true);
					} else {
						$checkbox.prop('checked', false);
					}
				}
			});
	}

	function cache() {
		$selectStudentContainer = $('.select-resourses-students');
		$selectBatchContainer = $('.select-resourses-batches');
		$selectWholeInstitute = $('.resourses-select-institute');
		$studentSearchInp = $('.resourses-student-search-inp');
		$studentSearchResetBtn = $('.resourses-student-search-reset');
		$allUploadedFilesContainer = $('.all-uploaded-files-container');
		$addResourseForm = $('.resourse-add-form');
	}

	function cacheDynamic() {
		$studentCheckbox = $selectStudentContainer.find('input:checkbox');
		$batchCheckbox = $selectBatchContainer.find('input:checkbox');
		$deleteResourseBtn = $('.delete-resourse-btn');
		$editResourseBtn = $('.edit-resourse-btn');
	}

	function bindDynamic() {
		$batchCheckbox.off().change(markOrUnmarkBatchStudents);
		$deleteResourseBtn.click(deleteResourse);
	}

	function filterAndRenderSearceResults(event) {
		const $input = $(event.target);
		const tuitionId = $input.attr('data-tuition-id');
		const searchStr = $studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val();
		const searchResultsArr = randomScripts.getStudentSearchResults(studentsArr, searchStr);
		refresh({ renderStudentsArr: searchResultsArr, renderTuitionId: tuitionId });
	}

	function resetSearchResults(event) {
		const $btn = $(event.target);
		const tuitionId = $btn.attr('data-tuition-id');
		$studentSearchInp.filter(`[data-tuition-id="${tuitionId}"]`).val('');
		refresh({ renderTuitionId: tuitionId })
	}

	function render(opts) {
		opts = opts || {};
		opts.renderStudentsArr = opts.renderStudentsArr || studentsArr;
		$selectStudentContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.renderTuitionId && opts.renderTuitionId !== tuitionId) return

			const studentsOfThisInstitute = opts.renderStudentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			const studentsOptionsHtml = template.announcementStudentsTable({ students: studentsOfThisInstitute });
			$container.html(studentsOptionsHtml);
		});

		$selectBatchContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.tuitionId && opts.tuitionId !== tuitionId) return

			const batchesOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
			const batchesOptionsHtml = template.batchesTable({ batches: batchesOfThisInstitute });
			$container.html(batchesOptionsHtml);
		});

		$allUploadedFilesContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (opts.tuitionId && opts.tuitionId !== tuitionId) return
			const resoursesOfThisTuitionArr = distinctResoursesArr.filter(resourseObj => resourseObj.tuitionId === tuitionId);
			// console.log(resoursesOfThisTuitionArr);
			const notificationDisplayCardsHtml = template.resourseCards({ resourses: resoursesOfThisTuitionArr });
			$container.html(notificationDisplayCardsHtml);
		});
	}

	function markOrUnmarkAllStudents(event) {
		const $checkBox = $(event.target);
		const tuitionId = $checkBox.attr('data-tuition-id');
		if ($checkBox.is(':checked')) {
			$studentCheckbox.filter(`[data-tuition-id="${tuitionId}"]`).prop('checked', true);
		} else {
			$studentCheckbox.filter(`[data-tuition-id="${tuitionId}"]`).prop('checked', false);
		}
	}

	function bindEvents() {
		$addResourseForm.submit(addResourse);
		// $sendBtn.click(addNotification);
		$selectWholeInstitute.change(markOrUnmarkAllStudents);
		$studentSearchInp.on('input paste', filterAndRenderSearceResults);
		$studentSearchResetBtn.click(resetSearchResults);
	}

	function refresh(opts) {
		render(opts);
		cacheDynamic();
		bindDynamic();
	}

	function init(resoursesArr, batchesArr, students) {
		if (batchesArr === undefined) throw new Error('Batch array not provided!');
		if (Array.isArray(batchesArr) === false) throw new Error('Batches not an array');

		if (students === undefined) throw new Error('Students array not provided!');
		if (Array.isArray(students) === false) throw new Error('Students not an array');

		if (resoursesArr === undefined) throw new Error('Files array not provided!');
		if (Array.isArray(resoursesArr) === false) throw new Error('Files not an array');

		// const autoGeneratedMessages = [
		// 	'You have been added to our Study Monitor',
		// 	'You have been removed from our Study Monitor',
		// 	'Classes has been added to your batch',
		// 	'A class of your batch has been edited',
		// 	'A class from your batch has been deleted'
		// ];

		// notificationArr = notificationArr.filter(notificationObj => autoGeneratedMessages.indexOf(notificationObj.message) === -1);
		distinctResoursesArr = JSON.parse(JSON.stringify(resoursesArr));
		studentsArr = JSON.parse(JSON.stringify(students));
		distinctBatchesArr = JSON.parse(JSON.stringify(batchesArr));

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamic();
	}

	PubSub.subscribe('course.edit', (msg, editedCourse) => {
		distinctBatchesArr.forEach(batchObj => {
			if (editedCourse._id === batchObj.courseId) batchObj.courseCode = editedCourse.code;
		});
		refresh();
	});

	PubSub.subscribe('course.delete', (msg, deletedCourse) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj.courseId !== deletedCourse._id);
		refresh();
	});

	PubSub.subscribe('batch.add', (msg, addedBatch) => {
		distinctBatchesArr.push(addedBatch);
		refresh();
	});

	PubSub.subscribe('batch.edit', (msg, editedBatch) => {
		distinctBatchesArr = distinctBatchesArr.map(batchObj => batchObj._id === editedBatch._id ? editedBatch : batchObj);
		refresh();
	});

	PubSub.subscribe('batch.delete', (msg, removedBatch) => {
		distinctBatchesArr = distinctBatchesArr.filter(batchObj => batchObj._id !== removedBatch._id);
		refresh();
	});

	PubSub.subscribe('student.add', (msg, studentAdded) => {
		if (Array.isArray(studentAdded)) {
			studentsArr = studentsArr.concat(studentAdded);
			return;
		}
		studentsArr.push(studentAdded);
		refresh();
	});

	PubSub.subscribe('student.edit', (msg, studentEdited) => {
		studentsArr = studentsArr.map(studentObj => studentObj._id === studentEdited._id ? studentEdited : studentObj);
		refresh();
	});

	PubSub.subscribe('student.delete', (msg, studentDeleted) => {
		studentsArr = studentsArr.filter(studentObj => studentObj._id !== studentDeleted._id);
		refresh();
	});

	return { init };
})();
