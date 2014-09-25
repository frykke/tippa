###
 * View Description
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

View = require('./supers/View')
template = require('./templates/Menu')

module.exports = class MenuView extends View

	###//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------###

	#
	# @private
	#
	id: 'menu-view'
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

	#
	# @private
	#
	render: ->
		@$el.html( @template( @getRenderData() ) )

		return @

	#
	# @private
	#
	menuItems:
		[
			{url: 'home', text: 'fria progg presenterar:', itemSelected: true},
			{url: 'news', text: 'Nyheter'},
			{url: 'shows', text: 'Spelningar'},
			{url: 'history', text: 'Historia'},
			{url: 'contact', text: 'Kontakt'},
			{url: 'pictures', text: 'Bilder'},
			{url: 'sound', text: 'Musik'}
		]
	
	getRenderData: ->
		return {
			content: "Välkommen"
			selectedItem: @selectedItem
			MenuItem: @menuItems
			
		}
	###//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------###
	selectedItem: 'Not set'

	setSelectedItem: (id) =>
		for item in @menuItems
			item.itemSelected = (item.url == id)
		
	###//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------###

	###//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------###
