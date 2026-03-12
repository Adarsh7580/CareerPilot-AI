const express = require("express");
const router = express.Router();
const {
  updateProgress,
  getProgress
} = require("../controllers/progressController");

router.post("/", updateProgress);
router.get("/:userId/:jobId", getProgress);

module.exports = router;
