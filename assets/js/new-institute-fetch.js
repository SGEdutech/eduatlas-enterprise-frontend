const fetchTuitionData = (() => {
	let claimsArr

	function getClaimedInstitute() {
		return tuitionApiCalls.getMultipleTuitions(claimsArr);
	}

	function init(claimsArray) {
		if (claimsArr === undefined) throw new Error('Claim array not provided');
		claimsArray = claimsArr;
	}

	return {
		init,
		getClaimedInstitute
	};
})();
