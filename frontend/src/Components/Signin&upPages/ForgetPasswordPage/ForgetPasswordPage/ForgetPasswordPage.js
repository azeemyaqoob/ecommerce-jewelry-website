import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ForgetPasswordPage.css";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setError("Error sending reset link");
    }
  };

  return (
    <div className="main_div_signin">
      <div className="row m-0 p-0">
        <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
        <div className="col-lg-4 col-md-6 col-sm-8 col-12">
          <p className="signin_heading">Reset your Password</p>
          <p className="forget_your_password_para">
            We will send you an email to reset your password
          </p>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              className="input_email_signin"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="d-flex justify-content-center">
              <button className="signin_btn" type="submit">
                SUBMIT
              </button>
            </div>
          </form>
          <Link to="/signup">
            <p className="create_account_para">Cancel</p>
          </Link>
        </div>
        <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
