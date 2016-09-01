class Wise.Models.Cart extends Backbone.Model


	url: "/cart.js"


	parse: (response)->

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
		console.log id
		console.log quantity

		post = $.ajax "/cart/change.js",
			method: "POST"
			dataType: "json"
			data:
				quantity: quantity
				id: parseInt(id)
			success: (response)=>
				console.log response

				this.set response
				this.trigger "sync"


			


	remove: (id)->

		this.change id, 0


			





