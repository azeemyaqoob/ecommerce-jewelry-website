import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import './ForgetPasswordPage.css';

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/reset-password", {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      setMessage(response.data.message);
      if (response.data.message === "Password has been reset") {
        navigate("/login");
      }
    } catch (error) {
      setMessage("Error resetting password");
    }
  };

  return (
    <div className="main_div_signin">
      <div className="row m-0 p-0">
        <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
        <div className="col-lg-4 col-md-6 col-sm-8 col-12">
          <p className="signin_heading">Reset Your Password</p>
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div className="password-input-container">
              <input
                className="input_email_signin"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
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
            <div className="password-input-container">
              <input
                className="input_email_signin"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div className="d-flex justify-content-center">
              <button className="signin_btn" type="submit">
                RESET
              </button>
            </div>
          </form>
          <Link to="/signin">
            <p className="create_account_para">Cancel</p>
          </Link>
        </div>
        <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
      </div>
    </div>
  );
}

export default ResetPassword;
