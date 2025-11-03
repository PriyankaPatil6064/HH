import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Heart, Activity, Brain } from "lucide-react";
import healthIcon from "@/assets/health-icon.png"; // Example icon
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "bot", text: "Hey there 👋! I’m your PCOS health buddy. Let’s start with some quick details." }
  ]);
  const [input, setInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const questions = [
    "What’s your age (in years)? 😊",
    "Thanks! Could you tell me your weight (in kg)? 🧘‍♀️",
    "Got it! What’s your height (in cm)? 📏",
    "Okay, do you often have irregular periods? 🩸",
    "Have you experienced any recent weight gain? ⚖️",
    "Do you get acne or pimples frequently? 😕",
    "Have you noticed any skin darkening around the neck or other areas? 🌑",
    "Do you often feel tired or low on energy? 😴",
    "Do you experience anxiety or mood swings often? 💭",
    "How often do you exercise? Be honest 😅",
    "Lastly, is there any family history of PCOS (like your mother or sister)? 👩‍👧"
  ];

  const questionKeys = [
    "Age", "Weight", "Height", "Cycle", "WeightGain", "Acne",
    "SkinDarkening", "Fatigue", "Anxiety", "Exercise", "FamilyHistory"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: questions[0] }]);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newAnswers = { ...answers, [questionKeys[currentQuestion]]: input };
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setAnswers(newAnswers);
    setInput("");

    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "bot", text: questions[currentQuestion + 1] }]);
      }, 500);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
      setLoading(true);
      try {
        const res = await axios.post("http://127.0.0.1:5000/predict", { answers: newAnswers });
        const { risk_level, description } = res.data;
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `✅ Based on your responses, your PCOS risk level is **${risk_level}**.` },
          { sender: "bot", text: description },
          { sender: "bot", text: "⚠️ Note: This is an AI-based estimation and not a diagnosis. Please consult a gynecologist." }
        ]);
      } catch (err) {
        console.error(err);
        setMessages((prev) => [...prev, { sender: "bot", text: "Oops 😞 something went wrong. Try again." }]);
      } finally {
        setLoading(false);
      }
    }
  };
  
  return (
 
    <div className="relative min-h-screen w-full bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 flex flex-col items-center justify-start overflow-hidden">
      
      {/* Floating Background Circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full opacity-30 animate-blob"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-pink-300 rounded-full opacity-25 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 right-10 w-64 h-64 bg-indigo-300 rounded-full opacity-20 animate-blob animation-delay-4000"></div>

      {/* Header */}
    {/* Header */}
     <Navbar/>
<div className="relative z-10 text-center max-w-3xl mt-12 mb-8 px-4">
  <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 flex items-center justify-center gap-4">
    <img src={healthIcon} alt="Health Icon" className="w-40 h-40" />
    Your AI-Powered PCOS Companion
  </h1>
  <p className="mt-4 text-lg text-muted-foreground">
    Get personalized insights, track symptoms, and understand your PCOS risk with an intelligent, interactive health assessment.
  </p>
</div>

{/* Floating Icons/Images in Background */}

<Heart className="absolute bottom-20 right-20 w-28 h-28 text-pink-400 opacity-25 animate-blob animation-delay-4000" />


      {/* Chat Card */}
      <Card className="relative z-10 w-full max-w-4xl flex-1 p-6 rounded-3xl shadow-2xl border border-primary/20 bg-white/70 backdrop-blur-md flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl max-w-[75%] break-words animate-fade-in ${
                msg.sender === "user"
                  ? "bg-purple-600 text-white ml-auto"
                  : "bg-purple-100 text-purple-900 mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="text-center text-sm text-muted-foreground">Analyzing... 🔍</div>}
          <div ref={chatEndRef}></div>
        </div>

        {!isFinished && (
          <form onSubmit={handleSubmit} className="flex gap-3 mt-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              className="flex-1 border border-purple-300 rounded-full px-5 py-3 text-base outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
            <Button type="submit" disabled={loading} className="rounded-full flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
              Send <ArrowRight className="h-5 w-5" />
            </Button>
          </form>
        )}
      </Card>

      {/* Footer */}
      
      <p className="relative z-10 mt-6 text-sm text-muted-foreground text-center px-4">
        Your data is private and confidential. Always consult a gynecologist for professional advice.
      </p>
     {/* Footer */}
<div className="w-full mt-10">
  <Footer />
</div>

      {/* Tailwind animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
    </div>
    
  );
};

export default Chatbot;
