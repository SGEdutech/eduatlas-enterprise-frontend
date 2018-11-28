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

	// Toggle inputs must have class toggle-checkbox for this function to return true or false
	getInputsAndSelectDataObj($inputs) {
		if ($inputs === undefined) return [];
		if ($inputs instanceof $ === false) throw new Error('Inputs must be jquery object');

		const inputsDataObj = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			if (Boolean(name) === false || Boolean(value) === false) return;
			if ($input.attr('type') === 'checkbox') {
				const isChecked = $input.is(':checked');
				if ($input.hasClass('toggle-checkbox')) {
					inputsDataObj[name] = isChecked;
					return;
				}
				// We do not need to include unchecked inp which are not toggle in our obj
				if (isChecked === false) return;
			}
			// If name already exists, we will squash all values in array
			if (inputsDataObj[name]) {
				if (Array.isArray(inputsDataObj[name]) === false) inputsDataObj[name] = [inputsDataObj[name]];
				inputsDataObj[name].push(value);
				return;
			}
			inputsDataObj[name] = value;
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
	},

	isObjEmpty(obj) {
		if (obj === undefined) throw new Error('Object is not provided')
		if (typeof obj !== 'object') throw new Error('Object must be an object')

		return Object.keys(obj).length === 0;
	},

	calcTotalCourseFee(courseFee, gstPercentage) {
		if (courseFee === undefined) throw new Error('Fee not provided!');
		gstPercentage = gstPercentage || 0;

		const totalFee = courseFee + courseFee * (gstPercentage / 100);
		return totalFee.toFixed(2);
	},

	calcTotalDiscountedAmount({ baseFee, discount, isPercent }) {
		if (baseFee === undefined) throw new Error('Base fee is not provided')
		if (discount === undefined) throw new Error('Discount is not provided')
		if (isPercent) {
			return baseFee * (discount / 100);
		}
		return discount;
	},

	getDateObjFromIsoDateStr(dateStr) {
		if (dateStr === undefined) throw new Error('Date string is not provided');

		const splittedDateArr = dateStr.split('/');
		if (splittedDateArr.length !== 3) throw new Error('Date string not in iso format');
		const [dayOfTheMonth, monthPlusOne, year] = splittedDateArr;
		const month = monthPlusOne - 1;
		return new Date(year, month, dayOfTheMonth);
	},

	getIsoDateStr(date) {
		if (date === undefined) throw new Error('Date is not provided');
		if (date instanceof Date === false) date = new Date(date);
		if (isNaN(date.getTime())) throw new Error('Date not valid');

		return `${date.getDate()}/${date.getMonth() + 1}/${date.getYear()}`
	}
};
