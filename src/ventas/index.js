const express = require('express');

const { SalesController } = require('./controller');

const router = express.Router()

module.exports.SalesAPI = (app) => {
    router
        .get('/', SalesController.getSales)
        .post('/', SalesController.createSale)
        .post('/delete/:id', SalesController.deleteSale)
        .post('/update/:id', SalesController.updateSale)
        .get('/:id', SalesController.getSale);

    app.use('/api/sales', router);
}