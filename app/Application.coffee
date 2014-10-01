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
        
        MenuView = require('views/react/MenuView')
        MenuItemsModel = require('models/MenuItemsModel')
        # Initialize views
        React.renderComponent((MenuView ({collection:new MenuItemsModel()})), $('#menu-container').get(0))
    
        
        # Import views
        Router = require('routers/Router')

        # Initialize views
        @router = new Router()

        Object.freeze? this
        

module.exports = Application
