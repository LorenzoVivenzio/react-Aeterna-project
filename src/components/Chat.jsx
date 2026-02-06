import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleSend() {
    if (!input) {
      return alert("miao");
    }

    const message = input;

    const obj = {
      messageUtente: message,
      history: history,
    };

    console.log(obj);
    axios.post("http://localhost:3001/api/chat/", obj).then((data) => {
      console.log(data.data);
      setHistory([
        ...history,
        {
          role: "user",
          parts: [{ text: `${message}` }],
        },
        {
          role: "model",
          parts: [{ text: `${data.data.testo_risposta}` }],
        },
      ]);
      setInput("");
    });
  }
  return (
    <div className="chat-container">
      <div className="messages" style={{ height: "400px", overflowY: "auto" }}>
        {history.map((h) => {
          return <p>{h.parts[0].text}</p>;
        })}
      </div>

      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSend}>invia</button>
    </div>
  );
}
