import React, { useState } from "react";
import "./SigninPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../../../Loader/Loader";
import NotificationDisplay from "../../../NotificationDisplay/NotificationDisplay";

function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [notificationMessage, setnotificationMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      // Handle the response as needed, e.g., save the token
      console.log("Login successful:", response.data);
      setEmail("");
      setPassword("");
      setLoading(false);
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("username", response.data.user.first_name);

      setnotificationMessage("Login successful");
      setTimeout(() => {
        setnotificationMessage("");
        navigate("/");
      }, 3000);
    } catch (err) {
      setLoading(false);
      setnotificationMessage(
        "Login failed. Please check your credentials and try again."
      );
      setTimeout(() => {
        setnotificationMessage("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notificationMessage === null ? null : (
        <NotificationDisplay message={notificationMessage} />
      )}

      <div className="main_div_signin">
        <div className="row m-0 p-0">
          <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
          <div className="col-lg-4 col-md-6 col-sm-8 col-12">
            <p className="signin_heading">Log In</p>
            <form onSubmit={handleLogin}>
              <input
                className="input_email_signin"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="password-input-container">
                <input
                  className="input_email_signin"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <Link to="/forget-password">
                <p className="forget_your_password_para">
                  Forget your Password?
                </p>
              </Link>
              <div className="d-flex justify-content-center">
                <button className="signin_btn" type="submit" disabled={loading}>
                  {loading ? <Loader /> : "SIGN IN"}
                </button>
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
            <Link to="/signup">
              <p className="create_account_para">Create Account</p>
            </Link>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
        </div>
      </div>
    </>
  );
}

export default SigninPage;
