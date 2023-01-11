module.exports = async (socket) => {
  socket.on('error', (error) => {
    console.log(error.message);
    socket.emit('handle-error', error.message);
    socket.disconnect(true);
  });
};
