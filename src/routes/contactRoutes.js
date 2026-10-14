const express = require("express");
const {
  getContactPage,
  postEnquiry,
} = require("../controllers/contactController");

const router = express.Router();

router.get("/", getContactPage);
router.post("/enquiries", postEnquiry);

module.exports = router;
