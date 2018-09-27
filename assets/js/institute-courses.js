const instituteCourses = (() => {
	let $coursesContainer;
	let $newCourseForm;
	let $activeCourseContainer;
	let $deleteButtons;
	let $gstInput;
	let $gstCheckbox;
	let $feeInput;
	let $totalFee;
	let $editCourseForm;

	function cache() {
		$coursesContainer = $("#coursesContainer");
		$newCourseForm = $('.new_course_form');
		$gstInput = $('.gst-inp');
		$gstCheckbox = $('.gst-checkbox');
		$feeInput = $('.fee-inp');
		$totalFee = $('.total-fee');
		$editCourseForm = $('.edit_course_form');
	}

	function cacheNewCourseContainer(tabNumber) {
		$activeCourseContainer = $(`#active_course_container${tabNumber}`);
	}

	function cacheDynamic() {
		$deleteButtons = $('.delete-course-btn');
	}

	function render() {
		/* let html = getHtml();
		$coursesContainer.append(html); */
	}

	function bindEvents() {
		$newCourseForm.submit(function(e) {
			e.preventDefault();
			addCourse($(this));
		});

		$editCourseForm.submit(function(e) {
			e.preventDefault();
			editCourse($(this));
		});

		$deleteButtons.click(function(e) {
			e.preventDefault();
			deleteCourse($(this))
		});

		bindFeeEvents();
	}

	function bindFeeEvents() {
		// FIXME: - memory leak
		// disable GST on checkbox click
		$gstCheckbox.click(function(e) {
			const tabNumber = $(e.target).attr('data-tabNumber');
			if ($(this).is(":checked")) {
				$.each($gstInput, function(indexInArray, jsElement) {
					if ($(jsElement).attr('data-tabNumber') === tabNumber) {
						$(jsElement).prop('disabled', true);
					}
				});
			} else {
				$.each($gstInput, function(indexInArray, jsElement) {
					if ($(jsElement).attr('data-tabNumber') === tabNumber) {
						$(jsElement).prop('disabled', false);
					}
				});
			}
		});

		// copy total fee according to GS
		$feeInput.change(function(e) {
			const tabNumber = $(e.target).attr('data-tabNumber');
			let value = parseInt($(e.target).val());
			//check if GST inp disabled
			let gstValue;
			$.each($gstInput, function(indexInArray, jsElement) {
				if ($(jsElement).attr('data-tabNumber') === tabNumber) {
					if ($(jsElement).prop("disabled")) {
						gstValue = 0;
					} else {
						gstValue = parseInt($(jsElement).val());
					}
				}
			});
			// console.log(typeof gstValue);
			$.each($totalFee, function(indexInArray, jsElement) {
				if ($(jsElement).attr('data-tabNumber') === tabNumber) {
					value = value + (value * gstValue) / 100;
					$(jsElement).val(value);
				}
			});
		});
	}

	function cacheNBindDeleteButtons(tuitionId) {
		cacheDynamic();
		$deleteButtons.click(function(e) {
			e.preventDefault();
			deleteCourse($(this));
		});
	}

	function deleteCourse($element) {
		let cardId = $element.attr('data-id');
		let idOfTuition = $element.attr('data-parent');
		tuitionApiCalls.deleteCourseInTuition(idOfTuition, cardId).then(data => {
			eagerRemoveCard(cardId);
		}).catch(err => console.error(err));
	}

	function eagerRemoveCard(cardId) {
		//todo - cache properly
		$('#' + cardId).remove()
	}

	function eagerLoadCourse(context) {
		context.col4 = true;
		$activeCourseContainer.append(template.instituteCourseCard(context))
		cacheNBindDeleteButtons();
	}

	function addCourse(form) {
		if (!form) { return }
		const tabNumber = form.attr("data-tabNumber");
		const tuitionId = form.attr("data-id");
		cacheNewCourseContainer(tabNumber);

		const serializedArrayForm = form.serializeArray()
		let bodyObj = {};
		bodyObj.parentId = tuitionId;

		serializedArrayForm.forEach(obj => {
			bodyObj[obj.name] = obj.value;
		})

		tuitionApiCalls.putCourseInTuition(tuitionId, bodyObj).then(data => {
			tuitionApiCalls.getSpecificTuition({ _id: data._id }).then(data => {
				// console.log(bodyObj);
				bodyObj._id = undefined;
				data.courses.forEach(courseObj => {
					if (bodyObj.code === courseObj.code) {
						bodyObj._id = courseObj._id;
					}
				})
				eagerLoadCourse(bodyObj)
			})
		}).catch(err => console.error(err));
	}

	function editCourse(form) {
		if (!form) { return }
		const tabNumber = form.attr("data-tabNumber");
		const tuitionId = form.attr("data-tuition");
		const courseId = form.attr("data-course");
		const modalId = form.attr("data-modal");

		const serializedArrayForm = form.serializeArray()
		let bodyObj = {};
		serializedArrayForm.forEach(obj => {
			bodyObj[obj.name] = obj.value;
		})

		tuitionApiCalls.editCourseInTuition(tuitionId, courseId, bodyObj).then(data => {
			$('#' + modalId).modal('toggle');
			alert("success");
		}).catch(err => console.error(err));
	}

	function getHtml() {
		// return template.userEditTuitionCourses(context);
	}

	function init() {
		cache();
		render();
		cacheDynamic();
		bindEvents();
	}

	return {
		init
	};
})();