PubSub.subscribe('user', (msg, userInfo) => {
	navigationBar.render(userInfo);
});

user.getInfo().then(userInfo => {
	navigationBar.init(userInfo, {
		colorOnScroll: true,
		activeElementId: 'home_nav'
	});
});

setTimeout(loginModal.init());
scroll.init();