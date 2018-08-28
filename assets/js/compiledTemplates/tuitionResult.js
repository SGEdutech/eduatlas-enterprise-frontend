this["template"]["tuitionResult"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"col-4\" id=\"result"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"card\">\r\n            <span style=\"position: absolute;left: 92%;top: -6%;\">\r\n                <!-- send (_id of result obj received , id of card) as arguments for function deleteResult()-->\r\n            </span>\r\n            <img class=\"card-img-top\" src=\"images/"
    + alias4(((helper = (helper = helpers.img_path || (depth0 != null ? depth0.img_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_path","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\r\n            <div class=\"card-body\">\r\n                <div class=\"card-title\">\r\n                    "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\r\n                </div>\r\n                <p class=\"card-text\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.list || (depth0 && depth0.list) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.key : depth0),{"name":"list","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});