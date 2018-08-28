PubSub.subscribe('user', (msg, userInfo) => {
    navigationBar.render(userInfo);
    bookmark.updateUserInfo(userInfo);
});

user.getInfo().then(userInfo => {
    navigationBar.init(userInfo, {
        colorOnScroll: true,
        activeElementId: 'home_nav'
    });
    bookmark.updateUserInfo(userInfo);
});

tuitionCards.init().then(cardsContainer => {
    carousel.init(cardsContainer);
    bookmark.init();
});

schoolCards.init().then(cardsContainer => {
    carousel.init(cardsContainer);
    // bookmark.init();
});

searchBtn.init();

setTimeout(loginModal.init());

searchSuggestion.init();