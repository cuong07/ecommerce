const express = require("express");
const CategoryControllers = require("../controllers/CategoryControllers");
const auth = require("../middleware/auth");
const router = express.Router();

router.put("/category", CategoryControllers.updateCategory);
router.post("/category", CategoryControllers.createCategory);
router.get("/category", CategoryControllers.getCategory);
router.delete("/category", CategoryControllers.deleteCategory);

module.exports = router;
