class Wise.Models.Cart extends Backbone.Model


	url: "/cart.js"


	parse: (response)->

		if response.item_count > 0
			$("[data-item-count]").text response.item_count
		else
			$("[data-item-count]").text ""

		response



	initialize: ->

		this.fetch()



	add: (id, quantity=1)->

		$.ajax "/cart/add.js",
			method: "POST"
			dataType: "json"
			data:
				quantity: quantity
				id: parseInt(id)
			success: (response)=>

				this.fetch()


			



	change: (id, quantity)->

		post = $.ajax "/cart/change.js",
			method: "POST"
			dataType: "json"
			data:
				quantity: quantity
				id: parseInt(id)
			success: (response)=>

				this.fetch()


			


	remove: (id)->

		this.change id, 0




			





