###//CoffeeScript///////////////////////////////////////////////////////////////////
// 
// Copyright 2012 
// 
/////////////////////////////////////////////////////////////////////////////////###

###
 * Application Bootstrapper
 * 
 * @langversion CoffeeScript
 * 
 * @author 
 * @since  
 ###

Application = 

    ###//--------------------------------------
    //+ PUBLIC PROPERTIES / CONSTANTS
    //--------------------------------------###
    
    ###//--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------###

    initialize: ->
        
        MenuView = require('views/MenuView')
        
        # Initialize views
        @menuView = new MenuView()
        
        # Import views
        Router = require('routers/Router')

        # Initialize views
        @router = new Router()

        Object.freeze? this
        

module.exports = Application
