class Wise.Views.Newsletter extends Wise.Views.Login

	el: $("#newsletter")


	data: {}
	events: 
		"click [data-hide]": "hide"
		"submit [data-newsletter-form]": "signup"


	initialize: ->

		super()


	render: ->

		unless Wise.cookies.get("newsletter_hidden")?
			delay = this.$el.attr("data-newsletter-delay")
			unless delay == "never"
				setTimeout =>
					this.show()
				, this.$el.attr("data-newsletter-delay")*1000

		super()


	signup: (e)->
		e.preventDefault()

		$.ajax "https://shopify.destruct.codes/_newsletter/signup",
			method: "POST"
			contentType: "application/json"
			data: JSON.stringify({
				email: e.currentTarget["email"].value
				shop: e.currentTarget["shop"].value
			})
			success: (response)=>
				Wise.cookies.set "newsletter_hidden", true
				$(e.currentTarget).text(e.currentTarget.getAttribute("data-succes-text"))

			error: (response)=>
				$(e.currentTarget).find("[data-errors]").text(response.responseJSON.error)


	hide: (e)->
		Wise.cookies.set "newsletter_hidden", true

		super(e)


