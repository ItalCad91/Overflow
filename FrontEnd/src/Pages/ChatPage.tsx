import { useNavigate } from "react-router-dom";
import "./ChatPage.css";
import chatgif from "../../public/chat.gif";
import rocket from "../../public/rocket.png";

function ChatPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/Login");
  };

  return (
    <div className="main">
      <div className="box">
        <h1>Supercharge Your Problem-Solving Potential</h1>
        <div className="animation-container">
          <img
            src={rocket}
            alt="Rocket"
            className="animated-element"
            height={"150px"}
            width={"150px"}
          />
        </div>
        <p>
          With our chat service, we bring you the ultimate fusion of
          StackOverflow and real-time chat. Say goodbye to endless waiting and
          hello to instant, accurate answers from the community.
        </p>
        <p>
          Take your projects to new heights with swift progress and unparalleled
          collaboration.
        </p>

        <h2>Features:</h2>
        <ul className="feature-list">
          <li className="feature-item">
            Instant and Accurate Answers from the Community
          </li>
          <li className="feature-item">Real-Time Chat for Swift Progress</li>
          <li className="feature-item">
            Unparalleled Collaboration for Projects
          </li>
          <li className="feature-item">
            Easy Access to Expertise and Knowledge
          </li>
          <li className="feature-item">Vibrant Community of Developers</li>
          <li className="feature-item">
            Efficient Problem-Solving Environment
          </li>
        </ul>

        <div className="gif-container">
          <img src={chatgif} alt="Chat Gif" className="chat-gif" />
        </div>

        <p className="highlight">
          Join our chat service today and experience the power of collaboration
          and knowledge-sharing!
        </p>
        <div className="button-section">
          <button
            type="button"
            className="btn btn-custom"
            onClick={handleButtonClick}
            style={{ marginBottom: "20px", backgroundColor: "#007bff" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
