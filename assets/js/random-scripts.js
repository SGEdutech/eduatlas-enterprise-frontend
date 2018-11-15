const randomScripts = {
	calibrateBackslassesForRegex(str) {
		return str.replace(/\\/g, '\\\\');
	},

	getStudentSearchResults(studentsArr, searchStr) {
		if (studentsArr === undefined) throw new Error('Student array not provided');
		if (Array.isArray(studentsArr) === false) throw new Error('Student array must be an array');
		searchStr = searchStr || '';
		// Optimisation
		if (searchStr === '') return studentsArr;
		searchStr = this.calibrateBackslassesForRegex(searchStr);
		const regex = new RegExp(searchStr, 'i');

		const searchStudentBasedOnNameArr = studentsArr.filter(studentObj => regex.test(studentObj.name));
		const searchStudentBasedOnRollNumArr = studentsArr.filter(studentObj => regex.test(studentObj.rollNumber));
		const searchStudentBasedOnEmailArr = studentsArr.filter(studentObj => regex.test(studentObj.email));
		const allSearchResults = [...searchStudentBasedOnNameArr, ...searchStudentBasedOnRollNumArr, ...searchStudentBasedOnEmailArr];
		// Removing duplicates
		return allSearchResults.filter((studentObj, index) => index === allSearchResults.findIndex(indexStudentObj => indexStudentObj._id === studentObj._id));
	}
};
