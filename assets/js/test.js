// enable/disable input accoeding to a checkbox
let $gstinput = $('#gst-inp');
let $gstcheckBox = $('#gst-checkbox');
$gstcheckBox.click(function(e) {
	// e.preventDefault();
	if ($(this).is(":checked")) {
		$gstinput.prop('disabled', true);
	} else {
		$gstinput.prop('disabled', false);
	}
});