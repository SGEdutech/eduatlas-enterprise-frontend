const instituteBatches = (() => {
	let $batchesContainer;
	let $newBatchForm;
	let $activeBatchContainer;
	let $deleteButtons;

	function cache() {
		$batchesContainer = $("#batchesContainer");
		$newBatchForm = $('.new_batch_form');
	}

	function cacheNewBatchContainer(tabNumber) {
		$activeBatchContainer = $(`#active_batch_container${tabNumber}`);
	}

	function cacheDynamic() {
		$deleteButtons = $('.delete-batch-btn');
	}

	function render() {
		/* let html = getHtml();
		$batchesContainer.append(html); */
	}

	function bindEvents() {
		$newBatchForm.submit(function(e) {
			e.preventDefault();
			addBatch($(this));
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
		$activeBatchContainer.append(template.instituteBatchCard(context))
		cacheNBindDeleteButtons();
	}

	function addBatch(form) {
		if (!form) { return }
		const tabNumber = form.attr("data-tabNumber");
		const idOfTuition = form.attr("data-id");
		cacheNewBatchContainer(tabNumber);

		const serializedArrayForm = form.serializeArray()
		console.log(serializedArrayForm);
		let bodyObj = {};
		bodyObj.students = [];
		bodyObj.tuitionId = idOfTuition;
		serializedArrayForm.forEach(obj => {
			if (obj.name === "students") {
				bodyObj.students.push(obj.value);
			} else {
				bodyObj[obj.name] = obj.value;
			}
		})
		const idOfCourse = bodyObj.courseId;
		tuitionApiCalls.putBatchInCourseInTuition(idOfTuition, idOfCourse, bodyObj).then(data => {
			tuitionApiCalls.getSpecificTuition({ _id: data._id }).then(data => {
				bodyObj._id = undefined;
				data.courses.forEach(courseObj => {
					if (bodyObj.courseId === courseObj._id) {
						bodyObj.parentCourse = courseObj.code;
						courseObj.batches.forEach(batchObj => {
							if (bodyObj.code === batchObj.code) {
								bodyObj._id = batchObj._id;
							}
						})
					}
				})
				if (bodyObj._id) {
					alert("succcess")
				}
				eagerLoadBatch(bodyObj)
			})
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