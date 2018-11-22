const discounts = (() => {
	let distinctDiscountsArr;
	let $activeDiscountsContainer;
	let $addDiscountForm;
	let $form;
	let $inputs;

	function submitAddDiscount(tuitionId, newDiscountDetails) {
		return tuitionApiCalls.putDiscountInTuition(tuitionId, newDiscountDetails);
	}

	function submitDeleteRequest(tuitionId, discountId) {
		return tuitionApiCalls.deleteDiscountInTuition(tuitionId, discountId);
	}

	function getDiscountData(tuitionId) {
		const discountData = {};
		$inputs.filter(`[data-tuition-id="${tuitionId}"]`).each((__, input) => {
			const $input = $(input);
			if ($input.attr('type') === 'checkbox') {
				discountData[$input.attr('name')] = $input.prop('checked');
				return;
			}
			discountData[$input.attr('name')] = $input.val();
		});
		return discountData;
	}

	function isAddedDiscountCodeDuplicate(addedCode, tuitionId) {
		if (addedCode === undefined) throw new Error('Code is not provided');
		if (tuitionId === undefined) throw new Error('Tuition id is not provided');
		const discountsOfThisTuition = distinctDiscountsArr.filter(discountObj => discountObj.tuitionId === tuitionId);
		if (randomScripts.isDuplicate(discountsOfThisTuition, 'code', addedCode)) {
			alert('A discount with same code has already been added');
			return true;
		}
		return false;
	}

	async function addDiscount(event) {
		event.preventDefault();
		const $form = $(event.target);
		const tuitionId = $form.attr('data-id');
		const discountData = getDiscountData(tuitionId);
		if (isAddedDiscountCodeDuplicate(discountData.code, tuitionId)) return;
		const newDiscount = await submitAddDiscount(tuitionId, discountData);
		notification.push('Discount has been successfully added');
		newDiscount.tuitionId = tuitionId;
		distinctDiscountsArr.push(newDiscount);
		PubSub.publish('discount.add', newDiscount);
		$form.trigger('reset');
		refresh();
	}

	async function deleteDiscount(event) {
		try {
			const $deleteBtn = $(event.target);
			const tuitionId = $deleteBtn.attr('data-tuition-id');
			const discountId = $deleteBtn.attr('data-discount-id');
			const deletedDiscount = await submitDeleteRequest(tuitionId, discountId);
			notification.push('Discount has been successfully deleted');
			PubSub.publish('discount.delete', deletedDiscount);
			distinctDiscountsArr = distinctDiscountsArr.filter(discountObj => discountObj._id !== discountId);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function submitEditRequest(tuitionId, discountId, editedData) {
		return tuitionApiCalls.editDicountInTuition(tuitionId, discountId, editedData);
	}

	function isEditedCodeDuplicate(editedData, discountId, tuitionId) {
		if (editedData === undefined) throw new Error('Discount data is not provided');
		if (discountId === undefined) throw new Error('Discount Id is not provided');
		if (tuitionId === undefined) throw new Error('Tuition Id is not provided');
		const discountsOfThisTuition = distinctDiscountsArr.filter(discountObj => discountObj.tuitionId === tuitionId);
		if (randomScripts.isDuplicate(discountsOfThisTuition, 'code', editedData.code, discountId)) {
			alert('A discount with same code already exist');
			return true;
		}
		return false;
	}

	async function editDiscount(event, tuitionId, discountId) {
		try {
			event.preventDefault();
			const editedData = modal.getInputsDataObj();
			if (isEditedCodeDuplicate(editedData, discountId, tuitionId)) return;
			const editedDiscount = await submitEditRequest(tuitionId, discountId, editedData);
			modal.hideModal();
			notification.push('Discount has been successfully edited');
			editedDiscount.tuitionId = tuitionId;
			PubSub.publish('discount.edit', editedDiscount);
			distinctDiscountsArr = distinctDiscountsArr.map(discountObj => discountObj._id === discountId ? editedDiscount : discountObj)
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function editModalInit(event) {
		const $editBtn = $(event.target);
		const tuitionId = $editBtn.attr('data-tuition-id');
		const discountId = $editBtn.attr('data-discount-id');
		const discountInfo = distinctDiscountsArr.find(discountToBeEdited => discountToBeEdited._id === discountId);
		const editDicountInputHTML = template.discountEditInputs(discountInfo);
		modal.renderFormContent(editDicountInputHTML);
		modal.bindSubmitEvent(e => editDiscount(e, tuitionId, discountId));
		modal.cacheAndBindCoursesStuff();
		modal.showModal();
	}

	function cache() {
		$activeDiscountsContainer = $('.active-discounts-container');
		$addDiscountForm = $('.add-discount-form');
		$form = $('.add-discount-form');
		$inputs = $form.find('input');
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

			const discountsOfThisTuition = distinctDiscountsArr.filter(discountObj => discountObj.tuitionId === tuitionId);
			const cardsHtml = template.discountCard({ discounts: discountsOfThisTuition });
			$container.html(cardsHtml);
		});
	}

	function refresh() {
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init(discountsArr) {
		if (Array.isArray(discountsArr) === false) throw new Error('Discounts must be an array');
		distinctDiscountsArr = discountsArr;

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	return { init };
})();
