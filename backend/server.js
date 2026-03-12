require("dotenv").config();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const matchRoutes = require("./routes/matchRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const progressRoutes = require("./routes/progressRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const resumeMatchRoutes = require("./routes/resumeMatchRoutes");
const aiAdvisorRoutes = require("./routes/aiAdvisorRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
const resumeFeedbackRoutes = require("./routes/resumeFeedbackRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/resume-feedback", resumeFeedbackRoutes);


// Resume features
app.use("/api/resume", resumeRoutes);          // skill extraction
app.use("/api/resume-match", resumeMatchRoutes); // ATS matching

// AI features
app.use("/api/ai", aiAdvisorRoutes);
app.use("/api/interview", interviewRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("CareerPilot AI Backend Running 🚀");
});

// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/careerpilot")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});