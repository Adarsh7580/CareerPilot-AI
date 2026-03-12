import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

export default function VoiceInterview() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const questions = [
    "Explain REST API design principles.",
    "What is the difference between SQL and NoSQL?",
    "How does Node.js handle concurrency?",
    "What is system design?",
    "Explain microservices architecture."
  ];

  // Ask AI Question
  const startInterview = () => {

    const q = questions[Math.floor(Math.random() * questions.length)];

    setQuestion(q);
    setAnswer("");
    setFeedback("");

    const speech = new SpeechSynthesisUtterance(q);
    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);

  };

  // Listen to user answer
  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (event) => {

      const transcript = event.results[0][0].transcript;

      setAnswer(transcript);

      evaluateAnswer(transcript);

    };

  };

  // Simple evaluation logic
  const evaluateAnswer = (text) => {

    let score = Math.min(10, Math.floor(text.length / 20));

    let message = `Score: ${score}/10\n\n`;

    if (score > 7) {
      message += "Strong answer. Good explanation.";
    } else if (score > 4) {
      message += "Decent answer but needs more depth.";
    } else {
      message += "Answer too short. Add more technical explanation.";
    }

    setFeedback(message);

  };

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto p-8">

        <h1 className="text-3xl font-bold mb-6">
          🎤 AI Voice Interview
        </h1>

        <button
          onClick={startInterview}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg mr-4"
        >
          Start Interview
        </button>

        <button
          onClick={startListening}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Answer with Voice
        </button>

        {question && (

          <div className="mt-6 bg-white p-6 rounded-xl shadow">

            <h2 className="text-xl font-semibold mb-2">
              Question
            </h2>

            <p>{question}</p>

          </div>

        )}

        {answer && (

          <div className="mt-6 bg-blue-50 p-6 rounded-xl">

            <h2 className="font-semibold mb-2">
              Your Answer
            </h2>

            <p>{answer}</p>

          </div>

        )}

        {feedback && (

          <div className="mt-6 bg-green-50 p-6 rounded-xl">

            <h2 className="font-semibold mb-2">
              AI Feedback
            </h2>

            <pre>{feedback}</pre>

          </div>

        )}

      </div>

    </MainLayout>
  );
}