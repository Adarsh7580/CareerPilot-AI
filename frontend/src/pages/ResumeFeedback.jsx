import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function ResumeFeedback() {

  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState("");

  const analyzeResume = async () => {

    if (!file) {
      setError("Please upload a resume.");
      return;
    }

    setError("");
    setFeedback(null);

    try {

      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(
        "http://localhost:5000/api/resume-feedback/review",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

      setFeedback(data.feedback);

    } catch (err) {

      console.error(err);
      setError("Failed to analyze resume.");

    }

  };

  return (
    <MainLayout>

      <div className="max-w-3xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          AI Resume Feedback
        </h1>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={analyzeResume}
          className="bg-indigo-600 text-white px-6 py-2 rounded ml-3"
        >
          Analyze Resume
        </button>

        {error && (
          <p className="text-red-500 mt-4">{error}</p>
        )}

        {feedback && (

          <div className="mt-6 bg-white p-6 rounded shadow">

            <h2 className="text-xl font-semibold mb-3">
              Strengths
            </h2>

            <ul className="list-disc list-inside">

              {feedback.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}

            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3">
              Improvements
            </h2>

            <ul className="list-disc list-inside text-red-600">

              {feedback.improvements.map((s, i) => (
                <li key={i}>{s}</li>
              ))}

            </ul>

          </div>

        )}

      </div>

    </MainLayout>
  );
}