{div, img} = React.DOM

module.exports = HomeView = React.createClass
	render: ->
		div {className:'container'}, 
			div {className:'row'}, 
				[div {className:'one third'}, null
				 div {className:'one third'}, 
					div {className:'bounceInDown animated'}, 'Utmana dina tipsvänner!'
				]


