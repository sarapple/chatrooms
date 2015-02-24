var chats 	= require('./../server/controllers/chats.js');
module.exports = function Routes(app, io){
	// usernames which are currently connected to the chat
	var usernames = {},
		rooms = ['oct','jan','feb'];

	// when the client connects, this listens and executes
	io.sockets.on('connection', function(socket){
		
		// user clicked join and passed validations
		socket.on('add_user', function(info){
			socket.username 	= info.username;
			socket.room 		= 'oct';
			usernames[info.username] = info.username;
			socket.join('oct');
			// socket.emit('update_chat', 'you have connected to OCT Cohort');
			// socket.broadcast.to('oct').emit('update_chat', info.username + 'has connected to this room');
			socket.emit('update_rooms', rooms, 'oct');
		});

		// user sent a message
		socket.on('send_chat', function(data){
			var date = new Date();
			var chatPacket = { username: socket.username, room: socket.room, message: data, date: date };
			console.log(chatPacket);
			chats.create(chatPacket);
			io.to(socket.room).emit('update_chat', chatPacket);
		});

		// user has switched to a new room
		socket.on('switch_room', function(newroom){
			socket.leave(socket.room);
			socket.join(newroom);
			// socket.emit('update_chat', 'you have connected to '+ newroom);
			// sent message to OLD room
			// socket.broadcast.to(socket.room).emit('update_chat', socket.username+' has left this room');
			// update socket session room title
			socket.room = newroom;
			// socket.broadcast.to(newroom).emit('update_chat', socket.username+' has joined this room');
		});

		// when the user disconnects.. perform this
		socket.on('disconnect', function(){
			// remove the username from global usernames list
			delete usernames[socket.username];
			// update list of users in chat, client-side
			io.sockets.emit('updateusers', usernames);
			// echo globally that this client has left
			socket.broadcast.emit('updatechat', socket.username + ' has disconnected');
			socket.leave(socket.room);
		});
	});	
	// io.sockets.on('connection', function (socket) {
	//   	// Broadcast to everyone but the client who initiated
	//   	socket.broadcast.emit("my_broadcast_event");
	//   	console.log("WE ARE USING SOCKETS!");
	//   	console.log(socket.id);
	//   	//all the socket code goes in here!
	// 	socket.on("button_clicked", function (data){
	// 	    console.log('Someone clicked a button!  Reason: ' + data.reason);
	// 	    // Send to the original client
	// 	    socket.emit('server_response', {response: "sockets are the best!"});
	// 	});
	// 	io.emit('all_people', {response: "secret packet"});
	// 	// EMITTING TO EVERYBODY, including original client
	// 	// io.emit('all_people', {response: "secret packet"})
	// 	// EMIT TO ALL NOT including original client
	// 	// socket.broadcast.emit("my_broadcast_event");
	// 	// Send to the ORIGINAL CLIENT
	// 	// socket.emit('server_response', {response: "sockets are the best!"});
	// });
}