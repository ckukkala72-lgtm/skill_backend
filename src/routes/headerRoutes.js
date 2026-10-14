const express = require("express");
const { getHeader } = require("../controllers/headerController");

const router = express.Router();

router.get("/", getHeader);

module.exports = router;
