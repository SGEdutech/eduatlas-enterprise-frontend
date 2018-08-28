/*let editor = new MediumEditor('.editable', {
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'image', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'superscript', 'subscript', 'orderedlist', 'unorderedlist', 'pre', 'outdent', 'indent', 'h2', 'h3'],
        static: true,
        sticky: true
    }
});*/

let editorColOne = new MediumEditor('#column-one', {
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'image', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'superscript', 'subscript', 'orderedlist', 'unorderedlist', 'pre', 'outdent', 'indent', 'h2', 'h3'],
        sticky: true,
        static: true,
        align: 'center',
        updateOnEmptySelection: true
    },
    buttonLabels: 'fontawesome'
});

/*
let editorColTwo = new MediumEditor('#column-two', {
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'image', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'superscript', 'subscript', 'orderedlist', 'unorderedlist', 'pre', 'outdent', 'indent', 'h2', 'h3'],
        sticky: true,
        static: true,
        align: 'center',
        updateOnEmptySelection: true
    },
    buttonLabels: 'fontawesome'
});

let editorColThree = new MediumEditor('#column-three', {
    toolbar: {
        buttons: ['bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'image', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'superscript', 'subscript', 'orderedlist', 'unorderedlist', 'pre', 'outdent', 'indent', 'h2', 'h3'],
        sticky: true,
        static: true,
        align: 'right',
        updateOnEmptySelection: true
    },
    buttonLabels: 'fontawesome'
});*/
