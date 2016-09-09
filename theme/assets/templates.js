this["templates"] = this["templates"] || {};

this["templates"]["cart"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "overlay__container--with_button";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<div class=\"padded padded--tight text_center\">\n		<strong>Total "
    + ((stack1 = (helpers.money || (depth0 && depth0.money) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.total_price : stack1),{"name":"money","hash":{},"data":data})) != null ? stack1 : "")
    + "</strong>\n	</div>\n\n	<button type=\"submit\" name=\"checkout\" class=\"overlay__button\">Passer à la caisse</button>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "	<div class=\"padded padded--tight text_center cart__item\">\n		<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n			<h6 class=\"small_bottom\">"
    + ((stack1 = ((helper = (helper = helpers.product_title || (depth0 != null ? depth0.product_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"product_title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</h6>\n			<em>"
    + alias4(((helper = (helper = helpers.variant_title || (depth0 != null ? depth0.variant_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"variant_title","hash":{},"data":data}) : helper)))
    + "</em>\n\n			<img src=\""
    + alias4(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"image","hash":{},"data":data}) : helper)))
    + "\">\n		</a>\n\n		<div class=\"grid grid--spaced grid--middle\">\n			<div>"
    + ((stack1 = (helpers.money || (depth0 && depth0.money) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"money","hash":{},"data":data})) != null ? stack1 : "")
    + "</div>\n			<div>\n				<button class=\"button--transparent\" data-decrement=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-current-quantity=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\">-</button>\n				"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\n				<button class=\"button--transparent\" data-increment=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-current-quantity=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\">+</button>\n			</div>\n			<div>\n				<button data-remove-from-cart=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"button--transparent\"><svg class=\"icon-trash\"><use xlink:href=\"#icon-trash\"></use></svg></button>\n			</div>\n		</div>\n	</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"padded text_center\">\n		Votre panier est vide\n	</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.item_count : stack1), depth0));
},"12":function(container,depth0,helpers,partials,data) {
    return "0";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "					<div class=\"col col--4of12 col--larger--3of12 col--medium--6of12 col--small--12of12\">\n						<div class=\"cart__item normal_bottom\">\n							<div class=\"grid small_bottom\">\n								<div class=\"col col--9of12\">\n									<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n										<h4 class=\"flat_bottom\">"
    + alias4((helpers.truncate || (depth0 && depth0.truncate) || alias2).call(alias1,(depth0 != null ? depth0.title : depth0),25,{"name":"truncate","hash":{},"data":data}))
    + " - "
    + alias4(((helper = (helper = helpers.variant_title || (depth0 != null ? depth0.variant_title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"variant_title","hash":{},"data":data}) : helper)))
    + "</h4>\n										<h3 class=\"h3--big\">"
    + ((stack1 = (helpers.money || (depth0 && depth0.money) || alias2).call(alias1,(depth0 != null ? depth0.price : depth0),{"name":"money","hash":{},"data":data})) != null ? stack1 : "")
    + "</h3>\n									</a>\n								</div>\n								\n								<div class=\"col col--3of12 text_right\">\n									<a href=\"#\" class=\"dark_grey js-remove_from_cart\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><i class=\"material-icons\">&#xE5CD;</i></a>\n								</div>\n							</div>\n							\n							<div class=\"small_bottom\">\n								<div class=\"grid grid--no_gutter grid--middle\">\n									<div class=\"col col--2of12\">\n										<span class=\"cart__item__quantity\">"
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "</span>\n									</div>\n									\n									<div class=\"col col--4of12 col--medium--5of12\">\n										<h6 class=\"dark_grey text_center\">Change Qty</h6>\n									</div>\n\n									<div class=\"col col--6of12 col--medium--5of12\">\n										<a href=\"#\" class=\"cart__item__increment js-increment\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-current-quantity=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\"><i class=\"material-icons\">&#xE147;</i></a>\n										<a href=\"#\" class=\"cart__item__increment js-decrement\" data-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-current-quantity=\""
    + alias4(((helper = (helper = helpers.quantity || (depth0 != null ? depth0.quantity : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"quantity","hash":{},"data":data}) : helper)))
    + "\"><i class=\"material-icons\">&#xE15C;</i></a>\n									</div>\n								</div>\n							</div>\n\n							<a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\">\n								<img src=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.image : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data})) != null ? stack1 : "")
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\">\n							</a>\n						</div>\n					</div>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.image || (depth0 != null ? depth0.image : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"image","hash":{},"data":data}) : helper)));
},"17":function(container,depth0,helpers,partials,data) {
    return "https://cdn.shopify.com/s/assets/admin/no-image-large-339e69e359cdf02ea76337381df99fa2.gif";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "\n<form action=\"/cart\" method=\"post\" class=\"cart__container "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.item_count : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" novalidate>\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.item_count : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "</form>\n\n\n\n<!-- 	<a href=\"/cart\" class=\"cart__button js-cart__button "
    + ((stack1 = helpers.unless.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.item_count : stack1),{"name":"unless","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n		Cart <i class=\"fa fa-shopping-cart cart__icon\"></i> <span class=\"text_underline\">"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.item_count : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + "</span> <span class=\"cart__arrow js-arrow\">▲</span>\n	</a>\n\n	<form action=\"/cart\" method=\"post\" novalidate class=\"flat_bottom cart__container\">\n		<div class=\"grid grid--middle\">\n			<div class=\"col col--9of12 col--small--12of12 cart__items\">\n				<div class=\"grid\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.items : stack1),{"name":"each","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n			</div>\n\n			<div class=\"col col--3of12 col--small--12of12 text_center\">\n				<h3 class=\"h3--big\">Subtotal "
    + ((stack1 = (helpers.money || (depth0 && depth0.money) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.total_price : stack1),{"name":"money","hash":{},"data":data})) != null ? stack1 : "")
    + "</h3>\n				<button type=\"submit\" name=\"checkout\" class=\"button--bordered button--full\">Checkout <span class=\"button__arrow\"><i class=\"fa fa-long-arrow-right\"></i></span></button>\n			</div>\n		</div>\n	\n	</form>\n\n\n\n -->";
},"useData":true});