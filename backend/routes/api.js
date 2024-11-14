const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { initiateMpesaPush } = require("../controllers/paymentController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/payment", initiateMpesaPush);

module.exports = router;