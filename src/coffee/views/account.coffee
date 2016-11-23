class Wise.Views.Account extends Wise.Views.Login

	el: $("#account")



	data: {}
	events: 
		"click [data-hide]": "hide"
		"click [data-logout]": "logout"




	initialize: ->

		super()



	render: ->

		super()

		this


	logout: (e)->
		$.ajax "/account/logout",
			method: "GET",
			success: (response)->
				Turbolinks.visit "/"


	show: (e)->
		if e?
			e.preventDefault()
	
		this.$el.removeClass "fade_out"
		Wise.router.navigate window.location.pathname+"?account=true"





