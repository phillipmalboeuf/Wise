class Wise.Views.Product extends Backbone.View



	events: 
		"submit .js-add_to_cart": "add_to_cart"
		"click [name='color']": "change_color"
		"click [name='size']": "change_size"
		"click .js-extra_image": "load_extra_image"
		"click .js-toggle_details": "toggle_details"




	initialize: ->
		current = this.$el.find("[name='id']")
		@current_color = current.attr("data-color")
		@current_size = current.attr("data-size")

		this.render()

		



	render: ->

		_.each variant_colors, (color, key)=>
			this.$el.find("[data-color='"+key+"'] + label").css "background", color

		this



	add_to_cart: (e)->
		e.preventDefault()

		el = this.$el.find("[name='id']")
		if el.prop("type") == "hidden"
			Wise.cart.add this.$el.find("[name='id'][checked='checked']").val()

		else
			Wise.cart.add this.$el.find("[name='id']:checked").val()

		Wise.cart_view.show_cart()



	change_color: (e)->
		this.$el.find(".js-image").attr "src", $(e.currentTarget).attr("data-img")
		this.$el.find(".js-link").attr "href", $(e.currentTarget).attr("data-url")

		@current_color = $(e.currentTarget).attr("data-color")
		this.$el.find(".js-color").text @current_color
		this.update_id()


	change_size: (e)->

		@current_size = $(e.currentTarget).attr("data-size")
		this.update_id()


	update_id: ->

		this.$el.find("[name='id']").removeAttr "checked"
		if @current_size? and @current_size != ""
			id = this.$el.find("[name='id'][data-color='"+@current_color+"'][data-size='"+@current_size+"']")

		else
			id = this.$el.find("[name='id'][data-color='"+@current_color+"']")

		if id.length > 0
			path = window.location.pathname + "?variant=" + id[0].value
			Wise.router.navigate path,
				replace: true

			$.get path,
				success=(response)=>
					this.$el.find(".js-images").html $(response).find(".js-images").html()


			# if id[0].hasAttribute "disabled"
			# 	this.$el.find(".js-add_to_cart_button").addClass "button--sold_out"
			
			# else
			# 	this.$el.find(".js-add_to_cart_button").removeClass "button--sold_out"
			# 	id.attr "checked", "checked"


	load_extra_image: (e)->
		e.preventDefault()

		this.$el.find(".js-image").attr "src", $(e.currentTarget).attr("data-url")


	toggle_details: (e)->
		e.preventDefault()
		
		this.$el.find(".js-details").toggleClass "hide"









