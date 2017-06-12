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

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		$.ajax "/cart/add.js",
			method: "POST"
			dataType: "json"
			data:
				quantity: quantity
				id: parseInt(id)
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				this.fetch()


			



	change: (id, quantity)->

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		post = $.ajax "/cart/change.js",
			method: "POST"
			dataType: "json"
			data:
				quantity: quantity
				id: parseInt(id)
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				this.fetch()


			


	remove: (id)->

		this.change id, 0




			





