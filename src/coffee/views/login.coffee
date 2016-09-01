class Wise.Views.Login extends Backbone.View



	events: 
		"click .js-recover_button": "show_recover"
		"click .js-login_button": "show_login"




	initialize: ->		

		this.render()

		



	render: ->


		this



	show_recover: (e)->
		e.preventDefault()

		this.$el.find(".js-recover_form").removeClass "hide"
		this.$el.find(".js-login_form").addClass "hide"


	show_login: (e)->
		e.preventDefault()

		this.$el.find(".js-login_form").removeClass "hide"
		this.$el.find(".js-recover_form").addClass "hide"





		



