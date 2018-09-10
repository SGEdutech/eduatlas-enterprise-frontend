const promotedHomepageApiCalls = (() => {
    const validArrayNames = {
        schoolTiming: true,
    };
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    function putNewPromoted(promotedBy, listingId, category) {
        if (!checkForHexRegExp.test(listingId)) {
            console.error("Not a valid listingId");
        }
        if (!checkForHexRegExp.test(promotedBy)) {
            console.error("Not a valid promotedBy");
        }

        return $.ajax({
            type: "POST",
            url: `/promoted-homepage/`,
            data: {
                promotedBy: promotedBy,
                listingId: listingId,
                category: category
            },
        });
    }

    function getSpecificAd(idenfifierObj) {
        return $.ajax({
            type: "GET",
            url: `/promoted-home`,
            data: idenfifierObj,
        });
    }

    return {
        putNewPromoted,
        getSpecificAd,
    };
})();