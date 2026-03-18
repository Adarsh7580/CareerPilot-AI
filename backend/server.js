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
app.use("/api/resume", resumeRoutes);
app.use("/api/resume-match", resumeMatchRoutes);

// AI features
app.use("/api/ai", aiAdvisorRoutes);
app.use("/api/interview", interviewRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("CareerPilot AI Backend Running 🚀");
});

// ✅ FIXED MongoDB connection (ATLAS)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});