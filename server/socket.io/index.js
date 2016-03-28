var SocketIo = require('socket.io');
var BookIo = require('./book.io');

function Bootstraper(server) {
  var io = SocketIo(server);

  BookIo(io);

}

module.exports = Bootstraper;