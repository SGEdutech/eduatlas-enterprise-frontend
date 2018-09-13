const redirectTabs = (() => {
    let $addTuitionTab, $addSchoolTab, $addEventTab;

    function cache() {
        $addTuitionTab = $('.nav-item a[href="#tab6"]');
        $addSchoolTab = $('.nav-item a[href="#tab7"]');
        $addEventTab = $('.nav-item a[href="#tab8"]');
    }

    function showTab(queryObject) {
        console.log(queryObject.tab);
        if (queryObject.tab === 'addTuition') {
            $addTuitionTab.tab('show');
        } else if (queryObject.tab === 'addSchool') {
            $addSchoolTab.tab('show');
        } else if (queryObject.tab === 'addEvent') {
            $addEventTab.tab('show');
        }
    }

    function init(queryObject) {
        cache();
        showTab(queryObject);
    }

    return {
        init
    };
})();