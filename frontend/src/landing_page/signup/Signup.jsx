import React, { useState } from "react";
import axios from "axios";

function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = isSignup
        ? "http://localhost:8080/api/auth/register"
        : "http://localhost:8080/api/auth/login";

      const { data } = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (isSignup) {
        setMessage("Great! You're signed up.");
      } else {
        setMessage("Welcome back! You're logged in.");
      }
      setMessageType("success");

      localStorage.setItem("token", data.token);

      console.log("User:", data.user);

      setTimeout(() => {
        window.location.href = `http://localhost:5174/?token=${data.token}`;
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Something went wrong");
      setMessageType("error");
    }
  };

  const messageStyle = {
    color: messageType === "success" ? "green" : "red",
    fontWeight: "bold",
    marginTop: "10px",
    textAlign: "center",
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "50px" }}>
      <h2 className="mb-4 text-center">{isSignup ? "Signup" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div className="mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-3">
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>

      {message && <p style={messageStyle}>{message}</p>}

      <p className="text-center">
        {isSignup ? "Already have an account?" : "Don't have an account yet?"}{" "}
        <button
          type="button"
          className="btn btn-link p-0"
          onClick={() => {
            setIsSignup(!isSignup);
            setMessage("");
            setMessageType("");
          }}
        >
          {isSignup ? "Login here" : "Signup here"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;
