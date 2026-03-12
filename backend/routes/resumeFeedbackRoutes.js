const express = require("express");
const multer = require("multer");

const router = express.Router();

const { analyzeResume } = require("../controllers/resumeFeedbackController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/review", upload.single("resume"), analyzeResume);

module.exports = router;