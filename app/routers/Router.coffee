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
EventsView = require( '../views/EventsView' )
HomeView = require( '../views/HomeView' )
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
		$( '#main-container' ).html( (new HomeView()).render().el  )
	
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
		$( '#main-container' ).html( (new EventsView()).el )
	