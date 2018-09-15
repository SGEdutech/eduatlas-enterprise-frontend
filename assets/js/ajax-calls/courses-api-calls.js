const courseApiCalls = (() => {
    const validArrayNames = {
        // CourseTiming: true,
    };
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    function getAllCourses(skip = 0, limit = 0, demands) {
        return $.ajax({
            type: "GET",
            url: `/course/all`,
            data: {
                limit: limit,
                skip: skip,
                demands: demands
            },
        });
    }

    function getSpecificCourseWithBatches(courseId, courseDemads, batchDemands) {
        return $.ajax({
            type: "GET",
            url: `/course/plus-batches`,
            data: {
                demands: courseDemads,
                batchDemands: batchDemands,
                _id: courseId
            },
        });
    }

    function getSpecificCourse(idenfifierObj) {
        return $.ajax({
            type: "GET",
            url: `/course`,
            data: idenfifierObj,
        });
    }

    function putNewCourse(bodyObj) {
        return $.ajax({
            type: "POST",
            url: `/course`,
            data: bodyObj,
        });
    }

    function deleteCourse(idOfCourse) {
        if (!checkForHexRegExp.test(idOfCourse)) {
            console.error("Not a valid idOfCourse");
        }
        return $.ajax({
            type: "DELETE",
            url: `/course/${idOfCourse}`,
        });
    }

    return {
        getAllCourses,
        getSpecificCourseWithBatches,
        getSpecificCourse,
        putNewCourse,
        deleteCourse
    }
})();