
{tr, td, b, button, div, label} = React.DOM

module.exports = EventView = React.createClass
	getInitialState: () -> 
		{ tips: '' }
	render: ->
		tr {}, [
			td {}, [
				b {}, [@props.home,' - ', @props.away,' ', @props.startAt]
				div {}, [@props.sport,' - ', @props.country,' ', @props.city,' ', @props.league]
			]
			td {}, 
				div {className:'btn-group'}, [
					td {}, button {type:'button', value:'1', className:'btn btn-default', onClick:@handleTipsClicked}, '1'
					td {}, button {type:'button', value:'X', className:'btn btn-default', onClick:@handleTipsClicked}, 'X'
					td {}, button {type:'button', value:'2', className:'btn btn-default', onClick:@handleTipsClicked}, '2'
					td {}, label {className:'bounceInLeft animated'}, @state.tips	
				]
		]
	handleTipsClicked: (e) ->
		console.log e
		@setState({tips: e.target.value})