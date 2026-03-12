import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Match() {

  const [skills, setSkills] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const findMatches = async () => {
    setLoading(true);

    const skillArray = skills
      .split(",")
      .map(s => s.trim());

    const res = await fetch("http://127.0.0.1:5000/api/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        skills: skillArray
      })
    });

    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="p-8">

        <h1 className="text-2xl font-bold mb-6">
          AI Job Matcher 🤖
        </h1>

        <div className="mb-6 flex gap-4">

          <input
            type="text"
            placeholder="Enter skills (comma separated)"
            className="border p-2 rounded w-full"
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />

          <button
            onClick={findMatches}
            className="bg-purple-600 text-white px-4 rounded"
          >
            Find Jobs
          </button>

        </div>

        {loading && <p>Analyzing profile...</p>}

        <div className="space-y-4">

          {results.map((item, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded shadow"
            >

              <h3 className="text-lg font-semibold">
                {item.job.title} — {item.job.company}
              </h3>

              <p className="text-sm text-gray-500">
                {item.job.location}
              </p>

              <div className="mt-2">

                <div className="w-full bg-gray-200 rounded h-4">

                  <div
                    className="bg-green-500 h-4 rounded"
                    style={{ width: `${item.matchPercentage}%` }}
                  ></div>

                </div>

                <p className="mt-1 font-semibold">
                  Match: {item.matchPercentage}%
                </p>

              </div>

              {item.missingSkills.length > 0 && (
                <p className="mt-2 text-sm text-red-500">
                  Missing skills: {item.missingSkills.join(", ")}
                </p>
              )}

            </div>

          ))}

        </div>

      </div>
    </MainLayout>
  );
}
