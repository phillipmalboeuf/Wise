class Wise.Views.Products extends Backbone.View



	events: {
		"click .js-next": "load_more"
		"click .js-search_button": "toggle_search"
	}




	initialize: ->		

		this.render()

		



	render: ->

		next = this.$el.find(".js-next")

		# if next.length > 0
		# 	@interval = window.setInterval =>

		# 		if next.offset().top > this.$el.height() - 400

		# 			window.clearInterval @interval



		# 	, 1000


		this


	load_more: (e)->

		e.preventDefault() if e?

		next = this.$el.find(".js-next")

		$.ajax next.attr("href"),
			method: "GET"
			dataType: "html"
			success: (response)=>

				this.$el.find(".js-products_container").append $(response).find(".js-products_container").html()
				response_next = $(response).find(".js-next")

				if response_next.length > 0
					next.attr "href", response_next.attr("href")

				else
					next.remove()


				this.render()

				next.blur()


				
				_.each Wise.product_views, (view)->
					view.undelegateEvents()

				Wise.product_views = []
				$(".js-product").each (index, el)=>
					Wise.product_views.push new Wise.Views.Product({el: $(el)})



	toggle_search: (e)->
		Wise.search_view.toggle_search e






