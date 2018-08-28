const schoolCards = (() => {
    let $cardsContainer;

    function cacheDom() {
        $cardsContainer = $('#cards_container2');
    }

    function getSchoolInfo() {
        const url = '/school/all';
        const data = {limit: 15};
        return $.get(url, data); // Returns a promise
    }

    function insertAverageRating(schoolInfoArray = []) {
        schoolInfoArray.forEach(schoolInfo => {
            const averageRating = helperScripts.calcAverageRating(schoolInfo.reviews);
            schoolInfo.averageRating = averageRating === -1 ? 2.5 : averageRating;
        });
    }

    function getCardsHtml(schoolInfoArray = []) {
        insertAverageRating(schoolInfoArray);
        let cardsHtml = '';
        schoolInfoArray.forEach(schoolInfo => {
            helperScripts.openNowInit(schoolInfo);
            schoolInfo.typeOfInfo='school';
            cardsHtml += template.smoothCardHomePage(schoolInfo)
        });
        return cardsHtml;
    }

    function render(schoolInfoArray) {
        const cardsHtml = getCardsHtml(schoolInfoArray);
        $cardsContainer.html(cardsHtml);
    }

    //Returns card container
    function init() {
        return new Promise((resolve, reject) => {
            cacheDom();
            getSchoolInfo().then(schoolInfoArray => {
                console.log(schoolInfoArray.length);
                render(schoolInfoArray);
                resolve($cardsContainer);
            }).catch(err => reject(err));
        })
    }

    return {init};
})();