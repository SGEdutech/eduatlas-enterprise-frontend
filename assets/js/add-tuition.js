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
        document.getElementById('monFrom').innerHTML = `<input type="text" name="n_dayAndTimeOfOperation_day_1" value="monday" class="hide">
                        <input name="n_dayAndTimeOfOperation_fromTime_1" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
    }
    if (this.checked) {
        document.getElementById('monTo').innerHTML = "";
    } else {
        document.getElementById('monTo').innerHTML = `<input name="n_dayAndTimeOfOperation_toTime_1" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
    }
    $('.timepicker').timepicker();
};

cboxTues.onchange = function () {
    $('.timepicker').timepicker();
    if (this.checked) {
        document.getElementById('tueFrom').innerHTML = "";
    } else {
        document.getElementById('tueFrom').innerHTML = `<input type="text" name="n_dayAndTimeOfOperation_day_2" value="tuesday" class="hide">
                        <input name="n_dayAndTimeOfOperation_fromTime_2" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
    }
    if (this.checked) {
        document.getElementById('tueTo').innerHTML = "";
    } else {
        document.getElementById('tueTo').innerHTML = `<input name="n_dayAndTimeOfOperation_toTime_2" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
    }
    $('.timepicker').timepicker();
};

cboxWed.onchange = function () {
    if (this.checked) {
        document.getElementById('wedFrom').innerHTML = "";
    } else {
        document.getElementById('wedFrom').innerHTML = `<input type="text" name="n_dayAndTimeOfOperation_day_3" value="wednesday" class="hide">
                        <input name="n_dayAndTimeOfOperation_fromTime_3" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
    }
    if (this.checked) {
        document.getElementById('wedTo').innerHTML = "";
    } else {
        document.getElementById('wedTo').innerHTML = `<input name="n_dayAndTimeOfOperation_toTime_3" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
    }
    $('.timepicker').timepicker();
};

cboxThr.onchange = function () {
    if (this.checked) {
        document.getElementById('thrFrom').innerHTML = "";
    } else {
        document.getElementById('thrFrom').innerHTML = `<input type="text" name="n_dayAndTimeOfOperation_day_4" value="thursday" class="hide">
                        <input name="n_dayAndTimeOfOperation_fromTime_4" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
    }
    if (this.checked) {
        document.getElementById('thrTo').innerHTML = "";
    } else {
        document.getElementById('thrTo').innerHTML = `<input name="n_dayAndTimeOfOperation_toTime_4" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
    }
    $('.timepicker').timepicker();
};

cboxFri.onchange = function () {
    if (this.checked) {
        document.getElementById('friFrom').innerHTML = "";
    } else {
        document.getElementById('friFrom').innerHTML = `<input type="text" name="n_dayAndTimeOfOperation_day_5" value="friday" class="hide">
                        <input name="n_dayAndTimeOfOperation_fromTime_5" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
    }
    if (this.checked) {
        document.getElementById('friTo').innerHTML = "";
    } else {
        document.getElementById('friTo').innerHTML = `<input name="n_dayAndTimeOfOperation_toTime_5" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
    }
    $('.timepicker').timepicker();
};

cboxSat.onchange = function () {
    if (this.checked) {
        document.getElementById('satFrom').innerHTML = "";
    } else {
        document.getElementById('satFrom').innerHTML = `<input type="text" name="n_dayAndTimeOfOperation_day_6" value="saturday" class="hide">
                        <input name="n_dayAndTimeOfOperation_fromTime_6" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
    }
    if (this.checked) {
        document.getElementById('satTo').innerHTML = "";
    } else {
        document.getElementById('satTo').innerHTML = `<input name="n_dayAndTimeOfOperation_toTime_6" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
    }
    $('.timepicker').timepicker();
};

cboxSun.onchange = function () {
    if (this.checked) {
        document.getElementById('sunFrom').innerHTML = "";
    } else {
        document.getElementById('sunFrom').innerHTML = `<input type="text" name="n_dayAndTimeOfOperation_day_7" value="sunday" class="hide">
                        <input name="n_dayAndTimeOfOperation_fromTime_7" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
    }
    if (this.checked) {
        document.getElementById('sunTo').innerHTML = "";
    } else {
        document.getElementById('sunTo').innerHTML = `<input name="n_dayAndTimeOfOperation_toTime_7" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
    }
    $('.timepicker').timepicker();
};