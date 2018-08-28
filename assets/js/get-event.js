const getEvent = (() => {
    let queryObj;
    let $name;
    let $dateButton;
    let $ageGroupButton;
    let $lastDateRegistration;
    let $descriptionContainer;
    let $officialSite;
    let $contactPersonName, $contactPersonPhone, $contactPersonEmail;
    let $addressLines, $city, $state;
    let $fromDate, $toDate, $fromTime, $toTime;
    let $attending, $notAttending, $maybeAttending;

    function cache() {
        $name = $('#name');
        $dateButton = $('#date_button');
        $ageGroupButton = $('#age_group_button');
        $lastDateRegistration = $('#last_date_registration');
        $descriptionContainer = $('#desc_container');
        $officialSite = $('#website');
        $contactPersonName = $('#contact_person_name');
        $contactPersonEmail = $('#contact_person_email');
        $contactPersonPhone = $('#contact_person_phone');
        $addressLines = $('#addressLines');
        $city = $('#city');
        $state = $('#state');
        $fromDate = $('#fromDate');
        $toDate = $('#toDate');
        $fromTime = $('#fromTime');
        $toTime = $('#toTime');
        $attending = $('#Attending');
        $notAttending = $('#notAttending');
        $maybeAttending = $('#maybeAttending')
    }

    function bindEvents() {

    }

    function getInfoFromDatabase() {
        const url = '/event';
        const data = {_id: queryObj._id};
        return $.ajax({url, data});
    }

    function getGoingUsers(array) {
        let returnPromiseArray = [];
        array.forEach(userId => {
            const url = '/user';
            const data = {_id: userId};
            returnPromiseArray.push($.ajax({url, data}))
        });
        return returnPromiseArray;
    }

    function render(obj) {
        queryObj = obj;
        cache();
        getInfoFromDatabase().then((eventData) => {
            let fromDateObj = helperScripts.getDateObj(eventData.fromDate);
            let toDateObj = helperScripts.getDateObj(eventData.toDate);
            let fromToDate = fromDateObj.date + '/' + fromDateObj.month + ' To ' + toDateObj.date + '/' + toDateObj.month;
            let lastDateRegObj = helperScripts.getDateObj(eventData.lastDateRegistration);

            $name.html(eventData.name);
            $dateButton.html(fromToDate);
            $ageGroupButton.html(eventData.fromAge + ' TO ' + eventData.toAge);
            if (lastDateRegObj) {
                $lastDateRegistration.html(lastDateRegObj.date + '/' + lastDateRegObj.month + '/' + lastDateRegObj.year);
            }
            $descriptionContainer.html(eventData.description);
            $officialSite.html(eventData.website);
            $contactPersonName.html(eventData.organiserName);
            $contactPersonPhone.html(eventData.organiserPhone);
            $contactPersonEmail.html(eventData.organiserEmail);
            $addressLines.html(eventData.addressLine1 + ',' + eventData.addressLine2);
            $city.html(eventData.city + ',' + eventData.pin);
            $state.html(eventData.state);
            $fromDate.html(fromDateObj.date + '/' + fromDateObj.month + '/' + fromDateObj.year);
            $toDate.html(toDateObj.date + '/' + toDateObj.month + '/' + toDateObj.year);
            $fromTime.html(eventData.fromTime);
            $toTime.html(eventData.toTime);
            $attending.html(eventData.going);
            $notAttending.html(eventData.notGoing);
            $maybeAttending.html(eventData.mayBeGoing);
            getGoingUsers(eventData.goingUsers).forEach(promise => {
                promise.then(userData => {
                    console.log(userData);
                })
            })
        })

    }

    return {render}
})();