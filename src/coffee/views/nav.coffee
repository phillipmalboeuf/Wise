class Wise.Views.Nav extends Backbone.View



	events: {
		"click [data-toggle-cart]": "toggle_cart"
	}
	




	initialize: ->

		this.render()

		



	render: ->

		this



	toggle_cart: (e)->
		e.preventDefault()
		Wise.cart_view.toggle()









