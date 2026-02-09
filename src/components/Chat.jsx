import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chat.css";

export default function Chat() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [buttonChat, setButtonChat] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(true);
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
    setHistory((prev) => [
      ...prev,
      { role: "user", parts: [{ text: message }] },
    ]);

    axios
      .post("http://localhost:3001/api/chat/", obj)
      .then((res) => {
        setHistory((prev) => [
          ...prev,
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
            {welcomeMessage && (
              <div className="d-flex justify-content-start mb-3">
                <div
                  className="p-3 bg-white border shadow-sm"
                  style={{ borderRadius: "15px 15px 15px 0", maxWidth: "85%" }}
                >
                  <div className="fw-bold text-primary small mb-1">Aeterna</div>
                  <div className="text-dark" style={{ fontSize: "0.95rem" }}>
                    Benvenuto su <strong>Aeterna</strong>. Siamo qui per
                    riportare la biodiversità nel tuo mondo. Come posso aiutarti
                    oggi?
                  </div>
                  <div
                    className="mt-2 pt-2 border-top"
                    style={{ fontSize: "0.75rem", color: "#6c757d" }}
                  >
                    🌱 Il 20% del tuo acquisto sostiene le specie a rischio.
                  </div>
                </div>
              </div>
            )}
            {history.map((h, i) => (
              <div
                key={i}
                className={`d-flex mb-3 ${h.role === "user" ? "justify-content-end" : "justify-content-start"}`}
              >
                <div
                  className={`p-3 shadow-sm ${
                    h.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border text-dark"
                  }`}
                  style={{
                    maxWidth: "85%",
                    fontSize: "0.95rem",
                    borderRadius:
                      h.role === "user"
                        ? "15px 15px 0 15px"
                        : "15px 15px 15px 0",
                  }}
                >
                  {h.role === "model" && (
                    <div className="fw-bold text-primary small mb-1">
                      Aeterna
                    </div>
                  )}

                  <div>{h.parts[0].text}</div>
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
