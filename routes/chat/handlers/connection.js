const jwt = require('jsonwebtoken');

module.exports = async (socket) => {
  // timer check token expired
  // const timer = setInterval(async () => {
  //   try {
  //     const { token } = socket.handshake.auth;
  //     if (!token) {
  //       console.log('can find token');
  //     }
  //     const { exp } = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);

  //     if (Date.now() > exp) {
  //       socket.disconnect(true);
  //     }
  //   } catch (error) {
  //     console.log(
  //       'connectionHandler - timer check token expired error:',
  //       error
  //     );
  //     socket.disconnect(true);
  //   }
  // }, 30 * 1000);

  function onDisconnect() {
    // clearInterval(timer);
  }

  socket.on('disconnect', onDisconnect);
};
