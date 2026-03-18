import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Roadmap() {
  const { jobId } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState([]);

  const [dailyHours, setDailyHours] = useState(2);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const progressRes = await fetch(
          `https://careerpilot-ai-1-zmdo.onrender.com/api/progress/${user._id}/${jobId}`,
        );

        const progressData = await progressRes.json();
        setCompleted(progressData.completedSkills || []);

        const res = await fetch("https://careerpilot-ai-1-zmdo.onrender.com/api/roadmap", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobId,
            userSkills: ["Node.js", "MongoDB"],
          }),
        });

        const data = await res.json();
        setRoadmapData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load roadmap");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [jobId]);

  if (loading) {
    return (
      <MainLayout>
        <p className="p-8">Loading roadmap...</p>
      </MainLayout>
    );
  }

  if (error || !roadmapData) {
    return (
      <MainLayout>
        <p className="p-8 text-red-500">{error || "Something went wrong"}</p>
      </MainLayout>
    );
  }

  const roadmap = Array.isArray(roadmapData.roadmap) ? roadmapData.roadmap : [];

  const totalSkills = roadmapData.totalSkills || 0;

  const readiness =
    totalSkills > 0 ? Math.round((completed.length / totalSkills) * 100) : 0;

  const remainingSkills = roadmap.filter(
    (skill) => !completed.includes(skill.skill),
  );

  const improvement = remainingSkills.reduce(
    (sum, skill) => sum + (skill.impact || 2),
    0,
  );

  const predictedScore = Math.min(readiness + improvement * 5, 100);

  const totalWeeks = remainingSkills.reduce(
    (sum, skill) => sum + (skill.estimatedTimeWeeks || 0),
    0,
  );

  const totalHours = totalWeeks * 7 * 3;

  const estimatedDays = dailyHours > 0 ? Math.ceil(totalHours / dailyHours) : 0;

  const bestSkill = roadmap.length > 0 ? roadmap[0] : null;

  const skillProgress = roadmap.map((skill) => ({
    ...skill,
    progress: completed.includes(skill.skill) ? 100 : 25,
  }));

  return (
    <MainLayout>
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">
          {roadmapData.job || "Career Roadmap"}
        </h1>

        <p className="text-gray-600 mb-6">
          Missing {roadmapData.missingSkillsCount || 0} out of {totalSkills}{" "}
          skills
        </p>

        {/* Job Readiness Gauge */}
        <div className="flex items-center gap-10 mb-8">
          <div style={{ width: 120 }}>
            <CircularProgressbar
              value={readiness}
              text={`${readiness}%`}
              styles={buildStyles({
                textSize: "18px",
                pathColor:
                  readiness >= 80
                    ? "#16a34a"
                    : readiness >= 50
                      ? "#facc15"
                      : "#ef4444",
                textColor: "#111",
                trailColor: "#e5e7eb",
              })}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold">Job Readiness Score</h2>

            <p className="text-gray-600 text-sm">
              This score represents how prepared you are for this role.
            </p>
          </div>
        </div>

        <p className="text-blue-600 font-semibold mb-6">
          Estimated time to become job-ready: {totalWeeks} weeks
        </p>

        {/* Career Simulator */}
        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded mb-8">
          <h2 className="text-lg font-semibold mb-2">
            Career Readiness Simulator
          </h2>

          <label className="block mb-2 text-sm font-medium">
            Study hours per day
          </label>

          <input
            type="number"
            value={dailyHours}
            min={1}
            onChange={(e) => setDailyHours(Number(e.target.value) || 1)}
            className="border p-2 rounded w-32 mb-3"
          />

          <p className="text-indigo-700 font-semibold">
            Estimated time to become job-ready: {estimatedDays} days
          </p>
        </div>

        {/* Most Valuable Skill */}
        {bestSkill && (
          <div className="bg-yellow-50 border border-yellow-200 p-5 rounded mb-8">
            <h2 className="text-lg font-semibold">
              🔥 Most Valuable Skill to Learn
            </h2>

            <p className="font-medium text-gray-800">{bestSkill.skill}</p>

            <p className="text-sm text-gray-600">
              Impact Score: {bestSkill.impact}
            </p>

            <p className="text-sm text-gray-600">
              Estimated Learning Time: {bestSkill.estimatedTimeWeeks} weeks
            </p>
          </div>
        )}

        {/* Career Predictor */}
        <div className="bg-green-50 border border-green-200 p-6 rounded-xl mb-8">
          <h2 className="text-lg font-semibold mb-2">
            🚀 Career Success Predictor
          </h2>

          <p className="text-gray-700 mb-2">
            If you complete the remaining skills, your readiness could reach:
          </p>

          <p className="text-green-700 font-semibold">{predictedScore}%</p>
        </div>

        {/* Skill Progress Visualization */}
        {roadmap.length > 0 && (
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">
              📊 Skill Progress Visualization
            </h2>

            <div className="space-y-4">
              {skillProgress.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.skill}</span>
                    <span>{skill.progress}%</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Skill Roadmap */}
        <div className="space-y-6">
          {roadmap.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-3">
                <h2
                  className={`text-xl font-semibold ${
                    completed.includes(item.skill)
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {item.skill}
                </h2>

                <span className="px-3 py-1 rounded text-sm bg-gray-100">
                  {item.priority}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">
                Difficulty: <b>{item.difficulty}</b> · Estimated time:{" "}
                <b>{item.estimatedTimeWeeks} weeks</b>
              </p>

              {/* Topics */}
              <div className="mb-3">
                <p className="font-medium mb-1">Topics to learn:</p>

                {Array.isArray(item.topics) && item.topics.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {item.topics.map((topic, i) => (
                      <li key={i}>{topic}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    Topics will be added later.
                  </p>
                )}
              </div>

              {/* Resources */}
              <div>
                <p className="font-medium mb-1">Resources:</p>

                {Array.isArray(item.resources) && item.resources.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {item.resources.map((res, i) => (
                      <li key={i}>
                        <a
                          href={res.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {res.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    Resources coming soon.
                  </p>
                )}
              </div>

              {/* Progress Checkbox */}
              <label className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={completed.includes(item.skill)}
                  onChange={async () => {
                    const updated = completed.includes(item.skill)
                      ? completed.filter((s) => s !== item.skill)
                      : [...completed, item.skill];

                    setCompleted(updated);

                    await fetch("https://careerpilot-ai-1-zmdo.onrender.com/api/progress", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        jobId,
                        skill: item.skill,
                      }),
                    });
                  }}
                />

                <span className="text-sm text-gray-700">Mark as completed</span>
              </label>
            </div>
          ))}
        </div>

        {roadmap.length === 0 && (
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
            🎉 You already have all required skills for this job.
          </div>
        )}
      </div>
    </MainLayout>
  );
}
