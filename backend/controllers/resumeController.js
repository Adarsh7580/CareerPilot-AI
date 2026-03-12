const fs = require("fs");
const pdfParse = require("pdf-parse");

const SKILLS = [
  "Node.js",
  "MongoDB",
  "React",
  "JavaScript",
  "Redis",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Python",
  "Network Security",
  "SIEM",
  "Ethical Hacking",
  "System Design"
];

exports.parseResume = async (req, res) => {

  try {

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text.toLowerCase();

    const detectedSkills = [];

    SKILLS.forEach(skill => {

      if (text.includes(skill.toLowerCase())) {
        detectedSkills.push(skill);
      }

    });

    res.json({
      detectedSkills
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Resume parsing failed"
    });

  }

};