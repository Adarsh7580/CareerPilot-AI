const Job = require("../models/Job");
const QUESTION_BANK = require("../utils/interviewQuestions");

exports.generateQuestions = async (req, res) => {
  try {

    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({
        error: "jobId is required"
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        error: "Job not found"
      });
    }

    const questions = [];

    job.skillsRequired.forEach((skill) => {

      const skillQuestions = QUESTION_BANK[skill] || [
        `Explain the fundamentals of ${skill}.`,
        `Where is ${skill} used in real systems?`,
        `What are common challenges when using ${skill}?`
      ];

      questions.push({
        skill,
        questions: skillQuestions
      });

    });

    res.json({
      job: `${job.title} - ${job.company}`,
      questions
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to generate interview questions"
    });

  }
};