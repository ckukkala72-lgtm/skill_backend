const express = require("express");
const { getCareerPaths } = require("../controllers/careerPathController");

const router = express.Router();

router.get("/", getCareerPaths);

module.exports = router;
