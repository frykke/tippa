###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author Mats Fryklund
 * @since  
###

View = require('./supers/View')
EventsModel = require('../models/EventsModel')
template = require('./templates/EventsTemplate')

module.exports = class EventsView extends View

	###//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------###

  	#
   	# @private
	#
	id: 'events-view'
	#
   	# @private
	#
	template: template

	###//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------###

	#
   	# @private
	#
	initialize: ->
		@render = _.bind( @render, @ )
		@model = new EventsModel()
		@model.on('change', @newData)
   	# @private
	#
	render: ->
		console.log 'render'
		console.log @getRenderData()
		@$el.html( @template( @getRenderData() ) )
		return @

	
	#
   	# @private
	#
	
	getRenderData: =>
		console.log @model.toJSON()
		return @model.toJSON()

	###//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------###

	###//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------###
	
	newData: (event) =>
		console.log 'new Data'
		console.log @model
		@render()

	###//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------###
