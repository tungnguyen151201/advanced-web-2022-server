const { Server } = require('socket.io');
const {
  chatHandlers,
  errorHandlers,
  connectionHandlers,
} = require('./handlers');
const { ioMiddlewares } = require('./middlewares');

const io = new Server();

const onConnection = (socket) => {
  // console.log(`User connect:${socket.id}`);
  connectionHandlers(socket);
  chatHandlers(io, socket);
  errorHandlers(socket);
};

io.use(ioMiddlewares);
io.on('connection', onConnection);

module.exports = io;
