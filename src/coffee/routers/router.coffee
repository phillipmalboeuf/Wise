class Wise.Routers.Router extends Backbone.Router



	routes: {
		"products(/:product)(/)": "products"
		"collections(/:collection)(/products/:product)(/)": "products"
		"blogs(/:blog)(/:article)(/)": "articles"
		"(/)": "home"
	}

	views: []
	

	initialize: ->
		document.addEventListener "turbolinks:render", (e)=>
			this.navigate window.location.pathname,
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



	products: (collection, product)->
		$("[data-product-id]").each (index, element)=>
			@views.push new Wise.Views.Product({
				el: element
			})


	articles: (blog, article)->


	home: ->


	

	page: ->











