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
        },
        error: err => console.error(err)
    })
});

let cboxMon = document.getElementById("cboxMon");
let cboxTues = document.getElementById("cboxTues");
let cboxWed = document.getElementById("cboxWed");
let cboxThr = document.getElementById("cboxThr");
let cboxFri = document.getElementById("cboxFri");
let cboxSat = document.getElementById("cboxSat");
let cboxSun = document.getElementById("cboxSun");


cboxMon.onchange = function () {

    if (this.checked) {
        document.getElementById('monFrom').innerHTML = "";
    } else {
        document.getElementById('monFrom').innerHTML = `<input name="day_monday_from" type="text" class="timepicker col s5" placeholder="Start">`;
    }
    if (this.checked) {
        document.getElementById('monTo').innerHTML = "";
    } else {
        document.getElementById('monTo').innerHTML = `<input name="day_monday_to" type="text" class="timepicker col s5" placeholder="End">`;
    }
    $('.timepicker').timepicker();
};

cboxTues.onchange = function () {
    $('.timepicker').timepicker();
    if (this.checked) {
        document.getElementById('tueFrom').innerHTML = "";
    } else {
        document.getElementById('tueFrom').innerHTML = `<input name="day_tuesday_from" type="text" class="timepicker col s5" placeholder="Start">`;
    }
    if (this.checked) {
        document.getElementById('tueTo').innerHTML = "";
    } else {
        document.getElementById('tueTo').innerHTML = `<input name="day_tuesday_to" type="text" class="timepicker col s5" placeholder="End">`;
    }
    $('.timepicker').timepicker();
};

cboxWed.onchange = function () {
    if (this.checked) {
        document.getElementById('wedFrom').innerHTML = "";
    } else {
        document.getElementById('wedFrom').innerHTML = `<input name="day_wednesday_from" type="text" class="timepicker col s5" placeholder="Start">`;
    }
    if (this.checked) {
        document.getElementById('wedTo').innerHTML = "";
    } else {
        document.getElementById('wedTo').innerHTML = `<input name="day_wednesday_to" type="text" class="timepicker col s5" placeholder="End">`;
    }
    $('.timepicker').timepicker();
};

cboxThr.onchange = function () {
    if (this.checked) {
        document.getElementById('thrFrom').innerHTML = "";
    } else {
        document.getElementById('thrFrom').innerHTML = `<input name="day_thursday_from" type="text" class="timepicker col s5" placeholder="Start">`;
    }
    if (this.checked) {
        document.getElementById('thrTo').innerHTML = "";
    } else {
        document.getElementById('thrTo').innerHTML = `<input name="day_thursday_to" type="text" class="timepicker col s5" placeholder="End">`;
    }
    $('.timepicker').timepicker();
};

cboxFri.onchange = function () {
    if (this.checked) {
        document.getElementById('friFrom').innerHTML = "";
    } else {
        document.getElementById('friFrom').innerHTML = `<input name="day_friday_from" type="text" class="timepicker col s5" placeholder="Start">`;
    }
    if (this.checked) {
        document.getElementById('friTo').innerHTML = "";
    } else {
        document.getElementById('friTo').innerHTML = `<input name="day_friday_to" type="text" class="timepicker col s5" placeholder="End">`;
    }
    $('.timepicker').timepicker();
};

cboxSat.onchange = function () {
    if (this.checked) {
        document.getElementById('satFrom').innerHTML = "";
    } else {
        document.getElementById('satFrom').innerHTML = `<input name="day_saturday_from" type="text" class="timepicker col s5" placeholder="Start">`;
    }
    if (this.checked) {
        document.getElementById('satTo').innerHTML = "";
    } else {
        document.getElementById('satTo').innerHTML = `<input name="day_saturday_to" type="text" class="timepicker col s5" placeholder="End">`;
    }
    $('.timepicker').timepicker();
};

cboxSun.onchange = function () {
    if (this.checked) {
        document.getElementById('sunFrom').innerHTML = "";
    } else {
        document.getElementById('sunFrom').innerHTML = `<input name="day_sunday_from" type="text" class="timepicker col s5" placeholder="Start">`;
    }
    if (this.checked) {
        document.getElementById('sunTo').innerHTML = "";
    } else {
        document.getElementById('sunTo').innerHTML = `<input name="day_sunday_to" type="text" class="timepicker col s5" placeholder="End">`;
    }
    $('.timepicker').timepicker();
};