const tuitionApiCalls = (() => {
	const validArrayNames = {
		dayAndTimeOfOperation: true,
		team: true,
		gallery: true,
		bragging: true,
		courses: true,
		reviews: true,
		students: true,
		coursesOffered: true
	};
	const checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

	function getAllTuitions(skip = 0, limit = 0, demands) {
		return $.ajax({
			type: 'GET',
			url: '/tuition/all',
			data: {
				limit,
				skip,
				demands
			}
		});
	}

	function getAllClaimedTuitions() {
		return $.ajax({
			type: 'GET',
			url: '/tuition/claimed'
		});
	}

	function getSpecificTuition(identifierObj = {}) {
		return $.ajax({
			type: 'GET',
			url: '/tuition',
			data: identifierObj
		});
	}

	function getMultipleTuitions(tuitionsArr) {
		if (!tuitionsArr) {
			console.error('tuitionsArr illegal');
		} else {
			if (tuitionsArr.length === 0) {
				console.error('tuitionsArr empty');
			}
		}
		return $.ajax({
			type: 'GET',
			url: '/tuition/multiple',
			data: { tuitions: tuitionsArr }
		});
	}

	function searchTuitions(skip = 0, limit = 0, sortBy, demands, extraInfoObj = {}) {
		const basicData = {
			skip,
			limit,
			sortBy,
			demands
		}

		const data = {
			...basicData,
			...extraInfoObj
		}

		return $.ajax({
			type: 'GET',
			url: '/tuition/search',
			data
		});
	}

	function putInArrayInTuition(idOfTuition, arrayName, bodyObj, isForm = false) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}

		if (arrayName in validArrayNames) {
			if (isForm) {
				return $.ajax({
					type: 'POST',
					url: `/tuition/add/${idOfTuition}/${arrayName}`,
					data: bodyObj,
					cache: false,
					contentType: false,
					processData: false
				});
			} else {
				return $.ajax({
					type: 'POST',
					url: `/tuition/add/${idOfTuition}/${arrayName}`,
					data: bodyObj
				});
			}
		} else {
			console.error('Not a valid array name in tuitions');
		}
	}

	function putNewTuition(bodyObj, isForm = false) {
		console.log(bodyObj);
		if (isForm) {
			return $.ajax({
				type: "POST",
				url: `/tuition`,
				data: bodyObj,
				cache: false,
				contentType: false,
				processData: false
			});
		} else {
			return $.ajax({
				type: "POST",
				url: `/tuition`,
				data: bodyObj,
			});
		}
	}

	function updateInArrayInTuition(idOfTuition, arrayName, idOfNestedObj, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfNestedObj)) {
			console.error('Not a valid idOfNestedObj');
		}

		if (arrayName in validArrayNames) {
			return $.ajax({
				type: 'PUT',
				url: `/tuition/update/${idOfTuition}/${arrayName}/${idOfNestedObj}`,
				data: bodyObj,
			});
		} else {
			console.error('Not a valid array name in tuitions');
		}
	}

	function updateInTuition(idOfTuition, bodyObj, isForm = false) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (isForm) {
			return $.ajax({
				type: 'PUT',
				url: `/tuition/${idOfTuition}`,
				data: bodyObj,
				cache: false,
				contentType: false,
				processData: false,
			});

		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}`,
			data: bodyObj
		});
	}

	function deleteInArrayInTuition(idOfTuition, arrayName, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}

		if (arrayName in validArrayNames) {
			return $.ajax({
				type: 'DELETE',
				url: `/tuition/delete/${idOfTuition}/${arrayName}`,
				data: bodyObj
			});
		} else {
			console.error('Not a valid array name in tuitions');
		}
	}

	function deleteArrayInTuition(arrayName, bodyObj) {
		if (arrayName in validArrayNames) {
			return $.ajax({
				type: 'DELETE',
				url: `/tuition/empty/${arrayName}`,
				data: bodyObj
			});
		} else {
			console.error('Not a valid array name in tuitions');
		}
	}

	function deleteTuition(idOfTuition) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}`,
			data: bodyObj
		});
	}

	function getClaimedStudents() {
		return $.ajax({
			type: 'GET',
			url: '/tuition/student/claimed'
		});
	}

	function putStudentInTuition(idOfTuition, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/student`,
			data: bodyObj
		});
	}

	function editStudentInTuition(idOfTuition, idOfStudent, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}/student/${idOfStudent}`,
			data: bodyObj
		});
	}

	function deleteStudentInTuition(idOfTuition, idOfStudent) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/student/${idOfStudent}`
		});
	}

	function getClaimedCourses() {
		return $.ajax({
			type: 'GET',
			url: '/tuition/course/claimed'
		});
	}

	function putCourseInTuition(idOfTuition, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/course`,
			data: bodyObj
		});
	}

	function editCourseInTuition(idOfTuition, idOfCourse, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}`,
			data: bodyObj,
		});
	}

	function deleteCourseInTuition(idOfTuition, idOfCourse) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}`,
		});
	}

	function getClaimedBatches() {
		return $.ajax({
			type: 'GET',
			url: '/tuition/batch/claimed'
		});
	}

	function putBatchInCourseInTuition(idOfTuition, idOfCourse, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch`,
			data: bodyObj,
		});
	}

	function editBatchInCourseInTuition(idOfTuition, idOfCourse, idOfBatch, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		if (!checkForHexRegExp.test(idOfBatch)) {
			console.error('Not a valid idOfBatch');
		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch/${idOfBatch}`,
			data: bodyObj,
		});
	}

	function deleteBatchInCourseInTuition(idOfTuition, idOfCourse, idOfBatch) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		if (!checkForHexRegExp.test(idOfBatch)) {
			console.error('Not a valid idOfBatch');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch/${idOfBatch}`,
		});
	}

	function putStudentInBatch(idOfTuition, idOfCourse, idOfBatch, studentArr) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		if (!checkForHexRegExp.test(idOfBatch)) {
			console.error('Not a valid idOfBatch');
		}
		if (!studentArr) {
			console.error('studentArr illegal');
		} else {
			if (studentArr.length === 0) {
				console.error('studentArr empty');
			}
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch/${idOfBatch}/student`,
			data: { string: studentArr },
		});
	}

	// FIXME: route changed
	function deleteStudentInBatch(idOfTuition, idOfCourse, idOfBatch, idOfStudent) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		if (!checkForHexRegExp.test(idOfBatch)) {
			console.error('Not a valid idOfBatch');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch/${idOfBatch}/student/${idOfStudent}`,
		});
	}

	function getAllClaimedForums() {
		return $.ajax({
			type: 'GET',
			url: '/tuition/forum/claimed',
		});
	}

	function putPostInForum(idOfTuition, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/forum`,
			data: bodyObj
		});
	}

	function editPostInForum(idOfTuition, idOfPost, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfPost)) {
			console.error('Not a valid idOfPost');
		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}/forum/${idOfPost}`,
			data: bodyObj,
		});
	}

	function deletePostInForum(idOfTuition, idOfPost) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfPost)) {
			console.error('Not a valid idOfPost');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/forum/${idOfPost}`,
		});
	}

	function putCommentInPost(idOfTuition, idOfPost, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfPost)) {
			console.error('Not a valid idOfPost');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/forum/${idOfPost}/comment`,
			data: bodyObj
		});
	}

	function deleteCommentInPost(idOfTuition, idOfPost, idOfComment) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfPost)) {
			console.error('Not a valid idOfPost');
		}
		if (!checkForHexRegExp.test(idOfComment)) {
			console.error('Not a valid idOfComment');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/forum/${idOfPost}/comment/${idOfComment}`
		});
	}

	function getClaimedSchedules() {
		return $.ajax({
			type: 'GET',
			url: '/tuition/schedule/claimed'
		});
	}

	function putScheduleInBatch(idOfTuition, idOfCourse, idOfBatch, schedulesArr) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		if (!checkForHexRegExp.test(idOfBatch)) {
			console.error('Not a valid idOfBatch');
		}
		if (!schedulesArr) {
			console.error('schedulesArr illegal');
		} else {
			if (schedulesArr.length === 0) {
				console.error('schedulesArr empty');
			}
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch/${idOfBatch}/schedule`,
			data: { schedules: schedulesArr }
		});
	}

	function editScheduleInBatch(idOfTuition, idOfCourse, idOfBatch, idOfSchedule, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		if (!checkForHexRegExp.test(idOfBatch)) {
			console.error('Not a valid idOfBatch');
		}
		if (!checkForHexRegExp.test(idOfSchedule)) {
			console.error('Not a valid idOfSchedule');
		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch/${idOfBatch}/schedule/${idOfSchedule}`,
			data: bodyObj
		});
	}

	function deleteScheduleInBatch(idOfTuition, idOfCourse, idOfBatch, idOfSchedule) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		if (!checkForHexRegExp.test(idOfBatch)) {
			console.error('Not a valid idOfBatch');
		}
		if (!checkForHexRegExp.test(idOfSchedule)) {
			console.error('Not a valid idOfSchedule');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch/${idOfBatch}/schedule/${idOfSchedule}`,
		});
	}

	function replaceAttendanceInSchedule(idOfTuition, idOfCourse, idOfBatch, idOfSchedule, absentArr) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfCourse)) {
			console.error('Not a valid idOfCourse');
		}
		if (!checkForHexRegExp.test(idOfBatch)) {
			console.error('Not a valid idOfBatch');
		}
		if (!checkForHexRegExp.test(idOfSchedule)) {
			console.error('Not a valid idOfSchedule');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/course/${idOfCourse}/batch/${idOfBatch}/schedule/${idOfSchedule}/student-absent/new`,
			data: { absentees: absentArr }
		});
	}

	function putDiscountInTuition(idOfTuition, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/discount`,
			data: bodyObj
		});
	}

	function editDicountInTuition(idOfTuition, idOfDiscount, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfDiscount)) {
			console.error('Not a valid idOfDiscount');
		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}/discount/${idOfDiscount}`,
			data: bodyObj
		});
	}

	function deleteDiscountInTuition(idOfTuition, idOfDicount) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfDicount)) {
			console.error('Not a valid idOfDicount');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/discount/${idOfDicount}`
		});
	}

	function getAllClaimedDiscounts() {
		return $.ajax({
			type: 'GET',
			url: '/tuition/discount/claimed'
		});
	}

	function putPaymentDetailsInStudent(idOfTuition, idOfStudent, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/student/${idOfStudent}/payment`,
			data: bodyObj
		});
	}

	function editPaymentDetailsInStudent(idOfTuition, idOfStudent, idOfPayment, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		if (!checkForHexRegExp.test(idOfPayment)) {
			console.error('Not a valid idOfPayment');
		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}/student/${idOfStudent}/payment/${idOfPayment}`,
			data: bodyObj
		});
	}

	function deletePaymentDetailsInStudent(idOfTuition, idOfStudent, idOfPayment) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		if (!checkForHexRegExp.test(idOfPayment)) {
			console.error('Not a valid idOfPayment');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/student/${idOfStudent}/payment/${idOfPayment}`,
		});
	}

	function putInstallmentInStudent(idOfTuition, idOfStudent, idOfPayment, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		if (!checkForHexRegExp.test(idOfPayment)) {
			console.error('Not a valid idOfPayment');
		}
		return $.ajax({
			type: 'POST',
			url: `/tuition/${idOfTuition}/student/${idOfStudent}/payment/${idOfPayment}/installment`,
			data: bodyObj
		});
	}

	function editInstallmentInStudent(idOfTuition, idOfStudent, idOfPayment, idOfInstallment, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		if (!checkForHexRegExp.test(idOfPayment)) {
			console.error('Not a valid idOfPayment');
		}
		if (!checkForHexRegExp.test(idOfInstallment)) {
			console.error('Not a valid idOfInstallment');
		}
		return $.ajax({
			type: 'PUT',
			url: `/tuition/${idOfTuition}/student/${idOfStudent}/payment/${idOfPayment}/installment/${idOfInstallment}`,
			data: bodyObj
		});
	}

	function deleteInstallmentInStudent(idOfTuition, idOfStudent, idOfPayment, idOfInstallment) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfStudent)) {
			console.error('Not a valid idOfStudent');
		}
		if (!checkForHexRegExp.test(idOfPayment)) {
			console.error('Not a valid idOfPayment');
		}
		if (!checkForHexRegExp.test(idOfInstallment)) {
			console.error('Not a valid idOfInstallment');
		}
		return $.ajax({
			type: 'DELETE',
			url: `/tuition/${idOfTuition}/student/${idOfStudent}/payment/${idOfPayment}/installment/${idOfInstallment}`,
		});
	}

	function getAllClaimedResourses() {
		return $.ajax({
			type: 'GET',
			url: 'tuition/resource/claimed'
		});
	}

	function putResourseInTuition(idOfTuition, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		return $.ajax({
			type: 'POST',
			url: `tuition/${idOfTuition}/resource`,
			data: bodyObj,
			cache: false,
			contentType: false,
			processData: false
		});
	}

	function editResourseInTuition(idOfTuition, idOfResourse, bodyObj) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfResourse)) {
			console.error('Not a valid idOfResourse');
		}
		return $.ajax({
			type: 'PUT',
			url: `tuition/${idOfTuition}/resource/${idOfResourse}`,
			data: bodyObj
		});
	}

	function deleteResourseInTuition(idOfTuition, idOfResourse) {
		if (!checkForHexRegExp.test(idOfTuition)) {
			console.error('Not a valid idOfTuition');
		}
		if (!checkForHexRegExp.test(idOfResourse)) {
			console.error('Not a valid idOfResourse');
		}
		return $.ajax({
			type: 'DELETE',
			url: `tuition/${idOfTuition}/resource/${idOfResourse}`,
		});
	}

	function emailReciept(bodyObj) {
		return $.ajax({
			type: 'POST',
			url: 'tuition/email-reciept',
			data: bodyObj
		});
	}

	return {
		getAllTuitions,
		getAllClaimedTuitions,
		getSpecificTuition,
		getMultipleTuitions,
		searchTuitions,
		putInArrayInTuition,
		putNewTuition,
		updateInArrayInTuition,
		updateInTuition,
		deleteArrayInTuition,
		deleteInArrayInTuition,
		deleteTuition,
		getClaimedStudents,
		putStudentInTuition,
		editStudentInTuition,
		deleteStudentInTuition,
		getClaimedCourses,
		putCourseInTuition,
		editCourseInTuition,
		deleteCourseInTuition,
		getClaimedBatches,
		putBatchInCourseInTuition,
		editBatchInCourseInTuition,
		deleteBatchInCourseInTuition,
		putStudentInBatch,
		deleteStudentInBatch,
		getAllClaimedForums,
		putPostInForum,
		editPostInForum,
		deletePostInForum,
		putCommentInPost,
		deleteCommentInPost,
		getClaimedSchedules,
		putScheduleInBatch,
		editScheduleInBatch,
		deleteScheduleInBatch,
		replaceAttendanceInSchedule,
		putDiscountInTuition,
		editDicountInTuition,
		deleteDiscountInTuition,
		getAllClaimedDiscounts,
		putPaymentDetailsInStudent,
		editPaymentDetailsInStudent,
		deletePaymentDetailsInStudent,
		putInstallmentInStudent,
		editInstallmentInStudent,
		deleteInstallmentInStudent,
		getAllClaimedResourses,
		putResourseInTuition,
		editResourseInTuition,
		deleteResourseInTuition,
		emailReciept
	};
})();
