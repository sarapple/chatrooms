//SUMMARY: Define the schema for this model, and add validations for the model.

var mongoose = require('mongoose');
var Chat = new mongoose.Schema({
	room:    		String,
	username: 		String,
	message: 		String,
	date: 			{ type: Date, default: Date.now }
});
Chat.path('message').required(true, 'Message cannot be blank');
Chat.path('room').required(true, 'Room cannot be blank');
Chat.path('username').required(true, 'Username cannot be blank');

mongoose.model('Chat', Chat); 
// Set name as Storage, and routes.js calls on this name and creates the model.
// Make StorageSchema a model and call upon it by the name Storage.
