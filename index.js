#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('./app');
const port = 5002;
const http = require('http');
var https = require('https');

// const server = http.createServer(app);
const httpsServer = https.createServer(app);

// server.listen(8080);
httpsServer.listen(port);
// server.on('error', onError);
httpsServer.on('listening', onListening);

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

function onListening() {
  const addr = httpsServer.address();
  console.log('Listening on localhost:' + addr.port);
}
