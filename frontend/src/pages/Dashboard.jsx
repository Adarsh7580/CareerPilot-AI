import MainLayout from "../layouts/MainLayout";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {

  const data = [
    { name: "Completed Skills", value: 3 },
    { name: "Remaining Skills", value: 5 }
  ];

  const COLORS = ["#16a34a", "#ef4444"];

  return (
    <MainLayout>

      {/* Hero Section */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-10">

        <h1 className="text-3xl font-bold mb-2">
          Welcome to CareerPilot AI 🚀
        </h1>

        <p className="text-indigo-100">
          Your AI-powered platform to analyze resumes, prepare for interviews,
          and plan your career roadmap.
        </p>

      </div>


      {/* Quick Actions */}

      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="font-semibold mb-2">Upload Resume</h3>
          <p className="text-gray-600 text-sm">
            Extract skills from your resume automatically.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="font-semibold mb-2">Resume Match</h3>
          <p className="text-gray-600 text-sm">
            Check ATS compatibility with job roles.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="font-semibold mb-2">Career Roadmap</h3>
          <p className="text-gray-600 text-sm">
            Discover skills needed for your target role.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
          <h3 className="font-semibold mb-2">Interview Prep</h3>
          <p className="text-gray-600 text-sm">
            Practice technical interview questions.
          </p>
        </div>

      </div>


      {/* Analytics Section */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Chart Card */}

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">

          <h2 className="text-lg font-semibold mb-4">
            Skill Readiness
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >

                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>


        {/* Insights Card */}

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">

          <h2 className="text-lg font-semibold mb-4">
            Career Insights
          </h2>

          <ul className="space-y-4">

            <li className="bg-gray-100 p-4 rounded-lg">
              🚀 Match Score improves as you learn more skills
            </li>

            <li className="bg-gray-100 p-4 rounded-lg">
              📈 Backend roles demand System Design and Redis
            </li>

            <li className="bg-gray-100 p-4 rounded-lg">
              🎯 Focus on high impact skills for faster growth
            </li>

          </ul>

        </div>

      </div>

    </MainLayout>
  );
}