const source = $('#list_template').html();
const template = Handlebars.compile(source);
const tuitionsContainer = $('#tuitions_container');

$.ajax({
    url: 'http://eduatlas.com/tuition/all',
}).then(data => {
    let context = {tuitions: data};
    let html = template(context);
    tuitionsContainer.html(html)
});

function deleteTuition(_id) {
    $.ajax({
        url: `http://eduatlas.com/tuition/${_id}`,
        type: 'DELETE'
    }).then(data => $(`#${_id}`).remove());
}

let count = 1;

Handlebars.registerHelper('getSerialNumber', () => {
    count++;
    return count - 1;
});

// TODO: Something
