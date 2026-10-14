const express = require("express");
const {
  getAttendance,
  postAttendance,
} = require("../controllers/attendanceController");

const router = express.Router();

router.get("/", getAttendance);
router.post("/", postAttendance);

module.exports = router;
