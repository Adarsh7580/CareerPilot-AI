const Job = require("../models/Job");
const SKILL_META = require("../utils/skillMetadata");
const mongoose = require("mongoose");

exports.askCareerAdvisor = async (req, res) => {
  try {

    const { question, jobId } = req.body;

    // If user asks question without selecting job
    if (!jobId) {
      return res.json({
        answer: "Please select a job role first so I can guide you properly."
      });
    }

    // Validate MongoDB ObjectId (THIS FIXES YOUR ERROR)
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.json({
        answer: "Invalid job selected. Please choose a valid job."
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.json({
        answer: "Job not found."
      });
    }

    const skills = job.skillsRequired || [];

    // Rank skills by impact
    const rankedSkills = skills
      .map((skill) => {

        const meta = SKILL_META[skill] || {};

        return {
          skill,
          impact: meta.impact || 2,
          weeks: meta.weeks || 2
        };

      })
      .sort((a, b) => b.impact - a.impact);

    const topSkills = rankedSkills.slice(0, 3);

    const totalWeeks = rankedSkills.reduce(
      (sum, s) => sum + (s.weeks || 2),
      0
    );

    const answer = `
To become a ${job.title} at ${job.company}:

Top skills to focus on:

${topSkills.map((s, i) => `${i + 1}. ${s.skill}`).join("\n")}

Estimated preparation time: ${totalWeeks} weeks.

Focus on high-impact skills first for faster career growth.
`;

    res.json({
      answer
    });

  } catch (error) {

    console.error("AI ADVISOR ERROR:", error);

    res.status(500).json({
      answer: "AI advisor failed to generate response."
    });

  }
};