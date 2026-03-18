import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function InterviewPrep() {

  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [error, setError] = useState("");

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

  const generateQuestions = async () => {

    if (!jobId) {
      setError("Please select a job role.");
      return;
    }

    setError("");
    setQuestions([]);
    setJobTitle("");

    try {

      const res = await fetch(
        "https://careerpilot-ai-1-zmdo.onrender.com/api/interview/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ jobId })
        }
      );

      // handle API errors safely
      if (!res.ok) {

        const text = await res.text();
        console.error("Server response:", text);

        setError("Failed to generate interview questions.");
        return;
      }

      const data = await res.json();

      setJobTitle(data.job || "");
      setQuestions(data.questions || []);

    } catch (err) {

      console.error("Interview question error:", err);
      setError("Failed to generate questions.");

    }

  };

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          🎯 Interview Preparation
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

        <button
          onClick={generateQuestions}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Generate Questions
        </button>

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}

        {/* Questions */}

        {questions.length > 0 && (

          <div className="mt-8">

            <h2 className="text-xl font-semibold mb-4">
              {jobTitle}
            </h2>

            {questions.map((item, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow mb-6"
              >

                <h3 className="text-lg font-semibold mb-2">
                  {item.skill}
                </h3>

                <ul className="list-disc list-inside">

                  {item.questions.map((q, i) => (
                    <li key={i}>{q}</li>
                  ))}

                </ul>

              </div>

            ))}

          </div>

        )}

      </div>

    </MainLayout>
  );
}