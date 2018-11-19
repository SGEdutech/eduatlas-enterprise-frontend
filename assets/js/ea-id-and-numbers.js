const eAIdsAndNumbers = (() => {
	function _nextChar(char) {
		char = char.toLowerCase();
		if (char === 'z') return undefined;
		return String.fromCharCode(char.charCodeAt(0) + 1);
	}

	function _replaceChar(str, charIndex, replacementChar) {
		if (charIndex > str.length - 1) throw new Error('Not a valid char index');
		if (replacementChar.length !== 1) throw new Error('Replacement char must be 1 character');
		return str.substr(0, charIndex) + replacementChar + str.substr(charIndex + 1, str.length);
	}

	function _increamentStringCounter(stringCounter, position) {
		if (stringCounter === undefined) throw new Error('String counter not provided');
		if (position < 0) throw new Error('Running out of characters');
		// Don't use short circuit here as 0 evaluates to false
		if (position === undefined) position = stringCounter.length - 1;
		stringCounter = stringCounter.toLowerCase();
		const charToInc = stringCounter.charAt(position);
		if (charToInc === 'z') return _increamentStringCounter(_replaceChar(stringCounter, position, 'a'), position - 1);
		return _replaceChar(stringCounter, position, _nextChar(charToInc));
	}

	function _paddEaId(eAId) {
		const str = eAId.substr(0, 3);
		let num = eAId.substr(3);
		if (num.length > 5) throw new Error('Invalid EA Id');
		const numOfZoroesForPadding = 5 - num.length;
		for (let i = 0; i < numOfZoroesForPadding; i++) num = '0' + num;
		return str + num;
	}

	function numberToEaId(currentNumber, currentString) {
		if (currentNumber === undefined) return
		if (typeof currentNumber !== 'number') throw new Error('Type of current number is not number');
		if (currentString === undefined) currentString = 'aaa'

		if (currentNumber > 99999) return numberToEaId(currentNumber - 99999, _increamentStringCounter(currentString));
		const eAId = currentString + currentNumber;
		return _paddEaId(eAId);
	}

	function _indexOfAlphabet(char) {
		if (char === undefined) return -1;
		if (char.length !== 1) throw new Error('Character must be of length 1');
		char = char.toLowerCase();
		return char.charCodeAt(0) - 97;
	}

	function eAIdToNumber(eAId) {
		if (eAId === undefined) throw new Error('EA id not provided');
		if (typeof eAId !== 'string') throw new Error('Type of EA id is not string');
		if (eAId.length !== 8) throw new Error('Invalid EA id');

		const str = eAId.substr(0, 3);
		const num = parseInt(eAId.substr(3), 10);
		let alphabetMultiplier = 0;

		for (let i = 0; i < str.length; i++) {
			const base = str.length - (i + 1);
			const char = str.charAt(i);
			const indexOfChar = _indexOfAlphabet(char);
			alphabetMultiplier += Math.pow(26, base) * indexOfChar;
		}

		const stringImpact = 99999 * alphabetMultiplier;
		return stringImpact + num;
	}

	return { eAIdToNumber, numberToEaId }
})();
