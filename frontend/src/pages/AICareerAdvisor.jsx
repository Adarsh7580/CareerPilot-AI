import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function AICareerAdvisor() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobId, setJobId] = useState("");

  useEffect(() => {

    const fetchJobs = async () => {

      try {

        const res = await fetch("http://localhost:5000/api/jobs");
        const data = await res.json();

        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs(data.jobs || []);
        }

      } catch (err) {
        console.error("Failed to load jobs", err);
      }

    };

    fetchJobs();

  }, []);

  const askAI = async () => {

    if (!jobId) {
      alert("Please select a job role first.");
      return;
    }

    if (!question.trim()) return;

    const userMessage = {
      sender: "user",
      text: question
    };

    setMessages(prev => [...prev, userMessage]);

    try {

      const res = await fetch(
        "http://localhost:5000/api/ai/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            question,
            jobId
          })
        }
      );

      const data = await res.json();

      const aiMessage = {
        sender: "ai",
        text: data.answer || "AI could not generate a response."
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (err) {

      console.error(err);

      setMessages(prev => [
        ...prev,
        {
          sender: "ai",
          text: "AI advisor failed to generate response."
        }
      ]);

    }

    setQuestion("");

  };

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6">
          🤖 AI Career Advisor
        </h1>

        {/* Job Selector */}

        <div className="mb-4">

          <label className="block text-sm font-medium mb-1">
            Select Job Role
          </label>

          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="border rounded-lg p-3 w-full"
          >

            <option value="">
              Select a job role
            </option>

            {jobs.map(job => (

              <option
                key={job._id}
                value={job._id}
              >
                {job.title} - {job.company}
              </option>

            ))}

          </select>

        </div>

        {/* Chat Box */}

        <div className="bg-white rounded-xl shadow p-6 h-[450px] overflow-y-auto mb-4">

          {messages.length === 0 && (

            <p className="text-gray-400">

              Ask career questions like:

              <br />
              • What skills should I learn for backend developer?
              <br />
              • How long to become job ready?

            </p>

          )}

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`px-4 py-3 rounded-lg max-w-[70%] ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>

            </div>

          ))}

        </div>

        {/* Input */}

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Ask your career question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={askAI}
            className="bg-indigo-600 text-white px-6 rounded-lg hover:bg-indigo-700"
          >
            Ask
          </button>

        </div>

      </div>

    </MainLayout>
  );
}