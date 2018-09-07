const facilitiesDescriptionCategory = (() => {
    let $facilityContainer;
    let $descriptionContainer;
    let $cateContainer;
    let $otherDetailsContainer;

    function cache() {
        $facilityContainer = $("#facilityContainer");
        $descriptionContainer = $("#descriptionContainer");
        $cateContainer = $("#cateContainer");
        $otherDetailsContainer = $('#otherDetailsContainerSchool');
    }

    function render(typeOfInfo, school) {
        let facilityHtml = getFacilitiesHtml(school);
        let descHtml = getDescriptionHtml(school);
        let categoryHtml = getCategoryHtml(school);
        let otherDeatilsHtml;
        if (typeOfInfo === 'school') {
            otherDeatilsHtml = getOtherDetailsHtml(school);
        }
        $facilityContainer.append(facilityHtml);
        $descriptionContainer.append(descHtml);
        $cateContainer.append(categoryHtml);
        $otherDetailsContainer.append(otherDeatilsHtml);
    }

    function getFacilitiesHtml(context) {
        return template.userEditTuitionFacility(context);
    }

    function getDescriptionHtml(context) {
        return template.userEditTuitionDesc(context);
    }

    function getCategoryHtml(context) {
        return template.userEditTuitionCategory(context);
    }

    function getOtherDetailsHtml(context) {
        return template.editSchoolOtherDetails(context);
    }

    function init(typeOfInfo, school) {
        cache();
        render(typeOfInfo, school);
    }

    return {init};
})();