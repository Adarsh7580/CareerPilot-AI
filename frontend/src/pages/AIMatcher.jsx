import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function AIMatcher() {

  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState("");

  const handleMatch = () => {

    if (!jobTitle) {
      setResult("Please enter a job role.");
      return;
    }

    setResult(`AI analysis for "${jobTitle}" suggests focusing on:
    
1. System Design
2. Redis
3. PostgreSQL

These skills significantly increase your job readiness.`);

  };

  return (
    <MainLayout>

      <div className="p-8 max-w-3xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          AI Job Skill Matcher
        </h1>

        <input
          type="text"
          placeholder="Enter job role (e.g. Backend Developer)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="border p-3 rounded w-full mb-4"
        />

        <button
          onClick={handleMatch}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Analyze Skills
        </button>

        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded">
            <h2 className="font-semibold mb-2">
              AI Result
            </h2>
            <pre className="whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}

      </div>

    </MainLayout>
  );
}