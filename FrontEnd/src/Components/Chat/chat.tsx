import React from "react";
import "./style.css"; // Import your custom CSS file here
import ChatOverFlowLogo from "../../../public/ChatOverFlow.png"; // Import the logo image here

interface ChatProps {}

const Chat: React.FC<ChatProps> = () => {
  return (
    <div className="chat-container">
      <header className="chat-header">
        <img src={ChatOverFlowLogo} height="100px" width="100px" alt="logo" />
        <h1>ChatOverflow</h1>
        <a href="/index" className="btn">
          Leave Room
        </a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">JavaScript</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            <li>Brad</li>
            <li>John</li>
            <li>Mary</li>
            <li>Paul</li>
            <li>Mike</li>
          </ul>
        </div>
        <div className="chat-messages">
          <div className="message">
            <p className="meta">
              Brad <span>9:12pm</span>
            </p>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className="message">
            <p className="meta">
              Mary <span>9:15pm</span>
            </p>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
        </div>
      </main>
      <div className="chat-form-container">
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button className="btn">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
