// routes.js
const express = require('express');
const routes = express()

const serviceController = require('../controllers/service.controller');
const transactionController = require('../controllers/transaction.controller');
const authJWT = require('../middleware/authJwt');

routes.use(authJWT)
// services routes
routes.post('/services', serviceController.createService);
routes.get('/services', serviceController.getAllServices);
routes.get('/services/:id', serviceController.getServiceById);
routes.put('/services/:id', serviceController.updateService);
routes.delete('/services/:id', serviceController.deleteService);

// transaction routes
routes.post('/transaction', transactionController.createTransaction)
routes.get('/transaction', transactionController.getAllTrasaction)
routes.get('/transaction/:id', transactionController.getTransactionById)
routes.put('/transaction/:id', transactionController.updateTransaction)
routes.delete('/transaction/:id', transactionController.deleteTransaction)


module.exports = routes;
