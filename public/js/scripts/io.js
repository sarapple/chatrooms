var socket = io.connect();
userJoined = function(info){
	console.log(info);
	userJoinedView(info);
	socket.emit("add_user", info);
};
// socket.on('update_chat', function (data){
// 	console.log('The server says: ' + data);
// });