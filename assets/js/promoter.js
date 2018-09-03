const promoter = (() => {
    let $adManageList;

    function cache() {
        $adManageList = $('#ad-manage-list')
    }

    function renderList(userInfo) {
        let listHtml = "";
        userInfo.claimedInstitutes.forEach(currentItem => {
            // below part will come in some "then" of a promise
            let instituteInfo = getInstitutesInfo(currentItem.objId);

            let numberOfAds = 0;
            if (currentItem.promoter_homepage) {
                numberOfAds++;
            }
            if (currentItem.promoter_searchpage) {
                numberOfAds++;
            }
            if (currentItem.promoter_category) {
                numberOfAds++;
            }
            if (currentItem.promoter_related) {
                numberOfAds++;
            }
            instituteInfo.numberOfAds = numberOfAds;

            listHtml += template.manageAdList(instituteInfo)
        });
        $adManageList.append(listHtml);
    }

    function getInstitutesInfo(_id) {
        return {
            name: "test institute and this to make name long",
            address: "bla bla , 67823 bangla sahib road , new delhi , 120912"
        }
    }

    function init(userInfo) {
        cache();
        renderList(userInfo);
    }

    return {
        init
    };
})();