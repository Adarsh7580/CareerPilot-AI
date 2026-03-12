import { Link, useLocation } from "react-router-dom";
import {
  FaChartPie,
  FaBriefcase,
  FaFileUpload,
  FaRobot,
  FaComments,
  FaUserTie,
  FaSearch,
  FaMicrophone
} from "react-icons/fa";

export default function Sidebar() {

  const location = useLocation();

  const menu = [
    { name: "Dashboard", icon: <FaChartPie />, path: "/" },
    { name: "Career Analytics", icon: <FaChartPie />, path: "/analytics" },
    { name: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
    { name: "Resume Upload", icon: <FaFileUpload />, path: "/resume-upload" },
    { name: "Resume Match", icon: <FaSearch />, path: "/resume-match" },
    { name: "Resume Feedback", icon: <FaUserTie />, path: "/resume-feedback" },
    { name: "AI Matcher", icon: <FaRobot />, path: "/match" },
    { name: "AI Career Advisor", icon: <FaComments />, path: "/advisor" },
    { name: "Interview Prep", icon: <FaUserTie />, path: "/interview" },
    { name: "Voice Interview", icon: <FaMicrophone />, path: "/voice-interview" }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-6 hidden md:flex flex-col">

      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wide text-indigo-400">
          CareerPilot AI
        </h1>
        <p className="text-sm text-gray-400">
          Smart Career Navigator
        </p>
      </div>

      {/* Menu */}
      <ul className="space-y-3">

        {menu.map((item, index) => {

          const active = location.pathname === item.path;

          return (
            <li key={index}>

              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                  active
                    ? "bg-indigo-600 shadow-md"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>

            </li>
          );
        })}

      </ul>

      {/* Footer */}
      <div className="mt-auto pt-10 text-xs text-gray-400">
        <p>CareerPilot AI</p>
        <p>v1.0</p>
      </div>

    </div>
  );
}