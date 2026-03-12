const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");

exports.analyzeResume = async (req, res) => {
  try {

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        error: "Resume file not received"
      });
    }

    const pdfData = await pdfParse(req.file.buffer);

    const text = pdfData.text.toLowerCase();

    const feedback = {
      strengths: [],
      improvements: []
    };

    // Detect technologies
    if (text.includes("react")) {
      feedback.strengths.push("Strong frontend experience with React");
    }

    if (text.includes("node")) {
      feedback.strengths.push("Backend development experience with Node.js");
    }

    if (text.includes("mongodb")) {
      feedback.strengths.push("Experience working with NoSQL databases");
    }

    if (text.includes("docker")) {
      feedback.strengths.push("Containerization experience with Docker");
    }

    // Improvement checks
    if (!text.includes("project")) {
      feedback.improvements.push("Add project experience to demonstrate practical skills");
    }

    if (!text.includes("%") && !text.includes("improved") && !text.includes("increased")) {
      feedback.improvements.push("Add measurable achievements (metrics, percentages, impact)");
    }

    if (!text.includes("system design")) {
      feedback.improvements.push("Include system design knowledge for backend roles");
    }

    if (!text.includes("lead") && !text.includes("managed")) {
      feedback.improvements.push("Highlight leadership or collaboration experience");
    }

    res.json({
      feedback
    });

  } catch (error) {

    console.error("RESUME FEEDBACK ERROR:", error);

    res.status(500).json({
      error: "Failed to analyze resume"
    });

  }
};