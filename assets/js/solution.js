const form = $('#solution_form');

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
            alert('done')
        },
        error: err => console.error(err)
    })
});