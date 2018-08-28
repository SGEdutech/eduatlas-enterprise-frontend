let searchBtn = (() => {
    let $searchBtn;
    let $searchInput;

    function cacheDom() {
        $searchBtn = $('#search_btn');
        $searchInput = $('#search_input');
    }

    function directToSearchPage() {
        const directLink =
            'searchdetails.html?typeOfInfo=tuition&items=18&page=1&c=true&city=&state=&sortBy=default&name=' + $searchInput.val();
        window.location.assign(directLink);
    }

    function bindEvents() {
        $searchBtn.click(directToSearchPage);
    }

    function init() {
        cacheDom();
        bindEvents();
    }

    return {init};
})();