tinymce.init({
    selector: '.editor',
    height: 700,
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor textcolor',
        'searchreplace visualblocks code fullscreen',
        'table contextmenu paste code help wordcount'
    ],
    toolbar: 'link image | undo redo | formatselect | bold italic strikethrough backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    setup: ed => {ed.on('init', () => $('.mce-branding').remove())}
});