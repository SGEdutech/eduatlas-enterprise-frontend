$('select').formSelect();
$('.timepicker').timepicker();
$('.datepicker').datepicker();
$('.modal').modal();

const elem = document.querySelector('.modal');
const instance = M.Modal.getInstance(elem);
const form = $('#the_form');

form.submit(e => {
    e.preventDefault();
    const formData = new FormData(form[0]);
    $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        success: data => {
            instance.open();
            $('input').not('.hide').val('');
        },
        error: err => console.error(err)
    })
});