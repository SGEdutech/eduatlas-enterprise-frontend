const oauthApiCalls = (() => {
    const validArrayNames = {
        // claims: true,
    };
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    function login(formData) {
        return $.ajax({
            type: "POST",
            url: `/auth/local/login`,
            data: formData
        });
    }

    return {
        login,
    };
})();