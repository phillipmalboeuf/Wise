class Wise.Views.Login extends Backbone.View

	el: $("#login")



	data: {}
	events: 
		"click [data-hide]": "hide"
		"submit #customer_login": "customer_login"
		"submit #create_customer": "create_customer"
		"click [data-submit]": "submit_form"




	initialize: ->

		this.render()



	render: ->

		this


	customer_login: (e)->
		e.preventDefault()

		$.ajax e.currentTarget.getAttribute("action"),
			method: "POST"
			dataType: "html"
			data: {
				"customer[email]": e.currentTarget["customer[email]"].value
				"customer[password]": e.currentTarget["customer[password]"].value
				form_type: "customer_login"
				utf8: "✓"
			}
			success: (response)=>

				errors = $(response).find(".errors")
				if errors.length > 0
					$(e.currentTarget).find("[data-errors]").text(errors.text())

				else
					$(e.currentTarget).find("[data-errors]").text("")
					Turbolinks.visit "?account=true"



	create_customer: (e)->
		e.preventDefault()

		$.ajax e.currentTarget.getAttribute("action"),
			method: "POST"
			data: {
				"customer[email]": e.currentTarget["customer[email]"].value
				"customer[password]": e.currentTarget["customer[password]"].value
				"customer[first_name]": e.currentTarget["customer[first_name]"].value
				"customer[last_name]": e.currentTarget["customer[last_name]"].value
				form_type: "create_customer"
				utf8: "✓"
			}
			success: (response)=>

				errors = $(response).find(".errors")
				if errors.length > 0
					$(e.currentTarget).find("[data-errors]").text(errors.text())

				else
					$(e.currentTarget).find("[data-errors]").text("")
					Turbolinks.visit "?account=true"




	submit_form: (e)->
		if this.$el.find("#customer_login [name='customer[email]']").val() != ""
			this.$el.find("#customer_login").submit()

		else if this.$el.find("#create_customer [name='customer[email]']").val() != ""
			this.$el.find("#create_customer").submit()




	toggle: (e)->
		if this.$el.hasClass "fade_out"
			this.show(e)

		else
			this.hide(e)


	show: (e)->
		if e?
			e.preventDefault()
	
		this.$el.removeClass "fade_out"
		this.$el.find("#login_email").focus()


	hide: (e)->
		if e?
			e.preventDefault()
		
		this.$el.addClass "fade_out"


