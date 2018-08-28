const tuitionCards = (() => {
    let $cardsContainer;

    function cacheDom() {
        $cardsContainer = $('#cards_container');
    }

    function getTuitionInfo() {
        const url = '/tuition/all';
        const data = {limit: 15};
        return $.get(url, data); // Returns a promise
    }

    function insertAverageRating(tuitionInfoArray = []) {
        tuitionInfoArray.forEach(tuitionInfo => {
            const averageRating = helperScripts.calcAverageRating(tuitionInfo.reviews);
            tuitionInfo.averageRating = averageRating === -1 ? 2.5 : averageRating;
        });
    }

    function getCardsHtml(tuitionInfoArray = []) {
        insertAverageRating(tuitionInfoArray);
        let cardsHtml = '';
        tuitionInfoArray.forEach(tuitionInfo => {
            helperScripts.openNowInit(tuitionInfo);
            tuitionInfo.typeOfInfo = 'tuition';
            cardsHtml += template.smoothCardHomePage(tuitionInfo)
        });
        return cardsHtml;
    }

    function render(tuitionInfoArray) {
        const cardsHtml = getCardsHtml(tuitionInfoArray);
        $cardsContainer.html(cardsHtml);
    }

    //Returns card container
    function init() {
        return new Promise((resolve, reject) => {
            cacheDom();
            getTuitionInfo().then(tuitionInfoArray => {
                render(tuitionInfoArray);
                resolve($cardsContainer);
            }).catch(err => reject(err));
        })
    }

    return {init};
})();