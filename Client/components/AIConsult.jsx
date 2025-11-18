import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";

const AIConsult = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!userInput.trim() || loading) return;

    const newMessages = [...messages, { type: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");
    setLoading(true);

    const aiReplyRaw = await getAIReply(userInput);

    // Typing effect: add AI message letter by letter
    let currentText = "";
    let i = 0;

    const addLetter = () => {
      if (i < aiReplyRaw.length) {
        currentText += aiReplyRaw[i];
        // Replace last AI message or add new
        setMessages((prev) => {
          // Check if last message is AI and typing in progress
          if (
            prev.length > 0 &&
            prev[prev.length - 1].type === "ai" &&
            prev[prev.length - 1].typing
          ) {
            const updated = [...prev];
            updated[updated.length - 1] = {
              type: "ai",
              text: currentText,
              typing: true,
            };
            return updated;
          } else {
            return [...prev, { type: "ai", text: currentText, typing: true }];
          }
        });
        i++;
        setTimeout(addLetter, 5); // Adjust typing speed here (ms per letter)
      } else {
        // Finish typing
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            type: "ai",
            text: currentText,
            typing: false,
          };
          return updated;
        });
        setLoading(false);
      }
    };

    addLetter();
  };

  async function getAIReply(userInput) {
    try {
      const res = await fetch(
        "https://your-render-domain.onrender.com/ask-ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `
You are a helpful health assistant.
User: ${userInput}
AI:
`,
          }),
        }
      );

      const data = await res.json();
      return data.reply || "No response";
    } catch (e) {
      return "Server error";
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Loading dots animation */
        .loading-dots span {
          animation: blink 1.4s infinite;
          font-weight: bold;
          font-size: 24px;
        }
        .loading-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .loading-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes blink {
          0%, 20% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      <div className="flex flex-col h-screen items-center">
        <div
          className="p-6 space-y-4 overflow-y-auto scrollbar-hide"
          style={{ height: "80%", width: "60%" }}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center w-full h-full space-y-6">
              <div className="bg-purple-100 text-purple-900 rounded-xl p-6 shadow text-center max-w-md w-full">
                <h3 className="font-semibold mb-2 text-lg">
                  How do you search?
                </h3>
                <p className="text-sm">
                  Simply type your health-related query in the chat box below
                  and hit send. The AI will analyze your question and provide
                  insights, suggestions, or steps you can take next.
                </p>
              </div>
              <div className="bg-purple-100 text-purple-900 rounded-xl p-6 shadow text-center max-w-md w-full">
                <h3 className="font-semibold mb-2 text-lg">
                  What can you search?
                </h3>
                <p className="text-sm">
                  Explore symptoms, possible causes, medications, treatments,
                  mental health tips, diet plans, and get support for chronic
                  illnesses. Your AI consultant is here 24/7.
                </p>
              </div>
              <div className="bg-purple-100 text-purple-900 rounded-xl p-6 shadow text-center max-w-md w-full">
                <h3 className="font-semibold mb-2 text-lg">Stay Motivated</h3>
                <p className="text-sm">
                  Your health journey starts with a single question. Stay
                  curious, stay informed, and take charge of your wellbeing with
                  confidence.
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-4 rounded-xl shadow break-words whitespace-pre-wrap ${
                      msg.type === "user"
                        ? "bg-purple-600 text-white text-right"
                        : "bg-purple-100 text-purple-900 text-left"
                    }`}
                    style={{
                      maxWidth: "100%",
                      width: "auto",
                      display: "inline-block",
                    }}
                  >
                    {msg.type === "ai" ? (
                      msg.typing ? (
                        <>
                          {msg.text}
                          <span className="loading-dots">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                          </span>
                        </>
                      ) : (
                        msg.text
                      )
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="h-[20%] flex justify-center items-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask your AI health consultant..."
              className="w-full bg-purple-50 border border-purple-300 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring focus:border-purple-500 placeholder-purple-400 text-purple-900"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-800 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              <IoIosSend size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIConsult;
