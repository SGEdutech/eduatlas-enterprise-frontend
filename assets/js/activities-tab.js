const activities = (() => {
    let $newActivityForm;
    let $nextTabButton;
    let $nextTab;
    let $activityInput;

    function cache() {
        $newActivityForm = $('#activityForm');
        $nextTabButton = $('#next_Tab_Button');
        $nextTab = $(`[href = "#tab7"]`);
        $activityInput = $('#acitivitiesInput')
    }

    function render(school) {
        $activityInput.val(school.activities);
    }

    function saveActivities(schoolId, $form) {
        let inputObj = $form.serializeArray();
        let activitiesArr = inputObj[0].value;
        activitiesArr = activitiesArr.split(',');
        $.ajax({
            url: `/school/empty/activities`,
            type: 'DELETE',
            data: {
                _id: schoolId
            }
        }).then(() => {
            // console.log('deleted old array');
            submitActivity(schoolId, activitiesArr)
        });
    }

    function submitActivity(schoolId, arr) {
        let promiseArr = [];
        arr.forEach(entry => {
            promiseArr.push(
                $.ajax({
                    url: `/school/add/activities/${schoolId}`,
                    type: 'POST',
                    data: {string: entry},
                })
            )
        });
        Promise.all(promiseArr).then(() => {
            // console.log('added all activities');
            helperScripts.showNextTab($nextTab);
        })
    }

    function bindEvents(instituteId) {
        $nextTabButton.click(() => {
            saveActivities(instituteId, $newActivityForm)
        })
    }

    function init(school) {
        cache();
        render(school);
        bindEvents(school._id);
    }

    return {init};
})();