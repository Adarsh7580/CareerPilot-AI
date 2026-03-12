const Job = require("../models/Job");

// ---------------- CREATE JOB ----------------

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------------- GET JOBS (SEARCH + FILTER + PAGINATION + SORTING) ----------------

exports.getJobs = async (req, res) => {
  try {
    const {
      search,
      location,
      skill,
      page = 1,
      limit = 4,
      sortBy = "createdAt",
      order = "desc"
    } = req.query;

    let query = {};

    // 🔍 Search by title or company
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } }
      ];
    }

    // 📍 Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // 🧠 Skill filter (case-insensitive)
    if (skill) {
      query.skillsRequired = {
        $elemMatch: { $regex: skill, $options: "i" }
      };
    }

    // 📄 Pagination logic
    const skip = (page - 1) * limit;

    // 📊 Sorting logic
    const sortOptions = {};
    if (sortBy === "salary") {
    sortOptions.minSalary = order === "asc" ? 1 : -1;
    } else {
    sortOptions.createdAt = order === "asc" ? 1 : -1;
    }


    // 📦 Total count
    const totalJobs = await Job.countDocuments(query);

    // 📥 Fetch jobs
    const jobs = await Job.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // 📤 Response
    res.json({
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
      jobs
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
