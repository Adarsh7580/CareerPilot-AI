import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function CareerDashboard() {

  const [data, setData] = useState([]);
  const [jobName, setJobName] = useState("");

  useEffect(() => {

    const loadAnalytics = async () => {

      try {

        const user = JSON.parse(localStorage.getItem("user"));

        // fetch jobs
        const jobsRes = await fetch("https://careerpilot-ai-1-zmdo.onrender.com/api/jobs");
        const jobsData = await jobsRes.json();

        const jobs = jobsData.jobs || [];

        if (jobs.length === 0) return;

        const job = jobs[0]; // using first job for analytics
        setJobName(`${job.title} - ${job.company}`);

        // fetch progress
        const progressRes = await fetch(
          `https://careerpilot-ai-1-zmdo.onrender.com/api/progress/${user._id}/${job._id}`
        );

        const progressData = await progressRes.json();

        const completedSkills = progressData.completedSkills || [];
        const totalSkills = job.skillsRequired || [];

        const remainingSkills = totalSkills.filter(
          (skill) => !completedSkills.includes(skill)
        );

        setData([
          { name: "Completed Skills", value: completedSkills.length },
          { name: "Remaining Skills", value: remainingSkills.length }
        ]);

      } catch (error) {

        console.error("Analytics error:", error);

      }

    };

    loadAnalytics();

  }, []);

  const COLORS = ["#16a34a", "#ef4444"];

  return (

    <MainLayout>

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-4">
          Career Analytics
        </h1>

        {jobName && (
          <p className="text-gray-600 mb-6">
            Job: {jobName}
          </p>
        )}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-6">
            Skill Progress
          </h2>

          <div style={{ width: "100%", height: 300 }}>

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={120}
                  label
                >

                  {data.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </MainLayout>

  );
}