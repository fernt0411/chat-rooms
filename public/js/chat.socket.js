var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function() {
    socket.emit('connectChat', user, function(res) {
        console.log('users', res);
        renderUsers(res);
    });

});


socket.on('sendMessageFromAdmin', function(message) {

    console.log(message);
    renderMessages(message, false);
    scrollBottom();
});

socket.on('allUsers', function(users) {
    renderUsers(users);
    //  console.log(users);

});

socket.on('sendMessage', function(message) {
    renderMessages(message, false);
    scrollBottom();
    // console.log(message);

});


socket.on('privateMessage', function(message) {

    console.log(message);
})