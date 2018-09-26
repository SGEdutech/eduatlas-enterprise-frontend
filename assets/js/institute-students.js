const instituteStudents = (() => {
	let $newStudentForm;
	let $activeStudentContainer;
	let $deleteButtons;

	function cache() {
		$newStudentForm = $('.new_student_form');
	}

	function cacheNewStudentContainer(tabNumber) {
		$activeStudentContainer = $(`#active_students_container${tabNumber}`);
	}

	function cacheDynamic() {
		$deleteButtons = $('.delete-student-btn');
	}

	function render() {}

	function bindEvents() {
		$newStudentForm.submit(function(e) {
			e.preventDefault();
			addStudent($(this));
		});

		$deleteButtons.click(function(e) {
			e.preventDefault();
			deleteBatch($(this))
		});
	}

	function cacheNBindDeleteButtons() {
		cacheDynamic();
		$deleteButtons.click(function(e) {
			e.preventDefault();
			deleteBatch($(this));
		});
	}

	function deleteBatch($element) {
		let cardId = $element.attr('data-id');
		let idOfTuition = $element.attr('data-tuition');
		let idOfCourse = $element.attr('data-course');
		tuitionApiCalls.deleteBatchInCourseInTuition(idOfTuition, idOfCourse, cardId).then(data => {
			eagerRemoveCard(cardId);
		}).catch(err => console.error(err));
	}

	function eagerRemoveCard(cardId) {
		//todo - cache properly
		$('#' + cardId).remove()
	}

	function eagerLoadBatch(context) {
		context.col4 = true;
		$activeStudentContainer.append(template.instituteBatchCard(context))
		cacheNBindDeleteButtons();
	}

	function addStudent(form) {
		if (!form) { return }
		const tabNumber = form.attr("data-tabNumber");
		const idOfTuition = form.attr("data-id");
		cacheNewStudentContainer(tabNumber);

		const serializedArrayForm = form.serializeArray()
		let bodyObj = {};
		bodyObj.tuitionId = idOfTuition;
		serializedArrayForm.forEach(obj => {
			bodyObj[obj.name] = obj.value;
		})
		tuitionApiCalls.putInArrayInTuition(idOfTuition, "students", bodyObj).then(data => {
            console.log(data);
			eagerLoadBatch(bodyObj)
		}).catch(err => console.error(err));
	}

	function getHtml() {}

	function init() {
		cache();
		render();
		cacheDynamic();
		bindEvents();
	}

	return { init };
})();