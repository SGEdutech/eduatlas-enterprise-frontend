const helperScripts = {
	logout() {
		$.get({
				url: '/auth/local/logout'
			})
			.then(data => PubSub.publish('user.logout', '')) // Send no user as empty string
			.catch(err => console.error(err));
	},

	executeAllFunctions(...funtionArray) {
		funtionArray.forEach(fn => fn());
	},

	openDetailsPage(typeOfInfo, id) {
		let upperCaseTypeOfInfo = typeOfInfo.charAt(0).toUpperCase() + typeOfInfo.slice(1);
		window.location.assign(`https://eduatlas.com/${upperCaseTypeOfInfo}Details2.0.html?_id=${id}`)
	},

	calcAverageRating(reviewArray) {
		if (reviewArray === undefined || reviewArray.length === 0) return -1;
		const totalReviews = reviewArray.length;
		let totalStars = 0;
		reviewArray.forEach(review => totalStars += review.rating);
		let ratingToReturn = totalStars / totalReviews;
		return Math.round(ratingToReturn * 100) / 100;
	},

	openNowInit(data, typeOfInfo) {
		if (data === undefined || data === []) {
			return
		}
		let d = new Date(); // current date and time

		//lets assume institute is closed right now
		data.openedNow = false;

		const weekday = new Array(7);
		weekday[0] = "sunday";
		weekday[1] = "monday";
		weekday[2] = "tuesday";
		weekday[3] = "wednesday";
		weekday[4] = "thursday";
		weekday[5] = "friday";
		weekday[6] = "saturday";
		let day = weekday[d.getDay()];

		let dayAndTimeOfOperation;
		if (typeOfInfo === 'tuition') {
			dayAndTimeOfOperation = data.dayAndTimeOfOperation;
		}
		if (typeOfInfo === 'school') {
			dayAndTimeOfOperation = data.officeTiming;
		}

		let todaysHours;
		if (dayAndTimeOfOperation) {
			dayAndTimeOfOperation.forEach(obj => {
				if (obj.day) {
					if (obj.day.toLowerCase() == day) {
						todaysHours = obj;
					}
				}
			});
		} else {
			return
		}

		if (todaysHours) {
			let toTime = this.convertTo24Hours(todaysHours.toTime);
			let fromTime = this.convertTo24Hours(todaysHours.fromTime);
			let currentHours = d.getHours();
			if (fromTime && toTime) {
				if (toTime.hours && fromTime.hours) {
					if (currentHours <= toTime.hours && currentHours >= fromTime.hours) {
						data.openedNow = true;
					}
				}
			}
		}
		//get current hours and minutes
		// console.log(dayNTimeOfOperation);
	},

	convertTo24Hours(timeToConvert) {
		if (timeToConvert === undefined || timeToConvert === '') {
			return
		}
		let time = timeToConvert;
		if (time.slice(-2) == 'AM' || time.slice(-2) == 'PM') {
			let hours = Number(time.match(/^(\d+)/)[1]);
			let minutes = Number(time.match(/:(\d+)/)[1]);
			let AMPM = time.match(/\s(.*)$/)[1];
			if (AMPM == "PM" && hours < 12) hours = hours + 12;
			if (AMPM == "AM" && hours == 12) hours = hours - 12;
			return {
				hours: hours,
				minutes: minutes
			}
		} else {
			let temp = time.split(':');
			let hours = parseInt(temp[0]);
			let minutes = parseInt(temp[1]);
			return {
				hours: hours,
				minutes: minutes
			}
		}
	},

	showNextTab($nextTab) {
		$nextTab.tab('show');
		//scroll 100 pixels
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	},
	getDateObj(date) {
		if (date === undefined || date === '') {
			return undefined;
		}
		const monthNames = ["Nul", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		];
		let toReturnObj = {};
		let dateArray = date.split('T')[0].split('-');
		toReturnObj.date = dateArray[2];
		toReturnObj.month = dateArray[1];
		toReturnObj.monthName = monthNames[parseInt(toReturnObj.month)];
		toReturnObj.year = dateArray[0];
		return toReturnObj;
	},
	getTimeFromMinutes(minutes) {
		if (typeof minutes != "number") {
			console.error("minutes must be of type number");
		}
		const hour = Math.floor(parseInt(minutes) / 60);
		const minute = parseInt(minutes) % 60;
		return { hour, minute }
	},
	saveDetails(typeOfInfo, $form, $nextTab, instituteId) {
		const formData = new FormData($form[0]);
		let Promise;
		if (typeOfInfo === "tuition") {
			Promise = tuitionApiCalls.updateInTuition(instituteId, formData, true);
		} else if (typeOfInfo === "school") {
			Promise = schoolApiCalls.updateInSchool(instituteId, formData, true);
		} else {
			Promise = eventApiCalls.updateInEvent(instituteId, formData, true);
		}

		Promise.then((data) => {
			// console.log(data);
			if ($nextTab === "saveOnly") {
				alert("saved successfully");
			} else {
				this.showNextTab($nextTab);
			}
		}).catch((err) => {
			alert('Fail!');
			console.log(err)
		})
	},

	scrollToElement($element, duration = 1000) {
		if ($element === undefined) {
			console.warn('Element not provided');
			return;
		}
		if (this.htmlBody === undefined) this.htmlBody = $('html, body');
		this.htmlBody.animate({
			scrollTop: $element.offset().top
		}, 1000);
	}

};