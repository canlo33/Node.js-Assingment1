var myserver_name = 'CanLo'
var portno = 8000;
var hostno = '127.0.0.1';


var restify = require('restify')

  // Get a persistence engine for the users
  , usersSave = require('save')('users')

  // Create the restify server
  , server = restify.createServer({ name: myserver_name})

  server.listen(portno, hostno, function () {
  console.log('Server %s listening at %s', server.name, server.url)
  console.log('Resources:')
  console.log(' /users')
  console.log(' /users/:id')  
})

