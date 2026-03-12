import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  if (!user) {
    return (
      <MainLayout>
        <p className="p-8">Loading profile...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-8">
          👤 User Profile
        </h1>

        <div className="bg-white shadow rounded-xl p-6 space-y-4">

          <div>
            <p className="text-gray-500 text-sm">Name</p>
            <p className="text-lg font-semibold">{user.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-lg font-semibold">{user.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Account Type</p>
            <p className="text-lg font-semibold">Student</p>
          </div>

        </div>

        {/* Career Stats */}

        <div className="mt-8 grid md:grid-cols-3 gap-6">

          <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl">
            <p className="text-sm text-gray-600">Resume Matches</p>
            <p className="text-2xl font-bold text-indigo-600">3</p>
          </div>

          <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
            <p className="text-sm text-gray-600">Skills Completed</p>
            <p className="text-2xl font-bold text-green-600">5</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
            <p className="text-sm text-gray-600">Interview Practice</p>
            <p className="text-2xl font-bold text-yellow-600">4</p>
          </div>

        </div>

      </div>

    </MainLayout>
  );
}