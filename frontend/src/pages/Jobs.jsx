import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Jobs() {
  // ---------------- URL PARAMS ----------------
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // ---------------- STATES ----------------
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // ---------------- FETCH JOBS ----------------
  const fetchJobs = async () => {
    setLoading(true);

    try {
      const query = new URLSearchParams({
        search,
        location,
        skill,
        page,
        limit: 4,
        sortBy,
        order
      });

      const res = await fetch(
        `http://127.0.0.1:5000/api/jobs?${query}`
      );

      const data = await res.json();

      setJobs(data.jobs || []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs");
      setLoading(false);
    }
  };

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    fetchJobs();
  }, [page, sortBy, order]);

  // ---------------- SYNC PAGE → URL ----------------
  useEffect(() => {
    navigate(`?page=${page}`, { replace: true });
  }, [page]);

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">
          Jobs Recommended 💼
        </h1>

        {/* SEARCH & FILTER */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by role or company"
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="border p-2 rounded w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            type="text"
            placeholder="Skill"
            className="border p-2 rounded w-full"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />

          <button
            onClick={() => {
              setPage(1);
              fetchJobs();
            }}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Search
          </button>
        </div>

        {/* SORT */}
        <div className="mb-6 flex gap-4">
          <select
            className="border p-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Newest First</option>
            <option value="salary">Salary</option>
          </select>

          <select
            className="border p-2 rounded"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>

          <button
            onClick={() => {
              setPage(1);
              fetchJobs();
            }}
            className="bg-green-600 text-white px-4 rounded"
          >
            Apply Sort
          </button>
        </div>

        {/* STATUS */}
        {loading && <p>Loading jobs...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* JOB CARDS */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold">
                  {job.title}
                </h3>

                <p className="text-gray-600">
                  {job.company}
                </p>

                <p className="text-sm text-gray-500">
                  {job.location}
                </p>

                <p className="mt-2">
                  💰 {job.salaryRange}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {job.skillsRequired.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() =>
                    navigate(`/roadmap/${job._id}?fromPage=${page}`)
                  }
                  className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  View Roadmap
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="px-4 py-2 font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
