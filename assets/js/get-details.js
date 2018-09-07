const getDetails = (() => {
    function returnData(typeOfInfo, queryObj) {
        const url = `/${typeOfInfo}`;
        const data = {_id: queryObj.a};
        return $.ajax({url, data});
    }
    return {returnData};
})();