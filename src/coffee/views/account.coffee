class Wise.Views.Account extends Wise.Views.Login

	el: $("#account")



	data: {}
	events: 
		"click [data-hide]": "hide"
		"click [data-logout]": "logout"
		"click [data-show-tab]": "show_tab"




	initialize: ->

		super()



	render: ->

		super()

		this


	show_tab: (e)->
		show = e.currentTarget.getAttribute("data-show-tab")
		this.$el.find("[data-tab]").addClass "fade_out"
		this.$el.find("[data-show-tab]").removeClass "overlay__link--focus"

		setTimeout =>
			this.$el.find("[data-tab]").addClass "hide"
			this.$el.find("[data-tab='"+show+"']").removeClass "hide"
			this.$el.find("[data-show-tab='"+show+"']").addClass "overlay__link--focus"
			setTimeout =>
				this.$el.find("[data-tab='"+show+"']").removeClass "fade_out"
			, 10

		, 500



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





