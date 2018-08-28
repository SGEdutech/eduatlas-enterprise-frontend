this["template"]["tuitionLinks"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.facebook || (depth0 != null ? depth0.facebook : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"facebook","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\"\r\n   class=\"btn btn-just-icon btn-round btn-facebook social-icons\">\r\n    <i class=\"fa fa-facebook\"> </i>\r\n</a>\r\n<a href=\""
    + alias4(((helper = (helper = helpers.youtube || (depth0 != null ? depth0.youtube : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"youtube","hash":{},"data":data}) : helper)))
    + "\"\r\n   class=\"btn btn-just-icon btn-round btn-youtube social-icons\">\r\n    <i class=\"fa fa-youtube\"> </i>\r\n</a>\r\n<a href=\""
    + alias4(((helper = (helper = helpers.instagram || (depth0 != null ? depth0.instagram : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"instagram","hash":{},"data":data}) : helper)))
    + "\"\r\n   class=\"btn btn-just-icon btn-round btn-dribbble social-icons\">\r\n    <i class=\"fa fa-instagram\"></i>\r\n</a>";
},"useData":true});