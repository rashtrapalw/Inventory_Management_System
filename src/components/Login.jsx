import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://electronics-data-naho.onrender.com/users"); // your JSON server endpoint
      const users = await res.json();

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        onLogin(user); // pass user object back to parent
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Error connecting to server");
    }
  };

  // Define colors
  const DarkTeal = "#2C514D";
  const BrightYellow = "#F8BD3F";
  const MediumTeal = "#4C7C78";

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: MediumTeal }}
    >
      <div
        className="d-flex shadow-lg"
        style={{
          width: "80%",
          maxWidth: "900px",
          height: "600px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Left Side - Illustration */}
        <div
          className="d-none d-lg-flex flex-column position-relative"
          style={{ flex: "1 1 50%", backgroundColor: DarkTeal }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              width: "50%",
              height: "100%",
              backgroundColor: BrightYellow,
            }}
          ></div>
          <div
            className="w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1, position: "relative" }}
          >
            <div
              style={{
                width: "100px",
                height: "250px",
                backgroundColor: DarkTeal,
                border: "4px solid #F8BD3F",
                marginRight: "0px",
              }}
            ></div>
            <div
              style={{
                width: "60px",
                height: "250px",
                backgroundColor: MediumTeal,
                transform: "skewY(-5deg) translateX(-10px)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                bottom: "100px",
                left: "20%",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              👋 WELCOME!
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div
          className="d-flex flex-column justify-content-center align-items-center p-5"
          style={{ flex: "1 1 50%", backgroundColor: BrightYellow }}
        >
          <div
            className="p-4 shadow"
            style={{
              width: "100%",
              maxWidth: "350px",
              backgroundColor: "white",
              borderRadius: "6px",
              minHeight: "300px",
            }}
          >
            <div className="d-flex justify-content-between mb-4">
              <p
                className="small"
                style={{ color: BrightYellow, fontWeight: 700 }}
              >
                ADMIN LOGIN
              </p>
              {/* <a
                href="#"
                className="small text-muted"
                style={{ textDecoration: "none" }}
              >
                Need help?
              </a> */}
              <span>
              <p>Username : admin</p>
              <p>Password : admin123</p>
              </span>
            </div>

            <form onSubmit={handleLogin}>
              {/* Username */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ height: "45px" }}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ height: "45px" }}
                />
              </div>

              {error && <p className="text-danger small">{error}</p>}

              {/* Sign In */}
              <button
                type="submit"
                className="btn w-100 mb-4 text-white"
                style={{
                  backgroundColor: DarkTeal,
                  border: "none",
                  padding: "10px 0",
                  fontWeight: 600,
                }}
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
