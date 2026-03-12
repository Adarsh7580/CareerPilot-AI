const express = require("express");
const multer = require("multer");


const router = express.Router();

const { matchResume } = require("../controllers/resumeMatchController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/match", upload.single("resume"), matchResume);

module.exports = router;