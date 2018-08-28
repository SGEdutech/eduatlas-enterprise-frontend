const navigationBar = (() => {
    let $navContainer;
    let $logOutBtn;
    let $addTuitionBtn,$addSchoolBtn,$addEventBtn;
    let $dynamicUserBtn;
    let $document;
    let user;
    let $navbar;
    let isTransperent;
    let $activeElement;

    function cacheDom() {
        $document = $(document);
        $navContainer = $('#nav_container');
    }

    // TODO: Optimise
    function cacheDynamicDom(activeElementId) {
        $navbar = $('#navigation_bar');
        $logOutBtn = $navContainer.find('#log_out_btn');
        $addTuitionBtn = $navContainer.find('#add_tuition_btn');
        $addSchoolBtn = $navContainer.find('#add_school_btn');
        $addEventBtn = $navContainer.find('#add_event_btn');
        $dynamicUserBtn = $navContainer.find('#dynamic_user_btn');
        if (activeElementId) $activeElement = $(`#${activeElementId}`);
    }

    function updateUserStatus() {
        user.loggedIn = Boolean(user);
        const dynamicButtonHtml = template.userStatus(user);
        $dynamicUserBtn.html(dynamicButtonHtml);
    }

    function updateAddTuitionLink() {
        if (user) {
            $addTuitionBtn.attr('href', './User-dashboard.html?tab=addTuition');
            $addSchoolBtn.attr('href', './User-dashboard.html?tab=addSchool');
            $addEventBtn.attr('href', './User-dashboard.html?tab=addEvent');
        } else {
            $addTuitionBtn.attr('data-toggle', 'modal');
            $addTuitionBtn.attr('data-target', '#loginModal');
            $addSchoolBtn.attr('data-toggle', 'modal');
            $addSchoolBtn.attr('data-target', '#loginModal');
            $addEventBtn.attr('data-toggle', 'modal');
            $addEventBtn.attr('data-target', '#loginModal');
        }
    }

    function checkAndChangeNavColor() {
        if ($document.scrollTop() < 100) {
            if (isTransperent === false) {
                $navbar.addClass('navbar-transparent');
                isTransperent = true;
            }
        } else {
            if (isTransperent === true) {
                $navbar.removeClass('navbar-transparent');
                isTransperent = false;
            }
        }
    }

    function getHtml() {
        const url = 'nav.html';
        const dataType = 'html';
        return $.get({url, dataType}); // Returns Promise
    }

    function bindEvents() {
        if (user) $logOutBtn.click(helperScripts.logout);
    }

    function bindNavScroll() {
        $document.scroll(checkAndChangeNavColor);
    }

    function makeNavColorDynamic() {
        isTransperent = true;
        $navbar.addClass('navbar-transparent');
        bindNavScroll();
    }

    function activateElement() {
        $activeElement.addClass('active');
    }

    function render(userInfo, colorOnScroll, activeElementId) {
        user = userInfo;
        getHtml().then(navHtml => {
            $navContainer.html(navHtml);
            cacheDynamicDom();
            updateUserStatus();
            cacheDynamicDom();
            bindEvents();
            if (colorOnScroll) makeNavColorDynamic();
            cacheDynamicDom(activeElementId);
            if (activeElementId) activateElement();
            updateAddTuitionLink();
        }).catch(err => reject(err));
    }

    function init(userInfo, opts) {
        opts = opts || {};
        const colorOnScroll = opts.colorOnScroll || false;
        const activeElementId = opts.activeElementId;
        cacheDom();
        render(userInfo, colorOnScroll, activeElementId);
    }

    return {init, render};
})();