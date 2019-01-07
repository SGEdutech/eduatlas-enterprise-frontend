const facilitiesDescriptionCategory = (() => {
    let $facilityContainer;
    let $tagContainer;
    let $descriptionContainer;
    let $cateContainer;
    let $otherDetailsContainer;

    function cache() {
        $facilityContainer = $("#facilityContainer");
        $tagContainer = $("#tagContainer");
        $descriptionContainer = $("#descriptionContainer");
        $cateContainer = $("#cateContainer");
        $otherDetailsContainer = $('#otherDetailsContainerSchool');
    }

    function render(typeOfInfo, school) {
        let facilityHtml = getFacilitiesHtml(school);
        let tagHtml = getTagsHtml(school);
        let descHtml = getDescriptionHtml(school);
        let categoryHtml = getCategoryHtml(school);
        let otherDeatilsHtml;
        if (typeOfInfo === 'school') {
            otherDeatilsHtml = getOtherDetailsHtml(school);
        }
        $facilityContainer.append(facilityHtml);
        $tagContainer.append(tagHtml);
        $descriptionContainer.append(descHtml);
        $cateContainer.append(categoryHtml);
        $otherDetailsContainer.append(otherDeatilsHtml);
    }

    function getFacilitiesHtml(context) {
        return template.userEditTuitionFacility(context);
    }

    function getTagsHtml(context) {
        return template.userEditTuitionTag(context);
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