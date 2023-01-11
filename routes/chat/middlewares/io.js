const { Verifytoken } = require('../../../middleware/auth');

module.exports = async (socket, next) => {
  try {
    // console.log(socket);
    const { token } = socket.handshake.auth;
    // console.log(token);
    const verifyResult = await Verifytoken(token);
    if (!verifyResult) {
      next(new Error('Invalid Credentials!'));
      return;
    }
    socket.signature = verifyResult;

    next();
  } catch (error) {
    console.log('server middleware error:', error);
    next(error);
  }
};
