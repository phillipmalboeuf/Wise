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



	add: (id, quantity=1, data={})->

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		data["id"] = parseInt(id)
		data["quantity"] = quantity

		$.ajax "/cart/add.js",
			method: "POST"
			dataType: "json"
			data: data
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				this.fetch()


			



	change: (key, quantity)->

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		post = $.ajax "/cart/change.js",
			method: "POST"
			dataType: "json"
			data:
				quantity: quantity
				id: key
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				this.fetch()


			


	remove: (id)->

		this.change id, 0




			





