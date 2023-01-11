const chat = require('./chat');
const error = require('./error');
const connection = require('./connection');

module.exports = {
  chatHandlers: chat,
  errorHandlers: error,
  connectionHandlers: connection,
};
