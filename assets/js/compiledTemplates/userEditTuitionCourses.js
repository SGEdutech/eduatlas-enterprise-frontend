this["template"]["userEditTuitionCourses"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"col-4\" id=\"course"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"card\">\r\n                                    <span style=\"position: absolute;left: 92%;top: -6%;\">\r\n                                        <!-- send title of course and id of card in function deleteCourse()-->\r\n                                        <button class=\"btn btn-danger btn-fab btn-fab-mini btn-round deleteBtn\"\r\n                                                onclick=\"deleteCourse('"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "','course"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "')\">\r\n                                            <i class=\"material-icons\">\r\n                                                delete\r\n                                            </i>\r\n                                        </button>\r\n                                    </span>\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                <h6 class=\" mb-2 text-muted\">Standard/Age Group</h6>\r\n                <h6 class=\"card-text\">"
    + alias4(((helper = (helper = helpers.ageGroup || (depth0 != null ? depth0.ageGroup : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ageGroup","hash":{},"data":data}) : helper)))
    + "</h6>\r\n                <hr>\r\n                <h6 class=\" mb-2 text-muted\">Duration</h6>\r\n                <h6 class=\"card-text\">"
    + alias4(((helper = (helper = helpers.duration || (depth0 != null ? depth0.duration : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"duration","hash":{},"data":data}) : helper)))
    + "</h6>\r\n                <hr>\r\n                <h6 class=\" mb-2 text-muted\">Fee</h6>\r\n                <h6 class=\"card-text\">INR "
    + alias4(((helper = (helper = helpers.fee || (depth0 != null ? depth0.fee : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fee","hash":{},"data":data}) : helper)))
    + "</h6>\r\n                <hr>\r\n            </div>\r\n            <h4 class=\"card-header card-header-info\">Next Batch - "
    + alias4(((helper = (helper = helpers.nextBatch || (depth0 != null ? depth0.nextBatch : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nextBatch","hash":{},"data":data}) : helper)))
    + "</h4>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.list || (depth0 && depth0.list) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.key : depth0),{"name":"list","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});