const express = require("express");
const { getJobReadyPage } = require("../controllers/jobReadyController");

const router = express.Router();

router.get("/", getJobReadyPage);

module.exports = router;
