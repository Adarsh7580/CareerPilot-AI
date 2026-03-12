import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function ResumeUpload() {

  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) {
      setError("Please select a resume file.");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("resume", file);

      const res = await fetch(
        "http://localhost:5000/api/resume/extract-skills",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setSkills([]);
        return;
      }

      setSkills(data.skills || []);
      setError("");

    } catch (err) {

      console.error(err);
      setError("Failed to extract skills.");

    }

  };

  return (
    <MainLayout>

      <div className="p-8 max-w-xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">
          Upload Resume
        </h1>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
        />

        {error && (
          <p className="text-red-500 mt-3">{error}</p>
        )}

        {Array.isArray(skills) && skills.length > 0 && (

          <div className="mt-6">

            <h2 className="font-semibold mb-2">
              Extracted Skills
            </h2>

            <ul className="list-disc list-inside">

              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}

            </ul>

          </div>

        )}

      </div>

    </MainLayout>
  );
}