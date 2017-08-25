class Wise.Views.CreditCard extends Wise.Views.Login

	el: $("#credit_card")
	template: templates["credit_card"]


	data: {}
	events: 
		"click [data-hide]": "hide"
		"submit #credit_card_form": "submit"


	items: []


	initialize: ->

		super()



	render: ->
		_.extend @data, 
			lang: window.lang
			items: this.items

		this.$el.html @template(@data)


		this.elements = stripe.elements()
		this.card = this.elements.create("card", {style: {
			base: {
				color: "#a98e63",
				fontSize: "16px",
				fontFamily: "Agendatype"
			},
			invalid: {
				color: "#d20000",
				iconColor: "#d20000"
			}
		}})
		this.card.addEventListener("change", this.card_change.bind(this))
		this.card.mount("#credit_card_input")

		super()

		this



	card_change: (event)->
		if event.complete
			Turbolinks.controller.adapter.progressBar.setValue(0)
			Turbolinks.controller.adapter.progressBar.show()

			stripe.createToken(this.card).then (result)=> 
				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()
				if result.token
					this.token = result.token.id


	submit: (e)->
		e.preventDefault()

		if this.token
			Turbolinks.controller.adapter.progressBar.setValue(0)
			Turbolinks.controller.adapter.progressBar.show()

			$.ajax "https://shopify.destruct.codes/subscriptions",
				method: "POST"
				contentType: "application/json"
				data: JSON.stringify({
					token: this.token
					plans: _.map(this.items, (item)-> {"plan": item.product_id+"-"+item.properties["Months"], "quantity": item.quantity})
				})
				success: (response)=>
					Turbolinks.controller.adapter.progressBar.setValue(100)
					Turbolinks.controller.adapter.progressBar.hide()

					Wise.cookies.set "subscription", response._id

					if window.lang
						window.location = "/checkout?locale="+window.lang
					else
						window.location = "/checkout"
	


	show: (e, items)->
		if e?
			e.preventDefault()
	
		this.items = items
		this.render()

		this.$el.removeClass "fade_out"





