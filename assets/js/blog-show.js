let title=$('#title');
let somedata=$('#data');
$.get({
    url:'/blog',
    data: {
        _id: '5b72c9b64c4f2e5676edb804'
    }
}).then(render);

function render(data) {
   somedata.html(data.body)
    title.html(data.title)
}