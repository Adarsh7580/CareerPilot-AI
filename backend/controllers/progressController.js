const Progress = require("../models/Progress");

exports.updateProgress = async (req, res) => {
  try {

    const { userId, jobId, skill } = req.body;

    let progress = await Progress.findOne({ userId, jobId });

    if (!progress) {

      progress = await Progress.create({
        userId,
        jobId,
        completedSkills: [skill]
      });

    } else if (!progress.completedSkills.includes(skill)) {

      progress.completedSkills.push(skill);
      await progress.save();

    }

    res.json(progress);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};


exports.getProgress = async (req, res) => {
  try {

    const { userId, jobId } = req.params;

    const progress = await Progress.findOne({ userId, jobId });

    res.json(progress || { completedSkills: [] });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};