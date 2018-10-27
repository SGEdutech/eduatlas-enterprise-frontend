const discounts = (() => {
	let discountsArr;
	let $activeDiscountsContainer;
	let $addDiscountForm;

	function submitAddDiscount(tuitionId, newDiscountDetails) {
		return tuitionApiCalls.putDiscountInTuition(tuitionId, newDiscountDetails);
	}

	function submitDeleteRequest(tuitionId, discountId) {
		return tuitionApiCalls.deleteDiscountInTuition(tuitionId, discountId);
	}

	async function addDiscount() {
		event.preventDefault();
		const $form = $(event.target);
		const tuitionId = $form.attr('data-id');
		const newDiscount = await submitAddDiscount(tuitionId, $form.serialize());
		newDiscount.tuitionId = tuitionId;
		discountsArr.push(newDiscount);
		$form.trigger('reset');
	}

	async function deleteDiscount(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const discountId = $deleteBtn.attr('data-discount-id');
			const deletedDiscount = await submitDeleteRequest(tuitionId, discountId);
			console.log('Discount was successfully deleted');
			discountsArr = discountsArr.filter(discountObj => discountObj._id !== discountId);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	async function editDiscount(tuitionId, discountId) {
		try {
			const editedData = modal.serializeForm();
			const editedDiscount = await submitEditRequest(tuitionId, discountId, editedData);
			modal.hideModal();
			console.log('Discount was successfully edited');
			editedDiscount.tuitionId = tuitionId;
			discountsArr = discountsArr.map(discountObj => discountObj._id === discountId ? editedDiscount : discountObj)
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const discountId = $editBtn.attr('data-course-id');
		const discountInfo = discountsArr.find(discountToBeEdited => discountToBeEdited._id === discountId);
		const editDicountInputHTML = template.discountEditInputs(discountInfo);
		modal.renderFormContent(editDicountInputHTML);
		modal.bindSubmitEvent(() => editDiscount(tuitionId, discountId));
		modal.cacheAndBindCoursesStuff();
		modal.showModal();
	}

	function cache() {
		$activeDiscountsContainer = $('.active-discounts-container');
		$addDiscountForm = $('.add-discount-form');
	}

	function cacheDynamic() {
		$editButton = $('.discount-edit');
		$deleteButton = $('.delete-discount-btn');
	}

	function bindDynamicEvents() {
		$editButton.click(editModalInit);
		$deleteButton.click(deleteDiscount);
	}

	function bindEvents() {
		$addDiscountForm.submit(addDiscount);
	}

	function render() {
		$activeDiscountsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const discountsOfThisTuition = discountsArr.filter(discountObj => discountObj.tuitionId === tuitionId);
			const cardsHtml = template.discountCard({ discounts: discountsOfThisTuition });
			$container.html(cardsHtml);
		});
	}

	function refresh() {
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init() {
		if (Array.isArray(discounts) === false) throw new Error('Discounts must be an array');
		discountsArr = discounts;

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	return { init };
})();
