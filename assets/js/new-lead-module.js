const leads = (() => {
	let distinctLeadsArr;
	let distinctCoursesArr;
	let newLeadsArr = [];
	let activeLeadsArr = [];
	let closedLeadsArr = [];
	let $newLeadsContainer;
	let $activeLeadsContainer;
	let $closedLeadsContainer;
	let $leadBodyContainer;
	let $leadRespondBtn;
	let $leadRespondModal;
	let $messageInp;
	let $nextFollowupInp;
	let $statusSelect;
	let $updateLeadButton;
	let $manualLeadBtn;
	let $manualLeadModal;
	let $manualLeadForm;

	async function addManualLead(event) {
		try {
			event.preventDefault();
			const $form = $(event.currentTarget);
			const tuitionId = $form.attr('data-tuition-id');
			const manuallyAddedLead = await tuitionApiCalls.putLeadsInTuition(tuitionId, $form.serialize());
			// insert tuitionId
			manuallyAddedLead.tuitionId = tuitionId;
			// parse time
			if (manuallyAddedLead.nextFollowUp) {
				manuallyAddedLead.milliSec = moment(manuallyAddedLead.nextFollowUp).valueOf();
				manuallyAddedLead.nextFollowUp = moment(manuallyAddedLead.nextFollowUp).format('lll');
			}
			activeLeadsArr.push(manuallyAddedLead);
			distinctLeadsArr.push(manuallyAddedLead);
			$manualLeadModal.modal('hide');
			$manualLeadForm.trigger('reset');
			alert('lead successfully to Active Leads Tab');
			refresh();
		} catch (e) {
			console.error(e);
		}
	}

	function initManualLeadModal(event) {
		const $btn = $(event.currentTarget);
		const tuitionId = $btn.attr('data-tuition-id');
		$manualLeadModal.modal('show');
		$manualLeadForm.attr('data-tuition-id', tuitionId);
	}

	function filterArraysAndInsertComment(leadId, addedComment, status, nextFollowUp) {
		// first search in newLeadsArr
		let leadToUpdate = newLeadsArr.find(leadObj => leadObj._id === leadId);
		if (leadToUpdate) {
			newLeadsArr = newLeadsArr.filter(leadObj => leadObj._id !== leadId);
		} else {
			// now search in activeLeadsArr
			leadToUpdate = activeLeadsArr.find(leadObj => leadObj._id === leadId);
			if (leadToUpdate) {
				activeLeadsArr = activeLeadsArr.filter(leadObj => leadObj._id !== leadId);
			} else {
				// now search in closedLeadsArr
				leadToUpdate = closedLeadsArr.find(leadObj => leadObj._id === leadId);
				closedLeadsArr = closedLeadsArr.filter(leadObj => leadObj._id !== leadId);
			}
		}

		leadToUpdate.comments.push(addedComment);
		leadToUpdate.status = status;
		if (nextFollowUp) {
			leadToUpdate.milliSec = moment(nextFollowUp).valueOf();
			leadToUpdate.nextFollowUp = moment(nextFollowUp).format('lll');
		}

		if (status === 'closed' || status === 'enrolled') {
			closedLeadsArr.push(leadToUpdate);
		} else {
			activeLeadsArr.push(leadToUpdate);
		}
	}

	async function addMesageToLead(event) {
		try {
			event.preventDefault();
			const $btn = $(event.currentTarget);
			const tuitionId = $btn.attr('data-tuition-id');
			const leadId = $btn.attr('data-lead-id');

			const message = $messageInp.val();
			const nextFollowUp = $nextFollowupInp.val();
			const status = $statusSelect.val();
			// console.log(status);
			if (!nextFollowUp && status === 'active') {
				alert('please provide next follow-up date');
				throw new Error('nextFollowUp not provided');
			}
			const bodyObj = { comment: { message }, nextFollowUp, status };
			// console.log(bodyObj);
			const addedComment = await tuitionApiCalls.putMessageInLead(tuitionId, leadId, bodyObj);
			$leadRespondModal.modal('hide');
			alert('Comment added successfully');
			addedComment.createdAt = moment(addedComment.createdAt).format('lll');
			filterArraysAndInsertComment(leadId, addedComment, status, nextFollowUp);
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function initLeadRespondModal(event) {
		const $btn = $(event.currentTarget);
		const tuitionId = $btn.attr('data-tuition-id');
		const leadId = $btn.attr('data-lead-id');
		const leadObj = distinctLeadsArr.find(leadInfo => leadInfo._id === leadId);
		const leadModalBodyHTML = template.leadBody(leadObj);
		$leadBodyContainer.html(leadModalBodyHTML);
		$leadRespondModal.modal('show');
		cacheModalBody();
		$updateLeadButton.attr('data-tuition-id', tuitionId);
		$updateLeadButton.attr('data-lead-id', leadId);
	}

	function sortActiveLeadsArr() {
		activeLeadsArr.sort((a, b) => parseInt(a.milliSec, 10) - parseInt(b.milliSec, 10));
	}

	function parseTime() {
		distinctLeadsArr.forEach(leadObj => {
			leadObj.createdAt = moment(leadObj.createdAt).format('lll');
			if (leadObj.comments) {
				leadObj.comments.forEach(messageObj => {
					messageObj.createdAt = moment(messageObj.createdAt).format('lll');
				})
			}
			if (leadObj.nextFollowUp) {
				leadObj.milliSec = moment(leadObj.nextFollowUp).valueOf();
				// console.log(leadObj.milliSec);
				leadObj.nextFollowUp = moment(leadObj.nextFollowUp).format('lll');
			}
		})
	}

	function splitLeads() {
		distinctLeadsArr.forEach(leadObj => {
			if (leadObj.status === 'closed' || leadObj.status === 'enrolled') {
				closedLeadsArr.push(leadObj);
			} else if (leadObj.status === 'active') {
				if (leadObj.nextFollowUp) {
					activeLeadsArr.push(leadObj);
				} else {
					newLeadsArr.push(leadObj);
				}
			}
		})
	}

	function cache() {
		$activeLeadsContainer = $('.active-leads-container');
		$newLeadsContainer = $('.new-leads-container');
		$closedLeadsContainer = $('.closed-leads-container');
		$editLeadModal = $('#edit_lead_modal');
		$leadBodyContainer = $('#lead_body_container');
		$leadRespondModal = $('#lead_respond_modal');
		$updateLeadButton = $('#update_lead_button');
		$manualLeadBtn = $('.manual-lead-btn');
		$manualLeadModal = $('#manual_lead_modal');
		$manualLeadForm = $('#manual_lead_form');
	}

	function cacheModalBody() {
		$messageInp = $('#lead_respond_message_inp');
		$nextFollowupInp = $('#followup_date_inp');
		$statusSelect = $('#lead_status_select');
	}

	function cacheDynamic() {
		$leadRespondBtn = $('.lead-respond-button');
	}

	function bindDynamicEvents() {
		$leadRespondBtn.click(initLeadRespondModal)
	}

	function bindEvents() {
		$updateLeadButton.click(addMesageToLead);
		$manualLeadBtn.click(initManualLeadModal);
		$manualLeadForm.submit(addManualLead);
	}

	function render() {
		$newLeadsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const leadsOfThisTuition = newLeadsArr.filter(leadObj => leadObj.tuitionId === tuitionId);
			const cardsHtml = template.leadCards({ leads: leadsOfThisTuition });
			$container.html(cardsHtml);
		});

		$activeLeadsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			sortActiveLeadsArr();
			const leadsOfThisTuition = activeLeadsArr.filter(leadObj => leadObj.tuitionId === tuitionId);
			const cardsHtml = template.leadCards({ leads: leadsOfThisTuition });
			$container.html(cardsHtml);
		});

		$closedLeadsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const leadsOfThisTuition = closedLeadsArr.filter(leadObj => leadObj.tuitionId === tuitionId);
			const cardsHtml = template.leadCards({ leads: leadsOfThisTuition });
			$container.html(cardsHtml);
		});

	}

	function refresh() {
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	function init(leadsArr, courseArr) {
		if (Array.isArray(leadsArr) === false) throw new Error('Leads must be an array');
		if (Array.isArray(courseArr) === false) throw new Error('Courses must be an array');
		distinctLeadsArr = leadsArr;
		distinctCoursesArr = courseArr;
		parseTime();
		splitLeads();

		cache();
		bindEvents();
		render();
		cacheDynamic();
		bindDynamicEvents();
	}

	return { init };
})();
