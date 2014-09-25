Model = require('./Model')
module.exports = class GoogleDocsModel extends Model

	docUrl: ''

	success: (data, tabletop) =>
		console.log 'success'
		console.log data
		console.log tabletop
		
		@set(@idAttribute,tabletop.sheets(@idAttribute).elements)
		console.log @
		
	initialize: =>
		console.log @docUrl
		Tabletop.init({key: @docUrl, callback: @success, simpleSheet: false})
	
	idAttribute: 'Blad1'
	