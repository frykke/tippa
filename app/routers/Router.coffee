###
 * Backbone Primary Router
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

application = require( 'Application' )
UsersView = require( '../views/UsersView' )
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
		application.menuView.setSelectedItem('home')
		$( '#menu-container' ).html( application.menuView.render().el )
		#console.log HomeView
		#console.log UsersView
		console.log $('#main-container')
		console.log $('#main-container').get()

		React.renderComponent (HomeView {}), $('#main-container').get(0)
		#$( '#main-container' ).html( (new HomeView()).render().el  )
	
	users: ->
		application.menuView.setSelectedItem('users')
		$( '#menu-container' ).html( application.menuView.render().el )
		console.log UsersView
		usersView = new UsersView()
		console.log usersView
		$( '#main-container' ).html( (new UsersView()).el )
	
	events: ->
		application.menuView.setSelectedItem('events')
		$( '#menu-container' ).html( application.menuView.render().el )
		#$( '#main-container' ).html( (new EventsView()).el )
		eventsModel = new EventsModel()
		React.renderComponent((EventsView ({model:eventsModel})), $('#main-container').get(0))
	