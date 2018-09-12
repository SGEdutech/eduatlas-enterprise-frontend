const instituteCourses = (() => {
    let $coursesContainer;
    let $newCourseForm;
    let $activeCourseContainer;
    let $deleteButtons;

    function cache() {
        $coursesContainer = $("#coursesContainer");
        $newCourseForm = $('.new_course_form');
    }

    function cacheNewCourseContainer(tabNumber) {
        $activeCourseContainer = $(`#active_course_container${tabNumber}`);
    }

    function cacheDynamic() {
        $deleteButtons = $('.delete-course-btn');
    }

    function render() {
        let html = getHtml();
        $coursesContainer.append(html);
    }

    function bindEvents() {
        $newCourseForm.submit(function (e) {
            e.preventDefault();
            addCourse($(this));
        });

        $deleteButtons.click(function (e) {
            e.preventDefault();
            deleteCourse($(this))
        });
    }

    function cacheNBindDeleteButtons(tuitionId) {
        cacheDynamic();
        $deleteButtons.click(function (e) {
            e.preventDefault();
            deleteCourse($(this));
        });
    }

    function deleteCourse($element) {
        let cardId = $element.attr('data-id');

        courseApiCalls.deleteCourse(cardId).then(data => {
            eagerRemoveCard(cardId);
        }).catch(err => console.error(err));

    }

    function eagerRemoveCard(cardId) {
        //todo - cache properly
        $('#' + cardId).remove()
    }

    function eagerLoadCourse(context) {
        context.col4 = true;
        $activeCourseContainer.append(template.instituteCourseCard(context))
        cacheNBindDeleteButtons();
    }

    function addCourse(form) {
        if (!form) {
            return
        }
        const tabNumber = form.attr("data-tabNumber");
        cacheNewCourseContainer(tabNumber);

        const serializedArrayForm = form.serializeArray()
        let bodyObj = {};
        serializedArrayForm.forEach(obj => {
            bodyObj[obj.name] = obj.value;
        })

        courseApiCalls.putNewCourse(bodyObj).then(data => {
                bodyObj._id = data._id;
                eagerLoadCourse(bodyObj)
            })
            .catch(err => console.error(err));
    }

    function getHtml() {
        // return template.userEditTuitionCourses(context);
    }

    function init() {
        cache();
        render();
        cacheDynamic();
        bindEvents();
    }

    return {
        init
    };
})();