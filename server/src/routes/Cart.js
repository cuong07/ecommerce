const express = require("express");

const CartController = require("../controllers/CartControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/cart", auth.verifyToken, CartController.createCartItem);
router.delete("/cart", auth.verifyToken, CartController.deleteCartItem);
router.get("/cart", auth.verifyToken, CartController.getShoppingSession);

module.exports = router;