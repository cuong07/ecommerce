const express = require("express");
const DatasetController = require("../controllers/Dataset");
const auth = require("../middleware/auth");
const router = express.Router();

router.get(
  "/dataset",
  auth.verifyToken,
  DatasetController.getOrderDetailsForChart
);
router.get(
  "/dataset/category",
  auth.verifyTokenAndAdminAuth,
  DatasetController.getCountProductByCategoryForChart
);

router.get(
  "/dataset/sold-most-product",
  auth.verifyTokenAndAdminAuth,
  DatasetController.getMostSoldProduct
);
module.exports = router;
