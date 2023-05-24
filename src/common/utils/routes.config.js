const OrderController = require('../../controllers/orderController');
const CustomerController = require('../../controllers/customerController');


exports.routesConfig = function (app) {
    app.post('/orders', [
        OrderController.createOrder
    ]);
    app.post('/api/syncCustomer/:customerId', [
        CustomerController.syncCustomer
    ]);
    app.post('/customers', [
        CustomerController.customers
    ]);
};
