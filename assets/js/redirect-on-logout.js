const redirectOnLogout = (() => {
    function init(user) {
        if (user) {

        } else {
            window.location.assign('/');
        }
    }

    return {init};
})();