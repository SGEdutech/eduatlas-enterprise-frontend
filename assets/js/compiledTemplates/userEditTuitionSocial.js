this["template"]["userEditTuitionSocial"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"form-group\">\r\n    <label for=\"facebookLink\" class=\"\">Facebook</label>\r\n    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.facebook || (depth0 != null ? depth0.facebook : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"facebook","hash":{},"data":data}) : helper)))
    + "\" id=\"facebookLink\"\r\n           name=\"fbLink\">\r\n</div>\r\n<div class=\"form-group\">\r\n    <label for=\"instaLink\">Instagram</label>\r\n    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.instagram || (depth0 != null ? depth0.instagram : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"instagram","hash":{},"data":data}) : helper)))
    + "\" id=\"instaLink\"\r\n           name=\"instaLink\">\r\n</div>\r\n<div class=\"form-group\">\r\n    <label for=\"youtubeLink\">Youtube</label>\r\n    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.youtube || (depth0 != null ? depth0.youtube : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"youtube","hash":{},"data":data}) : helper)))
    + "\" id=\"youtubeLink\"\r\n           name=\"youtubeLink\">\r\n</div>";
},"useData":true});