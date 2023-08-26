// LoginPage.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginProps {
  handleLogin: () => void;
}

const AlertMessage: React.FC<{ message: string; className?: string }> = ({
  message,
  className,
}) => {
  const alertStyle = {
    backgroundColor: className === "alert-danger" ? "red" : "green",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "10px",
    color: "white",
    fontWeight: "bold",
  };

  return <div style={alertStyle}>{message}</div>;
};

const LoginPage = ({ handleLogin }: LoginProps) => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertClassName, setAlertClassName] = useState<string>("");
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if any required field is empty
    if (!loginForm.email || !loginForm.password) {
      setAlertMessage("Please fill in all the required fields");
      setAlertClassName("alert-danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
        credentials: "include", // Include credentials for CORS
      });

      const data = await response.json();

      if (response.ok) {
        // Display success message
        setAlertMessage("Login successful!");
        setAlertClassName("alert-success");
        handleLogin(); // Call the handleLogin function passed from props
        navigate("/Welcome"); // Redirect to the welcome page after successful login
      } else {
        // Display error message
        setAlertMessage(`Login failed: ${data.message}`);
        setAlertClassName("alert-danger");
      }
    } catch (error) {
      // Handle network or server errors
      console.error("Error occurred:", error);
      setAlertMessage("An error occurred during login");
      setAlertClassName("alert-danger");
    }
  };

  return (
    <div className="login-border" style={{ color: "white", padding: "70px" }}>
      <h2>Login Page</h2>
      {alertMessage && (
        <AlertMessage message={alertMessage} className={alertClassName} />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginForm.email}
            onChange={handleInputChange}
            style={{ color: "black" }}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginForm.password}
            onChange={handleInputChange}
            style={{ color: "black" }}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <hr style={{ margin: "20px", color: "white" }}></hr>
      <div>
        <p>Don't have an account?</p>
        <Link to="/Signup" className="registerLink">
          <p>Click here to Register</p>
        </Link>
      </div>
    </div>
  );
};
export default LoginPage;
