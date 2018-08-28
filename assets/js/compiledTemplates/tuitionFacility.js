this["template"]["tuitionFacility"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div>\r\n        <i class=\"material-icons facility-icon\">check_circle_outline</i>\r\n        <span>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.facilities : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});