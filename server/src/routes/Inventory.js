const express = require('express');
const InventoryControllers = require('../controllers/InventoryControllers');
const auth = require('../middleware/auth');
const router = express.Router();

router.post("/inventory",  InventoryControllers.createInventory);
router.put("/inventory",  InventoryControllers.updateInventory);
router.get("/inventory",  InventoryControllers.getInventory);

module.exports = router;