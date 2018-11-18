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
	},

	getInputsAndSelectDataObj($inputs) {
		if ($inputs === undefined) return [];
		if ($inputs instanceof $ === false) throw new Error('Inputs must be jquery object');

		const inputsDataObj = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			inputsDataObj[$input.attr('name')] = $input.val();
		});
		return inputsDataObj;
	},

	isDuplicate(databaseArr, key, value, exceptionObjId) {
		if (databaseArr === undefined) throw new Error('Database array not provided');
		if (key === undefined) throw new Error('Key not provided');
		if (value === undefined) throw new Error('Value not provided');
		if (Array.isArray(databaseArr) === false) throw new Error('Database array must be an array');
		if (typeof key !== 'string') throw new Error('Key must be a string');

		if (typeof value === 'string') value = value.toLowerCase();
		let isValueDuplicate = false;
		databaseArr.forEach(obj => {
			if (typeof obj !== 'object') throw new Error('All elements in database array must be an object');
			if (exceptionObjId) {
				if (obj._id === exceptionObjId) return;
			}
			if (obj[key] === value) isValueDuplicate = true;
		});
		return isValueDuplicate;
	}
};
