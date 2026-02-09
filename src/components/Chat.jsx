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
    <div
      className="chat-widget"
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      {buttonChat && (
        <div
          className="chat-container card shadow-lg border-0"
          style={{
            borderRadius: "15px",
            overflow: "hidden",
            width: "350px",
            height: "500px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
          }}
        >
          {/* --- HEADER --- */}

          <div
            className="text-white d-flex justify-content-between align-items-center py-3 px-3"
            style={{
              background: "#0f172a",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "15px 15px 0 0",
              width: "100%",
              flexShrink: 0, // Fondamentale per non farlo schiacciare dai messaggi
            }}
          >
            <div className="d-flex align-items-center">
              {/* Icona con un piccolo margine e colore accentuato */}
              <span
                className="me-2"
                style={{
                  fontSize: "1.3rem",
                  filter: "drop-shadow(0 0 5px rgba(56, 189, 248, 0.4))",
                }}
              >
                🧬
              </span>

              <div className="d-flex flex-column justify-content-center">
                <span
                  className="fw-bold m-0"
                  style={{
                    fontSize: "0.85rem",
                    letterSpacing: "1.2px",
                    lineHeight: "1.2",
                    color: "#f8fafc",
                  }}
                >
                  AETERNA BOT
                </span>
                {/* Piccola aggiunta: indicatore online più discreto */}
                <span
                  style={{
                    fontSize: "0.65rem",
                    color: "#38bdf8",
                    fontWeight: "500",
                  }}
                >
                  ● Disponibile
                </span>
              </div>
            </div>

            {/* Tasto chiusura più raffinato */}
            <span
              style={{
                cursor: "pointer",
                fontSize: "1.6rem",
                lineHeight: "0",
                opacity: "0.6",
                transition: "opacity 0.2s ease",
                padding: "5px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "0.6")}
              onClick={() => setButtonChat(false)}
            >
              &times;
            </span>
          </div>

          {/* --- MESSAGES BODY --- */}
          <div
            className="messages card-body bg-light"
            ref={scrollRef}
            style={{
              overflowY: "auto",
              flexGrow: 1,
              padding: "15px",
            }}
          >
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
                <div className="p-2 bg-white rounded shadow-sm d-flex align-items-center">
                  <span className="spinner-grow spinner-grow-sm text-success me-2"></span>
                  <small className="text-muted">Analisi...</small>
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

          {/* --- FOOTER --- */}
          <div
            className="card-footer p-3 bg-white border-top"
            style={{ flexShrink: 0 }}
          >
            <div
              className="input-group shadow-sm"
              style={{
                borderRadius: "25px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="form-control border-0 bg-light"
                style={{
                  fontSize: "0.9rem",
                  paddingLeft: "15px",
                  boxShadow: "none",
                }}
                placeholder="Chiedi ad Aeterna..."
                disabled={loading}
              />
              <button
                className="btn border-0 px-3"
                onClick={handleSend}
                disabled={loading}
                style={{
                  backgroundColor: "#0f172a",
                  color: "#38bdf8",
                  fontWeight: "600",
                }}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "Invia"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TASTO APERTURA */}
      {!buttonChat && (
        <button
          onClick={() => setButtonChat(true)}
          className="btn rounded-pill shadow-lg px-4 mt-2 d-flex align-items-center gap-2 border-0"
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            height: "50px",
            fontWeight: "500",
          }}
        >
          <span style={{ color: "#38bdf8" }}>💬</span>
          <span>Chiedi ad Aeterna</span>
        </button>
      )}
    </div>
  );
}
