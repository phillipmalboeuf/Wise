
class Wise.Views.Slider extends Backbone.View


	current_slide: 0

	events: {
		"click [data-next-slide-button]": "next_slide"
		"click [data-previous-slide-button]": "previous_slide"
		"click [data-slide-marker]": "slide_to"
	}

	
	initialize: ->
		@slides_count = this.$el.find("[data-slide]").length

		setTimeout =>
			this.render()
		, 1000

		



	render: ->

		this.$el.find("[data-slider-container]").css "width", @slides_count+"00%"
		this.$el.find("[data-slide]").css "width", (100/@slides_count)+"%"
		# @previous_slide_height = this.$el.find("[data-slide="+@current_slide+"] [data-slide-content]").height()
		# this.$el.find("[data-slider-container]").css "height", "-="+(this.$el.find("[data-slide="+@current_slide+"]").height() - @previous_slide_height)+"px"

		this



	next_slide: ->
		if @current_slide == @slides_count - 1
			this.slide_to(null, 0)

		else
			this.slide_to(null, @current_slide + 1)


	previous_slide: ->
		if @current_slide == 0
			this.slide_to(null, @slides_count - 1)

		else
			this.slide_to(null, @current_slide - 1)


	slide_to: (e, index)->
		if e?
			index = parseInt(e.currentTarget.getAttribute "data-slide-marker")
			e.currentTarget.blur()

		@current_slide = index
		this.$el.find("[data-slide-marker]").removeClass "slider__marker--active"
		this.$el.find("[data-slide-marker="+@current_slide+"]").addClass "slider__marker--active"

		# slide_height = this.$el.find("[data-slide="+@current_slide+"] [data-slide-content]").height()
		# this.$el.find("[data-slider-container]").css "height", "-="+(@previous_slide_height - slide_height)+"px"

		# @previous_slide_height = slide_height

		this.$el.find("[data-slide]").css "transform", "translateX(-"+@current_slide+"00%)"


		




