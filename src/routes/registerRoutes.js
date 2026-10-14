const express = require("express");
const {
  getRegisterPage,
  postRegistration,
} = require("../controllers/registerController");

const router = express.Router();

router.get("/", getRegisterPage);
router.post("/", postRegistration);

module.exports = router;
