class Wise.Views.Collections extends Backbone.View



	events: {}




	initialize: ->		

		this.render()

		



	render: ->
		
		collections = this.$el.find(".js-collection.hide")
		if collections.length > 0
			$(collections[Math.floor(Math.random() * collections.length)]).removeClass "hide"

			collections = this.$el.find(".js-collection.hide")
			$(collections[Math.floor(Math.random() * collections.length)]).removeClass "hide"

			collections = this.$el.find(".js-collection.hide")
			$(collections[Math.floor(Math.random() * collections.length)]).removeClass "hide"

		else
			collections = this.$el.find(".js-product").addClass "hide"
			$(collections[Math.floor(Math.random() * collections.length)]).removeClass "hide"

			collections = this.$el.find(".js-product.hide")
			$(collections[Math.floor(Math.random() * collections.length)]).removeClass "hide"

			collections = this.$el.find(".js-product.hide")
			$(collections[Math.floor(Math.random() * collections.length)]).removeClass "hide"

		this


