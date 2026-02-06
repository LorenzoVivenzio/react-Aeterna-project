import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const scrollRef = useRef(null);

  // Scroll automatico all'ultimo messaggio
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, loading]);

  function handleSend() {
    if (!input.trim()) {
      setInvalidInput(true);
      setTimeout(() => setInvalidInput(false), 2500);
      return;
    }

    const message = input;
    setLoading(true);
    setError(false);
    setInput("");

    axios
      .post("http://localhost:3001/api/chat/", {
        messageUtente: message,
        history: history,
      })
      .then((res) => {
        setHistory((prev) => [
          ...prev,
          { role: "user", parts: [{ text: message }] },
          { role: "model", parts: [{ text: res.data.testo_risposta }] },
        ]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div
            className="card shadow-lg border-0"
            style={{ borderRadius: "15px" }}
          >
            <div
              className="card-header bg-primary text-white text-center py-3"
              style={{ borderRadius: "15px 15px 0 0" }}
            >
              <h5 className="mb-0">Aeterna</h5>
            </div>

            <div
              className="card-body bg-light"
              ref={scrollRef}
              style={{
                height: "400px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {history.map((h, index) => (
                <div
                  key={index}
                  className={`d-flex mb-3 ${h.role === "user" ? "justify-content-end" : "justify-content-start"}`}
                >
                  <div
                    className={`p-3 shadow-sm ${h.role === "user" ? "bg-primary text-white" : "bg-white text-dark"}`}
                    style={{
                      maxWidth: "80%",
                      borderRadius:
                        h.role === "user"
                          ? "15px 15px 0 15px"
                          : "15px 15px 15px 0",
                      fontSize: "0.95rem",
                    }}
                  >
                    {h.parts[0].text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="d-flex justify-content-start mb-3">
                  <div
                    className="bg-white p-3 shadow-sm"
                    style={{ borderRadius: "15px 15px 15px 0" }}
                  >
                    <div
                      className="spinner-grow spinner-grow-sm text-primary mx-1"
                      role="status"
                    ></div>
                    <div
                      className="spinner-grow spinner-grow-sm text-primary mx-1"
                      role="status"
                    ></div>
                    <div
                      className="spinner-grow spinner-grow-sm text-primary mx-1"
                      role="status"
                    ></div>
                  </div>
                </div>
              )}

              {error && (
                <div
                  className="alert alert-danger py-2 text-center"
                  role="alert"
                >
                  <small>Errore di connessione. Riprova.</small>
                </div>
              )}
            </div>

            <div
              className="card-footer bg-white p-3"
              style={{ borderRadius: "0 0 15px 15px" }}
            >
              {invalidInput && (
                <div className="text-danger small mb-2 ps-1">
                  Scrivi qualcosa prima di inviare!
                </div>
              )}
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border-0 bg-light"
                  placeholder="Chiedi informazioni..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                />
                <button
                  className="btn btn-primary px-4"
                  onClick={handleSend}
                  disabled={loading}
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
        </div>
      </div>
    </div>
  );
}
