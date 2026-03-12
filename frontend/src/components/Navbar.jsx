import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {

    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.name || "");
    }

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md border-b border-indigo-500">

      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          CareerPilot AI
        </h1>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Show logged in user name */}
          <span className="font-semibold">
            👤 {userName}
          </span>

          <button
            onClick={goToProfile}
            className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-100 transition shadow-sm"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-1.5 rounded-lg text-white hover:bg-red-600 transition shadow-sm"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}