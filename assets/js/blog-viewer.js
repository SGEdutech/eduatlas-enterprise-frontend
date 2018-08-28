let url_string = location.href;
let url = new URL(url_string);
const _id = url.searchParams.get('id');

const $blogContainer = $('#blog_content');

$.get({
    url: '/blog',
    data: {_id}
}).then(blogData => $blogContainer.html(blogData.body))