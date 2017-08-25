window.Wise =
	Collections:{}
	Models:{}
	Views:{}
	Routers:{}


	views: []


	init: ->


		@cart = new Wise.Models.Cart()
		@cart_view = new Wise.Views.Cart
			model: @cart

		@login_view = new Wise.Views.Login()
		@credit_card_view = new Wise.Views.CreditCard()
		@account_view = new Wise.Views.Account()
		@newsletter_view = new Wise.Views.Newsletter()
		

		this.render_views()
		document.addEventListener "turbolinks:render", this.render_views.bind(this)




	render_views: ->

		for view in @views
			view.undelegateEvents()

		delete @views
		@views = []


		$("[data-product-id]").each (index, element)=>
			@views.push new Wise.Views.Product({
				el: element
			})

		$("[data-navigation]").each (index, element)=>
			@views.push new Wise.Views.Nav({
				el: element
			})

		$("[data-slider]").each (index, element)=>
			@views.push new Wise.Views.Slider({
				el: element
			})


		@query = Wise.helpers.get_query_string()
		if @query.cart? then Wise.cart_view.show() else Wise.cart_view.hide()
		if @query.login? then Wise.login_view.show() else Wise.login_view.hide()
		if @query.credit_card? then Wise.credit_card_view.show() else Wise.credit_card_view.hide()
		if @query.account? then Wise.account_view.show() else Wise.account_view.hide()

		if $("[data-show-cart]").length > 0
			@cart_view.show()






Wise = window.Wise
_ = window._
Backbone = window.Backbone



$ ->
	Wise.init()

