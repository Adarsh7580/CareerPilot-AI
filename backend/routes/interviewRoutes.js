const express = require("express");
const router = express.Router();

const { generateQuestions } = require("../controllers/interviewController");

router.post("/questions", generateQuestions);

module.exports = router;