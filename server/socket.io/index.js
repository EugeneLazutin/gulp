var SocketIo = require('socket.io');
var BookIo = require('./book.js');

function Bootstraper(server) {
  var io = SocketIo(server);

  BookIo(io);

  global._io = io;

}

module.exports = Bootstraper;