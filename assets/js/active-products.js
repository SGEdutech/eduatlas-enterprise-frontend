const activeProducts = (() => {
    let $itemCardsContainer;
    let $navPillsList;
    let $promoterTab, $communicatorTab, $managerTab;

    function cache() {
        $itemCardsContainer = $('#item-cards-container');
        $navPillsList = $('#nav-pills-list');
    }

    function cacheDynamic() {
        $tabToggle = $(".tab-toggle");
        $promoterTab = $('.nav-item a[href="#tab3"]');
        $communicatorTab = $('.nav-item a[href="#tab4"]');
        $managerTab = $('.nav-item a[href="#tab5"]');
    }

    function bindDynamic() {
        $tabToggle.click(function (e) {
            e.preventDefault();
            let tabToShow = $(this).attr("data-toggle");
            console.log(tabToShow);
            if (tabToShow === "promoter") {
                $promoterTab.tab('show');
            } else if (tabToShow === "communicator") {
                $communicatorTab.tab('show');
            } else if (tabToShow === "manager") {
                $managerTab.tab('show');
            }
        });
    }

    function renderCards(userInfo) {
        let cardsHtml = "";

        if (userInfo.promoter) {
            $navPillsList.append(`<li class="nav-item">
            <a class="nav-link" href="#tab3" data-toggle="tab"> Promoter</a>
            </li>`);

            let context = {};
            context.col4 = true;
            context.promoter = userInfo.promoter;
            //get active card
            cardsHtml += template.productActiveCard(context);
        } else {
            let context = {};
            context.col4 = true;
            context.promoter = true;
            //get incative card
            cardsHtml += template.productInactiveCard(context);
        }
        if (userInfo.manager) {
            $navPillsList.append(`<li class="nav-item">
            <a class="nav-link" href="#tab5" data-toggle="tab"> Manager</a>
            </li>`);

            let context = {};
            context.col4 = true;
            context.manager = userInfo.manager;
            cardsHtml += template.productActiveCard(context);
        } else {
            let context = {};
            context.col4 = true;
            context.manager = true;
            cardsHtml += template.productInactiveCard(context);
        }
        if (userInfo.communicator) {
            $navPillsList.append(`<li class="nav-item">
            <a class="nav-link" href="#tab4" data-toggle="tab"> Communicator</a>
            </li>`);
            let context = {};
            context.col4 = true;
            context.communicator = userInfo.communicator;
            cardsHtml += template.productActiveCard(context);
        } else {
            let context = {};
            context.col4 = true;
            context.communicator = true;
            cardsHtml += template.productInactiveCard(context);
        }

        $itemCardsContainer.html(cardsHtml);
    }

    function init(userInfo) {
        cache();
        renderCards(userInfo);
        cacheDynamic();
        bindDynamic();

    }

    return {
        init
    };
})();