PubSub.subscribe('user', (msg, userInfo) => {
    navigationBar.render(userInfo);
});

user.getInfo().then(userInfo => {
    navigationBar.init(userInfo);
});

PubSub.subscribeOnce('query.load', (msg, queryObject) => {
    getEvent.render(queryObject);
});

loginModal.init();

queryString.loadQueryString();