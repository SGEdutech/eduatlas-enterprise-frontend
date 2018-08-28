this["template"]["userEditTuitionFacility"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\r\n    <input value=\""
    + container.escapeExpression(((helper = (helper = helpers.facilities || (depth0 != null ? depth0.facilities : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"facilities","hash":{},"data":data}) : helper)))
    + "\" name=\"facilities\" class=\"form-control\"\r\n           id=\"\">\r\n</div>";
},"useData":true});