// set up factory with data, call it Storage
App.factory('appStorage', function($http){
	var factory 	= 	{};
	var messages 	= 	{};
	// login or register
	factory.join = function(info, callback){
		$http.post('/users', info).success(function(output){	
			callback(output);
		});
	};

	// Get chat history by room number
	factory.getHistory = function(room, callback){
		$http.get('/chats/'+room).success(function(output){	
			callback(output);
			messages = output;
		});
	};

	// Add to chat history
	factory.sendChat = function(post,callback){
		console.log(room);
	};

	// Get User when view is initialized
	factory.getUser = function(callback){
		$http.get('/users').success(function(output){
			callback(output);
		});		
	};

	return factory;
});