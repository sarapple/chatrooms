//SUMMARY: Define the schema for this model, and add validations for the model.

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});
// UserSchema.path('username').required(true, 'Username cannot be blank');
// UserSchema.path('password').required(true, 'Password cannot be blank');

mongoose.model('User', UserSchema); 
// Set name as Storage, and routes.js calls on this name and creates the model.
// Make StorageSchema a model and call upon it by the name Storage.
