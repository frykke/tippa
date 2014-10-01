EventView = require( '../../views/react/EventView' )

{div, h3, table} = React.DOM
console.log Backbone
module.exports = EventsView = React.createClass
 	
	mixins: [Backbone.React.Component.mixin],
	render: ->
		console.log @props.Events
		if @props.Events
			events = @props.Events.map(EventView)
			div {className:'one half'}, 
				div {}, [
					h3 {}, 'Aktuella matcher'
					div {}, 
						table {className:'table table-hover'},
							{events}
			]
		else
			div {className:'one half'}, 
				div {}, [
					h3 {}, 'Aktuella matcher'
					div {}, '----Laddar----'
			]
