this["template"] = this["template"] || {};
this["template"]["manageAdList"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a class=\"list-group-item list-group-item-action row\" href=\"ad-stats.html\">\r\n    <b class=\"list-group-item-heading col-4\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</b>\r\n    <b class=\"list-group-item-text col-4\">"
    + alias4(((helper = (helper = helpers.address || (depth0 != null ? depth0.address : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"address","hash":{},"data":data}) : helper)))
    + "</b>\r\n    <b class=\"list-group-item-text col-3\">Ads activated at "
    + alias4(((helper = (helper = helpers.numberOfAds || (depth0 != null ? depth0.numberOfAds : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"numberOfAds","hash":{},"data":data}) : helper)))
    + " places</b>\r\n</a>";
},"useData":true});
this["template"]["productActiveCard"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"col-md-4\">\r\n    ";
},"3":function(container,depth0,helpers,partials,data) {
    return " ";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "            <a data-toggle=\"promoter\" class=\"tab-toggle\" style=\"cursor: pointer\">\r\n                <div class=\"card-title text-center\">\r\n                    <h2>Promoter</h2>\r\n                </div>\r\n                <p class=\"card-title\">\r\n                    Promoter lets you promote your institute on various pages on Eduatlas.com\r\n                </p>\r\n\r\n                <div class=\"card-stats justify-content-around\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" style=\"cursor: default;\">Due Date: "
    + container.escapeExpression(((helper = (helper = helpers.promoter || (depth0 != null ? depth0.promoter : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"promoter","hash":{},"data":data}) : helper)))
    + "</button>\r\n                </div>\r\n            </a>\r\n            ";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\r\n            <a data-toggle=\"communicator\" class=\"tab-toggle\" style=\"cursor: pointer\">\r\n                <div class=\"card-title text-center\">\r\n                    <h2>Communicator</h2>\r\n                </div>\r\n                <p class=\"card-title\">\r\n                    Comnnunicator lets you communicate info back and forth to students and parents\r\n                </p>\r\n\r\n                <div class=\"card-stats justify-content-around\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" style=\"cursor: default;\">Due Date: "
    + container.escapeExpression(((helper = (helper = helpers.communicator || (depth0 != null ? depth0.communicator : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"communicator","hash":{},"data":data}) : helper)))
    + "</button>\r\n                </div>\r\n            </a>\r\n            ";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return "\r\n            <a data-toggle=\"manager\" class=\"tab-toggle\" style=\"cursor: pointer\">\r\n                <div class=\"card-title text-center\">\r\n                    <h2>Manager</h2>\r\n                </div>\r\n                <p class=\"card-title\">\r\n                    Manager lets you control almost all of your institutes stats and info flow\r\n                </p>\r\n\r\n                <div class=\"card-stats justify-content-around\">\r\n                    <button type=\"button\" class=\"btn btn-danger\" style=\"cursor: default;\">Due Date: "
    + container.escapeExpression(((helper = (helper = helpers.manager || (depth0 != null ? depth0.manager : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"manager","hash":{},"data":data}) : helper)))
    + "</button>\r\n                </div>\r\n            </a>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.col4 : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n    <div class=\"card bg-info\">\r\n        <div class=\"card-body text-center\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.promoter : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.communicator : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.manager : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n            <div class=\"card-stats justify-content-around\">\r\n                <button type=\"button\" class=\"btn btn-success\">Upgrade/Renew</button>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.col4 : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["productInactiveCard"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"col-md-4\">\r\n    ";
},"3":function(container,depth0,helpers,partials,data) {
    return " ";
},"5":function(container,depth0,helpers,partials,data) {
    return "            <a href=\"#tacla\">\r\n                <div class=\"card-title text-center text-gray\">\r\n                    <h3>Promoter</h3>\r\n                </div>\r\n\r\n                <p class=\"card-title text-gray text-center\">\r\n                    Promoter lets you promote your institute on various pages on Eduatlas.com\r\n                </p>\r\n            </a>\r\n            ";
},"7":function(container,depth0,helpers,partials,data) {
    return "\r\n            <a href=\"#tacla\">\r\n                <div class=\"card-title text-center text-gray\">\r\n                    <h3>Communicator</h3>\r\n                </div>\r\n\r\n                <p class=\"card-title text-gray text-center\">\r\n                    Comnnunicator lets you communicate info back and forth to students and parents\r\n                </p>\r\n            </a>\r\n            ";
},"9":function(container,depth0,helpers,partials,data) {
    return "\r\n            <a href=\"#tacla\">\r\n                <div class=\"card-title text-center text-gray\">\r\n                    <h3>Manager</h3>\r\n                </div>\r\n\r\n                <p class=\"card-title text-gray text-center\">\r\n                    Manager lets you control almost all of your institutes stats and info flow\r\n                </p>\r\n            </a>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.col4 : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n    <div class=\"card bg-secondary inactive-card h-75\">\r\n        <span class=\"badge badge-danger\">this plan is not activated</span>\r\n        <div class=\"card-body\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.promoter : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.communicator : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.manager : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            <div class=\"card-stats justify-content-around\">\r\n\r\n                <i id=\"plus_icon\" class=\"fas fa-plus-circle\"></i>\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.col4 : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
this["template"]["smoothCardHomePage"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"col-md-4\" id=\""
    + container.escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "                    <span class=\"badge badge-info\">verified</span>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "                        <span class=\"badge badge-success my-1\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return " ";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n        <div class=\"card-body pb-0\">\r\n            <div class=\"row\" style=\"min-height: 70px;max-height: 70px;text-overflow: ellipsis;\r\n            overflow: hidden; \">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        location_on\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"address\" class=\"my-0\">"
    + alias4(((helper = (helper = helpers.addressLine1 || (depth0 != null ? depth0.addressLine1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine1","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.addressLine2 || (depth0 != null ? depth0.addressLine2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"addressLine2","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.city || (depth0 != null ? depth0.city : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"city","hash":{},"data":data}) : helper)))
    + ","
    + alias4(((helper = (helper = helpers.state || (depth0 != null ? depth0.state : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"state","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\" style=\"min-height: 30px;max-height: 15px;text-overflow: ellipsis;\r\n            overflow: hidden\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        phone\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"phone\" class=\"my-0\">"
    + alias4(((helper = (helper = helpers.primaryNumber || (depth0 != null ? depth0.primaryNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"primaryNumber","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.organiserPhone || (depth0 != null ? depth0.organiserPhone : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"organiserPhone","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\" style=\"min-height: 30px;max-height: 15px;text-overflow: ellipsis;\r\n            overflow: hidden\">\r\n                <div class=\"col-1 px-0\">\r\n                    <i class=\"material-icons md-18\" style=\"color: #00bcd4\">\r\n                        email\r\n                    </i>\r\n                </div>\r\n                <div class=\"col-11\">\r\n                    <p id=\"email\" class=\"my-0\">"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + alias4(((helper = (helper = helpers.organiserEmail || (depth0 != null ? depth0.organiserEmail : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"organiserEmail","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n";
},"11":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <div class=\"col\">\r\n                <a class=\"btn btn-info btn-round\" href=\"user-edit-"
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + ".html?a="
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">Edit</a>\r\n            </div>\r\n            <div class=\"col\">\r\n                <button class=\"btn btn-danger btn-round unclaim-button\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-category=\""
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + "\">Unclaim\r\n                </button>\r\n            </div>\r\n            ";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n            <div class=\"col\">\r\n                <!--<i class=\"material-icons\" style=\"cursor: pointer\">\r\n                        bookmark\r\n                    </i>-->\r\n                <i class=\"material-icons bookmark-button\" style=\"cursor: pointer\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-category=\""
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + "\" data-bookmarked=\""
    + alias4(((helper = (helper = helpers.bookmarked || (depth0 != null ? depth0.bookmarked : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bookmarked","hash":{},"data":data}) : helper)))
    + "\">\r\n                    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.bookmarked : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "")
    + "\r\n                </i>\r\n            </div>\r\n            <div class=\"col-6 text-center\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.openedNow : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\r\n            <div class=\"col\">\r\n                <i class=\"material-icons share\" style=\"cursor: pointer\">\r\n                    share\r\n                </i>\r\n\r\n            </div>\r\n\r\n            ";
},"14":function(container,depth0,helpers,partials,data) {
    return " bookmark ";
},"16":function(container,depth0,helpers,partials,data) {
    return " bookmark_border ";
},"18":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"font-weight-bold text-success\">Open Now</p>\r\n";
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\r\n            <div class=\"col\">\r\n                <button class=\"btn btn-danger btn-round remove-bookmark-button\" data-id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" data-category=\""
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + "\">Remove\r\n                    bookmark\r\n                </button>\r\n            </div>\r\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.col4 : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"card newFont\">\r\n        <div class=\" tuition-cards\" style=\"cursor: pointer\" onclick=\"helperScripts.openDetailsPage('"
    + alias4(((helper = (helper = helpers.typeOfInfo || (depth0 != null ? depth0.typeOfInfo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"typeOfInfo","hash":{},"data":data}) : helper)))
    + "','"
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "')\">\r\n            <div class=\"card p-0 m-0 rounded-0 rounded-top\" style=\"overflow: hidden;text-overflow: ellipsis\">\r\n                <div class=\"rounded-top\" style=\"position: absolute; height: 192px;width: 100%;background-color: rgba(0,0,0,0.5)\">\r\n                </div>\r\n                <img class=\"card-img-top\" src=\"/assets/img/fourgirls.jpeg\" alt=\"Tuition Image\" style=\"height: 182px;width: 100%;\">\r\n                <div class=\"card-img-overlay\">\r\n                    <h4 class=\"card-title text-white\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                    <span class=\"badge badge-warning\">"
    + alias4(((helper = (helper = helpers.averageRating || (depth0 != null ? depth0.averageRating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"averageRating","hash":{},"data":data}) : helper)))
    + "/5</span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.claimedBy : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    <br>\r\n                    <div class=\"my-1\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.categories : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hideBody : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "        <div class=\"pb-0 pt-0 rounded-0 card-footer justify-content-center\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.manageClaimed : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.hideFooter : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.manageBookmarks : depth0),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.col4 : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});