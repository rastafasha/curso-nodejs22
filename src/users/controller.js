const createError = require('http-errors');

const debug = require('debug')('app:module-users-controller');

const { UsersService } = require('./services');

const { Response } = require('../common/response');

module.exports.UsersController = {
    getUsers: async(req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, 'Lista de Usuarios', users);

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getUser: async(req, res) => {
        try {
            const { params: { id } } = req;
            let user = await UsersService.getById(id);

            if (!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario id: ${id}`, user);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    createUser: async(req, res) => {
        try {
            const { body } = req;

            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await UsersService.create(body);
                Response.success(res, 201, 'Usuario Agregado', insertedId);

            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },


    updateUser: async(req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const userUpdated = await UsersService.updateU(id, body);
                if (!userUpdated) {
                    Response.error(res, new createError.NotFound());
                } else {
                    Response.success(res, 200, 'Usuario Actualizado', userUpdated);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    deleteUser: async(req, res) => {
        try {
            const { params: { id } } = req;
            const userDeleted = await UsersService.deleteU(id);
            if (userDeleted === 0) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, 'Usuario Eliminado', userDeleted);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};