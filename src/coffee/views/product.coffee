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

		recurring = this.$el.find("[name='recurring'] option:selected")[0]
		if recurring.value > 0
			Wise.cart.add $(e.currentTarget).attr("data-add-to-cart"), 1, {
				"properties[Recurring]": recurring.innerText
			}
		else
			Wise.cart.add $(e.currentTarget).attr("data-add-to-cart")

		Wise.cart_view.show()






