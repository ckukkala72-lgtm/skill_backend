const express = require("express");
const { getProjectPage } = require("../controllers/projectController");

const router = express.Router();

router.get("/", getProjectPage);

module.exports = router;
