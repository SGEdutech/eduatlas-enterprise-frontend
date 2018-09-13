const instituteBatches = (() => {
    let $batchesContainer;
    let $newBatchForm;
    let $activeBatchContainer;
    let $deleteButtons;

    function cache() {
        $BatchesContainer = $("#batchesContainer");
        $newBatchForm = $('.new_batch_form');
    }

    function cacheNewBatchContainer(tabNumber) {
        $activeBatchContainer = $(`#active_batch_container${tabNumber}`);
    }

    function cacheDynamic() {
        $deleteButtons = $('.delete-batch-btn');
    }

    function render() {
        /* let html = getHtml();
        $batchesContainer.append(html); */
    }

    function bindEvents() {
        $newBatchForm.submit(function (e) {
            e.preventDefault();
            addBatch($(this));
        });

        $deleteButtons.click(function (e) {
            e.preventDefault();
            deleteBatch($(this))
        });
    }

    function cacheNBindDeleteButtons() {
        cacheDynamic();
        $deleteButtons.click(function (e) {
            e.preventDefault();
            deleteBatch($(this));
        });
    }

    function deleteBatch($element) {
        let cardId = $element.attr('data-id');

        batchApiCalls.deleteBatch(cardId).then(data => {
            eagerRemoveCard(cardId);
        }).catch(err => console.error(err));

    }

    function eagerRemoveCard(cardId) {
        //todo - cache properly
        $('#' + cardId).remove()
    }

    function eagerLoadBatch(context) {
        context.col4 = true;
        $activeBatchContainer.append(template.instituteBatchCard(context))
        cacheNBindDeleteButtons();
    }

    function addBatch(form) {
        if (!form) {
            return
        }
        const tabNumber = form.attr("data-tabNumber");
        cacheNewBatchContainer(tabNumber);

        const serializedArrayForm = form.serializeArray()
        let bodyObj = {};
        serializedArrayForm.forEach(obj => {
            bodyObj[obj.name] = obj.value;
        })

        batchApiCalls.putNewBatch(bodyObj).then(data => {
                bodyObj._id = data._id;
                eagerLoadBatch(bodyObj)
            })
            .catch(err => console.error(err));
    }

    function getHtml() {
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