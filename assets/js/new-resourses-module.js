const resourses = (() => {
	// Matches all youtube video urls and groups all the different infos
	const ytUrlRegex = new RegExp('^((?:https?:)?\\/\\/)?((?:www|m)\\.)?((?:youtube\\.com|youtu.be))(\\/(?:[\\w\\-]+\\?v=|embed\\/|v\\/)?)([\\w\\-]+)(\\S+)?$', 'i');
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
	let $deleteResourseBtn;
	let $editResourseBtn;
	let $resourseTypeSelect;
	let $resourseInpContainer;
	let $refrenceMaterialContainer;
	let $homeworkContainer;
	let $assignmentContainer;
	let $youtubeVideoContainer;

	let $addResourseForm;

	function renderInps(event) {
		const $select = $(event.currentTarget);
		const tuitionId = $select.attr('data-tuition-id');
		const typeOfResourse = $select.val();
		if (typeOfResourse === 'video') {
			const videoInpHTML = template.resourseVideoInp();
			$resourseInpContainer.filter(`[data-tuition-id="${tuitionId}"]`).html(videoInpHTML);
		} else {
			const fileInpHTML = template.resourseFileInp();
			$resourseInpContainer.filter(`[data-tuition-id="${tuitionId}"]`).html(fileInpHTML);
		}
	}

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
		$addResourseForm = $('.resourse-add-form');
		$resourseTypeSelect = $('.resourses-select-type');
		$resourseInpContainer = $('.resourse-inp-container');
		$refrenceMaterialContainer = $('.refrence-material-container');
		$homeworkContainer = $('.homework-container');
		$assignmentContainer = $('.assignment-container');
		$youtubeVideoContainer = $('.yt-video-container');
	}

	function bindEvents() {
		$addResourseForm.submit(addResourse);
		// $sendBtn.click(addNotification);
		$selectWholeInstitute.change(markOrUnmarkAllStudents);
		$studentSearchInp.on('input paste', filterAndRenderSearceResults);
		$studentSearchResetBtn.click(resetSearchResults);
		$resourseTypeSelect.change(renderInps);
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

	function getYtVidInfo(url) {
		if (url === undefined) throw new Error('Url not provided');
		if (typeof url !== 'string') throw new Error('Url must be a string');

		const urlBreakdown = ytUrlRegex.exec(url);

		// urlBreakdown will evaluate to null if regex match fails
		if (Boolean(urlBreakdown) === false) throw new Error('Not a valid youtube url');

		const vidId = urlBreakdown[5];

		return $.get({ url: `https:\/\/www.googleapis.com/youtube/v3/videos?part=snippet&id=${vidId}&key=AIzaSyBK6bjBeIAUDJCrbAjSOGKSz4fOU2I6gBI` })
	}

	async function injectYtVidInfo() {
		// We are changing the original object as it is passed by refrence
		const vidResourceArr = distinctResoursesArr.filter(resource => Boolean(resource.ytUrl));
		const promiseArr = [];
		vidResourceArr.forEach(vidResource => promiseArr.push(getYtVidInfo(vidResource.ytUrl)));
		const vidDataArr = await Promise.all(promiseArr);
		vidResourceArr.forEach((vidResource, index) => {
			res = vidDataArr[index];
			// If video id is incorrect
			if (res.items.length === 0) return;
			const vidData = res.items[0].snippet;

			vidResource.thumbnail = vidData.thumbnails.high.url;
			vidResource.title = vidData.title;
			vidResource.description = vidData.description
		});
		return;
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

	function renderStudentsCheakboxes() {
		$selectStudentContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const studentsOfThisInstitute = studentsArr.filter(studentObj => studentObj.tuitionId === tuitionId);
			const studentsOptionsHtml = template.announcementStudentsTable({ students: studentsOfThisInstitute });
			$container.html(studentsOptionsHtml);
		});
	}

	function renderBatchCheakboxes() {
		$selectBatchContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const batchesOfThisInstitute = distinctBatchesArr.filter(batchObj => batchObj.tuitionId === tuitionId);
			const batchesOptionsHtml = template.batchesTable({ batches: batchesOfThisInstitute });
			$container.html(batchesOptionsHtml);
		});
	}

	function renderRefrenceMaterialTab() {
		$refrenceMaterialContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			const resourcesOfThisTuitionArr = distinctResoursesArr.filter(resourseObj => resourseObj.tuitionId === tuitionId);
			const refrenceMaterialOfThisTuitionArr = resourcesOfThisTuitionArr.filter(resourseObj => resourseObj.type === 'reference material');
			const notificationDisplayCardsHtml = template.resourseCards({ resourses: refrenceMaterialOfThisTuitionArr });
			$container.html(notificationDisplayCardsHtml);
		});
	}

	function renderHomeworkTab() {
		$homeworkContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			const resourcesOfThisTuitionArr = distinctResoursesArr.filter(resourseObj => resourseObj.tuitionId === tuitionId);
			const homeworkOfThisTuitionArr = resourcesOfThisTuitionArr.filter(resourseObj => resourseObj.type === 'homework');
			const notificationDisplayCardsHtml = template.resourseCards({ resourses: homeworkOfThisTuitionArr });
			$container.html(notificationDisplayCardsHtml);
		});
	}

	function renderAssignmentTab() {
		$assignmentContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			const resourcesOfThisTuitionArr = distinctResoursesArr.filter(resourseObj => resourseObj.tuitionId === tuitionId);
			const assignmentsOfThisTuitionArr = resourcesOfThisTuitionArr.filter(resourseObj => resourseObj.type === 'test');
			const notificationDisplayCardsHtml = template.resourseCards({ resourses: assignmentsOfThisTuitionArr });
			$container.html(notificationDisplayCardsHtml);
		});
	}

	function renderVideosContainer() {
		$youtubeVideoContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			const resourcesOfThisTuitionArr = distinctResoursesArr.filter(resourseObj => resourseObj.tuitionId === tuitionId);
			const videosOfThisTuitionArr = resourcesOfThisTuitionArr.filter(resourseObj => resourseObj.type === 'video');
			const notificationDisplayCardsHtml = template.youtubeVideo({ resourses: videosOfThisTuitionArr });
			$container.html(notificationDisplayCardsHtml);
		});
	}

	async function render() {
		try {
			renderStudentsCheakboxes();
			renderBatchCheakboxes();
			renderRefrenceMaterialTab();
			renderHomeworkTab();
			renderAssignmentTab();
			await injectYtVidInfo();
			renderVideosContainer();
			// Caching and binding here as this is done asynchronously
			cacheDynamic();
			bindDynamic();
		} catch (error) {
			console.error(error);
		}
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

	function refresh() {
		render();
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
