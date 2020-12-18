import io from "socket.io-client";
import qs from "qs";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const socket = io("http://localhost:3001");

function Chat() {
  const location = useLocation();
  const parsedQs = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(parsedQs.username);

    socket.emit("joined", { username: parsedQs.username, id: socket.id });
  }, [parsedQs.username]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);

      const chatMessages = document.querySelector(".chat-messages");
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    if (message === "" || !message) return;

    socket.emit("chatMessage", message);

    // Clear input
    setMessage("");
  }

  const messagesMapped = messages.map((item, index) => {
    return (
      <div key={index} className="message">
        <div className="message-header">
          {item.username === username ? `You (${item.username})` : item.username}
        </div>
        <div className="message-body">{item.message}</div>
      </div>
    );
  });

  return (
    <div className="chat-container">
      <div className="chat">
        <div className="chat-header">
          <h2>Chat</h2>
        </div>
        <div className="chat-messages">{messagesMapped}</div>
        <form onSubmit={onSubmit} className="chat-form">
          <input
            autoFocus={true}
            className="form-input send-input"
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message..."
            required
          />
          <button className="send-message form-input" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
