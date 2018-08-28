const helperScripts = {
    logout() {
        $.get({url: '/auth/local/logout'})
            .then(data => PubSub.publish('user.logout', '')) // Send no user as empty string
            .catch(err => console.error(err));
    },

    executeAllFunctions(...funtionArray) {
        funtionArray.forEach(fn => fn());
    },

    openDetailsPage(typeOfInfo, id) {
        let upperCaseTypeOfInfo = typeOfInfo.charAt(0).toUpperCase() + typeOfInfo.slice(1);
        window.location.assign(`/${upperCaseTypeOfInfo}Details2.0.html?_id=${id}`)
    },

    calcAverageRating(reviewArray) {
        if (reviewArray === undefined || reviewArray.length === 0) return -1;
        const totalReviews = reviewArray.length;
        let totalStars = 0;
        reviewArray.forEach(review => totalStars += review.rating);
        return totalStars / totalReviews;
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
            return {hours: hours, minutes: minutes}
        } else {
            let temp = time.split(':');
            let hours = parseInt(temp[0]);
            let minutes = parseInt(temp[1]);
            return {hours: hours, minutes: minutes}
        }
    },

    showNextTab($nextTab) {
        $nextTab.tab('show');
        //scroll 100 pixels
        document.body.scrollTop = document.documentElement.scrollTop = 150;
    },
    getDateObj(date) {
        if (date === undefined || date === '') {
            return undefined;
        }
        let toReturnObj = {};
        let dateArray = date.split('T')[0].split('-');
        toReturnObj.date = dateArray[2];
        toReturnObj.month = dateArray[1];
        toReturnObj.year = dateArray[0];
        return toReturnObj;
    }
    ,

    saveDetails(typeOfInfo, $form, $nextTab, instituteId) {
        const formData = new FormData($form[0]);

        const Promise = $.ajax({
            url: `/${typeOfInfo}/${instituteId}`,
            type: 'PUT',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
        });

        Promise.then(() => {
            this.showNextTab($nextTab);
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
        this.htmlBody.animate({scrollTop: $element.offset().top}, 1000);
    }

};