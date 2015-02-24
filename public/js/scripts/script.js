$( document ).ready(function(){
    $('#im').submit(function(){
    	var post = $('.post').val();
		socket.emit('send_chat', post);
		return false;
	});
	setHeight = function(){
		$('#chat').css('height', '95vh');
	};
	updateScroll = function(){
		$("#chat").animate({ scrollTop: $('#chat')[0].scrollHeight}, 1000);
	};
	userJoinedView = function(data) {
		$('#me-container').html(
			'<div id="me-container">' +
		    '<div id="me-img">' +
		        '<img src="img/logo.gif">' +
		    '</div>' +
		    '<div id="me">' +
		        '<p>'+ data.username +'</p>' +
		        '<p>o Online</p>' +
		    '</div>'
		);
	};
	getPerson = function(){
    	var person = $('.person').val();
    	return person;		
	}
});