class Wise.Views.Cart extends Backbone.View

	el: $("#cart")
	template: templates["cart"]



	data: {}
	events: 
		"click .js-cart__button": "toggle_cart"
		"click .js-remove_from_cart": "remove_from_cart"
		"click .js-increment": "increment"
		"click .js-decrement": "decrement"




	initialize: ->
		this.listenTo @model, "sync", this.render

		this.render()

		



	render: ->
		_.extend @data, 
			model: @model.toJSON()

		this.$el.html @template(@data)


		if @model.get("item_count") == 0
			this.hide_cart()


		Currency.convertAll(shopCurrency, cookieCurrency)


		this



	toggle_cart: (e)->
		e.preventDefault()

		this.$el.toggleClass "cart--opened"


	show_cart: ->
		this.$el.addClass "cart--opened"

	hide_cart: ->
		this.$el.removeClass "cart--opened"



	remove_from_cart: (e)->
		e.preventDefault()

		Wise.cart.remove $(e.currentTarget).attr("data-id")


	increment: (e)->
		e.preventDefault()

		Wise.cart.change $(e.currentTarget).attr("data-id"), parseInt($(e.currentTarget).attr("data-current-quantity"))+1


	decrement: (e)->
		e.preventDefault()

		Wise.cart.change $(e.currentTarget).attr("data-id"), parseInt($(e.currentTarget).attr("data-current-quantity"))-1






