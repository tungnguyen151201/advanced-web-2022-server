const io = require('../createServer');

function disconnectByToken(token) {
  const { sockets } = io.sockets;
  sockets.forEach((socket) => {
    if (socket.handshake.auth.token === token) {
      socket.disconnect(true);
    }
  });
}

module.exports = {
  disconnectByToken,
};
