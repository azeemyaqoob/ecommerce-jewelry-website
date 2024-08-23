import React, { useState } from "react";
import axios from "axios";
import "./../SignupPage/SignupPage.css";
import Loader from "../../../Loader/Loader";
import NotificationDisplay from "../../../NotificationDisplay/NotificationDisplay";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignupPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notificationMessage, setnotificationMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("api/register", formData);

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
      setnotificationMessage("User created successfully, now login");
      setTimeout(() => {
        setnotificationMessage("");
        navigate("/signin");
      }, 4000);
    } catch (err) {
      setnotificationMessage(err.response?.data || "Registration failed");
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notificationMessage && (
        <NotificationDisplay message={notificationMessage} />
      )}

      <div className="main_div_signin">
        <div className="row m-0 p-0">
          <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
          <div className="col-lg-4 col-md-6 col-sm-8 col-12">
            <p className="signin_heading">Sign up</p>
            <form onSubmit={handleSubmit}>
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="input_email_signin"
                placeholder="First Name"
                required
              />
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="input_email_signin"
                placeholder="Last Name"
                required
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input_email_signin"
                placeholder="Email"
                required
              />
              <div className="password-input-container">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="input_email_signin"
                  placeholder="Password"
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="signin_btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Loader /> : "CREATE"}
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
