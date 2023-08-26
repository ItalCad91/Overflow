import React from "react";
import "./style.css"; // Import your custom CSS file here
import ChatOverFlowLogo from "../../../public/ChatOverFlow.png"; // Import the logo image here

interface JoinProps {}

const Join: React.FC<JoinProps> = () => {
  return (
    <div className="join-container">
      <header className="join-header">
        <img src={ChatOverFlowLogo} height="100px" width="100px" alt="logo" />
        <h1>ChatOverflow</h1>
      </header>
      <main className="join-main">
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username..."
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="room">Room</label>
          <select name="room" id="room">
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="PHP">PHP</option>
            <option value="C#">C#</option>
            <option value="Ruby">Ruby</option>
            <option value="Java">Java</option>
          </select>
        </div>
        <a href="/chat" className="btn">
          Join Chat
        </a>
      </main>
    </div>
  );
};

export default Join;
