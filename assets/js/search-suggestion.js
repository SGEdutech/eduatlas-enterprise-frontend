const searchSuggestion = (() => {
    let $suggestionContainer = $('#autocomplete_container');
    let $searchInput = $('#search_input');
    let query;

    function cacheDom() {
        $suggestionContainer = $('#autocomplete_container');
        $searchInput = $('#search_input');
    }

    function bindEvents() {
        $searchInput.keyup(checkKey);
        $searchInput.blur(removeSuggestion);
    }

    function removeSuggestion() {
        setTimeout(function () {
            $suggestionContainer.empty();
        }, 1);
    }

    function checkKey(event) {
        if (event.keyCode === 13) {
            redirectToSearchPage();
        } else {
            getSuggestion().then(render);
        }
    }

    function redirectToSearchPage() {
        query = $searchInput.val();
        window.location.assign('searchdetails.html?typeOfInfo=tuition&items=18&page=1&c=true&city=&state=&sortBy=default&name=' + query);
    }

    function getSuggestion() {
        query = $searchInput.val();
        const url = '/tuition/search';
        const data = {
            name: JSON.stringify({
                search: query,
                fullTextSearch: false,
            }),
            limit: 5,
            demands: 'name'
        };
        return $.ajax({url, data}); //Returns a promise
    }

    function render(suggestionArray) {
        const context = {suggestionArray};
        const suggestionHtml = template.searchResult(context);
        $suggestionContainer.html(suggestionHtml);
    }

    function init() {
        cacheDom();
        bindEvents();
    }

    return {init};
})();