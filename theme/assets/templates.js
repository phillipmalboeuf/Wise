this["templates"] = this["templates"] || {};

this["templates"]["cart"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "?locale=fr";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<div class=\"padded padded--tight text_center\">\n		<strong>Total "
    + ((stack1 = (helpers.money || (depth0 && depth0.money) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.total_price : stack1),{"name":"money","hash":{},"data":data})) != null ? stack1 : "")
    + "</strong>\n	</div>\n\n	<button type=\"submit\" name=\"checkout\" class=\"cart__button\">"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.lang : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "</button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<div class=\"padded padded--tight text_center cart__item\">\n		<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n			<p class=\"small_bottom\">"
    + ((stack1 = ((helper = (helper = helpers.product_title || (depth0 != null ? depth0.product_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"product_title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n			<em>"
    + alias4(((helper = (helper = helpers.variant_title || (depth0 != null ? depth0.variant_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"variant_title","hash":{},"data":data}) : helper)))
    + "</em>\n\n			<img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\">\n		</a>\n\n		\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		<div class=\"grid grid--spaced grid--middle\">\n			<div>"
    + ((stack1 = (helpers.money || (depth0 && depth0.money) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"money","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n			<div>\n				<button class=\"button--transparent\" data-decrement=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-current-quantity=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\">-</button>\n				"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\n				<button class=\"button--transparent\" data-increment=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" data-current-quantity=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\">+</button>\n			</div>\n			<div>\n				<button data-remove-from-cart=\""
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\" class=\"button--transparent\"><svg class=\"icon-trash\"><use xlink:href=\"#icon-trash\"></use></svg></button>\n			</div>\n		</div>\n	</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.unless_equal || (depth0 && depth0.unless_equal) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(data && data.key),"Months",{"name":"unless_equal","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "		<br>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "Passer la commande";
},"10":function(container,depth0,helpers,partials,data) {
    return "Continue to Checkout";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"padded text_center\">\n		"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.lang : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.program(15, data, 0),"data":data})) != null ? stack1 : "")
    + "\n	</div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "Votre panier est vide";
},"15":function(container,depth0,helpers,partials,data) {
    return "Your cart is empty";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "\n<form action=\"/checkout"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.lang : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" method=\"post\" class=\"cart__container\" id=\"cart_form\" novalidate>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.item_count : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + "</form>\n";
},"useData":true});

this["templates"]["credit_card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "			<li>"
    + ((stack1 = ((helper = (helper = helpers.product_title || (depth0 != null ? depth0.product_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"product_title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " x "
    + container.escapeExpression(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + " – "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.properties : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.unless_equal || (depth0 && depth0.unless_equal) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(data && data.key),"Months",{"name":"unless_equal","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression(container.lambda(depth0, depth0));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n<a href=\"#\" class=\"admin__back\" data-hide></a>\n\n<div class=\"admin__container overlay__container--with_button\">\n	<form id=\"credit_card_form\" class=\"padded\">\n		<label>Enter your payment information for recurring orders:</label>\n\n		<ol>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ol>\n\n		<div class=\"input\" id=\"credit_card_input\"></div>\n\n		<button class=\"overlay__button\">Continuer</button>\n	</form>\n</div>";
},"useData":true});