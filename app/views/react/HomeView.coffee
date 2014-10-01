{div, img} = React.DOM

module.exports = HomeView = React.createClass
	render: ->
		div {className:'container'}, 
			div {className:'row'}, 
				[div {className:'one third'}, null
				 div {className:'one third'}, 
					[
						img {src:'/images/dendarmusiken.png', alt:'Den där musiken'}, null
						div {className:'bounceInDown animated'}, 
							img {src:'/images/FriaLogo2-sm.png', alt:'Logga'}, null
					]
				]


