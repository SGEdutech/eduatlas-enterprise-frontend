this["template"]["userEditTuitionDesc"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\r\n    <input value=\""
    + container.escapeExpression(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"desc","hash":{},"data":data}) : helper)))
    + "\" name=\"description\" class=\"form-control\"\r\n           id=\"description\">\r\n</div>";
},"useData":true});