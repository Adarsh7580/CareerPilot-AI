const Job = require("../models/Job");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");

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

exports.matchResume = async (req, res) => {
  try {

    const { jobId } = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        error: "Resume file not received"
      });
    }

    if (!jobId || !mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({
        error: "Invalid job selected"
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        error: "Job not found"
      });
    }

    // Parse PDF (ONLY ONCE)
    const pdfData = await pdfParse(req.file.buffer);

    if (!pdfData.text) {
      return res.status(400).json({
        error: "Could not extract text from resume"
      });
    }

    const text = pdfData.text.toLowerCase();

    const detectedSkills = SKILLS.filter(skill =>
      text.includes(skill.toLowerCase())
    );

    const requiredSkills = job.skillsRequired || [];

    const matchedSkills = requiredSkills.filter(skill =>
      detectedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(skill =>
      !detectedSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
    );

    const score = requiredSkills.length
      ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
      : 0;

    res.json({
      job: `${job.title} - ${job.company}`,
      score,
      detectedSkills,
      matchedSkills,
      missingSkills
    });

  } catch (error) {

    console.error("RESUME MATCH ERROR:", error);

    res.status(500).json({
      error: "Failed to analyze resume"
    });

  }
};