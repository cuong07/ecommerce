const express = require('express');
const OrderControllers = require("../controllers/OrderContollrers");
const auth = require('../middleware/auth');
const routes = express.Router();

routes.post("/order", auth.verifyToken, OrderControllers.createOrder);

module.exports = routes;