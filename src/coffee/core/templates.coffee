Handlebars.registerHelper 'money', (value)->
	if value? then "<span class=money>$"+(parseFloat(value)/100).toFixed(2)+"</span>" else null


Handlebars.registerHelper 'truncate', (string, end)->
	if string? 
		string = string.slice(0, end)
		string += "..." if string.length >= end

		string

	else 
		null


Handlebars.registerHelper 'if_equal', (left, right, options)->
	if left is right
		options.fn this
	else
		return null

Handlebars.registerHelper 'if_lower', (left, right, options)->
	if left < right
		options.fn this
	else
		return null

Handlebars.registerHelper 'if_higher', (left, right, options)->
	if left > right
		options.fn this
	else
		return null

Handlebars.registerHelper 'unless_equal', (left, right, options)->
	if left isnt right
		options.fn this
	else
		return null