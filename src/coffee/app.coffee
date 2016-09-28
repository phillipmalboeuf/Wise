window.Wise =
	Collections:{}
	Models:{}
	Views:{}
	Routers:{}


	init: ->


		@cart = new Wise.Models.Cart()
		@cart_view = new Wise.Views.Cart
			model: @cart

		@login_view = new Wise.Views.Login()
		

		# @products_views = []
		# $(".js-products").each (index, el)=>
		# 	@products_views.push new Wise.Views.Products({el: $(el)})

		# @product_views = []
		# $(".js-product").each (index, el)=>
		# 	@product_views.push new Wise.Views.Product({el: $(el)})

		# @collections_views = []
		# $(".js-collections").each (index, el)=>
		# 	@collections_views.push new Wise.Views.Collections({el: $(el)})


		# @login_views = []
		# $(".js-login").each (index, el)=>
		# 	@login_views.push new Wise.Views.Login({el: $(el)})



		# $("[data-scroll-to]").click (e)->
		# 	scroll_to = $("#" + e.currentTarget.getAttribute("data-scroll-to"))

		# 	if scroll_to.length > 0
		# 		e.preventDefault()
		# 		e.stopImmediatePropagation()
	
		# 		scroll_to.velocity("scroll", { duration: 1500, easing: "easeOutQuart", offset: -50 })


		@router = new Wise.Routers.Router()
		Backbone.history.start
			pushState: true





Wise = window.Wise
_ = window._
Backbone = window.Backbone



$ ->
	Wise.init()

