const institutePills = (() => {
    let $navPillsList;
    let $tabContainer;

    function cache() {
        $navPillsList = $('#nav-pills-list');
        $tabContainer = $('#tab-container');
    }

    function renderPills(userInfo) {
        userInfo.claims.forEach((obj, index) => {
            getName(obj).then((instituteData) => {
                let tabNumber = (index + 1) * 10;

                $navPillsList.append(`<li class="nav-item">
                <a class="nav-link" href="#tab${tabNumber}" data-toggle="tab">${instituteData.name}</a>
                </li>`);

                promotedHomepageApiCalls.getSpecificAd({
                    category: obj.category,
                    listingId: obj.objectId
                }).then(data => {
                    if (data) {
                        instituteData.promotedHome = true;
                        plotGraph(instituteData.views.total, tabNumber)
                    }
                    instituteData.tabNumber = tabNumber;
                    renderCorrespondingTabs(instituteData);
                });
            }).catch((err) => {
                console.error(err);
            });
        })
    }

    function renderCorrespondingTabs(instituteData) {
        $tabContainer.append(template.instituteTab(instituteData))
    }

    function plotGraph(totalViewsArray = [], tabNumber) {
        let date = new Date();
        let currentYear = date.getFullYear();
        let currentMonth = date.getMonth();
        let viewsThisMonth = [];
        totalViewsArray.forEach(date => {
            date = new Date(date);
            if (date.getFullYear() === currentYear) {
                if (date.getMonth() === currentMonth) {
                    viewsThisMonth.push(date);
                }
            }
        })

        let map = {};
        for (let index = 1; index < 32; index++) {
            map[index] = 0;
        }
        viewsThisMonth.forEach(d => {
            let temp = parseInt(d.getDate());
            map[temp]++;
        });
        createChartFor(tabNumber, map);
        // console.log(Object.values(map));
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