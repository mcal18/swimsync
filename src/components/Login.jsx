import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../config/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import logoImg from "../assets/swimsyncLogo.png";

import {
  FaSwimmer,
  FaUserPlus,
  FaRegChartBar,
  FaBullseye,
  FaCalendarAlt,
  FaTrophy,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { FiMail, FiLock } from "react-icons/fi";
import { MdErrorOutline } from "react-icons/md";

import "../styles/login.css";

function Login() {
  const { login, signup } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const credential = await signup(email, password);

        await setDoc(
          doc(db, "users", credential.user.uid),
          {
            email: credential.user.email,
            name: "",
            team: "",
            coach: "",
            mainStroke: "",
            createdAt: serverTimestamp(),
          }
        );
      } else {
        await login(email, password)
      }
    } catch (err) {
      console.error(err);

      setError(
        isSignUp
          ? "Failed to create account. Please try again."
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="swim-auth-wrapper">
      <div className="auth-branding-panel">
        <div className="branding-header">
          <div className="logo-graphic-container">
            <img
              src={logoImg}
              alt="SwimSync Logo"
              className="branding-logo-img"
            />
          </div>

          <h1 className="branding-title">
            Swim<span>Sync</span>
          </h1>

          <p className="branding-tagline">
            Every stroke. Every split. Every breakthrough.
          </p>
        </div>

        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon-circle">
              <FaRegChartBar />
            </div>
            <div className="feature-text">
              <h3>Track Performance</h3>
              <p>Analyze your times and progress</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle">
              <FaBullseye />
            </div>
            <div className="feature-text">
              <h3>Set Goals</h3>
              <p>Crush your goals and achieve more</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle">
              <FaCalendarAlt />
            </div>
            <div className="feature-text">
              <h3>Plan & Compete</h3>
              <p>Organize meets and race with confidence</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-circle">
              <FaTrophy />
            </div>
            <div className="feature-text">
              <h3>Break Records</h3>
              <p>Celebrate PBs and new milestones</p>
            </div>
          </div>
        </div>

        <div className="branding-quote">
          <span className="quote-marks">“</span>
          <p>
            You don't just swim the race.
            <br />
            You <span>sync</span> the work.
          </p>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="swim-glass-login-card">
          <div className="card-top-icon">
            <FaSwimmer className="swim-flip" />
          </div>

          <h2>{isSignUp ? "Create Account" : "Welcome back!"}</h2>

          <p className="card-subtitle">
            {isSignUp
              ? "Sign up to start tracking metrics"
              : "Log in to continue your journey"}
          </p>

          {error && (
            <div className="auth-error-banner">
              <MdErrorOutline className="error-banner-icon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="input-field-group">
              <label>Email Address</label>

              <div className="input-with-icon">
                <FiMail className="field-inner-icon" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="swimmer@swimsync.com"
                  required
                />
              </div>
            </div>

            <div className="input-field-group">
              <label>Password</label>

              <div className="input-with-icon">
                <FiLock className="field-inner-icon" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />

                <button
                  type="button"
                  className="password-toggle-visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="primary-gradient-btn"
              disabled={loading}
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  {isSignUp ? (
                    <FaUserPlus className="auth-icon" />
                  ) : (
                    <FaSwimmer className="auth-icon swim-flip" />
                  )}

                  <span>{isSignUp ? "Sign Up" : "Log In"}</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-toggle-footer">
            <p>
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                className="auth-toggle-link"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
              >
                {isSignUp ? "Log In here ❯" : "Sign Up here ❯"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;