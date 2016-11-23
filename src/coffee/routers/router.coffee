class Wise.Routers.Router extends Backbone.Router



	routes: {
		"products(/:product)(/)": "products"
		"collections(/:collection)(/products/:product)(/)": "products"
		"blogs(/:blog)(/:article)(/)": "articles"
		"pages(/:page)": "pages"
		"(/)": "home"
	}

	views: []
	

	initialize: ->
		document.addEventListener "turbolinks:load", (e)=>
			this.navigate window.location.pathname+window.location.search,
				trigger: true
				replace: true


	execute: (callback, args)->

		for view in @views
			view.undelegateEvents()

		delete @views
		@views = []

		callback.apply(this, args) if callback?


		$("[data-navigation]").each (index, element)=>
			@views.push new Wise.Views.Nav({
				el: element
			})

		$("[data-slider]").each (index, element)=>
			@views.push new Wise.Views.Slider({
				el: element
			})


		@query = Wise.helpers.get_query_string()
		if @query.cart?
			Wise.cart_view.show()
		else
			Wise.cart_view.hide()

		if @query.login?
			Wise.login_view.show()
		else
			Wise.login_view.hide()

		if @query.account?
			Wise.account_view.show()
		else
			Wise.account_view.hide()



	products: (collection, product)->
		$("[data-product-id]").each (index, element)=>
			@views.push new Wise.Views.Product({
				el: element
			})


	articles: (blog, article)->


	pages: (page)->



	home: ->


	

	page: ->











