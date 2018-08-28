const url = location.href;
const token = url.substring(url.indexOf("?") + 1);

function submit() {
    const password = $('#password_inp').val();
    $.ajax({
        type: 'POST',
        url: '/forgot/change-password',
        data: {
            token,
            password
        }
    })
        .then(data => console.log(data))
        .catch(err => console.error(err));
}