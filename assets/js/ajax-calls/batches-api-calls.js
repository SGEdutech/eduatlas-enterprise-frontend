const batchApiCalls = (() => {
    const validArrayNames = {
        // BatchTiming: true,
    };
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    function getAllBatches(skip = 0, limit = 0, demands) {
        return $.ajax({
            type: "GET",
            url: `/batch/all`,
            data: {
                limit: limit,
                skip: skip,
                demands: demands
            },
        });
    }

    function getSpecificBatch(idenfifierObj) {
        return $.ajax({
            type: "GET",
            url: `/batch`,
            data: idenfifierObj,
        });
    }

    function putNewBatch(bodyObj) {
        return $.ajax({
            type: "POST",
            url: `/batch`,
            data: bodyObj,
        });
    }

    function deleteBatch(idOfBatch) {
        if (!checkForHexRegExp.test(idOfBatch)) {
            console.error("Not a valid idOfBatch");
        }
        return $.ajax({
            type: "DELETE",
            url: `/batch/${idOfBatch}`,
        });
    }

    return {
        getAllBatches,
        getSpecificBatch,
        putNewBatch,
        deleteBatch
    }
})();