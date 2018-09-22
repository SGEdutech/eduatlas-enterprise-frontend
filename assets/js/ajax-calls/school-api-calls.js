const schoolApiCalls = (() => {
    const validArrayNames = {
        schoolTiming: true,
        officeTiming: true,
        team: true,
        gallery: true,
        bragging: true,
        activities: true,
        reviews: true,
        importantDates: true
    };
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

function getAllSchools(skip = 0, limit = 0, demands) {
        return $.ajax({
            type: "GET",
            url: `/school/all`,
            data: {
                limit: limit,
                skip: skip,
                demands: demands
            },
        });
    }

    function searchSchools(skip = 0, limit = 0, sortBy, demands, extraInfoObj = {}) {
        let basicData = {
            skip: skip,
            limit: limit,
            sortBy: sortBy,
            demands: demands
        }

        let data = {
            ...basicData,
            ...extraInfoObj
        }

        return $.ajax({
            type: "GET",
            url: `/school/search`,
            data: data,
        });
    }

    function getSpecificSchool(idenfifierObj = {}) {
        return $.ajax({
            type: "GET",
            url: `/school`,
            data: idenfifierObj,
        });
    }

    function putInArrayInSchool(idOfSchool, arrayName, bodyObj, isForm = false) {
        console.log(bodyObj);
        if (!checkForHexRegExp.test(idOfSchool)) {
            console.error("Not a valid idOfSchool");
        }

        if (arrayName in validArrayNames) {
            if (isForm) {
                return $.ajax({
                    type: "POST",
                    url: `/school/add/${idOfSchool}/${arrayName}`,
                    data: bodyObj,
                    cache: false,
                    contentType: false,
                    processData: false,
                });
            } else {
                return $.ajax({
                    type: "POST",
                    url: `/school/add/${idOfSchool}/${arrayName}`,
                    data: bodyObj,
                });
            }
        } else {
            console.error("Not a valid array name in schools");
        }
    }

    function putNewSchool(bodyObj, isForm = false) {
        if (isForm) {
            return $.ajax({
                type: "POST",
                url: `/school`,
                data: bodyObj,
                cache: false,
                contentType: false,
                processData: false,
            });
        } else {
            return $.ajax({
                type: "POST",
                url: `/school`,
                data: bodyObj,
            });
        }
    }

    function updateInArrayInSchool(idOfSchool, arrayName, idOfNestedObj, bodyObj) {
        if (!checkForHexRegExp.test(idOfSchool)) {
            console.error("Not a valid idOfSchool");
        }
        if (!checkForHexRegExp.test(idOfNestedObj)) {
            console.error("Not a valid idOfNestedObj");
        }

        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "PUT",
                url: `/school/update/${idOfSchool}/${arrayName}/${idOfNestedObj}/`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in schools");
        }
    }

    function updateInSchool(idOfSchool, bodyObj, isForm = false) {
        if (!checkForHexRegExp.test(idOfSchool)) {
            console.error("Not a valid idOfSchool");
        }
        if (isForm) {
            return $.ajax({
                type: "PUT",
                url: `/school/${idOfSchool}`,
                data: bodyObj,
                cache: false,
                contentType: false,
                processData: false,
            });
        } else {
            return $.ajax({
                type: "PUT",
                url: `/school/${idOfSchool}`,
                data: bodyObj,
            });
        }
    }

    function deleteInArrayInSchool(idOfSchool, arrayName, bodyObj) {
        if (!checkForHexRegExp.test(idOfSchool)) {
            console.error("Not a valid idOfSchool");
        }

        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "DELETE",
                url: `/school/delete/${idOfSchool}/${arrayName}`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in schools");
        }
    }

    function deleteArrayInSchool(arrayName, bodyObj) {
        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "DELETE",
                url: `/school/empty/${arrayName}`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in schools");
        }
    }

    function deleteSchool(idOfSchool) {
        if (!checkForHexRegExp.test(idOfSchool)) {
            console.error("Not a valid idOfSchool");
        }
        return $.ajax({
            type: "DELETE",
            url: `/school/${idOfSchool}`,
            data: bodyObj,
        });
    }
    /* 
        function getClaimedSchools(limit = 0, skip = 0, demands) {
            return $.ajax({
                type: "GET",
                url: `/school/claimed`,
                data: {
                    limit: limit,
                    skip: skip,
                    demands: demands
                },
            });
        }
    */

    return {
        getAllSchools,
        getSpecificSchool,
        searchSchools,
        putInArrayInSchool,
        putNewSchool,
        updateInArrayInSchool,
        updateInSchool,
        deleteArrayInSchool,
        deleteInArrayInSchool,
        deleteSchool
    };
})();