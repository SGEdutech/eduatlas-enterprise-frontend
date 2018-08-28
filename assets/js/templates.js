this["template"] = this["template"] || {};
this["template"]["dashboardReviews"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card\" id=\""
    + alias4(((helper = (helper = helpers.reviewId || (depth0 != null ? depth0.reviewId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewId","hash":{},"data":data}) : helper)))
    + "\"\r\n     data-userId=\""
    + alias4(((helper = (helper = helpers.userId || (depth0 != null ? depth0.userId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userId","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"card-body\">\r\n        <h4 class=\"card-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n        <h6 class=\"card-subtitle mb-2 text-muted\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "/5</h6>\r\n        <p class=\"card-text\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n        <button class=\"btn btn-danger btn-round delete-review-button\" data-tuition-id=\""
    + alias4(((helper = (helper = helpers.tuitionId || (depth0 != null ? depth0.tuitionId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tuitionId","hash":{},"data":data}) : helper)))
    + "\"\r\n                data-review-id=\""
    + alias4(((helper = (helper = helpers.reviewId || (depth0 != null ? depth0.reviewId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewId","hash":{},"data":data}) : helper)))
    + "\" data-user-id=\""
    + alias4(((helper = (helper = helpers.userId || (depth0 != null ? depth0.userId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userId","hash":{},"data":data}) : helper)))
    + "\" data-category=\""
    + alias4(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data}) : helper)))
    + "\">\r\n            Delete\r\n        </button>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["editSchoolOtherDetails"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"row form-group\">\r\n    <label for=\"curriculumSchool\">Curriculum</label>\r\n    <input id=\"curriculumSchool\" class=\"form-control\" type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.curriculum || (depth0 != null ? depth0.curriculum : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"curriculum","hash":{},"data":data}) : helper)))
    + "\" name=\"curriculum\">\r\n</div>\r\n<div class=\"row form-group\">\r\n    <label for=\"grades\">Grades</label>\r\n    <input id=\"grades\" class=\"form-control\" type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.grades || (depth0 != null ? depth0.grades : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"grades","hash":{},"data":data}) : helper)))
    + "\" name=\"grades\">\r\n</div>\r\n\r\n<div class=\"row form-group\">\r\n    <label for=\"type\">Type Of Schooling</label>\r\n    <input id=\"grades\" class=\"form-control\" type=\"text\" value=\""
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\" name=\"type\">\r\n</div>\r\n\r\n<div class=\"row form-group\">\r\n    <label for=\"principalName\">Head Of School</label>\r\n    <input id=\"principalName\" class=\"form-control\" type=\"text\"\r\n           name=\"principalName\" value=\""
    + alias4(((helper = (helper = helpers.principalName || (depth0 != null ? depth0.principalName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"principalName","hash":{},"data":data}) : helper)))
    + "\">\r\n</div>\r\n<div class=\"row form-group\">\r\n    <label for=\"yearFounded\">Founded</label>\r\n    <input id=\"yearFounded\" class=\"form-control\" type=\"number\" name=\"yearFounded\" value=\""
    + alias4(((helper = (helper = helpers.yearFounded || (depth0 != null ? depth0.yearFounded : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"yearFounded","hash":{},"data":data}) : helper)))
    + "\">\r\n</div>";
},"useData":true});
this["template"]["galleryImg"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"image-container col-md-4 p-1\">\r\n    <a href=\"images/"
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\" data-lightbox=\"gallery\">\r\n        <img class=\"img-thumbnail\" src=\"images/"
    + alias4(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"path","hash":{},"data":data}) : helper)))
    + "\">\r\n    </a>\r\n</div>";
},"useData":true});
this["template"]["listgoCard"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                        <li>\r\n                            <div class=\"tag\">\r\n                                <i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i>\r\n                            </div>\r\n                        </li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                <div class=\"schedule-info closed\">\r\n                    <i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i>\r\n                    <h6>Open Now</h6>\r\n                </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"popular-listing-post\">\r\n    <div class=\" tuition-cards\" onclick=\"openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n        <div class=\"post-thumb\">\r\n            <img src=\"/assets/img/fourgirls.jpeg\" alt=\"img\" class=\"img-responsive\">\r\n            <div class=\"listing-info\">\r\n                <h4 class=\"font-weight-bold\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n            </div>\r\n            <div class=\"rating-area\">\r\n                <ul>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                </ul>\r\n                <span>(2.5/5)</span>\r\n            </div>\r\n            <div class=\"option-block\">\r\n                <ul>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.claimedBy : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    <!-- <li>\r\n                         <a href=\"javascript:void(0)\" data-toggle=\"modal\"\r\n                            data-target=\"#post_listing_modal_two\">\r\n                             <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\r\n                         </a>\r\n                     </li>-->\r\n                </ul>\r\n            </div>\r\n            <div class=\"overlay\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"post-details\">\r\n        <div class=\" tuition-cards\" onclick=\"openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"post-meta\">\r\n                <div class=\"location\">\r\n                    <i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i>\r\n                    <div class=\"col-12\">"
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</div>\r\n                </div>\r\n            </div>\r\n            <div class=\"post-meta\">\r\n                <div class=\"location\">\r\n                    <i class=\"fa fa-phone\" aria-hidden=\"true\"></i>\r\n                    <h5>"
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                </div>\r\n            </div>\r\n            <!-- <div class=\"post-meta\">\r\n                <div class=\"location\">\r\n                    <i class=\"material-icons\">\r\n                        email\r\n                    </i>\r\n                    <h5>"
    + alias4(((helper = (helper = helpers.primaryEmail || (depth0 != null ? depth0.primaryEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryEmail","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                </div>\r\n            </div>-->\r\n            <!--<div class=\"post-entry-block\">\r\n                <p class=\"post-entry\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>-->\r\n        </div>\r\n        <div class=\"post-footer\">\r\n            <div class=\"contact-no\">\r\n                <!--<i class=\"material-icons\">\r\n                    share\r\n                </i>-->\r\n                <i class=\"fa fa-bookmark\" onclick=\"bookmark('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\" style=\"cursor: pointer\"></i>\r\n            </div>\r\n            <!-- <span class=\"contact-no\">\r\n                 <a onclick=\"bookmark()\" class=\"bookmark\"></a>\r\n             </span>-->\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.openedNow : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n</article>";
},"useData":true});
this["template"]["listgoCardBookmark"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                        <li>\r\n                            <div class=\"tag\">\r\n                                <i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i>\r\n                            </div>\r\n                        </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"popular-listing-post\" id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\" tuition-cards\" onclick=\"openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n        <div class=\"post-thumb\">\r\n            <img src=\"/assets/img/fourgirls.jpeg\" alt=\"img\" class=\"img-responsive\">\r\n            <div class=\"listing-info\">\r\n                <h4 class=\"font-weight-bold\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n            </div>\r\n            <div class=\"rating-area\">\r\n                <ul>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                </ul>\r\n                <span>(2.5/5)</span>\r\n            </div>\r\n            <div class=\"option-block\">\r\n                <ul>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.claimedBy : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    <!-- <li>\r\n                         <a href=\"javascript:void(0)\" data-toggle=\"modal\"\r\n                            data-target=\"#post_listing_modal_two\">\r\n                             <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\r\n                         </a>\r\n                     </li>-->\r\n                </ul>\r\n            </div>\r\n            <div class=\"overlay\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"post-details\">\r\n        <div class=\" tuition-cards\" onclick=\"openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"post-meta\">\r\n                <div class=\"location\">\r\n                    <i class=\"fa fa-phone\" aria-hidden=\"true\"></i>\r\n                    <h5>"
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                </div>\r\n            </div>\r\n            <!-- <div class=\"post-meta\">\r\n                <div class=\"location\">\r\n                    <i class=\"material-icons\">\r\n                        email\r\n                    </i>\r\n                    <h5>"
    + alias4(((helper = (helper = helpers.primaryEmail || (depth0 != null ? depth0.primaryEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryEmail","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                </div>\r\n            </div>-->\r\n            <!--<div class=\"post-entry-block\">\r\n                <p class=\"post-entry\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>-->\r\n        </div>\r\n        <div class=\"post-footer\">\r\n            <!-- <span class=\"contact-no\">\r\n                 <a onclick=\"bookmark()\" class=\"bookmark\"></a>\r\n             </span>-->\r\n            <div class=\"schedule-info closed\">\r\n                <div class=\"row justify-content-around mb-md-4\">\r\n                    <button class=\"btn btn-info\" onclick=\"removeBookmarks('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">remove</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</article>";
},"useData":true});
this["template"]["newCard"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-12\">\r\n                        <!-- Restaurant Item -->\r\n                        <div class=\"item\">\r\n                            <!-- Item's image -->\r\n                            <img class=\"img-responsive\" src=\"https://lorempixel.com/200/200/food/1/\" alt=\"\">\r\n                            <!-- Item details -->\r\n                            <div class=\"item-dtls\">\r\n                                <!-- product title -->\r\n                                <h4>\r\n                                  <a href=\"#\"> <i class=\"fas fa-address-card aicon\" style=\"color:#337ab7;\"></i></a>\r\n                                    <a href=\"#\" class=\"content\">"
    + alias4(((helper = (helper = helpers.Address || (depth0 != null ? depth0.Address : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Address","hash":{},"data":data}) : helper)))
    + " </a></h4>\r\n                                    <h4>\r\n                                    <a href=\"#\"><i class=\"fa fa-envelope aicon\" aria-hidden=\"true\" style=\"color:#337ab7;\"></i></a>\r\n                                     <a href=\"#\" class=\"content\">"
    + alias4(((helper = (helper = helpers.Email || (depth0 != null ? depth0.Email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Email","hash":{},"data":data}) : helper)))
    + "</a></h4>\r\n                                     </a>\r\n                                   <a href=\"#\"><i class=\"fa fa-mobile aicon\" aria-hidden=\"true\" style=\"color:#337ab7;\"></i></a>\r\n                                    <a href=\"#\" class=\"content\">"
    + alias4(((helper = (helper = helpers.Phone || (depth0 != null ? depth0.Phone : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Phone","hash":{},"data":data}) : helper)))
    + "</a></h4>\r\n                                <!-- price -->\r\n                                <span class=\"price lblue\" class=\"content\">2.5</span>\r\n                                <i class=\"fa fa-star\" aria-hidden=\"true\" style=\"color:#337ab7;\"></i>\r\n                                <i class=\"fa fa-star\" aria-hidden=\"true\" style=\"color:#337ab7;\"></i>                           \r\n                               <i class=\"fa fa-star-half-o\" aria-hidden=\"true\" style=\"color:#337ab7;\"></i>\r\n                            </div>\r\n                            <!-- add to cart btn -->\r\n                            <div class=\"ecom bg-lblue\">\r\n                                <a class=\"btn\" href=\"#\">Details</a>\r\n                            </div>\r\n                        </div>\r\n                    </div>   ";
},"useData":true});
this["template"]["paginationT"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <li class=\"page-item\">\r\n        <a class=\"page-link prev-page\" tabindex=\"-1\">Previous</a>\r\n    </li>\r\n    <li class=\"page-item\">\r\n        <a class=\"page-link prev-page\">"
    + container.escapeExpression(((helper = (helper = helpers.pageM1 || (depth0 != null ? depth0.pageM1 : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"pageM1","hash":{},"data":data}) : helper)))
    + "</a>\r\n    </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isPrevZero : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "<li class=\"page-item active\">\r\n    <a class=\"page-link\">"
    + alias4(((helper = (helper = helpers.page || (depth0 != null ? depth0.page : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"page","hash":{},"data":data}) : helper)))
    + "<span class=\"sr-only\">(current)</span></a>\r\n</li>\r\n<li class=\"page-item\">\r\n    <a class=\"page-link next-page\">"
    + alias4(((helper = (helper = helpers.pageP1 || (depth0 != null ? depth0.pageP1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageP1","hash":{},"data":data}) : helper)))
    + "</a>\r\n</li>\r\n<li class=\"page-item\">\r\n    <a class=\"page-link next-page\">Next</a>\r\n</li>\r\n";
},"useData":true});
this["template"]["searchPageCard"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-lg-3 col-md-4\">\r\n    <article class=\"popular-listing-post\">\r\n        <div class=\"post-thumb\">\r\n            <img src=\"nav/img/9.jpg\" alt=\"img\" class=\"img-responsive\">\r\n            <div class=\"listing-info\">\r\n                <!-- <h4><a href=\"javascript:void(0)\">Hotel California</a></h4> -->\r\n                <p><i class=\"fa fa-bed\" aria-hidden=\"true\"></i>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n            <div class=\"rating-area\">\r\n                <ul>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                    <li><i class=\"fa fa-star\" aria-hidden=\"true\"></i></li>\r\n                </ul>\r\n                <span>(5.0/4)</span>\r\n            </div>\r\n            <div class=\"option-block\">\r\n                <ul>\r\n                    <li>\r\n                        <a href=\"javascript:void(0)\" class=\"bookmark\">\r\n\r\n                        </a>\r\n                    </li>\r\n                    <li>\r\n                        <a href=\"javascript:void(0)\" data-lat=\"40.715877,-73.993959\" data-toggle=\"modal\" data-target=\"#post_listing_modal_one\">\r\n                            <i class=\"fa fa-eye\" aria-hidden=\"true\"></i>\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n            <div class=\"overlay\"></div>\r\n        </div>\r\n        <div class=\"post-details\">\r\n            <div class=\"post-meta post-meta-search\">\r\n                <div class=\"location\">\r\n                    <i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i>\r\n                    <h5>"
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                </div>\r\n                <div class=\"tag\">\r\n                    <span>Ad</span>\r\n                    <i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i>\r\n                </div>\r\n            </div>\r\n            <div class=\"post-entry-block post-entry-block-search\">\r\n                <div class=\"post-author\">\r\n                    <img src=\"nav/img/1.jpg\" alt=\"img\" class=\"img-responsive\">\r\n                </div>\r\n                <p class=\"post-entry\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n            <div class=\"post-footer post-footer-search\">\r\n                <div class=\"contact-no\">\r\n                    <i class=\"fa fa-phone\" aria-hidden=\"true\"></i>\r\n                    <h5>"
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + "</h5>\r\n                </div>\r\n                <div class=\"schedule-info closed\">\r\n                    <i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i>\r\n                    <h5>Opened Now</h5>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </article>\r\n</div>";
},"useData":true});
this["template"]["searchResult"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"/TuitionDetails2.0.html?_id="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" style=\"display: block\">\r\n    <div class=\"test\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\r\n</a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.suggestionArray : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["showSearchResult"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"complexSearchContainer\" class=\"card mb-0\">\r\n    <div class=\"card-body\">\r\n        <p class=\"m-0\">Showing Results for: <span class=\"font-weight-bold\">&nbsp State-</span>\""
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "\" <span class=\"font-weight-bold\">&nbsp City-</span>\""
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "\"<span class=\"font-weight-bold\">&nbsp Query-</span>\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\"</p>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["smoothCard"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                        <span class=\"badge badge-info\">verified</span>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                    <p class=\"font-weight-bold text-success\">Open Now</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-4\">\r\n    <div class=\"card newFont\">\r\n        <div class=\" tuition-cards\" onclick=\"helperScripts.openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"card p-0 m-0 rounded-0 rounded-top\"\r\n                 style=\"overflow: hidden;text-overflow: ellipsis\">\r\n                <div class=\"rounded-top\"\r\n                     style=\"position: absolute; height: 192px;width: 100%;background-color: rgba(0,0,0,0.5)\">\r\n                </div>\r\n                <img class=\"card-img-top\" src=\"/assets/img/fourgirls.jpeg\" alt=\"Tuition Image\"\r\n                     style=\"height: 192px;width: 100%;\">\r\n                <div class=\"card-img-overlay\">\r\n                    <h4 class=\"card-title text-white\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    <span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "/5</span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.claimedBy : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-body pb-0\">\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        location_on\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"address\">"
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        phone\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"phone\">"
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        email\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"email\">"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"pb-0 pt-2 rounded-0 card-footer justify-content-center\">\r\n            <div class=\"col\">\r\n                <!--<i class=\"material-icons\" style=\"cursor: pointer\">\r\n                    bookmark\r\n                </i>-->\r\n                <i class=\"material-icons bookmark-button\" style=\"cursor: pointer\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n                    bookmark_border\r\n                </i>\r\n            </div>\r\n            <div class=\"col-6 text-center\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.openedNow : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n            <div class=\"col\">\r\n                <i class=\"material-icons\">\r\n                    share\r\n                </i>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["smoothCardBookmark"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-3\" id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n    <div class=\"card newFont\">\r\n        <div class=\" tuition-cards\" onclick=\"openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"card p-0 m-0 rounded-0 rounded-top\"\r\n                 style=\"overflow: hidden;text-overflow: ellipsis;cursor: pointer\">\r\n                <div class=\"rounded-top\"\r\n                     style=\"position: absolute; height: 192px;width: 100%;background-color: rgba(0,0,0,0.5)\">\r\n                </div>\r\n                <img class=\"card-img-top\" src=\"/assets/img/fourgirls.jpeg\" alt=\"Tuition Image\"\r\n                     style=\"height: 192px;width: 100%;\">\r\n                <div class=\"card-img-overlay\">\r\n                    <h4 class=\"card-title text-white\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    <span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "/5</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!--<div class=\"card-body pb-0\">\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        location_on\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"address\">"
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n        </div>-->\r\n        <div class=\"pb-0 pt-2 rounded-0 card-footer justify-content-center\">\r\n            <div class=\"col\">\r\n                <button class=\"btn btn-danger\" onclick=\"removeBookmarks('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">remove</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["smoothCardDashboard"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-4\">\r\n    <div class=\"card newFont\">\r\n        <div class=\" tuition-cards\" onclick=\"openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"card p-0 m-0 rounded-0 rounded-top\"\r\n                 style=\"overflow: hidden;text-overflow: ellipsis;cursor: pointer\">\r\n                <div class=\"rounded-top\"\r\n                     style=\"position: absolute; height: 192px;width: 100%;background-color: rgba(0,0,0,0.5)\">\r\n                </div>\r\n                <img class=\"card-img-top\" src=\"/assets/img/fourgirls.jpeg\" alt=\"Tuition Image\"\r\n                     style=\"height: 192px;width: 100%;\">\r\n                <div class=\"card-img-overlay\">\r\n                    <h4 class=\"card-title text-white\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    <span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "/5</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-body pb-0\">\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        location_on\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"address\">"
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"pb-0 pt-2 rounded-0 card-footer justify-content-center\">\r\n            <div class=\"col\">\r\n                <a href=\"User-editTuition.html?a="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-info\">edit</a>\r\n            </div>\r\n            <div class=\"col\">\r\n                <a onclick=\"unclaimListing('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\" class=\"btn btn-danger\">unclaim</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["smoothCardHomePage"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <div class=\"col-md-4\" id=\""
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                        <span class=\"badge badge-info\">verified</span>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"col\">\r\n                    <a class=\"btn btn-info btn-round\" href=\"user-edit-"
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + ".html?a="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">Edit</a>\r\n                </div>\r\n                <div class=\"col\">\r\n                    <button class=\"btn btn-danger btn-round unclaim-button\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\"\r\n                            data-category=\""
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + "\">Unclaim\r\n                    </button>\r\n                </div>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "                <div class=\"col\">\r\n                    <!--<i class=\"material-icons\" style=\"cursor: pointer\">\r\n                        bookmark\r\n                    </i>-->\r\n                    <i class=\"material-icons bookmark-button\" style=\"cursor: pointer\" data-id=\""
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n                        bookmark_border\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-6 text-center\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.openedNow : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n                <div class=\"col\">\r\n                    <i class=\"material-icons share\" style=\"cursor: pointer\">\r\n                        share\r\n                    </i>\r\n\r\n                </div>\r\n\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "                        <p class=\"font-weight-bold text-success\">Open Now</p>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <div class=\"col\">\r\n                    <button class=\"btn btn-danger btn-round remove-bookmark-button\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\"\r\n                            data-category=\""
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + "\">Remove bookmark\r\n                    </button>\r\n                </div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.col4 : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"card newFont\">\r\n        <div class=\" tuition-cards\" style=\"cursor: pointer\"\r\n             onclick=\"helperScripts.openDetailsPage('"
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + "','"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"card p-0 m-0 rounded-0 rounded-top\" style=\"overflow: hidden;text-overflow: ellipsis\">\r\n                <div class=\"rounded-top\"\r\n                     style=\"position: absolute; height: 192px;width: 100%;background-color: rgba(0,0,0,0.5)\">\r\n                </div>\r\n                <img class=\"card-img-top\" src=\"/assets/img/fourgirls.jpeg\" alt=\"Tuition Image\"\r\n                     style=\"height: 192px;width: 100%;\">\r\n                <div class=\"card-img-overlay\">\r\n                    <h4 class=\"card-title text-white\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    <span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.averageRating || (depth0 != null ? depth0.averageRating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"averageRating","hash":{},"data":data}) : helper)))
    + "/5</span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.claimedBy : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-body pb-0\">\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        location_on\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"address\" class=\"my-0\">"
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        phone\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"phone\" class=\"my-0\">"
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.organiserPhone || (depth0 != null ? depth0.organiserPhone : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"organiserPhone","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        email\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"email\" class=\"my-0\">"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.organiserEmail || (depth0 != null ? depth0.organiserEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"organiserEmail","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"pb-0 pt-2 rounded-0 card-footer justify-content-center\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.manageClaimed : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hideFooter : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.manageBookmarks : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.col4 : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["smoothCardRelated"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                        <span class=\"badge badge-info\">verified</span>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                    <p class=\"font-weight-bold text-success\">Open Now</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-3\">\r\n    <div class=\"card newFont\" style=\"cursor: pointer;\">\r\n        <div class=\" tuition-cards\" onclick=\"openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"card p-0 m-0 rounded-0 rounded-top\"\r\n                 style=\"overflow: hidden;text-overflow: ellipsis\">\r\n                <div class=\"rounded-top\"\r\n                     style=\"position: absolute; height: 150px;width: 100%;background-color: rgba(0,0,0,0.5)\">\r\n                </div>\r\n                <img class=\"card-img-top\" src=\"/assets/img/fourgirls.jpeg\" alt=\"Tuition Image\"\r\n                     style=\"height: 150px;width: 100%;\">\r\n                <div class=\"card-img-overlay\">\r\n                    <h4 class=\"card-title text-white\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    <span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "/5</span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.claimedBy : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"card-body pb-0\">\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        location_on\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"address\">"
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n           <!-- <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        phone\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"phone\">"
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        email\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"email\">"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>-->\r\n        </div>\r\n        <div class=\"pb-0 pt-2 rounded-0 card-footer justify-content-center\">\r\n            <!--<div class=\"col\">\r\n                &lt;!&ndash;<i class=\"material-icons\" style=\"cursor: pointer\">\r\n                    bookmark\r\n                </i>&ndash;&gt;\r\n                <i class=\"material-icons\" style=\"cursor: pointer\" onclick=\"bookmark('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n                    bookmark_border\r\n                </i>\r\n            </div>-->\r\n            <!--<div class=\"col-6 text-center\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.openedNow : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>-->\r\n           <!-- <div class=\"col\">\r\n                <i class=\"material-icons\">\r\n                    share\r\n                </i>\r\n            </div>-->\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["smoothCardSponsored"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "                        <span class=\"badge badge-info\">verified</span>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                    <p class=\"font-weight-bold text-success\">Open Now</p>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col\">\r\n    <div class=\"card newFont\" style=\"cursor: pointer;\">\r\n        <div class=\" tuition-cards\" onclick=\"openDetailsPage('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"card p-0 m-0 rounded-0 rounded-top\"\r\n                 style=\"overflow: hidden;text-overflow: ellipsis\">\r\n                <div class=\"rounded-top\"\r\n                     style=\"position: absolute; height: 160px;width: 100%;background-color: rgba(0,0,0,0.5)\">\r\n                </div>\r\n                <img class=\"card-img-top\" src=\"/assets/img/fourgirls.jpeg\" alt=\"Tuition Image\"\r\n                     style=\"height: 160px;width: 100%;\">\r\n                <div class=\"card-img-overlay\">\r\n                    <h4 class=\"card-title text-white\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    <span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "/5</span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.claimedBy : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                </div>\r\n            </div>\r\n        </div>\r\n        <!--<div class=\"card-body pb-0\">\r\n            &lt;!&ndash;<div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        location_on\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"address\">"
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>&ndash;&gt;\r\n           &lt;!&ndash; <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        phone\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"phone\">"
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        email\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"email\">"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>&ndash;&gt;\r\n        </div>-->\r\n        <!--<div class=\"pb-0 pt-2 rounded-0 card-footer justify-content-center\">\r\n            &lt;!&ndash;<div class=\"col\">\r\n                &lt;!&ndash;<i class=\"material-icons\" style=\"cursor: pointer\">\r\n                    bookmark\r\n                </i>&ndash;&gt;\r\n                <i class=\"material-icons\" style=\"cursor: pointer\" onclick=\"bookmark('"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n                    bookmark_border\r\n                </i>\r\n            </div>&ndash;&gt;\r\n            &lt;!&ndash;<div class=\"col-6 text-center\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.openedNow : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>&ndash;&gt;\r\n           &lt;!&ndash; <div class=\"col\">\r\n                <i class=\"material-icons\">\r\n                    share\r\n                </i>\r\n            </div>&ndash;&gt;\r\n        </div>-->\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["tuitionCard"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"p-2\">\r\n    <div class=\"\">\r\n        <div class=\"card\" style=\"\">\r\n            <!--put src = \"assets/img/"
    + alias4(((helper = (helper = helpers.coverPic || (depth0 != null ? depth0.coverPic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPic","hash":{},"data":data}) : helper)))
    + "\" -->\r\n            <img class=\"card-img tinted\" src=\"assets/img/tuition2.jpg\" alt=\"Card image cap\">\r\n            <div class=\"card-img-overlay color-white m-0 p-3\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-9\">\r\n                        <h4 class=\"card-title color-white m-0 p-0\">"
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    </div>\r\n                    <div class=\"col-2\">\r\n                        <!-- todo - uncomment when verification data there -->\r\n                        <!--<button class=\"btn btn-info btn-fab btn-fab-mini btn-round position-absolute\">\r\n                            <i class=\"material-icons\">\r\n                                verified_user\r\n                            </i>\r\n                        </button>-->\r\n                    </div>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <div class=\"col-8\">\r\n                        <p class=\"card-text m-0 color-white\">"
    + alias4(((helper = (helper = helpers.Category || (depth0 != null ? depth0.Category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Category","hash":{},"data":data}) : helper)))
    + "</p>\r\n                    </div>\r\n                    <div class=\"col-3\">\r\n                        <!--<span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.ifAd || (depth0 != null ? depth0.ifAd : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ifAd","hash":{},"data":data}) : helper)))
    + "</span>-->\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"card-body px-4 position-relative\">\r\n                <!-- todo uncomment when rating available-->\r\n                <button class=\"btn btn-warning btn-fab btn-round position-absolute moveUp\">\r\n                    "
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "\r\n                </button>\r\n                <div class=\"row\">\r\n                    <i class=\"material-icons d-inline-flex icon-small\">\r\n                        place\r\n                    </i>\r\n                    <p class=\"card-text text m-0 \">"
    + alias4(((helper = (helper = helpers.Address || (depth0 != null ? depth0.Address : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Address","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n                <div class=\"row\">\r\n                    <i class=\"material-icons d-inline-flex icon-small\">\r\n                        local_phone\r\n                    </i>\r\n                    <p class=\"card-text m-0 row\">"
    + alias4(((helper = (helper = helpers.Phone || (depth0 != null ? depth0.Phone : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Phone","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n\r\n                <div class=\"row\">\r\n                    <i class=\"material-icons d-inline-flex icon-small\">\r\n                        alternate_email\r\n                    </i>\r\n                    <p class=\"card-text m-0 row\">"
    + alias4(((helper = (helper = helpers.Email || (depth0 != null ? depth0.Email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Email","hash":{},"data":data}) : helper)))
    + " </p>\r\n                </div>\r\n\r\n\r\n                <a href=\"                            "
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-info\">Details</a>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["tuitionCardCol4"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-4\">\r\n    <div class=\"card\" style=\"\">\r\n        <!--put src = \"assets/img/"
    + alias4(((helper = (helper = helpers.coverPic || (depth0 != null ? depth0.coverPic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPic","hash":{},"data":data}) : helper)))
    + "\" -->\r\n        <img class=\"card-img tinted\" src=\"assets/img/tuition2.jpg\" alt=\"Card image cap\">\r\n        <div class=\"card-img-overlay color-white m-0 p-3\">\r\n            <div class=\"row\">\r\n                <div class=\"col-9\">\r\n                    <h4 class=\"card-title color-white m-0 p-0\">"
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                </div>\r\n                <div class=\"col-2\">\r\n                    <!-- todo - uncomment when verification data there -->\r\n                    <!--<button class=\"btn btn-info btn-fab btn-fab-mini btn-round position-absolute\">\r\n                        <i class=\"material-icons\">\r\n                            verified_user\r\n                        </i>\r\n                    </button>-->\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-8\">\r\n                    <p class=\"card-text m-0 color-white\">"
    + alias4(((helper = (helper = helpers.Category || (depth0 != null ? depth0.Category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Category","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n                <div class=\"col-3\">\r\n                    <!--<span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.ifAd || (depth0 != null ? depth0.ifAd : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ifAd","hash":{},"data":data}) : helper)))
    + "</span>-->\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n        <div class=\"card-body px-4 position-relative\">\r\n            <!-- todo uncomment when rating available-->\r\n            <button class=\"btn btn-warning btn-fab btn-round position-absolute moveUp\">\r\n                "
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "\r\n            </button>\r\n            <div class=\"row\">\r\n                <i class=\"material-icons d-inline-flex icon-small\">\r\n                    place\r\n                </i>\r\n                <p class=\"card-text text m-0 \">"
    + alias4(((helper = (helper = helpers.Address || (depth0 != null ? depth0.Address : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Address","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n            <div class=\"row\">\r\n                <i class=\"material-icons d-inline-flex icon-small\">\r\n                    local_phone\r\n                </i>\r\n                <p class=\"card-text m-0 row\">"
    + alias4(((helper = (helper = helpers.Phone || (depth0 != null ? depth0.Phone : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Phone","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <i class=\"material-icons d-inline-flex icon-small\">\r\n                    alternate_email\r\n                </i>\r\n                <p class=\"card-text m-0 row\">"
    + alias4(((helper = (helper = helpers.Email || (depth0 != null ? depth0.Email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Email","hash":{},"data":data}) : helper)))
    + " </p>\r\n            </div>\r\n\r\n\r\n            <a href=\"TuitionDetails2.0.html?_id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"btn btn-info\">Details</a>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["tuitionCategory"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <span class=\"badge badge-success\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["tuitionCourses"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"col-4\" id=\"course"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"card\">\r\n            <span style=\"position: absolute;left: 92%;top: -6%;\">\r\n                <!-- send title of course and id of card in function deleteCourse()-->\r\n            </span>\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">"
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

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.courses : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["tuitionFacility"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "    <div>\r\n        <i class=\"material-icons facility-icon\">check_circle_outline</i>\r\n        <span>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.facilities : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["tuitionFaculty"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"col-4\" id=\"faculty"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"card card-nav-tabs\">\r\n            <span style=\"position: absolute;left: 92%;top: -6%;\">\r\n            <!-- send (name of the faculty , id of card) as arguments for function deleteFaculty()-->\r\n            </span>\r\n            <img class=\"card-img-bottom\" src=\"images/"
    + alias4(((helper = (helper = helpers.img_path || (depth0 != null ? depth0.img_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_path","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\r\n            <div class=\"card-body\">\r\n                <div class=\"card-title\">\r\n                    "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n                </div>\r\n                <div class=\"card-subtitle mb-2 text-muted\">\r\n                    "
    + alias4(((helper = (helper = helpers.qualification || (depth0 != null ? depth0.qualification : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"qualification","hash":{},"data":data}) : helper)))
    + "\r\n                </div>\r\n                <p class=\"card-text\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.faculty : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
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
this["template"]["tuitionOperationHours"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-6\">\r\n    Monday:\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.monFrom || (depth0 != null ? depth0.monFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"monFrom","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.monTo || (depth0 != null ? depth0.monTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"monTo","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"col-6\">\r\n    Tuesday:\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.tueFrom || (depth0 != null ? depth0.tueFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tueFrom","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.tueTo || (depth0 != null ? depth0.tueTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tueTo","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"col-6\">\r\n    Wednsday:\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.wedFrom || (depth0 != null ? depth0.wedFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wedFrom","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.wedTo || (depth0 != null ? depth0.wedTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wedTo","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"col-6\">\r\n    Thursday:\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.thrFrom || (depth0 != null ? depth0.thrFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thrFrom","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.thrTo || (depth0 != null ? depth0.thrTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thrTo","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"col-6\">\r\n    Friday:\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.friFrom || (depth0 != null ? depth0.friFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"friFrom","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.friTo || (depth0 != null ? depth0.friTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"friTo","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"col-6\">\r\n    Saturday:\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.satFrom || (depth0 != null ? depth0.satFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"satFrom","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.satTo || (depth0 != null ? depth0.satTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"satTo","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"col-6\">\r\n    Sunday:\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.sunFrom || (depth0 != null ? depth0.sunFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sunFrom","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>\r\n<div class=\"col-3\">\r\n    <div class=\"h6\">\r\n        "
    + alias4(((helper = (helper = helpers.sunTo || (depth0 != null ? depth0.sunTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sunTo","hash":{},"data":data}) : helper)))
    + "\r\n    </div>\r\n</div>";
},"useData":true});
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

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["tuitionReviews"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card\">\r\n    <div class=\"card-body\">\r\n        <h4 class=\"card-title\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "/5</h4>\r\n        <p class=\"card-text\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["userDashboardTuitionCard"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-md-4\">\r\n    <div class=\"card\" style=\"\">\r\n        <!--put src = \"assets/img/"
    + alias4(((helper = (helper = helpers.coverPic || (depth0 != null ? depth0.coverPic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPic","hash":{},"data":data}) : helper)))
    + "\" -->\r\n        <img class=\"card-img tinted\" src=\"assets/img/tuition2.jpg\"\r\n             alt=\"Card image cap\">\r\n        <div class=\"card-img-overlay color-white m-0 p-3\">\r\n            <div class=\"row\">\r\n                <div class=\"col-9\">\r\n                    <h4 class=\"card-title color-white m-0 p-0\">"
    + alias4(((helper = (helper = helpers.Name || (depth0 != null ? depth0.Name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                </div>\r\n                <div class=\"col-2\">\r\n                    <!-- todo - uncomment when verification data there -->\r\n                    <!--<button class=\"btn btn-info btn-fab btn-fab-mini btn-round position-absolute\">\r\n                        <i class=\"material-icons\">\r\n                            verified_user\r\n                        </i>\r\n                    </button>-->\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"col-8\">\r\n                    <p class=\"card-text m-0 color-white\">"
    + alias4(((helper = (helper = helpers.Category || (depth0 != null ? depth0.Category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Category","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n                <div class=\"col-3\">\r\n                    <!--<span class=\"badge badge-info\">"
    + alias4(((helper = (helper = helpers.ifAd || (depth0 != null ? depth0.ifAd : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ifAd","hash":{},"data":data}) : helper)))
    + "</span>-->\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n        <div class=\"card-body px-4 position-relative\">\r\n            <!-- todo uncomment when rating available-->\r\n            <!--<button class=\"btn btn-info btn-fab btn-round position-absolute moveUp\">\r\n                                                        "
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "\r\n                                                    </button>-->\r\n            <div class=\"row\">\r\n                <i class=\"material-icons d-inline-flex icon-small\">\r\n                    place\r\n                </i>\r\n                <p class=\"card-text text m-0 \">"
    + alias4(((helper = (helper = helpers.Address || (depth0 != null ? depth0.Address : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Address","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n            <div class=\"row\">\r\n                <i class=\"material-icons d-inline-flex icon-small\">\r\n                    local_phone\r\n                </i>\r\n                <p class=\"card-text m-0 row\">"
    + alias4(((helper = (helper = helpers.Phone || (depth0 != null ? depth0.Phone : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Phone","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <i class=\"material-icons d-inline-flex icon-small\">\r\n                    alternate_email\r\n                </i>\r\n                <p class=\"card-text m-0 row\">"
    + alias4(((helper = (helper = helpers.Email || (depth0 != null ? depth0.Email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Email","hash":{},"data":data}) : helper)))
    + " </p>\r\n            </div>\r\n            <a href=\"TuitionDetails2.0.html?_id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\r\n               class=\"btn btn-info\">Details</a>\r\n            <a href=\"User-editTuition.html?a="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"\r\n               class=\"btn btn-info\">edit</a>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["userEditTuitionBasic"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card\">\r\n    <div class=\"card-body\">\r\n        <h2 class=\"card-title h3\">Basic Details:</h2>\r\n        <div class=\"row align-items-center\">\r\n            <div class=\"col-md-3\">\r\n                <h6>Institute Name</h6>\r\n            </div>\r\n            <div class=\"col-md-9\">\r\n                <input id=\"tName\" value=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" type=\"text\"\r\n                       name=\"name\">\r\n            </div>\r\n\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col\">\r\n                <div class=\"row\">\r\n                    <h6>Address</h6>\r\n                </div>\r\n                <div class=\"row form-group\">\r\n                    <label for=\"al1\">Address Line 1</label>\r\n                    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"\r\n                           id=\"al1\" name=\"addressLine1\">\r\n                </div>\r\n                <div class=\"row form-group\">\r\n                    <label for=\"al2\">Address Line 2</label>\r\n                    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"\r\n                           id=\"al2\" name=\"addressLine2\">\r\n                </div>\r\n                <div class=\"row form-group\">\r\n                    <label for=\"city\">City</label>\r\n                    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"\r\n                           id=\"city\"\r\n                           name=\"city\">\r\n                </div>\r\n                <div class=\"row form-group\">\r\n                    <label for=\"dist\">District</label>\r\n                    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.district || (depth0 != null ? depth0.district : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"district","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"\r\n                           id=\"dist\"\r\n                           name=\"district\">\r\n                </div>\r\n                <div class=\"row form-group\">\r\n                    <label for=\"state\">State</label>\r\n                    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"\r\n                           id=\"state\"\r\n                           name=\"state\">\r\n                </div>\r\n                <div class=\"row form-group\">\r\n                    <label for=\"country\">Country</label>\r\n                    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"country","hash":{},"data":data}) : helper)))
    + "\" type=\"text\"\r\n                           id=\"country\"\r\n                           name=\"country\">\r\n                </div>\r\n                <div class=\"row form-group\">\r\n                    <label for=\"pin\">Pin</label>\r\n                    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.pin || (depth0 != null ? depth0.pin : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pin","hash":{},"data":data}) : helper)))
    + "\" type=\"number\"\r\n                           id=\"pin\"\r\n                           name=\"pin\">\r\n                </div>\r\n\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["userEditTuitionCategory"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\r\n    <input value=\""
    + container.escapeExpression(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"category","hash":{},"data":data}) : helper)))
    + "\" name=\"category\" class=\"form-control\"\r\n           id=\"category\">\r\n</div>";
},"useData":true});
this["template"]["userEditTuitionContactP"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card-title h3\">\r\n    Contact Us:\r\n</div>\r\n<div class=\"card-title h4\">\r\n    Contact Person Name\r\n</div>\r\n<div>\r\n    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.contactPerson || (depth0 != null ? depth0.contactPerson : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"contactPerson","hash":{},"data":data}) : helper)))
    + "\"\r\n           name=\"contactPerson\">\r\n</div>\r\n<div class=\"card-title h4\">\r\n    Primary Number\r\n</div>\r\n<div>\r\n    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + "\"\r\n           name=\"primaryNumber\">\r\n</div>\r\n<div class=\"card-title h4\">\r\n    Alternate Number\r\n</div>\r\n<div>\r\n    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.secondaryNumber || (depth0 != null ? depth0.secondaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"secondaryNumber","hash":{},"data":data}) : helper)))
    + "\"\r\n           name=\"secondaryNumber\">\r\n</div>\r\n<div class=\"card-title h4\">\r\n    Email\r\n</div>\r\n<div>\r\n    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\" name=\"email\">\r\n</div>\r\n<div class=\"card-title h4\">\r\n    Website\r\n</div>\r\n<div>\r\n    <input class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.website || (depth0 != null ? depth0.website : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"website","hash":{},"data":data}) : helper)))
    + "\" name=\"website\">\r\n</div>";
},"useData":true});
this["template"]["userEditTuitionCourses"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"col-4\" id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"card\">\r\n            <span style=\"position: absolute;left: 92%;top: -6%;\">\r\n                <!-- send title of course and id of card in function deleteCourse()-->\r\n                <button class=\"btn btn-danger btn-fab btn-fab-mini btn-round deleteBtn delete-course-button\"\r\n                        data-course-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n                    <i class=\"material-icons\">\r\n                        delete\r\n                    </i>\r\n                </button>\r\n            </span>\r\n            <div class=\"card-body\">\r\n                <h4 class=\"card-title\">"
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

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.courses : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["userEditTuitionCover"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div id=\"cover_image\" class=\"page-header header-filter header-small\" data-parallax=\"true\" filter-color=\"dark\"\r\n     style=\"background-image: url('images/"
    + container.escapeExpression(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"path","hash":{},"data":data}) : helper)))
    + "');\">\r\n</div>";
},"useData":true});
this["template"]["userEditTuitionDesc"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\r\n    <input value=\""
    + container.escapeExpression(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"description","hash":{},"data":data}) : helper)))
    + "\" name=\"description\" class=\"form-control\"\r\n           id=\"description\">\r\n</div>";
},"useData":true});
this["template"]["userEditTuitionFacility"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div>\r\n    <input value=\""
    + container.escapeExpression(((helper = (helper = helpers.facilities || (depth0 != null ? depth0.facilities : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"facilities","hash":{},"data":data}) : helper)))
    + "\" name=\"facilities\" class=\"form-control\"\r\n           id=\"\">\r\n</div>";
},"useData":true});
this["template"]["userEditTuitionFaculty"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"col-4\" id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"card card-nav-tabs\">\r\n            <span style=\"position: absolute;left: 92%;top: -6%;\">\r\n            <!-- send (name of the faculty , id of card) as arguments for function deleteFaculty()-->\r\n            <button class=\"btn btn-danger btn-fab btn-fab-mini btn-round deleteBtn delete-faculty-button\"\r\n                    data-faculty-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\r\n                <i class=\"material-icons\">\r\n                    delete\r\n                </i>\r\n            </button>\r\n            </span>\r\n            <img class=\"card-img-bottom\" src=\"images/"
    + alias4(((helper = (helper = helpers.img_path || (depth0 != null ? depth0.img_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_path","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\r\n            <div class=\"card-body\">\r\n                <div class=\"card-title\">\r\n                    "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n                </div>\r\n                <div class=\"card-subtitle mb-2 text-muted\">\r\n                    "
    + alias4(((helper = (helper = helpers.qualification || (depth0 != null ? depth0.qualification : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"qualification","hash":{},"data":data}) : helper)))
    + "\r\n                </div>\r\n                <p class=\"card-text\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.faculty : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["userEditTuitionHours"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <form class=\"row\" id=\"monFormSchool"
    + container.escapeExpression(((helper = (helper = helpers.office || (depth0 != null ? depth0.office : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"office","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <form class=\"row\" id=\"monForm\">\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <form class=\"row\" id=\"tueFormSchool"
    + container.escapeExpression(((helper = (helper = helpers.office || (depth0 != null ? depth0.office : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"office","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "    <form class=\"row\" id=\"tueForm\">\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <form class=\"row\" id=\"wedFormSchool"
    + container.escapeExpression(((helper = (helper = helpers.office || (depth0 != null ? depth0.office : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"office","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "    <form class=\"row\" id=\"wedForm\">\r\n";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <form class=\"row\" id=\"thrFormSchool"
    + container.escapeExpression(((helper = (helper = helpers.office || (depth0 != null ? depth0.office : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"office","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "    <form class=\"row\" id=\"thrForm\">\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <form class=\"row\" id=\"friFormSchool"
    + container.escapeExpression(((helper = (helper = helpers.office || (depth0 != null ? depth0.office : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"office","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "    <form class=\"row\" id=\"friForm\">\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <form class=\"row\" id=\"satFormSchool"
    + container.escapeExpression(((helper = (helper = helpers.office || (depth0 != null ? depth0.office : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"office","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "    <form class=\"row\" id=\"satForm\">\r\n";
},"25":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <form class=\"row\" id=\"sunFormSchool"
    + container.escapeExpression(((helper = (helper = helpers.office || (depth0 != null ? depth0.office : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"office","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"27":function(container,depth0,helpers,partials,data) {
    return "    <form class=\"row\" id=\"sunForm\">\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.school : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"col-4\">\r\n        Monday:\r\n        <input hidden name=\"day\" value=\"Monday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.monFrom || (depth0 != null ? depth0.monFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"monFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\"\r\n           type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.monTo || (depth0 != null ? depth0.monTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"monTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\"\r\n           type=\"time\">\r\n</form>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.school : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"col-4\">\r\n        Tuesday:\r\n        <input hidden name=\"day\" value=\"Tuesday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.tueFrom || (depth0 != null ? depth0.tueFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tueFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.tueTo || (depth0 != null ? depth0.tueTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tueTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.school : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"col-4\">\r\n        Wednesday:\r\n        <input hidden name=\"day\" value=\"Wednesday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.wedFrom || (depth0 != null ? depth0.wedFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wedFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.wedTo || (depth0 != null ? depth0.wedTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"wedTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.school : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"col-4\">\r\n        Thursday:\r\n        <input hidden name=\"day\" value=\"Thursday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.thrFrom || (depth0 != null ? depth0.thrFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thrFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.thrTo || (depth0 != null ? depth0.thrTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"thrTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.school : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"col-4\">\r\n        Friday:\r\n        <input hidden name=\"day\" value=\"Friday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.friFrom || (depth0 != null ? depth0.friFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"friFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.friTo || (depth0 != null ? depth0.friTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"friTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.school : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.program(23, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"col-4\">\r\n        Saturday:\r\n        <input hidden name=\"day\" value=\"Saturday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.satFrom || (depth0 != null ? depth0.satFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"satFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.satTo || (depth0 != null ? depth0.satTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"satTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>\r\n\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.school : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data})) != null ? stack1 : "")
    + "    <div class=\"col-4\">\r\n        Sunday:\r\n        <input hidden name=\"day\" value=\"Sunday\">\r\n    </div>\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.sunFrom || (depth0 != null ? depth0.sunFrom : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sunFrom","hash":{},"data":data}) : helper)))
    + "\" name=\"fromTime\" type=\"time\">\r\n    <input class=\"form-control col-4 m-md-0 p-md-1\" value=\""
    + alias4(((helper = (helper = helpers.sunTo || (depth0 != null ? depth0.sunTo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sunTo","hash":{},"data":data}) : helper)))
    + "\" name=\"toTime\" type=\"time\">\r\n</form>";
},"useData":true});
this["template"]["userEditTuitionResults"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"col-4\" id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"card\">\r\n            <span style=\"position: absolute;left: 92%;top: -6%;\">\r\n                <!-- send (_id of result obj received , id of card) as arguments for function deleteResult()-->\r\n                <button class=\"btn btn-danger btn-fab btn-fab-mini btn-round deleteBtn delete-result-button\"\r\n                        data-result-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-title=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\r\n                    <i class=\"material-icons\">\r\n                        delete\r\n                    </i>\r\n                </button>\r\n            </span>\r\n            <img class=\"card-img-top\" src=\"images/"
    + alias4(((helper = (helper = helpers.img_path || (depth0 != null ? depth0.img_path : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"img_path","hash":{},"data":data}) : helper)))
    + "\" alt=\"\">\r\n            <div class=\"card-body\">\r\n                <div class=\"card-title\">\r\n                    "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\r\n                </div>\r\n                <p class=\"card-text\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});
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
this["template"]["userProfileInput"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card\">\r\n    <div class=\"card-body\">\r\n        <h2 class=\"card-title h3\">Personal Info:</h2>\r\n        <div class=\"row align-items-center\">\r\n\r\n            <div class=\"form-group col-md-4\">\r\n                <label for=\"firstName\" class=\"\">First Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"firstName\"\r\n                       name=\"firstName\" value=\""
    + alias4(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n\r\n            <div class=\"form-group col-md-4\">\r\n                <label for=\"exampleInput2\" class=\"bmd-label-floating\">Middle\r\n                    Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInput2\"\r\n                       name=\"middleName\" value=\""
    + alias4(((helper = (helper = helpers.middleName || (depth0 != null ? depth0.middleName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"middleName","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n\r\n            <div class=\"form-group col-md-4\">\r\n                <label for=\"exampleInput3\" class=\"bmd-label-floating\">Last\r\n                    Name</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInput3\"\r\n                       name=\"lastName\" value=\""
    + alias4(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"primaryEmail\" class=\"\">Primary\r\n                    Email/Username (can't change)</label>\r\n                <input type=\"email\" class=\"form-control\" id=\"primaryEmail\" name=\"\"\r\n                       value=\""
    + alias4(((helper = (helper = helpers.primaryEmail || (depth0 != null ? depth0.primaryEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryEmail","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput5\" class=\"bmd-label-floating\">Secondary\r\n                    Email\r\n                    (optional)</label>\r\n                <input type=\"email\" class=\"form-control\" id=\"exampleInput5\"\r\n                       name=\"secondaryEmail\" value=\""
    + alias4(((helper = (helper = helpers.secondaryEmail || (depth0 != null ? depth0.secondaryEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"secondaryEmail","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput6\" class=\"bmd-label-floating\">Contact\r\n                    Number</label>\r\n                <input type=\"number\" class=\"form-control\" id=\"exampleInput6\"\r\n                       name=\"phone\" value=\""
    + alias4(((helper = (helper = helpers.phone || (depth0 != null ? depth0.phone : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phone","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput7\" class=\"bmd-label-floating\">Address Line\r\n                    1</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInput7\"\r\n                       name=\"addressLine1\" value=\""
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput8\" class=\"bmd-label-floating\">Address Line\r\n                    2</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInput8\"\r\n                       name=\"addressLine2\" value=\""
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput9\" class=\"bmd-label-floating\">City</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInput9\"\r\n                       name=\"city\" value=\""
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput10\"\r\n                       class=\"bmd-label-floating\">District</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInput10\"\r\n                       name=\"district\" value=\""
    + alias4(((helper = (helper = helpers.district || (depth0 != null ? depth0.district : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"district","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput11\" class=\"bmd-label-floating\">State</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInput11\"\r\n                       name=\"state\" value=\""
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput12\"\r\n                       class=\"bmd-label-floating\">Country</label>\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInput12\"\r\n                       name=\"country\" value=\""
    + alias4(((helper = (helper = helpers.country || (depth0 != null ? depth0.country : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"country","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput13\" class=\"bmd-label-floating\">Pin</label>\r\n                <input type=\"number\" class=\"form-control\" id=\"exampleInput13\"\r\n                       name=\"pin\" value=\""
    + alias4(((helper = (helper = helpers.pin || (depth0 != null ? depth0.pin : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pin","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-12\">\r\n                <label for=\"exampleInput14\" class=\"\">Date of birth</label>\r\n                <input type=\"date\" class=\"form-control\" id=\"exampleInput14\"\r\n                       name=\"dateOfBirth\" value=\""
    + alias4(((helper = (helper = helpers.dateOfBirth || (depth0 != null ? depth0.dateOfBirth : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"dateOfBirth","hash":{},"data":data}) : helper)))
    + "\">\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-12\">\r\n\r\n                <div class=\"row\">\r\n                    <p class=\"text-muted\">Gender</p>\r\n                </div>\r\n                <div class=\"row justify-content-around\">\r\n                    <div class=\"form-check form-check-radio\">\r\n                        <label class=\"form-check-label\">\r\n                            <input class=\"form-check-input\" type=\"radio\"\r\n                                   name=\"isMale\" id=\"exampleRadios2\" value=\"true\"\r\n                                "
    + alias4(((helper = (helper = helpers.maleChecked || (depth0 != null ? depth0.maleChecked : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"maleChecked","hash":{},"data":data}) : helper)))
    + ">\r\n                            Male\r\n                            <span class=\"circle\">\r\n                                                            <span class=\"check\"></span>\r\n                                                        </span>\r\n                        </label>\r\n                    </div>\r\n                    <div class=\"form-check form-check-radio \">\r\n                        <label class=\"form-check-label\">\r\n                            <input class=\"form-check-input\" type=\"radio\"\r\n                                   name=\"isMale\" id=\"exampleRadios1\" value=\"false\"\r\n                                "
    + alias4(((helper = (helper = helpers.femaleChecked || (depth0 != null ? depth0.femaleChecked : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"femaleChecked","hash":{},"data":data}) : helper)))
    + ">\r\n                            Female\r\n                            <span class=\"circle\">\r\n                                                            <span class=\"check\"></span>\r\n                                                        </span>\r\n                        </label>\r\n                    </div>\r\n                    <div class=\"form-check form-check-radio \">\r\n                        <label class=\"form-check-label\">\r\n                            <input class=\"form-check-input\" disabled type=\"radio\"\r\n                                   name=\"isMale\" id=\"exampleRadios0\" value=\"\">\r\n                            Other\r\n                            <span class=\"circle\">\r\n                                                            <span class=\"check\"></span>\r\n                                                        </span>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"row\">\r\n            <div class=\"col-12\">\r\n\r\n                <div class=\"row\">\r\n                    <p class=\"text-muted\">Role</p>\r\n                </div>\r\n\r\n                <div class=\"row justify-content-around\">\r\n\r\n                    <div class=\"form-check form-check-radio\">\r\n                        <label class=\"form-check-label\">\r\n                            <input class=\"form-check-input\" type=\"radio\"\r\n                                   name=\"primaryRole\"\r\n                                   id=\"exampleRadios3\" value=\"Student\"\r\n                                "
    + alias4(((helper = (helper = helpers.studentChecked || (depth0 != null ? depth0.studentChecked : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"studentChecked","hash":{},"data":data}) : helper)))
    + ">\r\n                            Student\r\n                            <span class=\"circle\">\r\n                                                                <span class=\"check\"></span>\r\n                                                            </span>\r\n                        </label>\r\n                    </div>\r\n\r\n                    <div class=\"form-check form-check-radio\">\r\n                        <label class=\"form-check-label\">\r\n                            <input class=\"form-check-input\" type=\"radio\"\r\n                                   name=\"primaryRole\"\r\n                                   id=\"exampleRadios4\" value=\"Parent\"\r\n                                "
    + alias4(((helper = (helper = helpers.parentChecked || (depth0 != null ? depth0.parentChecked : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parentChecked","hash":{},"data":data}) : helper)))
    + ">\r\n                            Parent\r\n                            <span class=\"circle\">\r\n                                                                <span class=\"check\"></span>\r\n                                                            </span>\r\n                        </label>\r\n                    </div>\r\n\r\n                    <div class=\"form-check form-check-radio\">\r\n                        <label class=\"form-check-label\">\r\n                            <input class=\"form-check-input\" type=\"radio\"\r\n                                   name=\"primaryRole\"\r\n                                   id=\"exampleRadios5\" value=\"Institute\"\r\n                                "
    + alias4(((helper = (helper = helpers.instituteChecked || (depth0 != null ? depth0.instituteChecked : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"instituteChecked","hash":{},"data":data}) : helper)))
    + ">\r\n                            Institute\r\n                            <span class=\"circle\">\r\n                                                                <span class=\"check\"></span>\r\n                                                            </span>\r\n                        </label>\r\n                    </div>\r\n\r\n                </div>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["userSocialInput"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"card-body\">\r\n    <h2 class=\"card-title h3\">Social Connect:</h2>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"form-group col-12\">\r\n            <label for=\"fbLink\" class=\"bmd-label-floating\">Facebook Link</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"fbLink\" name=\"fbLink\"\r\n                   value=\""
    + alias4(((helper = (helper = helpers.fbLink || (depth0 != null ? depth0.fbLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fbLink","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"form-group col-12\">\r\n            <label for=\"twitterLink\" class=\"bmd-label-floating\">Twitter Link</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"twitterLink\" name=\"fbLink\"\r\n                   value=\""
    + alias4(((helper = (helper = helpers.twitterLink || (depth0 != null ? depth0.twitterLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"twitterLink","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"form-group col-12\">\r\n            <label for=\"youtubeLink\" class=\"bmd-label-floating\">Youtube Link</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"youtubeLink\"\r\n                   name=\"youtubeLink\"\r\n                   value=\""
    + alias4(((helper = (helper = helpers.youtubeLink || (depth0 != null ? depth0.youtubeLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"youtubeLink","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"form-group col-12\">\r\n            <label for=\"instaLink\" class=\"bmd-label-floating\">Instagram Link</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"instaLink\" name=\"instaLink\"\r\n                   value=\""
    + alias4(((helper = (helper = helpers.instaLink || (depth0 != null ? depth0.instaLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"instaLink","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"form-group col-12\">\r\n            <label for=\"linkedinLink\" class=\"bmd-label-floating\">LinkedIn\r\n                Link</label>\r\n            <input type=\"text\" class=\"form-control\" id=\"linkedinLink\"\r\n                   name=\"linkedinLink\"\r\n                   value=\""
    + alias4(((helper = (helper = helpers.linkedinLink || (depth0 != null ? depth0.linkedinLink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkedinLink","hash":{},"data":data}) : helper)))
    + "\">\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
this["template"]["userStatus"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <a href=\"#\" class=\"profile-photo dropdown-toggle nav-link\" data-toggle=\"dropdown\">\r\n        <div class=\"profile-photo-small\">\r\n            <img src=\"/assets/img/logo.png\" alt=\"Circle Image\"\r\n                 class=\"rounded img-fluid w-100 h-100\">\r\n        </div>\r\n    </a>\r\n    <div class=\"dropdown-menu dropdown-menu-right\">\r\n        <h6 class=\"dropdown-header\">"
    + container.escapeExpression(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"firstName","hash":{},"data":data}) : helper)))
    + "</h6>\r\n        <a class=\"dropdown-item\" style=\"cursor: pointer\" href=\"/User-dashboard.html\">Dashboard</a>\r\n        <a class=\"dropdown-item\" style=\"cursor: pointer\" href=\"User-addTuition.html\">\r\n        Add Institute/Tuition\r\n        </a>\r\n        <a id=\"log_out_btn\" class=\"btn btn-sm btn-outline-info dropdown-item\">Logout</a>\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "    <button class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#loginModal\">Login</button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.loggedIn : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});