const OrderController = require("../../controllers/orderController");
const CustomerController = require("../../controllers/customerController");
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductsByProductKey,
} = require("../../controllers/productController");

exports.routesConfig = function (app) {
  app.post("/orders", [OrderController.createOrder]);
  app.post("/api/syncCustomer/:customerId", [CustomerController.syncCustomer]);
  app.post("/customers", [CustomerController.customers]);
  app.get("/products", getProducts);
  app.get("/products/:key", getProductsByProductKey);

  module.exports = router;
};
