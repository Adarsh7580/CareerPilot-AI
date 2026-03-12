const Job = require("../models/Job");

const ROLE_WEIGHTS = {
  "Backend Engineer": {
    "Node.js": 3,
    "MongoDB": 2,
    "System Design": 5,
    "Redis": 2
  },
  "Full Stack Developer": {
    "React": 3,
    "Node.js": 3,
    "MongoDB": 2,
    "Express": 2
  },
  "Frontend Developer": {
    "React": 4,
    "JavaScript": 3,
    "Tailwind": 2
  }
};

const normalize = s => s.toLowerCase().trim();

exports.matchJobs = async (req, res) => {
  try {
    const { skills = [] } = req.body;

    const userSkills = skills.map(normalize);

    const jobs = await Job.find();

    const results = jobs.map(job => {
      let totalWeight = 0;
      let matchedWeight = 0;

      const matchedSkills = [];
      const missingSkills = [];

      job.skillsRequired.forEach(skill => {
        const weight =
          ROLE_WEIGHTS[job.title]?.[skill] || 1;

        totalWeight += weight;

        if (userSkills.includes(normalize(skill))) {
          matchedWeight += weight;
          matchedSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      });

      const matchPercentage = Math.round(
        (matchedWeight / totalWeight) * 100
      );

      let confidence = "Low";
      if (matchPercentage >= 80) confidence = "High";
      else if (matchPercentage >= 50) confidence = "Medium";

      return {
        job,
        matchPercentage,
        confidence,
        matchedSkills,
        missingSkills
      };
    });

    // ✅ SORT AFTER map() COMPLETES
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(results);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
