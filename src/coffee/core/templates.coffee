Handlebars.registerHelper 'money', (value)->
	if value? then "<span class=money>$"+(parseFloat(value)/100).toFixed(2)+"</span>" else null


Handlebars.registerHelper 'truncate', (string, end)->
	if string? 
		string = string.slice(0, end)
		string += "..." if string.length >= end

		string

	else 
		null