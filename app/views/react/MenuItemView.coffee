{li, a} = React.DOM

module.exports = EventView = React.createClass
	render: ->
		 li {className: @props.itemSelected ? 'selected-menu-item' : ''},
		 	a {className:'noicon',href:'#' + @props.url} , @props.text
		