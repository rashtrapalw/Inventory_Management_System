import React, { useState } from "react";
import App from "./App"; // your existing App
import Login from "./components/Login";

function LoginWrapper() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData); // store logged-in user
  };

  return (
    <>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <App />
      )}
    </>
  );
}

export default LoginWrapper;
