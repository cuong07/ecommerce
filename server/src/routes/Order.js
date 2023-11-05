const express = require("express");
const OrderControllers = require("../controllers/OrderContollrers");
const auth = require("../middleware/auth");
const routes = express.Router();

routes.post("/order", auth.verifyToken, OrderControllers.createOrder);
routes.get(
  "/order/all-order",
  auth.verifyTokenAndAdminAuth,
  OrderControllers.getAllOrder
);

module.exports = routes;
