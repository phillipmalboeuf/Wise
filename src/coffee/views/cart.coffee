class Wise.Views.Cart extends Backbone.View

	el: $("#cart")
	template: templates["cart"]



	data: {}
	events: 
		"click [data-remove-from-cart]": "remove_from_cart"
		"click [data-increment]": "increment"
		"click [data-decrement]": "decrement"
		"submit #cart_form": "checkout"




	initialize: ->
		this.listenTo @model, "sync", this.render
		
		$(".main").on "click", =>
			this.hide()

		this.render()

		



	render: ->
		_.extend @data, 
			model: @model.toJSON()
			lang: window.lang

		this.$el.html @template(@data)


		# if @model.get("item_count") == 0
		# 	this.hide_cart()


		# Currency.convertAll(shopCurrency, cookieCurrency)


		this


	toggle: (e)->
		if this.$el.hasClass "fade_out"
			this.show(e)

		else
			this.hide(e)


	show: (e)->
		if e?
			e.preventDefault()
	
		this.$el.removeClass "fade_out"


	hide: (e)->
		if e?
			e.preventDefault()
		
		this.$el.addClass "fade_out"



	remove_from_cart: (e)->
		e.preventDefault()

		Wise.cart.remove $(e.currentTarget).attr("data-remove-from-cart")


	increment: (e)->
		e.preventDefault()

		Wise.cart.change $(e.currentTarget).attr("data-increment"), parseInt($(e.currentTarget).attr("data-current-quantity"))+1


	decrement: (e)->
		e.preventDefault()

		Wise.cart.change $(e.currentTarget).attr("data-decrement"), parseInt($(e.currentTarget).attr("data-current-quantity"))-1


	checkout: (e)->

		Wise.cookies.delete "subscription"

		recurring_items = []
		_.each @model.attributes.items, (item)=>
			if item.properties && _.contains(Object.keys(item.properties), "Months")
				recurring_items.push item

		if recurring_items.length > 0
			Wise.credit_card_view.show(e, recurring_items)






