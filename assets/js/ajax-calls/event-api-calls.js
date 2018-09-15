const eventApiCalls = (() => {
    const validArrayNames = {
        // schoolTiming: true,
    };
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

    function getAllEvents(skip = 0, limit = 0, demands) {
        return $.ajax({
            type: "GET",
            url: `/event/all`,
            data: {
                limit: limit,
                skip: skip,
                demands: demands
            },
        });
    }

    function getSpecificEvent(idenfifierObj = {}) {
        return $.ajax({
            type: "GET",
            url: `/event`,
            data: idenfifierObj,
        });
    }

    function searchEvents(skip = 0, limit = 0, sortBy, demands) {
        return $.ajax({
            type: "GET",
            url: `/event/search`,
            data: {
                skip: skip,
                limit: limit,
                sortBy: sortBy,
                demands: demands
            },
        });
    }

    function putInArrayInEvent(idOfEvent, arrayName, bodyObj) {
        if (!checkForHexRegExp.test(idOfEvent)) {
            console.error("Not a valid idOfEvent");
        }

        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "POST",
                url: `/event/add/${idOfEvent}/${arrayName}`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in events");
        }
    }

    function putNewEvent(bodyObj) {
        return $.ajax({
            type: "POST",
            url: `/event/`,
            data: bodyObj,
        });
    }

    function updateInArrayInEvent(idOfEvent, arrayName, idOfNestedObj, bodyObj) {
        if (!checkForHexRegExp.test(idOfEvent)) {
            console.error("Not a valid idOfEvent");
        }
        if (!checkForHexRegExp.test(idOfNestedObj)) {
            console.error("Not a valid idOfNestedObj");
        }

        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "PUT",
                url: `/event/update/${idOfEvent}/${arrayName}/${idOfNestedObj}/`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in events");
        }
    }

    function updateInEvent(idOfEvent, bodyObj, isForm = false) {
        if (!checkForHexRegExp.test(idOfEvent)) {
            console.error("Not a valid idOfEvent");
        }
        if (isForm) {
            return $.ajax({
                type: "PUT",
                url: `/event/${idOfEvent}`,
                data: bodyObj,
                cache: false,
                contentType: false,
                processData: false,
            });
        } else {
            return $.ajax({
                type: "PUT",
                url: `/event/${idOfEvent}`,
                data: bodyObj,
            });
        }
    }

    function deleteInArrayInEvent(idOfEvent, arrayName, bodyObj) {
        if (!checkForHexRegExp.test(idOfEvent)) {
            console.error("Not a valid idOfEvent");
        }

        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "DELETE",
                url: `/event/delete/${idOfEvent}/${arrayName}`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in events");
        }
    }

    function deleteArrayInEvent(arrayName, bodyObj) {
        if (arrayName in validArrayNames) {
            return $.ajax({
                type: "DELETE",
                url: `/event/empty/${arrayName}`,
                data: bodyObj,
            });
        } else {
            console.error("Not a valid array name in events");
        }
    }

    function deleteEvent(idOfEvent) {
        if (!checkForHexRegExp.test(idOfEvent)) {
            console.error("Not a valid idOfEvent");
        }
        return $.ajax({
            type: "DELETE",
            url: `/event/${idOfEvent}`,
            data: bodyObj,
        });
    }

    return {
        getSpecificEvent,
        getAllEvents,
        searchEvents,
        putInArrayInEvent,
        putNewEvent,
        updateInArrayInEvent,
        updateInEvent,
        deleteInArrayInEvent,
        deleteArrayInEvent,
        deleteEvent
    };
})();