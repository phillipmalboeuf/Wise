class Wise.Views.ForgotPassword extends Wise.Views.Login

	el: $("#forgot_password")



	data: {}
	events: 
		"click [data-hide]": "hide"
		"submit [action='/account/recover']": "recover_customer_password"




	initialize: ->

		super()



	render: ->

		super()

		this



	recover_customer_password: (e)->
		e.preventDefault()

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()

		$.ajax e.currentTarget.getAttribute("action"),
			method: "POST"
			dataType: "html"
			data: {
				"email": e.currentTarget["email"].value
				form_type: "recover_customer_password"
				utf8: "✓"
			}
			success: (response)=>

				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				errors = $(response).find(".errors")
				if errors.length > 0
					$(e.currentTarget).find("[data-errors]").text(errors.text())

				else
					$(e.currentTarget).find("[data-errors]").text("")
					$(e.currentTarget).find("[data-success]").text("Success!")
					





