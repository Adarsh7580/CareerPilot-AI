import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">

      {/* Top Navbar */}
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">

          <div className="max-w-screen-xl mx-auto transition-all duration-300">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}