const dashboardHideSubMenu = (() => {
    let $addTuitionSubMenu, $addSchoolSubMenu;
    let $triggerAddTuitionSubMenu, $triggerAddSchoolSubMenu;

    function cache() {
        $addTuitionSubMenu = $('#addTuitionSubMenu');
        $addSchoolSubMenu = $('#addSchoolSubMenu');
        $triggerAddTuitionSubMenu = $('a[href="#tab3"]');
        $triggerAddSchoolSubMenu = $('a[href="#tab6"]');
    }

    function bindEvents() {
        $triggerAddTuitionSubMenu.on('show.bs.tab', function (e) {
            $addTuitionSubMenu.show();
        });

        $triggerAddTuitionSubMenu.on('hide.bs.tab', function (e) {
            $addTuitionSubMenu.hide();
        });

        $triggerAddSchoolSubMenu.on('show.bs.tab', function (e) {
            $addSchoolSubMenu.show();
        });

        $triggerAddSchoolSubMenu.on('hide.bs.tab', function (e) {
            $addSchoolSubMenu.hide();
        });
    }

    function init() {
        cache();
        $addTuitionSubMenu.hide();
        $addSchoolSubMenu.hide();
        bindEvents();
    }

    return {init};
})();