const userApiCalls = (() => {
	const validArrayNames = {
		claims: true,
		reviewsOwned: true,
		goingEvents: true,
		maybeGoingEvents: true,
		bookmarkUsers: true,
		bookmarkSchools: true,
		bookmarkEvents: true,
		bookmarkBlogs: true
	};
	const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

	function getCurrentUser() {
		return $.ajax({
			type: "GET",
			url: `/user/info`,
		});
	}

	function getAllUsers(skip = 0, limit = 0, demands) {
		return $.ajax({
			type: "GET",
			url: `/user/all`,
			data: {
				limit: limit,
				skip: skip,
				demands: demands
			},
		});
	}

	function getSpecificUser(idenfifierObj) {
		return $.ajax({
			type: 'GET',
			url: '/user',
			data: idenfifierObj
		});
	}

	function putNewUser(bodyObj) {
		return $.ajax({
			type: "POST",
			url: `/user`,
			data: bodyObj,
		});
	}

	function addClaim(listingCategory, listingId) {
		if (!checkForHexRegExp.test(listingId)) {
			console.error("Not a valid idOfListing");
		}
		return $.ajax({
			type: "POST",
			url: "/user/add-claim",
			data: {
				listingCategory: listingCategory,
				listingId: listingId,
			},
		});
	}

	function putInArrayInUser(idOfUser, arrayName, bodyObj) {
		if (!checkForHexRegExp.test(idOfUser)) {
			console.error("Not a valid idOfUser");
		}

		if (arrayName in validArrayNames) {
			return $.ajax({
				type: "POST",
				url: `/user/add/${idOfUser}/${arrayName}`,
				data: bodyObj,
			});
		} else {
			console.error("Not a valid array name in user");
		}
	}

	function updateInArrayInUser(idOfUser, arrayName, idOfNestedObj, bodyObj) {
		if (!checkForHexRegExp.test(idOfUser)) {
			console.error("Not a valid idOfUser");
		}
		if (!checkForHexRegExp.test(idOfNestedObj)) {
			console.error("Not a valid idOfNestedObj");
		}

		if (arrayName in validArrayNames) {
			return $.ajax({
				type: "PUT",
				url: `/user/update/${idOfUser}/${arrayName}/${idOfNestedObj}/`,
				data: bodyObj,
			});
		} else {
			console.error("Not a valid array name in users");
		}
	}

	function updateInUser(idOfUser, bodyObj, isForm = false) {
		if (!checkForHexRegExp.test(idOfUser)) {
			console.error("Not a valid idOfUser");
		}
		if (isForm) {
			return $.ajax({
				type: "PUT",
				url: `/user/${idOfUser}`,
				data: bodyObj,
				cache: false,
				contentType: false,
				processData: false,
			});
		} else {
			return $.ajax({
				type: "PUT",
				url: `/user/${idOfUser}`,
				data: bodyObj,
			});
		}
	}

	function deleteInArrayInUser(idOfUser, arrayName, bodyObj) {
		if (!checkForHexRegExp.test(idOfUser)) {
			console.error("Not a valid idOfUser");
		}

		if (arrayName in validArrayNames) {
			return $.ajax({
				type: "DELETE",
				url: `/user/delete/${idOfUser}/${arrayName}`,
				data: bodyObj,
			});
		} else {
			console.error("Not a valid array name in users");
		}
	}

	function deleteArrayInUser(arrayName, bodyObj) {
		if (arrayName in validArrayNames) {
			return $.ajax({
				type: "DELETE",
				url: `/user/empty/${arrayName}`,
				data: bodyObj,
			});
		} else {
			console.error("Not a valid array name in users");
		}
	}

	function removeClaim(listingCategory, listingId) {
		if (!checkForHexRegExp.test(listingId)) {
			console.error("Not a valid idOfListing");
		}
		return $.ajax({
			type: "DELETE",
			url: "user/remove-claim",
			data: { listingCategory: listingCategory, listingId: listingId },
		});
	}

	function deleteUser(idOfUser) {
		if (!checkForHexRegExp.test(idOfUser)) {
			console.error("Not a valid idOfUser");
		}
		return $.ajax({
			type: "DELETE",
			url: `/user/${idOfUser}`,
			data: bodyObj
		});
	}

	return {
		getCurrentUser,
		getAllUsers,
		getSpecificUser,
		putNewUser,
		addClaim,
		putInArrayInUser,
		updateInArrayInUser,
		updateInUser,
		deleteInArrayInUser,
		deleteArrayInUser,
		removeClaim,
		deleteUser
	};
})();