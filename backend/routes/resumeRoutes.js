const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const SKILLS = [
  "Node.js",
  "React",
  "MongoDB",
  "Express",
  "Docker",
  "AWS",
  "System Design",
  "Redis",
  "PostgreSQL",
  "Python",
  "Network Security",
  "SIEM",
  "Ethical Hacking"
];

router.post("/extract-skills", upload.single("resume"), async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        error: "No resume uploaded"
      });
    }

    const data = await pdfParse(req.file.buffer);

    const text = data.text.toLowerCase();

    const extractedSkills = SKILLS.filter(skill =>
      text.includes(skill.toLowerCase())
    );

    res.json({
      skills: extractedSkills
    });

  } catch (error) {

    console.error("RESUME PARSE ERROR:", error);

    res.status(500).json({
      error: "Failed to extract skills"
    });

  }
});

module.exports = router;