const courses = (() => {
    let $coursesContainer;
    let $newCourseForm;
    let $addNewCourseButton;
    let $resultsTabButton;
    let $resultsTab;
    let $newCourseModal;
    let $deleteButtons;

    function cache() {
        $coursesContainer = $("#coursesContainer");
        $newCourseForm = $('#newCourse');
        $addNewCourseButton = $('#add_new_course_button');
        $resultsTabButton = $('#next_Tab_Button');
        $resultsTab = $(`[href = "#tab4"]`);
        $newCourseModal = $('#new_course_modal');
    }

    function cacheDynamic() {
        $deleteButtons = $('.delete-course-button');
    }

    function render(tuition) {
        let html = getHtml(tuition);
        $coursesContainer.append(html);
    }

    function bindEvents(tuitionId) {
        $addNewCourseButton.click(() => addCourse(tuitionId));
        $resultsTabButton.click(() => helperScripts.showNextTab($resultsTab));
        $deleteButtons.click(function () {
            deleteCourse(this, tuitionId)
        });
    }

    function cacheNBindDeleteButtons(tuitionId) {
        cacheDynamic();
        $deleteButtons.click(function () {
            deleteCourse(this, tuitionId)
        });
    }

    function deleteCourse(element, tuitionId) {
        const $element = $(element);
        let title = $element.attr('data-title');
        let cardId = $element.attr('data-course-id');
        eagerRemoveCard(cardId);

        $.ajax({
            url: '/tuition/delete/courses/' + tuitionId,
            type: 'DELETE',
            data: {
                title: title
            }
        }).then(() => {
            // alert("course deleted successfully")
        }).catch((err) => {
            console.log(err);
            alert("course deletion failed")
        });
    }

    function eagerRemoveCard(cardId) {
        //todo - cache properly
        $('#' + cardId).remove()
    }

    function eagerLoadCourse(serializedForm) {
        $newCourseModal.modal('hide');
        let contextInner = {};
        serializedForm.forEach(obj => contextInner[obj.name] = obj.value);
        //give _id to contextInner
        contextInner._id = Math.floor(Math.random() * (50000 - 100) + 100);

        if (contextInner.nextBatch) {
            contextInner.nextBatch = contextInner.nextBatch.split('T')[0];
        }
        let contextOuter = {
            courses: [contextInner]
        };
        $coursesContainer.append(template.userEditTuitionCourses(contextOuter));
    }

    function addCourse(tuitionId) {
        eagerLoadCourse($newCourseForm.serializeArray());
        // get the data and send it in post request
        const AddedCourse = $.ajax({
            url: '/tuition/add/courses/' + tuitionId,
            type: 'POST',
            data: $newCourseForm.serialize()
        });

        AddedCourse.then((data) => {
            cacheNBindDeleteButtons(tuitionId);
            // window.location.assign(`user-edit-tuition.html?a=${data._id}&tab=courses`);
            // alert("course added successfully")
        }).catch((err) => {
            console.log(err);
            alert("course addition failed")
        })
    }

    function getHtml(tuition) {
        if (!tuition) {
            return
        }

        let context = {
            courses: tuition.courses ? tuition.courses : [],
        };

        let counter = 1;
        context.courses.forEach((obj) => {
            if (obj.nextBatch) {
                obj.nextBatch = obj.nextBatch.split('T')[0];
            }
            obj.id = counter;
            counter++;
        });

        return template.userEditTuitionCourses(context);
    }

    function init(tuition) {
        cache();
        render(tuition);
        cacheDynamic();
        bindEvents(tuition._id);
    }

    return {init};
})();