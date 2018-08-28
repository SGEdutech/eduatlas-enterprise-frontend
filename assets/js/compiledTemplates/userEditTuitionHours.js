this["template"]["userEditTuitionHours"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<form class=\"row\" id=\"monForm\">\r\n    <div class=\"col-4\">\r\n        Monday:\r\n        <input hidden name=\"day\" value=\"Monday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.monFrom || (depth0 != null ? depth0.monFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"monFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\"\r\n           type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.monTo || (depth0 != null ? depth0.monTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"monTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\"\r\n           type=\"time\">\r\n</form>\r\n\r\n\r\n<form class=\"row\" id=\"tueForm\">\r\n    <div class=\"col-4\">\r\n        Tuesday:\r\n        <input hidden name=\"day\" value=\"Tuesday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.tueFrom || (depth0 != null ? depth0.tueFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tueFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.tueTo || (depth0 != null ? depth0.tueTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tueTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n\r\n</form>\r\n\r\n\r\n<form class=\"row\" id=\"wedForm\">\r\n    <div class=\"col-4\">\r\n        Wednesday:\r\n        <input hidden name=\"day\" value=\"Wednesday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.wedFrom || (depth0 != null ? depth0.wedFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wedFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.wedTo || (depth0 != null ? depth0.wedTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wedTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n\r\n<form class=\"row\" id=\"thrForm\">\r\n    <div class=\"col-4\">\r\n        Thursday:\r\n        <input hidden name=\"day\" value=\"Thursday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.thrFrom || (depth0 != null ? depth0.thrFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thrFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.thrTo || (depth0 != null ? depth0.thrTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thrTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n\r\n<form class=\"row\" id=\"friForm\">\r\n    <div class=\"col-4\">\r\n        Friday:\r\n        <input hidden name=\"day\" value=\"Friday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.friFrom || (depth0 != null ? depth0.friFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"friFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.friTo || (depth0 != null ? depth0.friTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"friTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n\r\n<form class=\"row\" id=\"satForm\">\r\n    <div class=\"col-4\">\r\n        Saturday:\r\n        <input hidden name=\"day\" value=\"Saturday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.satFrom || (depth0 != null ? depth0.satFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"satFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.satTo || (depth0 != null ? depth0.satTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"satTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n\r\n<form class=\"row\" id=\"sunForm\">\r\n    <div class=\"col-4\">\r\n        Sunday:\r\n        <input hidden name=\"day\" value=\"Sunday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.sunFrom || (depth0 != null ? depth0.sunFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sunFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.sunTo || (depth0 != null ? depth0.sunTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sunTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>";
},"useData":true});