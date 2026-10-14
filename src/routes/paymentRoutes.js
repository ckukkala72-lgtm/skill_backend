const express = require("express");
const {
  getPayments,
  postPayment,
  patchPayment,
} = require("../controllers/paymentController");

const router = express.Router();

router.get("/", getPayments);
router.post("/", postPayment);
router.patch("/:id", patchPayment);

module.exports = router;
