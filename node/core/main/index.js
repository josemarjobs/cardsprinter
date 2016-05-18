'use strict';
const SocketIO = require('socket.io');
const Stomp = require('stomp-client');

function main(server, options, next) {
  const client = new Stomp('localhost', 61613, 'club', 'musichouse');
  const io = SocketIO(server.listener);

  client.connect((sessionId) => {
    console.log("Connected to Apache Apollo ID #" + sessionId);
  });

  io.on('connection', socket => {
    console.log('Connected!');
  })

  return next();
}

main.attributes = {
  name: 'main'
}

module.exports = main;
