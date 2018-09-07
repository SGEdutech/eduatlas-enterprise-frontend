const institutePills = (() => {
    let $navPillsList;

    function cache() {
        $navPillsList = $('#nav-pills-list');
    }

    function renderPills(userInfo) {
        userInfo.claims.forEach((obj, index) => {
            getName(obj).then((institueData) => {
                $navPillsList.append(`<li class="nav-item">
                <a class="nav-link" href="#tab${(index+1)*10}" data-toggle="tab">${institueData.name}</a>
                </li>`);
            }).catch((err) => {
                console.error(err);
            });
        })
    }


    function getName(claimObj) {
        return $.ajax({
            type: "GET",
            url: `/${claimObj.category}/`,
            data: {
                _id: claimObj.objectId
            },
        });
    }

    function init(userInfo) {
        cache();
        renderPills(userInfo);
    }

    return {
        init
    };
})();