let cboxMon = document.getElementById("cboxMon");
let cboxTues = document.getElementById("cboxTues");
let cboxWed = document.getElementById("cboxWed");
let cboxThr = document.getElementById("cboxThr");
let cboxFri = document.getElementById("cboxFri");
let cboxSat = document.getElementById("cboxSat");
let cboxSun = document.getElementById("cboxSun");

let OcboxMon = document.getElementById("OcboxMon");
let OcboxTues = document.getElementById("OcboxTues");
let OcboxWed = document.getElementById("OcboxWed");
let OcboxThr = document.getElementById("OcboxThr");
let OcboxFri = document.getElementById("OcboxFri");
let OcboxSat = document.getElementById("OcboxSat");
let OcboxSun = document.getElementById("OcboxSun");

OcboxMon.onchange = () => monday(false);
OcboxTues.onchange = () => tuesday(false);
OcboxWed.onchange = () => wednesday(false);
OcboxThr.onchange = () => thursday(false);
OcboxFri.onchange = () => friday(false);
OcboxSat.onchange = () => saturday(false);
OcboxSun.onchange = () => sunday(false);

cboxMon.onchange = () => monday(true);
cboxTues.onchange = () => tuesday(true);
cboxWed.onchange = () => wednesday(true);
cboxThr.onchange = () => thursday(true);
cboxFri.onchange = () => friday(true);
cboxSat.onchange = () => saturday(true);
cboxSun.onchange = () => sunday(true);

function monday(isOffice) {
    console.log(isOffice);
    if(isOffice) {
        if (cboxMon.checked) {
            document.getElementById('monFrom').innerHTML = "";
        } else {
            document.getElementById('monFrom').innerHTML = `<input type="text" name="n_schoolTiming_day_1" value="monday" class="hide">
                        <input name="n_schoolTiming_fromTime_1" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (cboxMon.checked) {
            document.getElementById('monTo').innerHTML = "";
        } else {
            document.getElementById('monTo').innerHTML = `<input name="n_schoolTiming_toTime_1" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
        }

    } else {
        console.log(OcboxMon.checked);
        if (OcboxMon.checked) {
            document.getElementById('OmonFrom').innerHTML = "";
        } else {
            document.getElementById('OmonFrom').innerHTML = `<input type="text" name="n_officeTiming_day_1" value="monday" class="hide">
                        <input name="n_officeTiming_fromTime_1" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (OcboxMon.checked) {
            document.getElementById('OmonTo').innerHTML = "";
        } else {
            document.getElementById('OmonTo').innerHTML = `<input name="n_officeTiming_toTime_1" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
        }
    }
    $('.timepicker').timepicker();
}

function tuesday(isOffice) {
    if (isOffice) {
        if (cboxTues.checked) {
            document.getElementById('tueFrom').innerHTML = "";
        } else {
            document.getElementById('tueFrom').innerHTML = `<input type="text" name="n_schoolTiming_day_2" value="tuesday" class="hide">
                        <input name="n_schoolTiming_fromTime_2" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (cboxTues.checked) {
            document.getElementById('tueTo').innerHTML = "";
        } else {
            document.getElementById('tueTo').innerHTML = `<input name="n_schoolTiming_toTime_2" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
        }
    } else {
        if (OcboxTues.checked) {
            document.getElementById('OtueFrom').innerHTML = "";
        } else {
            document.getElementById('OtueFrom').innerHTML = `<input type="text" name="n_officeTiming_day_2" value="tuesday" class="hide">
                        <input name="n_officeTiming_fromTime_2" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (OcboxTues.checked) {
            document.getElementById('OtueTo').innerHTML = "";
        } else {
            document.getElementById('OtueTo').innerHTML = `<input name="n_officeTiming_toTime_2" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
        }
    }
    $('.timepicker').timepicker();
}

function wednesday(isOffice) {
    if (isOffice) {
        if (cboxWed.checked) {
            document.getElementById('wedFrom').innerHTML = "";
        } else {
            document.getElementById('wedFrom').innerHTML = `<input type="text" name="n_schoolTiming_day_3" value="wednesday" class="hide">
                        <input name="n_schoolTiming_fromTime_3" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (cboxWed.checked) {
            document.getElementById('wedTo').innerHTML = "";
        } else {
            document.getElementById('wedTo').innerHTML = `<input name="n_schoolTiming_toTime_3" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
        }
    } else {
        if (OcboxWed.checked) {
            document.getElementById('OwedFrom').innerHTML = "";
        } else {
            document.getElementById('OwedFrom').innerHTML = `<input type="text" name="n_officeTiming_day_3" value="wednesday" class="hide">
                        <input name="n_officeTiming_fromTime_3" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (OcboxWed.checked) {
            document.getElementById('OwedTo').innerHTML = "";
        } else {
            document.getElementById('OwedTo').innerHTML = `<input name="n_officeTiming_toTime_3" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
        }
    }
    $('.timepicker').timepicker();
}

function thursday(isOffice) {
    if (isOffice) {
        if (cboxThr.checked) {
            document.getElementById('thrFrom').innerHTML = "";
        } else {
            document.getElementById('thrFrom').innerHTML = `<input type="text" name="n_schoolTiming_day_4" value="thursday" class="hide">
                        <input name="n_schoolTiming_fromTime_4" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (cboxThr.checked) {
            document.getElementById('thrTo').innerHTML = "";
        } else {
            document.getElementById('thrTo').innerHTML = `<input name="n_schoolTiming_toTime_4" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
        }
    } else {
        if (OcboxThr.checked) {
            document.getElementById('OthrFrom').innerHTML = "";
        } else {
            document.getElementById('OthrFrom').innerHTML = `<input type="text" name="n_officeTiming_day_4" value="thursday" class="hide">
                        <input name="n_officeTiming_fromTime_4" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (OcboxThr.checked) {
            document.getElementById('OthrTo').innerHTML = "";
        } else {
            document.getElementById('OthrTo').innerHTML = `<input name="n_officeTiming_toTime_4" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
        }
    }
    $('.timepicker').timepicker();
}

function friday(isOffice) {
    if (isOffice) {
        if (cboxFri.checked) {
            document.getElementById('friFrom').innerHTML = "";
        } else {
            document.getElementById('friFrom').innerHTML = `<input type="text" name="n_schoolTiming_day_5" value="friday" class="hide">
                        <input name="n_schoolTiming_fromTime_5" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (cboxFri.checked) {
            document.getElementById('friTo').innerHTML = "";
        } else {
            document.getElementById('friTo').innerHTML = `<input name="n_schoolTiming_toTime_5" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
        }
    } else {
        if (OcboxFri.checked) {
            document.getElementById('OfriFrom').innerHTML = "";
        } else {
            document.getElementById('OfriFrom').innerHTML = `<input type="text" name="n_officeTiming_day_5" value="friday" class="hide">
                        <input name="n_officeTiming_fromTime_5" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (OcboxFri.checked) {
            document.getElementById('OfriTo').innerHTML = "";
        } else {
            document.getElementById('OfriTo').innerHTML = `<input name="n_officeTiming_toTime_5" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
        }
    }
    $('.timepicker').timepicker();
}

function saturday(isOffice) {
    if (isOffice) {
        if (cboxSat.checked) {
            document.getElementById('satFrom').innerHTML = "";
        } else {
            document.getElementById('satFrom').innerHTML = `<input type="text" name="n_schoolTiming_day_6" value="saturday" class="hide">
                        <input name="n_schoolTiming_fromTime_6" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (cboxSat.checked) {
            document.getElementById('satTo').innerHTML = "";
        } else {
            document.getElementById('satTo').innerHTML = `<input name="n_schoolTiming_toTime_6" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
        }
    } else {
        if (OcboxSat.checked) {
            document.getElementById('OsatFrom').innerHTML = "";
        } else {
            document.getElementById('OsatFrom').innerHTML = `<input type="text" name="n_officeTiming_day_6" value="saturday" class="hide">
                        <input name="n_officeTiming_fromTime_6" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (OcboxSat.checked) {
            document.getElementById('OsatTo').innerHTML = "";
        } else {
            document.getElementById('OsatTo').innerHTML = `<input name="n_officeTiming_toTime_6" type="text" class="timepicker col s5"
                               placeholder="End" required>`;
        }
    }
    $('.timepicker').timepicker();
}

function sunday(isOffice) {
    if (isOffice) {
        if (cboxSun.checked) {
            document.getElementById('sunFrom').innerHTML = "";
        } else {
            document.getElementById('sunFrom').innerHTML = `<input type="text" name="n_schoolTiming_day_7" value="sunday" class="hide">
                        <input name="n_schoolTiming_fromTime_7" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (cboxSun.checked) {
            document.getElementById('sunTo').innerHTML = "";
        } else {
            document.getElementById('sunTo').innerHTML = `<input name="n_schoolTiming_toTime_7" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
        }
    } else {
        if (OcboxSun.checked) {
            document.getElementById('OsunFrom').innerHTML = "";
        } else {
            document.getElementById('OsunFrom').innerHTML = `<input type="text" name="n_officeTiming_day_7" value="sunday" class="hide">
                        <input name="n_officeTiming_fromTime_7" type="text" class="timepicker col s5"
                               placeholder="Start" required>`;
        }
        if (OcboxSun.checked) {
            document.getElementById('OsunTo').innerHTML = "";
        } else {
            document.getElementById('OsunTo').innerHTML = `<input name="n_officeTiming_toTime_7" type="text" class="timepicker col s5" placeholder="End"
                               required>`;
        }
    }
    $('.timepicker').timepicker();
}