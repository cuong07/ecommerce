const express = require('express');
const PaymentControllers = require("../controllers/PaymentControllers")
const auth = require("../middleware/auth")
const routes = express.Router();

routes.post("/payment", auth.verifyToken, PaymentControllers.createUserPayment)
routes.delete("/payment/:paymentId", auth.verifyToken, PaymentControllers.deletePayment)

module.exports = routes;