const coverImage = (() => {
    let $coverImgContainer;

    function cache() {
        $coverImgContainer = $("#coverImgContainer");
    }

    function render(typeOfInfo, user) {
        let html;
        if (typeOfInfo === 'tuition') {
            html = getCoverHtml('images/' + user.img_tuitionCoverPic);
        } else if (typeOfInfo === 'school') {
            html = getCoverHtml('images/' + user.img_schoolCoverPic);
        } else if (typeOfInfo === 'event') {
            if (user.img_eventCoverPic) {
                html = getCoverHtml('images/' + user.img_eventCoverPic);
            } else {
                html = getCoverHtml('assets/img/event2.png');
            }
        }
        console.log(html);
        $coverImgContainer.html(html);
    }

    function getCoverHtml(path) {
        return template.userEditTuitionCover({
            path: path
        });
    }

    function init(typeOfInfo, user) {
        cache();
        render(typeOfInfo, user);
    }

    return {
        init
    };
})();