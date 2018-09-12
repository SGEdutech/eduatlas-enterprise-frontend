const tuitionApiCalls = (() => {
    const validArrayNames = {
        dayAndTimeOfOperation: true,
        team: true,
        gallery: true,
        bragging: true,
        courses: true,
        reviews: true,
    };
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    function getAllTuitions(limit = 0, skip = 0, demands) {
        return $.ajax({
            type: "GET",
            url: `/tuition/all`,
            data: {
                limit: limit,
                skip: skip,
                demands: demands
            },
        });
    }

    function getSpecificTuition(idenfifierObj) {
        return $.ajax({
            type: "GET",
            url: `/tuition/`,
            data: idenfifierObj,
        });
    }

    function getSpecificTuitionWithCourses(idenfifierObj) {
        return $.ajax({
            type: "GET",
            url: `/tuition/plus-courses`,
            data: idenfifierObj,
        });
    }

    function getSpecificTuitionWithCoursesNBatches(idenfifierObj) {
        return $.ajax({
            type: "GET",
            url: `/tuition/plus-courses-and-batches`,
            data: idenfifierObj,
        });
    }

    function searchTuitions(skip = 0, limit = 0, sortBy, demands) {
        return $.ajax({
            type: "GET",
            url: `/tuition/search`,
            data: {
                skip: skip,
                limit: limit,
                sortBy: sortBy,
                demands: demands
            },
        });
    }

    function searchTuitions(skip = 0, limit = 0, sortBy, demands) {
        return $.ajax({
            type: "GET",
            url: `/tuition/search`,
            data: {
                skip: skip,
                limit: limit,
                sortBy: sortBy,
                demands: demands
            },
        });
    }

    function putInArrayInTuition(idOfTuition, arrayName, bodyObj) {
        if (!checkForHexRegExp.test(idOfTuition)) {
            console.error("Not a valid idOfTuition");
        }

        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "POST",
                url: `/tuition/add/${arrayName}/${idOfTuition}`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in tuitions");
        }
    }

    function putNewTuition(bodyObj) {
        return $.ajax({
            type: "POST",
            url: `/tuition/`,
            data: bodyObj,
        });
    }

    function updateInArrayInTuition(idOfTuition, arrayName, idOfNestedObj, bodyObj) {
        if (!checkForHexRegExp.test(idOfTuition)) {
            console.error("Not a valid idOfTuition");
        }
        if (!checkForHexRegExp.test(idOfNestedObj)) {
            console.error("Not a valid idOfNestedObj");
        }

        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "PUT",
                url: `/tuition/update/${idOfTuition}/${arrayName}/${idOfNestedObj}/`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in tuitions");
        }
    }

    function updateInTuition(idOfTuition, bodyObj) {
        if (!checkForHexRegExp.test(idOfTuition)) {
            console.error("Not a valid idOfTuition");
        }

        return $.ajax({
            type: "PUT",
            url: `/tuition/${idOfTuition}`,
            data: bodyObj,
        });
    }

    function deleteInArrayInTuition(idOfTuition, arrayName, bodyObj) {
        if (!checkForHexRegExp.test(idOfTuition)) {
            console.error("Not a valid idOfTuition");
        }

        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "DELETE",
                url: `/tuition/delete/${idOfTuition}/${arrayName}`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in tuitions");
        }
    }

    function deleteArrayInTuition(arrayName, bodyObj) {
        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "DELETE",
                url: `/tuition/empty/${arrayName}`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in tuitions");
        }
    }

    function deleteTuition(idOfTuition) {
        if (!checkForHexRegExp.test(idOfTuition)) {
            console.error("Not a valid idOfTuition");
        }
        return $.ajax({
            type: "DELETE",
            url: `/tuition/${idOfTuition}`,
            data: bodyObj,
        });
    }

    return {
        getAllTuitions,
        getSpecificTuition,
        getSpecificTuitionWithCourses,
        getSpecificTuitionWithCoursesNBatches,
        searchTuitions,
        putInArrayInTuition,
        putNewTuition,
        updateInArrayInTuition,
        updateInTuition,
        deleteArrayInTuition,
        deleteInArrayInTuition,
        deleteTuition
    };
})();