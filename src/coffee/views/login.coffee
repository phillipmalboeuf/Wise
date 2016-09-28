class Wise.Views.Login extends Backbone.View

	el: $("#login")



	data: {}
	events: 
		"click [data-hide]": "hide"




	initialize: ->

		this.render()

		



	render: ->


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
		Wise.router.navigate window.location.pathname+"?login=true"


	hide: (e)->
		if e?
			e.preventDefault()
		
		this.$el.addClass "fade_out"
		Wise.router.navigate window.location.pathname


