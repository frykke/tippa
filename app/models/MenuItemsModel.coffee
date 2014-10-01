Collection = require('./supers/Collection')
MenuItemModel = require('./MenuItemModel')
module.exports = class MenuItemsModel extends Collection
	model: MenuItemModel
	initialize: ->
		console.log 'init col'
		console.log @
		@push(new MenuItemModel({url: 'home', text: 'tippa:', itemSelected: true}))
		@push(new MenuItemModel({url: 'events', text: 'Matcher', itemSelected: false}))
		@push(new MenuItemModel({url: 'users', text: 'Användare', itemSelected: false}))
		console.log @