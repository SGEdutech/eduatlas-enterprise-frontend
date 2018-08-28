function checkForm(form) {
    if (form.primaryEmail.value == "") {
        alert("Error: primaryEmail cannot be blank!");
        form.primaryEmail.focus();
        return false;
    }
    re = /^\w+$/;
    /*if (!re.test(form.primaryEmail.value)) {
        alert("Error: primaryEmail must contain only letters, numbers and underscores!");
        form.primaryEmail.focus();
        return false;
    }*/

    if (form.password.value != "" && form.password.value == form.password2.value) {
        if (form.password.value.length < 6) {
            alert("Error: Password must contain at least six characters!");
            form.password.focus();
            return false;
        }
        if (form.password.value == form.primaryEmail.value) {
            alert("Error: Password must be different from Email!");
            form.password.focus();
            return false;
        }
        /*re = /[0-9]/;
        if (!re.test(form.password.value)) {
            alert("Error: password must contain at least one number (0-9)!");
            form.password.focus();
            return false;
        }*/
        re = /[a-z]/;
        if (!re.test(form.password.value)) {
            alert("Error: password must contain at least one lowercase letter (a-z)!");
            form.password.focus();
            return false;
        }
        /*re = /[A-Z]/;
        if(!re.test(form.password.value)) {
            alert("Error: password must contain at least one uppercase letter (A-Z)!");
            form.password.focus();
            return false;
        }*/
    } else {
        alert("Error: Please check that you've entered and confirmed your password!");
        form.password.focus();
        return false;
    }

    // alert("You entered a valid password: " + form.password.value);
    return true;
}

let form = $('#signupForm');
// Set up an event listener for the contact form.
$(form).submit(function (event) {
    // Stop the browser from submitting the form.
    event.preventDefault();

    // Serialize the form data.
    let formData = $(form).serialize();

    //put some restrictions
    let isOkey = checkForm(this);
    //send AJAX
    if (isOkey) {
        $.ajax({
            url: form.attr('action'),
            type: form.attr('method'),
            data: formData,
        }).then(() => {
            window.location.assign('/?m=login');
        }).catch(err => {
            alert(err.responseText);
        });
    } else {

    }
});