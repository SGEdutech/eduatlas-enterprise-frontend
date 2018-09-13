const refreshSelectInput = (() => {
    let $courseIdSelect;

    function cache() {
        $courseIdSelect = $('.courseIdSelect');
    }

    function refresh() {
        $courseIdSelect.selectpicker('refresh');
    }

    function init() {
        cache();
        refresh();
    }

    return {
        init
    };
})();