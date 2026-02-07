import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chat.css";

export default function Chat() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonChat, setButtonChat] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading, error]);

  function handleSend() {
    if (!input.trim() || !isNaN(input)) return;

    const message = input;
    setInput("");
    setLoading(true);
    setError(false);

    const obj = {
      messageUtente: message,
      history: history,
    };

    axios
      .post("http://localhost:3001/api/chat/", obj)
      .then((res) => {
        setHistory((prev) => [
          ...prev,
          { role: "user", parts: [{ text: message }] },
          { role: "model", parts: [{ text: res.data.testo_risposta }] },
        ]);
      })
      .catch((err) => {
        console.error("Errore chat:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="chat-widget">
      {buttonChat && (
        <div className="chat-container card shadow-lg">
          <div className="card-header bg-success text-white d-flex justify-content-between">
            <small className="fw-bold">AETERNA BOT</small>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setButtonChat(false)}
            >
              ×
            </span>
          </div>

          <div className="messages card-body bg-light" ref={scrollRef}>
            {history.map((h, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${h.role === "user" ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-2 rounded shadow-sm message-bubble ${h.role === "user" ? "bg-primary text-white" : "bg-white text-dark"}`}
                >
                  {h.parts[0].text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="d-flex justify-content-start mb-2">
                <div className="p-2 bg-white rounded shadow-sm italic-text">
                  <span className="spinner-grow spinner-grow-sm text-success"></span>{" "}
                  Sta scrivendo...
                </div>
              </div>
            )}

            {error && (
              <div
                className="alert alert-danger py-1 mt-2"
                style={{ fontSize: "0.7rem" }}
              >
                Errore di connessione. Riprova.
              </div>
            )}
          </div>

          <div className="card-footer p-2 bg-white">
            <div className="input-group">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="form-control form-control-sm"
                placeholder="Chiedi qualcosa..."
                disabled={loading}
              />
              <button
                className="btn btn-success btn-sm"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? "..." : "Invia"}
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setButtonChat(!buttonChat)}
        className={`btn ${buttonChat ? "btn-secondary" : "btn-success"} rounded-pill shadow-lg px-4 mt-2`}
      >
        {buttonChat ? "Chiudi Assistente" : "💬 Chiedi ad Aeterna"}
      </button>
    </div>
  );
}
