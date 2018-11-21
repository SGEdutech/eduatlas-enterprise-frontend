const dateAndTime = (() => {
	function inverseMinutesFromMidnight(minutesFromMidnight) {
		const dt = new Date(0, 0, 0);
		const time = new Date(dt.getTime() + minutesFromMidnight * 60000);
		return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
	}

	function minutesFromMidnight(time) {
		if (time instanceof Date === false) throw new Error('Time should be an instance of date');
		return (time.getHours() * 60) + time.getMinutes();
	}

	function getInputsValues($container) {
		const $inputs = $container.find('input');
		const nameToValueMap = {};
		$inputs.each((__, input) => {
			const $input = $(input);
			const name = $input.attr('name');
			const value = $input.val();
			nameToValueMap[name] = value;
		})
		return nameToValueMap;
	}

	function twelveHourToMinutesFromMidnight(timeStr) {
		if (timeStr === undefined) throw new Error('Time not provided');
		const twentyFourHourTime = convertTo24Hours(timeStr);
		const timeDateObj = new Date();
		timeDateObj.setHours(twentyFourHourTime.hours);
		timeDateObj.setMinutes(twentyFourHourTime.minutes);
		return minutesFromMidnight(timeDateObj);
	}

	function convertTo24Hours(timeToConvert) {
		if (timeToConvert === undefined || timeToConvert === '') {
			return
		}
		const time = timeToConvert;
		if (time.slice(-2) === 'AM' || time.slice(-2) === 'PM') {
			let hours = Number(time.match(/^(\d+)/)[1]);
			const minutes = Number(time.match(/:(\d+)/)[1]);
			const AMPM = time.match(/\s(.*)$/)[1];
			if (AMPM === 'PM' && hours < 12) hours += 12;
			if (AMPM === 'AM' && hours === 12) hours -= 12;
			return {
				hours,
				minutes
			}
		}
		const temp = time.split(':');
		const hours = parseInt(temp[0], 10);
		const minutes = parseInt(temp[1], 10);
		return {
			hours,
			minutes
		}
	}

	function addDays(date, days) {
		if (date instanceof Date === false) throw new Error('Type of date must be a date');
		if (typeof days !== 'number') throw new Error('Type of days must be a number');

		const result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	function getDaysTillSunday(date) {
		if (date instanceof Date === false) throw new Error('Time should be an instance of date');

		const resultArr = [];
		const dayIndexToDayNameMap = {
			0: 'sunday',
			1: 'monday',
			2: 'tuesday',
			3: 'wednesday',
			4: 'thursday',
			5: 'friday',
			6: 'saturday'
		};
		const givenDateIndex = date.getDay();

		for (let i = givenDateIndex, numeberOfDaysPassed = 0; i <= 7; i++, numeberOfDaysPassed++) {
			dateIndex = i % 7;
			resultArr.push({
				day: dayIndexToDayNameMap[dateIndex],
				date: addDays(date, numeberOfDaysPassed)
			});
		}
		return resultArr;
	}

	function getNextSunday(date) {
		if (date instanceof Date === false) throw new Error('Type of date must be a date');
		const dateToReturn = moment(date).endOf('isoweek');
		return dateToReturn;
	}

	return {
		getDaysTillSunday,
		getNextSunday,
		getInputsValues,
		twelveHourToMinutesFromMidnight,
		inverseMinutesFromMidnight
	};
})();
