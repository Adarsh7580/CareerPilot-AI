const Job = require("../models/Job");
const SKILL_META = require("../utils/skillMetadata");

// DEFAULT fallback meta
const DEFAULT_META = {
  priority: "Medium",
  impact: 2,
  difficulty: "Medium",
  weeks: 2,
  topics: [],
  resources: [],
  reason: "Required for this role"
};

exports.generateRoadmap = async (req, res) => {
  try {
    const { jobId, userSkills = [] } = req.body;

    if (!jobId) {
      return res.status(400).json({ error: "jobId is required" });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const normalize = (s) => s.toLowerCase().trim();
    const userSkillSet = userSkills.map(normalize);

    const roadmap = [];

    job.skillsRequired.forEach((skill) => {

      if (!userSkillSet.includes(normalize(skill))) {

        // ⭐ FIXED: case-insensitive metadata lookup
        const metaKey = Object.keys(SKILL_META).find(
          (k) => k.toLowerCase() === skill.toLowerCase()
        );

        const meta = {
          ...DEFAULT_META,
          ...(SKILL_META[metaKey] || {})
        };

        // ⭐ learning score calculation
        const learningScore = meta.impact / meta.weeks;

        roadmap.push({
          skill,
          priority: meta.priority,
          impact: meta.impact,
          difficulty: meta.difficulty,
          estimatedTimeWeeks: meta.weeks,
          learningScore,
          topics: Array.isArray(meta.topics) ? meta.topics : [],
          resources: Array.isArray(meta.resources) ? meta.resources : [],
          reason: meta.reason
        });
      }
    });

    // ⭐ sort by learning efficiency
    roadmap.sort((a, b) => b.learningScore - a.learningScore);

    const recommendedSkill =
      roadmap.length > 0 ? roadmap[0] : null;

    return res.json({
      job: `${job.title} - ${job.company}`,
      totalSkills: job.skillsRequired.length,
      missingSkillsCount: roadmap.length,
      recommendedSkill,
      roadmap
    });

  } catch (err) {

    console.error("ROADMAP ERROR:", err);

    return res.status(500).json({
      error: "Failed to generate roadmap"
    });

  }
};