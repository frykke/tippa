
UserView = require( '../../views/react/UserView' )

{div, h3, table} = React.DOM
console.log Backbone
module.exports = EventsView = React.createClass
 	
	mixins: [Backbone.React.Component.mixin],
	render: ->
		console.log @props.Users
		if @props.Users
			users = @props.Users.map(UserView)
			div {className:'one half'}, 
				div {}, [
					h3 {}, 'Användare'
					div {}, 
						table {className:'table table-hover'},
							{users}
			]
		else
			div {className:'one half'}, 
				div {}, [
					h3 {}, 'Användare'
					div {}, '----Laddar----'
			]

