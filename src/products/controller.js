const createError = require('http-errors');

const debug = require('debug')('app:module-products-controller');

const { ProductsService } = require('./services');

const { Response } = require('../common/response');

module.exports.ProductsController = {
    getProducts: async(req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'Lista de Productos', products);

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProduct: async(req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductsService.getById(id);

            if (!product) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Producto id: ${id}`, product);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    createProduct: async(req, res) => {
        try {
            const { body } = req;

            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const insertedId = await ProductsService.create(body);
                Response.success(res, 201, 'Producto Agregado', insertedId);

            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    generateReport: async(req, res) => {
        try {
            ProductsService.generateReport('inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    updateProduct: async(req, res) => {
        try {
            const { params: { id } } = req;
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                const productUpdated = await ProductsService.updateP(id, body);
                if (!productUpdated) {
                    Response.error(res, new createError.NotFound());
                } else {
                    Response.success(res, 200, 'Producto Actualizado', productUpdated);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },

    deleteProduct: async(req, res) => {
        try {
            const { params: { id } } = req;
            const productDeleted = await ProductsService.deleteP(id);
            if (productDeleted === 0) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, 'Producto Eliminado', productDeleted);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};