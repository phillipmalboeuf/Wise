class Wise.Views.Product extends Backbone.View


	events: 
		"click [data-add-to-cart]": "add_to_cart"


	initialize: ->

		this.render()


	render: ->

		this



	add_to_cart: (e)->
		e.preventDefault()
		e.stopImmediatePropagation()
		e.currentTarget.blur()

		Wise.cart.add $(e.currentTarget).attr("data-add-to-cart")
		Wise.cart_view.show()






