var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running")

var socket = require('socket.io');

var io = socket(server);

var leftId;
var rightId;

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	socket.join('room1');
	if (leftId==null) {
		leftId = socket.id;
    	console.log('left player: ' + leftId);
    	socket.emit('side', 'left');
    }
    else {
    	rightId = socket.id;
    	console.log('right player: ' + rightId);
    	socket.emit('side', 'right');
    	data = {
    		x: 500,
    		y: 500,
    		vy: 2,
    		vx: 10
    	};
    	//io.sockets.emit('start', data);
    	io.to('room1').emit('start', data);
    }

    socket.on('disconnect', function(){
    	console.log('user ' + socket.id + ' disconnected');
    });

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        //console.log(data);
    }
}