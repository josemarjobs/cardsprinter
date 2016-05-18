'use strict';
const Path = require('path');

function core(server, options, next) {
  // Load Routes
  server.route(require('./routes')(options));

  // Configure hapi to use handlebars to render html files
  server.views({
    engines: {
      html: require('handlebars')
    },
    path: Path.join(__dirname, '../views')
  })
  // Core logic
  server.register({
    register: require('./main'),
    options: {
      data: options.data
    }
  }, (error) => {
    if (error) {
      console.log('There was en error loading the main plugin');
    }
  });
  return next();
}

core.attributes = {
  name: 'core',
  dependencies: ['inert', 'vision']
}

module.exports = core;
