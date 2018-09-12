const promoterModal = (() => {
    let $promoterModalContainer;
    let $submitBtn;
    let $promoterModal;

    function cacheDom() {
        $promoterModalContainer = $('#promoter_modal_container');
    }

    function cacheDynamicDom() {
        $promoterModal = $('#promoterModal');
        $submitBtn = $('#buy_btn');
    }

    function getHtml() {
        const url = 'promoter-modal.html';
        const dataType = 'html';
        return $.get({url, dataType}); // Returns Promise
    }

    function bindEvents() {
    }

    function render() {
        return new Promise((resolve, reject) => {
            getHtml().then(html => {
                $promoterModalContainer.html(html);
                resolve();
            }).catch(err => reject(err));
        })
    }

    function init() {
        cacheDom();
        render().then(() => {
            PubSub.publish('promoterModal.load', null);
            cacheDynamicDom();
            bindEvents();
        });
    }

    return {init};
})();