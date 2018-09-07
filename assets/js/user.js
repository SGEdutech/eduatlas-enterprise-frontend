const user = (() => {
    function getInfo() {
        const url = '/user/info';
        return $.get({url}); // Returns a promise
    }

    return {getInfo};
})();