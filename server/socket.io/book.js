module.exports = function(io) {
  var bookIo = io.of('/book');

  bookIo.on('connection', function(socket) {
    socket.on('booked', function (id) {
      socket.broadcast.emit('decrement_available_count', id);
    });
  });
};