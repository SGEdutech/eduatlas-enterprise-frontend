const eventDetails = (() => {
    let $form;
    let $saveDetailsBtn;
    let $nextTab;
    let $name, $description, $fromAge, $toAge, $fromDate, $toDate, $fromTime, $toTime, $lastDateOfRegistration;
    let $contactPersonName, $contactPersonEmail, $contactPersonPhone, $website;
    let $addressLine1, $addressLine2, $city, $state, $district, $country, $pin, $category;

    function cache() {
        $form = $('#editEventForm');
        $saveDetailsBtn = $('#save_basic_details_btn');
        $nextTab = $(`[href = "#tab6"]`);
        $name = $("input[name='name']");
        $description = $("textarea[name='description']");
        $fromAge = $("input[name='fromAge']");
        $toAge = $("input[name='toAge']");
        $fromDate = $("input[name='fromDate']");
        $toDate = $("input[name='toDate']");
        $fromTime = $("input[name='fromTime']");
        $toTime = $("input[name='toTime']");
        $lastDateOfRegistration = $("input[name='lastDateRegistration']");
        $contactPersonName = $("input[name='organiserName']");
        $contactPersonEmail = $("input[name='organiserEmail']");
        $contactPersonPhone = $("input[name='organiserPhone']");
        $website = $("input[name='website']");
        $addressLine1 = $("input[name='addressLine1']");
        $addressLine2 = $("input[name='addressLine2']");
        $city = $("select[name='city']");
        $state = $("input[name='state']");
        $district = $("input[name='district']");
        $country = $("input[name='country']");
        $pin = $("input[name='pin']");
        $category = $("#categoryEvent");
    }

    function bindEvents(eventId) {
        $saveDetailsBtn.click(() => helperScripts.saveDetails('event', $form, $nextTab, eventId));
    }

    function render(eventInfo) {
        console.log(eventInfo);
        eventInfo.fromDate = helperScripts.getDateObj(eventInfo.fromDate);
        eventInfo.toDate = helperScripts.getDateObj(eventInfo.toDate);
        eventInfo.lastDateRegistration = helperScripts.getDateObj(eventInfo.lastDateRegistration);

        $name.val(eventInfo.name);
        $description.val(eventInfo.description);
        $fromTime.val(eventInfo.fromTime);
        $toTime.val(eventInfo.toTime);
        $fromAge.val(eventInfo.fromAge);
        $toAge.val(eventInfo.toAge);
        if (eventInfo.fromDate) {
            $fromDate.val(eventInfo.fromDate.year + '-' + eventInfo.fromDate.month + '-' + eventInfo.fromDate.date);
        }
        if (eventInfo.toDate) {
            $toDate.val(eventInfo.toDate.year + '-' + eventInfo.toDate.month + '-' + eventInfo.toDate.date);

        }
        if (eventInfo.lastDateRegistration) {
            $lastDateOfRegistration.val(eventInfo.lastDateRegistration.year + '-' + eventInfo.lastDateRegistration.month + '-' + eventInfo.lastDateRegistration.date);
        }
        $contactPersonName.val(eventInfo.organiserName);
        $contactPersonPhone.val(eventInfo.organiserPhone);
        $contactPersonEmail.val(eventInfo.organiserEmail);
        $website.val(eventInfo.website);
        $addressLine1.val(eventInfo.addressLine1);
        $addressLine2.val(eventInfo.addressLine2);
        $city.val(eventInfo.city);
        $state.val(eventInfo.state);
        $district.val(eventInfo.district);
        $country.val(eventInfo.country);
        $pin.val(eventInfo.pin);
        eventInfo.category = eventInfo.category.split(',');
        $category.val(eventInfo.category);
    }

    function init(eventInfo) {
        cache();
        render(eventInfo);
        bindEvents(eventInfo._id);
    }

    return {init};
})();