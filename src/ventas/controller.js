const createError = require('http-errors');

const debug = require('debug')('app:module-sales-controller');

const { SalesService } = require('./services');
const { UsersService } = require('../users/services');
const { ProductsService } = require('../products/services');

const { Response } = require('../common/response');

module.exports.SalesController = {

    getSales: async(req, res) => {
        try {
            let sales = await SalesService.getAll();
            Response.success(res, 200, 'Lista de Ventas', sales);

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getSale: async(req, res) => {
        try {
            const { params: { id } } = req;
            let sale = await SalesService.getById(id);

            if (!sale) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Venta id: ${id}`, sale);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },

    createSale: async(req, res) => {
        try {
            const { body } = req

            if (body || Object.keys(body).length > 0) {
                let product = await ProductsService.getById(body.product);
                let user = await UsersService.getById(body.user);

                if (!product || !user || product.stock < body.quantity) {
                    Response.error(
                        res,
                        new createError.BadRequest('User, product not exists or no stock available')
                    )
                } else {
                    const insertedId = await SalesService.create(body);
                    Response.success(res, 201, 'The sale has been created', insertedId);
                }
            } else {
                Response.error(res, new createError.BadRequest('Error, no body data exists'));
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    updateSale: async(req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const ventaUpdated = await SalesService.updateS(id, body);
                if (!ventaUpdated) {
                    Response.error(res, new createError.NotFound());
                } else {
                    Response.success(res, 200, 'Venta Actualizada', ventaUpdated);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    deleteSale: async(req, res) => {
        try {
            const { params: { id } } = req;
            const saleDeleted = await SalesService.deleteS(id);
            if (saleDeleted === 0) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, 'Venta Eliminada', saleDeleted);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
}