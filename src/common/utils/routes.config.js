// const CartController = require('../../controllers/cartController');
const OrderController = require('../../controllers/orderController');
const CustomerController = require('../../controllers/customerController');
const ProductController = require('../../controllers/productController');

exports.routesConfig = function (app) {
    app.post('/api/createCartForBuyer/:customerId', [
        CartController.createCartForBuyer
    ]);
};

exports.routesConfig = function (app) {
    app.post('/api/createOrder', [
        OrderController.createOrder
    ]);
};

exports.routesConfig = function (app) {
    app.post('/api/syncCustomer/:customerId', [
        CustomerController.syncCustomer
    ]);
};

exports.routesConfig = function (app) {
    app.get('/api/syncProduct/', [
        ProductController.syncProduct
    ]);
};
