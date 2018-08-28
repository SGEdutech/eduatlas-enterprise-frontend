const coverImage = (() => {
    let $coverImgContainer;

    function cache() {
        $coverImgContainer = $("#coverImgContainer");
    }

    function render(typeOfInfo, user) {
        let html;
        if (typeOfInfo === 'tuition') {
            html = getCoverHtml(user.img_tuitionCoverPic);
        }
        if (typeOfInfo === 'school') {
            html = getCoverHtml(user.img_schoolCoverPic);
        }
        if (typeOfInfo === 'event') {
            html = getCoverHtml(user.img_eventCoverPic);
        }

        $coverImgContainer.append(html);
    }

    function getCoverHtml(path) {
        return template.userEditTuitionCover({path: path});
    }

    function init(typeOfInfo, user) {
        cache();
        render(typeOfInfo, user);
    }

    return {init};
})();