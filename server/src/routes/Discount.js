const express = require('express');
const DiscountControllers = require('../controllers/DiscountControllers');
const auth = require('../middleware/auth');
const router = express.Router();

router.post("/discount",  DiscountControllers.createDiscount);
router.put("/discount",  DiscountControllers.updateDiscount);
router.get("/discount",  DiscountControllers.getDiscount);
router.delete("/discount",  DiscountControllers.deleteDiscount);

module.exports = router;