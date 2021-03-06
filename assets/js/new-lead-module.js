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
	let $courseSelect;
	let $leadCourseFilterSelect;
	let $manualLeadCourseSelect;
	let $fromDateFilter;
	let $toDateFilter;
	let $applyFilterBtn;
	let $resetFilterBtn;

	function resetFiltersInActiveLeads() {
		$fromDateFilter.val('');
		$toDateFilter.val('');
		refresh();
	}

	function filterActiveLeadsFromDate(event) {
		const $btn = $(event.currentTarget);
		const tuitionId = $btn.attr('data-tuition-id');
		const fromDate = $fromDateFilter.val();
		const toDate = $toDateFilter.val();
		const fromDateMilliSec = moment(fromDate).valueOf();
		const toDateMilliSec = moment(toDate).valueOf();
		if (!fromDateMilliSec || !toDateMilliSec) {
			console.error('date not provided');
			return;
		}
		const leadsAfterThisDate = activeLeadsArr.filter(leadObj => leadObj.milliSec >= fromDateMilliSec && leadObj.milliSec <= toDateMilliSec);
		renderActiveLeads(leadsAfterThisDate, tuitionId);
		// FIXME:
		cacheDynamic();
		bindDynamicEvents();
	}

	function filterActiveLeadsCourse(event) {
		const $select = $(event.currentTarget);
		const tuitionId = $select.attr('data-tuition-id');
		const courseId = $select.val();
		if (courseId === 'all') {
			renderActiveLeads(activeLeadsArr, tuitionId);
			// FIXME:
			cacheDynamic();
			bindDynamicEvents()
			return;
		}
		const leadsOfThisCourse = activeLeadsArr.filter(leadObj => leadObj.courseId === courseId);
		renderActiveLeads(leadsOfThisCourse, tuitionId);
		// FIXME:
		cacheDynamic();
		bindDynamicEvents();
	}

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
				manuallyAddedLead.createdAt = moment(manuallyAddedLead.createdAt).format('lll');
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
		const coursesOfThisTuition = distinctCoursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
		const courseOptionsHTML = template.courseOptions({ courses: coursesOfThisTuition });
		$manualLeadCourseSelect.html(courseOptionsHTML);
	}

	function filterArraysAndInsertComment(leadId, addedComment, status, nextFollowUp, courseId) {
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
		if (addedComment) {
			leadToUpdate.comments.push(addedComment);
		}
		if (status) {
			leadToUpdate.status = status;
		}
		if (courseId) {
			leadToUpdate.courseId = courseId;
		}

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
			const courseId = $courseSelect.val();
			// console.log(status);
			if (!nextFollowUp && status === 'active') {
				alert('please provide next follow-up date');
				throw new Error('nextFollowUp not provided');
			}
			let bodyObj, addedComment;
			if (message === '') {
				bodyObj = { nextFollowUp, status, courseId };
				addedComment = tuitionApiCalls.editLeadInTuition(tuitionId, leadId, bodyObj);
				filterArraysAndInsertComment(leadId, undefined, status, nextFollowUp, courseId);
			} else {
				bodyObj = { comment: { message }, nextFollowUp, status, courseId };
				addedComment = await tuitionApiCalls.putMessageInLead(tuitionId, leadId, bodyObj);
				addedComment.createdAt = moment(addedComment.createdAt).format('lll');
				filterArraysAndInsertComment(leadId, addedComment, status, nextFollowUp, courseId);
			}
			// console.log(bodyObj);
			$leadRespondModal.modal('hide');
			alert('Comment added successfully');
			refresh();
		} catch (err) {
			console.error(err);
		}
	}

	function initLeadRespondModal(event) {
		const $btn = $(event.currentTarget);
		const tuitionId = $btn.attr('data-tuition-id');
		const leadId = $btn.attr('data-lead-id');
		const clonedLeadObj = JSON.parse(JSON.stringify(distinctLeadsArr.find(leadInfo => leadInfo._id === leadId)));
		const coursesOfThisTuition = distinctCoursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
		clonedLeadObj.courses = coursesOfThisTuition;
		const leadModalBodyHTML = template.leadBody(clonedLeadObj);
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
		$leadCourseFilterSelect = $('.lead-course-filter-select');
		$manualLeadCourseSelect = $('#manual_lead_course_select');
		$fromDateFilter = $('.lead-from-date-filter');
		$toDateFilter = $('.lead-to-date-filter');
		$applyFilterBtn = $('.apply-filter-btn');
		$resetFilterBtn = $('.reset-filter-btn');
	}

	function cacheModalBody() {
		$messageInp = $('#lead_respond_message_inp');
		$nextFollowupInp = $('#followup_date_inp');
		$statusSelect = $('#lead_status_select');
		$courseSelect = $('#lead_course_select');
	}

	function cacheDynamic() {
		$leadRespondBtn = $('.lead-respond-button');
	}

	function bindDynamicEvents() {
		$leadRespondBtn.click(initLeadRespondModal);
	}

	function bindEvents() {
		$updateLeadButton.click(addMesageToLead);
		$manualLeadBtn.click(initManualLeadModal);
		$manualLeadForm.submit(addManualLead);
		$leadCourseFilterSelect.change(filterActiveLeadsCourse);
		$applyFilterBtn.click(filterActiveLeadsFromDate);
		$resetFilterBtn.click(resetFiltersInActiveLeads);
	}

	function renderActiveLeads(customLeadsArr, customTuitionId) {
		customLeadsArr = customLeadsArr || activeLeadsArr;
		$activeLeadsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');
			if (customTuitionId && customTuitionId !== tuitionId) return;

			sortActiveLeadsArr();
			const leadsOfThisTuition = customLeadsArr.filter(leadObj => leadObj.tuitionId === tuitionId);
			const cardsHtml = template.activeLeadTable({ leads: leadsOfThisTuition });
			$container.html(cardsHtml);
		});
	}

	function render() {
		$newLeadsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const leadsOfThisTuition = newLeadsArr.filter(leadObj => leadObj.tuitionId === tuitionId);
			const cardsHtml = template.newLeadTable({ leads: leadsOfThisTuition });
			$container.html(cardsHtml);
		});

		renderActiveLeads();

		$closedLeadsContainer.each((__, container) => {
			const $container = $(container);
			const tuitionId = $container.attr('data-tuition-id');

			const leadsOfThisTuition = closedLeadsArr.filter(leadObj => leadObj.tuitionId === tuitionId);
			const cardsHtml = template.newLeadTable({ leads: leadsOfThisTuition });
			$container.html(cardsHtml);
		});

		$leadCourseFilterSelect.each((__, container) => {
			const $select = $(container);
			const tuitionId = $select.attr('data-tuition-id');

			const coursesOfThisTuition = distinctCoursesArr.filter(courseObj => courseObj.tuitionId === tuitionId);
			const cardsHtml = template.courseOptionsLead({ courses: coursesOfThisTuition });
			$select.html(cardsHtml);
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