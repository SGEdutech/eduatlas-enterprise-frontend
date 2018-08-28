const redirectTabs = (() => {
    let $addTuitionTab, $addSchoolTab, $addEventTab;

    function cache() {
        $addTuitionTab = $('.nav-item a[href="#tab3"]');
        $addSchoolTab = $('.nav-item a[href="#tab6"]');
        $addEventTab = $('.nav-item a[href="#tab7"]');
    }

    function showTab(queryObject) {
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

    return {init};
})();