const recieptConfig = (() => {
	let tuitionsArr;
	let $receiptConfigForm;
	let $formInputs;

	function getAllInputValue() {
		const inputNameToValues = {};
		$formInputs.each((__, inp) => {
			const $inp = $(inp);
			const name = $inp.attr('name');
			let value = $inp.val();
			if (Boolean(value) === false) value = 'empty';
			inputNameToValues[name] = value;
		});
		return inputNameToValues;
	}

	async function saveConfig(event) {
		try {
			event.preventDefault();
			const $form = $(event.currentTarget);
			const formData = getAllInputValue();
			console.log(formData);
			const tuitionId = $form.attr('data-tuition-id');
			const updatedTuition = await tuitionApiCalls.updateInTuition(tuitionId, formData, false);
			PubSub.publish('tuition.edit', updatedTuition);
			notification.push('Receipt Config has been successfully updated');
			tuitionsArr = tuitionsArr.map(tuitionObj => tuitionObj._id === tuitionId ? updatedTuition : tuitionObj)
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function cache() {
		$receiptConfigForm = $('.add-receipt-config-form');
	}

	function cacheDynamic() {
		$formInputs = $receiptConfigForm.find('input');
	}

	function bindEvents() {
		$receiptConfigForm.submit(saveConfig);
	}

	function render() {
		if (tuitionsArr === undefined) throw new Error('Tuitions is not provided');
		if (Array.isArray(tuitionsArr) === false) throw new Error('Tuitions is not an array');

		$receiptConfigForm.each((__, form) => {
			const $form = $(form);
			const tuitionId = $form.attr('data-tuition-id');
			const tuition = tuitionsArr.find(tuitionObj => tuitionObj._id === tuitionId);
			const html = template.receiptConfigFormBody(tuition);
			$form.html(html);
		});
	}

	function refresh() {
		render();
		cacheDynamic();
	}

	function init(tuitions) {
		if (tuitions === undefined) throw new Error('Tuitions not provided');
		if (Array.isArray(tuitions) === false) throw new Error('Tuitions must be an array');

		tuitionsArr = JSON.parse(JSON.stringify(tuitions));
		cache();
		bindEvents();
		render();
		cacheDynamic();
	}

	return { init };
})();
