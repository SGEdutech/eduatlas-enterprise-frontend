const faculty = (() => {
    let $facultyContainer;
    let $newFacultyForm;
    let $addNewFacultyButton;
    let $galleryTabButton;
    let $galleryTab;
    let $newFacultyModal;
    let $deleteButtons;
    let $facultyImgInp;
    let imgPath;

    function cache() {
        $facultyContainer = $("#facultyContainer");
        $newFacultyForm = $('#newFaculty');
        $addNewFacultyButton = $('#add_new_faculty_button');
        $galleryTabButton = $('#next_Tab_Button3');
        $galleryTab = $(`[href = "#tab6"]`);
        $newFacultyModal = $('#new_faculty_modal');
        $facultyImgInp = $('#facultyImageInp')
    }

    function cacheDynamic() {
        $deleteButtons = $('.delete-faculty-button');
    }

    function render(institute) {
        let html = getHtml(institute);
        $facultyContainer.append(html);
    }

    function bindEvents(typeOfInfo, tuitionId) {
        $addNewFacultyButton.click(() => addFaculty(typeOfInfo, tuitionId));
        $galleryTabButton.click(() => helperScripts.showNextTab($galleryTab));
        $facultyImgInp.change(function() {
			let reader = new FileReader();
			reader.onload = function(e) {
				// get loaded data and render thumbnail.
				imgPath = e.target.result;
			};
			// read the image file as a data URL.
			reader.readAsDataURL(this.files[0]);
		});
        $deleteButtons.click(function () {
            deleteFaculty(typeOfInfo, this, tuitionId)
        });
    }

    function cacheNBindDeleteButtons(typeOfInfo, instituteId) {
        cacheDynamic();
        $deleteButtons.click(function () {
            deleteFaculty(typeOfInfo, this, instituteId)
        });
    }

    function deleteFaculty(typeOfInfo, element, instituteId) {
        const $element = $(element);
        let name = $element.attr('data-name');
        let cardId = $element.attr('data-faculty-id');
        eagerRemoveCard(cardId);
        let tempPromise;
        if (typeOfInfo === "tuition") {
            tempPromise = tuitionApiCalls.deleteInArrayInTuition(instituteId, "team", {
                name: name
            })
        } else if (typeOfInfo === "school") {
            tempPromise = schoolApiCalls.deleteInArrayInSchool(instituteId, "team", {
                name: name
            })
        }
        tempPromise.then((data) => {
            // alert("faculty deleted successfully")
        }).catch((err) => {
            console.log(err);
            alert("faculty deletion failed")
        });
    }

    function eagerRemoveCard(cardId) {
        console.log(cardId);
        //todo - cache properly
        $('#' + cardId).remove()
    }

    function eagerLoadFaculty(serializedForm) {
        $newFacultyModal.modal('hide');
        let contextInner = {};
        serializedForm.forEach(obj => contextInner[obj.name] = obj.value);
        //give _id to contextInner
        contextInner._id = Math.floor(Math.random() * (50000 - 100) + 100);
        contextInner.img_path = imgPath;
        contextInner.eagerLoad = true;
        
        let contextOuter = {
            faculty: [contextInner]
        };
        $facultyContainer.append(template.userEditTuitionFaculty(contextOuter));
    }

    function addFaculty(typeOfInfo, instituteId) {
        const form = $newFacultyForm;
        eagerLoadFaculty(form.serializeArray());

        const formData = new FormData(form[0]);
        // get the data and send it in post request
        let promise;
        if (typeOfInfo === "tuition") {
            promise = tuitionApiCalls.putInArrayInTuition(instituteId, "team", formData, true)
        } else if (typeOfInfo === "school") {
            promise = schoolApiCalls.putInArrayInSchool(instituteId, "team", formData, true)
        }

        promise.then((data) => {
            cacheNBindDeleteButtons(typeOfInfo, instituteId);
            $newFacultyForm.trigger('reset');
            // alert("result added successfully");
        }).catch((err) => {
            console.log(err);
            $newFacultyForm.trigger('reset');
        })
    }

    function getHtml(institute) {
        if (!institute) {
            return
        }
        let context = {
            faculty: institute.team ? institute.team : []
        };

        let counter = 1;
        context.faculty.forEach((obj) => {
            obj.id = counter;
            counter++;
        });

        return template.userEditTuitionFaculty(context);
    }

    function init(typeOfInfo, institute) {
        cache();
        render(institute);
        cacheDynamic();
        bindEvents(typeOfInfo, institute._id);
    }

    return {
        init
    };
})();