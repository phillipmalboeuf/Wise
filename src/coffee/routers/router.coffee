class Wise.Routers.Router extends Backbone.Router



	routes: {
		"(/)": "home"
	}

	views: []
	

	initialize: ->



	execute: (callback, args)->

		for view in @views
			view.undelegateEvents()

		delete @views
		@views = []

		callback.apply(this, args) if callback?



	home: ->


	

	page: ->











