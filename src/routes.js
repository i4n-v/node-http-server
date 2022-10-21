const UserController = require('./controllers/UserController');

module.exports = [
  { endPoint: '/users', method: 'GET', handler: UserController.listUsers },
  { endPoint: '/users/:id', method: 'GET', handler: UserController.getUserById },
  { endPoint: '/users', method: 'POST', handler: UserController.createUser },
  { endPoint: '/users/:id', method: 'PUT', handler: UserController.updateUser },
  { endPoint: '/users/:id', method: 'DELETE', handler: UserController.deleteUser },
  {
    endPoint: '/', method: 'GET', handler: (request, response) => {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('Hello World');
    }
  },
]