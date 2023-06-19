const OrderController = require("../../controllers/orderController");
const CustomerController = require("../../controllers/customerController");
const express = require("express");
const router = express.Router();
const {
  syncProduct,
  syncAllProducts,
  getProducts,
  getProductsByProductKey,
} = require("../../controllers/productController");

exports.routesConfig = function (app) {
  app.post("/orders", [OrderController.createOrder]);
  app.post("/api/syncCustomer/:customerId", [CustomerController.syncCustomer]);
  app.post("/customers", [CustomerController.customers]);
  router.post("/sync-product/:productId", syncProduct);
  router.post("/sync-all-products", syncAllProducts);
  app.get("/products", getProducts);
  app.get("/products/:key", getProductsByProductKey);

  module.exports = router;
};
