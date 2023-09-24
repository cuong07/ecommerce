const express = require("express");
const ProductControllers = require("../controllers/ProductControllers");
const auth = require("../middleware/auth");
const upload = require("../../multer");
const router = express.Router();

router.post(
  "/product",
  auth.verifyTokenAndAdminAuth,
  upload.array("image"),
  ProductControllers.createProduct
);
router.put(
  "/product",
  auth.verifyTokenAndAdminAuth,
  upload.array("image[]"),
  ProductControllers.updateProduct
);
router.put(
  "/product/update-image",
  auth.verifyTokenAndAdminAuth,
  ProductControllers.updateImageProduct
);
router.delete(
  "/product/:id",
  auth.verifyTokenAndAdminAuth,
  ProductControllers.deleteProduct
);

router.get("/product", auth.verifyToken, ProductControllers.getProduct);

router.get("/search", auth.verifyToken, ProductControllers.findProductByName);
router.get(
  "/product/category",
  auth.verifyToken,
  ProductControllers.findProductByCategory
);
router.get(
  "/product/:id",
  auth.verifyToken,
  ProductControllers.findProductById
);

module.exports = router;
