MenuItemView = require( '../../views/react/MenuItemView' )

{div, nav, a, ul, img} = React.DOM
console.log Backbone
module.exports = MenuView = React.createClass
 	
	mixins: [Backbone.React.Component.mixin],
	render: ->
		console.log @props.collection
		if @props.collection
			menuItems = @props.collection.map(MenuItemView)
			div {className:'row'},
				div {className:'one whole'}, 
					nav {role:"navigation", className:"nav nocollapse black"}, [
						a {href:"/#home"}, 
							img {alt:"Tippa", src:"/images/TippaLogo.png"}, null
						ul {role:'menubar'}
							{menuItems}
					]  
		else
			div {className:'row'},
				div {className:'one whole'}, 'Laddar'
			
