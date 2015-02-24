var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	templatePath = path.normalize(__dirname + '/../server/mailer/templates');
var notifier = {
		service: 'postmark',
		APN: false,
		email: false,
		actions: ['comment'],
		tplPath: templatePath,
		key: 'POSTMARK_KEY',
		parseAppId: 'PARSE_APP_ID',
		parseApiKey: 'PARSE_MASTER_KEY'
	};
module.exports = {	//self creates db
		development: {
			db: 'sarapple:S4r4ppl3!.mongolab.com:47901/heroku_app34287904',
			root: rootPath,
			notifier: notifier,
			app: {
				name: 'Nodejs Express Mongoose Chat'
			}
		},
		test: {
			db: 'mongodb://localhost/chat', 
			root: rootPath,
			notifier: notifier,
			app:{
				name: 'Nodejs Express Mongoose Chat'
			}
		},
		production: {}
	};