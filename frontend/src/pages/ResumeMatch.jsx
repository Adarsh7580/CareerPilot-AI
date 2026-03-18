import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function ResumeMatch() {

  const [jobs, setJobs] = useState([]);
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Fetch jobs from backend
  useEffect(() => {

    const fetchJobs = async () => {
      try {

        const res = await fetch("https://careerpilot-ai-1-zmdo.onrender.com/api/jobs");

        if (!res.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await res.json();
        setJobs(data.jobs || []);

      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    };

    fetchJobs();

  }, []);

  const uploadResume = async () => {

    if (!file) {
      setError("Please upload a resume first.");
      return;
    }

    if (!jobId) {
      setError("Please select a job role.");
      return;
    }

    setResult(null);
    setError("");

    try {

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobId", jobId);

      const res = await fetch(
        "https://careerpilot-ai-1-zmdo.onrender.com/api/resume-match/match",
        {
          method: "POST",
          body: formData
        }
      );

      console.log("Status:", res.status);

      // Handle server errors safely
      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        setError("Server error while analyzing resume.");
        return;
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setResult(data);

    } catch (err) {

      console.error("Upload error:", err);
      setError("Failed to analyze resume.");

    }

  };

  return (
    <MainLayout>

      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          Resume Job Match
        </h1>

        {/* Job Selector */}
        <div className="mb-4">

          <label className="block text-sm font-medium mb-1">
            Select Job Role
          </label>

          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="border rounded-lg p-3 w-full"
          >

            <option value="">
              Select a job role
            </option>

            {jobs.map(job => (
              <option key={job._id} value={job._id}>
                {job.title} - {job.company}
              </option>
            ))}

          </select>

        </div>

        {/* Resume Upload */}
        <div className="flex items-center gap-3 mb-4">

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={uploadResume}
            disabled={!file || !jobId}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Analyze Resume
          </button>

        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}

        {/* Result */}
        {result && (

          <div className="mt-6 bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold">
              Match Score: {result.score || 0}%
            </h2>

            <p className="mt-3">
              <b>Matched Skills:</b>{" "}
              {(result.matchedSkills || []).join(", ") || "None"}
            </p>

            <p className="mt-3 text-red-600">
              <b>Missing Skills:</b>{" "}
              {(result.missingSkills || []).join(", ") || "None"}
            </p>

          </div>

        )}

      </div>

    </MainLayout>
  );
}