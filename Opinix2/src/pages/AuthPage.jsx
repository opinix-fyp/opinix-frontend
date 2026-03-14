import { useState } from "react";
import { loginUser, registerUser } from "../services/api";
import "../css/AuthPage.css";

function AuthPage({ onLogin }) {
    const [mode, setMode] = useState("login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const [error, setError] = useState("");
    const [isShaking, setIsShaking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const triggerErrorFeedback = (message) => {
        setError(message);
        setIsShaking(true);

        setTimeout(() => {
            setIsShaking(false);
        }, 350);
    }
    
    const handleSubmit = async () => {
        setError("");
        setIsSubmitting(true);

        try {
            let user;

            if (mode === "login") {
                user = await loginUser(email, password);
            } else {
                user = await registerUser(email, password, fullName, "USER");
            }

            onLogin(user);

        } catch (error) {
            triggerErrorFeedback(error.message || "Something went wrong.")
        } finally {
            setIsSubmitting(false);
        }
    };

//render 
//TODO import the actual logo
//TODO add forgot password functionality in the backend
    return (
        <div className = "auth-page">
            <div className = "auth-card">
                <div className = "logo">Opinix</div> 

                <div className = {`auth-form ${isShaking ? "shake" : ""}`}>
                    {mode === "register" && (
                        <input
                            type="text"
                            placeholder="Full Name"
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

                <div className = "auth-actions">
                    <button
                        className = "auth-primary-button"
                        type = "button"
                        onClick = {handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? mode === "login" ? "Logging in..." : "Registering..."
                            : mode === "login" ? "Login" : "Register"}
                    </button>
                

                    <button
                        className = "auth-text-action"
                        type = "button"
                        onClick = {() => {
                            setError(""); 
                            setMode(mode === "login" ? "register" : "login"); }}
                    >
                        {mode === "login" ? "Don't have an account? Register" : "Already have an account? Login"}
                    </button>

                    {mode === "login" && (
                        <button
                            className = "auth-text-action forgot-password"
                            type = "button"
                            onClick={() => setError("Forgot password is not implemented yet lol")}
                        >
                            Forgot password?
                        </button>
                    )}

                    <div className = "auth-error-message">{error}</div>
                </div>  
            </div>
        </div>
    );
}

export default AuthPage;