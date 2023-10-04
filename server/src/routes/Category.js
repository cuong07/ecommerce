const express = require("express");
const CategoryControllers = require("../controllers/CategoryControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.put(
  "/category",
  auth.verifyTokenAndAdminAuth,
  CategoryControllers.updateCategory
);
router.post(
  "/category",
  auth.verifyTokenAndAdminAuth,
  CategoryControllers.createCategory
);
router.get("/category/:id", CategoryControllers.getCategoryById);
router.get("/category", CategoryControllers.getCategoryWithProductCount);
router.delete(
  "/category",
  auth.verifyTokenAndAdminAuth,
  CategoryControllers.deleteCategory
);

module.exports = router;
