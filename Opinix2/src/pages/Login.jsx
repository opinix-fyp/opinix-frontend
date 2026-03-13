import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../css/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      console.log("Login success:", data);

      localStorage.setItem("userEmail", email);

      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1>Opinix Login</h1>

      <div className="login-box">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;