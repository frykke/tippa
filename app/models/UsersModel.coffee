GoogleDocsModel = require('./supers/GoogleDocsModel')
module.exports = class UsersModel extends GoogleDocsModel

	initialize: =>
		@docUrl = 'https://docs.google.com/spreadsheets/d/1UHKVbr2w_bH7-SKywn9EyCeU6hxq8QzhokjQslbQQoc/pubhtml'		
		@idAttribute = 'Users'
		super()
	
	