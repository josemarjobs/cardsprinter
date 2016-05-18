'use strict';
require('dotenv').load();
const Hapi = require('hapi');
const server = new Hapi.Server();

server.connection({
  port: process.env.port || 3000
});

server.register([{
  register: require('inert')
},{
  register: require('vision')
},{
  register: require('./core'),
  options: {
    data: require('../data/studentData.json')
  }
}], error => {
  if (error) {
    console.log('Error: ', error);
  } else {
    server.start(() => {
      console.log("Hapi server running at: " + server.info.uri);
    })
  }
})
