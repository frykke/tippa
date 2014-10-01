{tr, td, b, button, div, label} = React.DOM

module.exports = EventView = React.createClass
	render: ->
		tr {}, [
			td {}, b {}, @props.username
			td {}, @props.name
			td {}, @props.email
		]
	  	