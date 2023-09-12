const express = require("express");
const authControllers = require("../controllers/auth");
const auth = require("../middleware/auth");
const upload = require("../../multer");
const router = express.Router();

router.post("/register", upload.single("image"), authControllers.register);
router.post("/login", authControllers.login);

module.exports = router;
