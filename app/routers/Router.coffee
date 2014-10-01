###
 * Backbone Primary Router
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

application = require( 'Application' )

UsersModel = require( '../models/UsersModel' )
UsersView = require( '../views/react/UsersView' )
EventsModel = require( '../models/EventsModel' )
EventsView = require( '../views/react/EventsView' )
HomeView = require( '../views/react/HomeView' )

console.log HomeView

module.exports = class Router extends Backbone.Router

	###//--------------------------------------
	//+ Routes
	//--------------------------------------###
	
	routes:
			'' : 'home'
			'home' : 'home'
			'users' : 'users'
			'events' : 'events'
			
	###//--------------------------------------
	//+ Route Handlers
	//--------------------------------------###
	home: ->
		React.renderComponent (HomeView {}), $('#main-container').get(0)
	
	users: ->
		usersModel = new UsersModel()
		React.renderComponent((UsersView ({model:usersModel})), $('#main-container').get(0))
	
	events: ->
		eventsModel = new EventsModel()
		React.renderComponent((EventsView ({model:eventsModel})), $('#main-container').get(0))
	
	