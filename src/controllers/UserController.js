const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((lastUser, currentUser) => {
      if (order === 'desc') {
        return lastUser.id < currentUser.id ? 1 : -1;
      } else {
        return lastUser.id > currentUser.id ? 1 : -1;
      }
    });

    response.send(200, sortedUsers);
  },
  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find(user => user.id === Number(id));

    if (user) {
      return response.send(200, user);
    }

    response.send(400, { error: 'User not found' });
  },
  createUser(request, response) {
    const { body } = request;

    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);
    response.send(200, { message: 'User successfully created' });
  },
  updateUser(request, response) {
    const id = Number(request.params.id);
    const { name } = request.body;

    const usersExists = users.find((user) => user.id === id);

    if (usersExists) {
      users.forEach((user) => {
        if (user.id === id) {
          user.name = name;
        }
      });

      return response.send(200, { message: 'User successfully updated' });
    }

    response.send(400, { message: 'User not found' });
  },
  deleteUser(request, response) {
    const id = Number(request.params.id);

    const usersExists = users.find((user) => user.id === id);

    if (usersExists) {
      users.forEach((user, index) => {
        if (user.id === id) {
          users.splice(index, 1);
        }
      });

      return response.send(200, { message: 'User successfully deleted' });
    }

    response.send(400, { message: 'User not found' });
  },
}