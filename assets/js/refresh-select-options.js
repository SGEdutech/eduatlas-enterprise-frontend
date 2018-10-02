const refreshSelectInput = (() => {
    let $courseIdSelect;
    let $selects;

    function cache() {
        $courseIdSelect = $('.courseIdSelect');
        $selects = $('.selectpicker');
    }

    function refresh() {
        $courseIdSelect.selectpicker('refresh');
        $selects.selectpicker('refresh')
    }

    function init() {
        cache();
        refresh();
    }

    return {
        init
    };
})();