class Wise.Views.Nav extends Backbone.View



	events: {
		"click [data-toggle-cart]": "toggle_cart"
		"click [data-toggle-login]": "toggle_login"
	}
	




	initialize: ->

		this.render()

		



	render: ->

		this



	toggle_cart: (e)->
		e.preventDefault()
		Wise.cart_view.toggle()

	toggle_login: (e)->
		e.preventDefault()
		Wise.login_view.toggle()









