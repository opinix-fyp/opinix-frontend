import { useState } from "react";
import { loginUser, registerUser } from "../services/api";
import "../css/AuthPage.css";
import logo from "../assets/Opinix-Logo.png";

function AuthPage({ onLoginSuccess }) {
    const [mode, setMode] = useState("login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const [error, setError] = useState("");
    const [isShaking, setIsShaking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authStage, setAuthStage] = useState("idle") // states are idle, submitting, successZoom becasue zooooooooom when we succeed.. haha...

    const triggerErrorFeedback = (message) => {
        setError(message);
        setAuthStage("idle");
        setIsShaking(true);

        setTimeout(() => {
            setIsShaking(false);
        }, 350);
    }
    
    const handleSubmit = async () => {
        setError("");
        setIsSubmitting(true);
        setAuthStage("submitting");

        try {
            let user;

            if (mode === "login") {
                user = await loginUser(email, password);
            } else {
                user = await registerUser(email, password, fullName, "POLLSTER");
            }

            setAuthStage("successZoom");

            setTimeout(() => {
                onLoginSuccess(user);
            }, 650);

        } catch (error) {
            triggerErrorFeedback(error.message || "Something went wrong.")
            setIsSubmitting(false);
        } 
    };


    const isFormHidden = authStage === "submitting" || authStage === "successZoom";
    const isLogoCentered = authStage === "submitting" || authStage === "successZoom";
    const isLogoZooming = authStage === "successZoom";

//render 
//TODO add forgot password functionality in the backend
    return (
        <div className={`auth-page ${authStage === "successZoom" ? "auth-page-exit" : ""}`}>
            <div className="star-background">
                {Array.from({ length: 20 }).map((_, index) => (
            <div
                key={index}
                className={`star-row ${index % 2 === 0 ? "move-left" : "move-right"}`}
                style={{ top: `${index * 6}%` }}
            />
            ))}
        </div>

      <div className="auth-card">
        <div
          className={`logo-wrapper ${
            isLogoCentered ? "logo-centered" : ""
          } ${isLogoZooming ? "logo-zooming" : ""}`}
        >
          <img src={logo} alt="Opinix Logo" className={`logo-img ${authStage === "submitting" ? "logo-loading" : ""}`} />
          {authStage === "submitting" && <div className="logo-glimmer"></div>}
        </div>

        <div
          className={`auth-content ${
            isFormHidden ? "auth-content-hidden" : "auth-content-visible"
          }`}
        >
          <div className={`auth-form ${isShaking ? "shake" : ""}`}>
            {mode === "register" && (
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="auth-actions">
            <button
              className="auth-primary-button"
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? mode === "login"
                  ? "Logging in..."
                  : "Registering..."
                : mode === "login"
                ? "Login"
                : "Register"}
            </button>

            <button
              className="auth-text-action"
              type="button"
              onClick={() => {
                setError("");
                setMode(mode === "login" ? "register" : "login");
              }}
            >
              {mode === "login" ? "Don't have an account? Register" : "Back to Login"}
            </button>

            {mode === "login" && (
              <button
                className="auth-text-action forgot"
                type="button"
                onClick={() => setError("Forgot password is not implemented yet.")}
              >
                Forgot password?
              </button>
            )}

            <div className="auth-error-message">{error}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;