const socket = io.connect("http://localhost:5001/");

$('#lobbyForm').submit(function(e) {
    socket.emit('join_room', {
        username: 
    })
})