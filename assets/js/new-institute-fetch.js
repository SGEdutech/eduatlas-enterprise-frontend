const fetchTuitionData = (() => {
	let claimsArr

	function getClaimedInstitute() {
		if (claimsArr === undefined) throw new Error('This module has not been initialised!');
		return tuitionApiCalls.getMultipleTuitions(claimsArr);
	}

	function getClaimedCourses() {
		
	}

	function init(claimsArray) {
		if (claimsArray === undefined) throw new Error('Claim array not provided');
		claimsArr = claimsArray;
	}

	return {
		init,
		getClaimedInstitute
	};
})();
