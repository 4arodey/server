const commentsService = require('../services/comments/comments.service');

module.exports = function (server) {

  const io = require('socket.io').listen(server);

  io.on('connection', (socket) => {
    socket.on('comment', (data) => {
      console.log(1);
      commentsService.create(data)
        .then(() => {
          io.emit('comment', data);
        })
    });
  });
}
