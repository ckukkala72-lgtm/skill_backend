const express = require("express");
const { getAboutPage } = require("../controllers/aboutController");

const router = express.Router();

router.get("/", getAboutPage);

module.exports = router;
