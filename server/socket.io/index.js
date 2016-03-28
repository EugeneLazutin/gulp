var SocketIo = require('socket.io');

function Bootstraper(server) {
  var io = SocketIo(server);

  io.on('connection', function(socket){

    socket.on('booked', function (id) {
      var nsp = io.of('/book');
      nsp.broadcast.emit('booked', id);
    });
  });
}

module.exports = Bootstraper;