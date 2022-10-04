const expres = require('express');

const { UsersController } = require('./controller');

const router = expres.Router();

module.exports.UsersAPI = (app) => {
    router
        .get('/', UsersController.getUsers) //http://localhost:3000/api/users/
        .get('/:id', UsersController.getUsers) //http://localhost:3000/api/users/23
        .post('/', UsersController.createUser)
        .post('/update/:id', UsersController.updateUser)
        .delete('/delete/:id', UsersController.deleteUser);

    app.use('/api/users', router);
};