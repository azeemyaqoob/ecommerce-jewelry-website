import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../ProfileView/ProfileView.css";
import Navbar from "../../Homepage/Navbar/Navbar";
import Footer from "../../Homepage/Footer/Footer";
import FooterEnd from "../../Homepage/FooterEnd/FooterEnd";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";

function ProfileView() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const [notificationMessage, setnotificationMessage] = useState(null);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Fetch user data
    axiosInstance
      .get("/api/user")
      .then((response) => {
        console.log(response, "user resp");
        setUserData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
        });
      })
      .catch((error) => {
        setnotificationMessage(error.response.data.message);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
        console.error("Error fetching user data:", error);
      });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the update starts
    axiosInstance
      .put("/api/user", userData)
      .then((response) => {
        setnotificationMessage("User info updated successfully");
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .catch((error) => {
        setnotificationMessage(error.response.data.message);
        setTimeout(() => {
          setnotificationMessage("");
        }, 4000);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the update completes
      });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/signin");
  };
  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} className="scroll-to-top-button">
          <span>&uarr;</span>
        </button>
      )}

      <>
        {notificationMessage === null ? null : (
          <NotificationDisplay message={notificationMessage} />
        )}
      </>
      <Navbar />

      <div className="main_div_signin">
        <div className="row m-0 p-0">
          <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
          <div className="col-lg-4 col-md-6 col-sm-8 col-12">
            <p className="signin_heading">Profile</p>
            <form onSubmit={handleSubmit}>
              <input
                className="input_email_signin"
                type="text"
                name="first_name"
                placeholder="First Name"
                value={userData.first_name}
                onChange={handleChange}
              />
              <input
                className="input_email_signin"
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={userData.last_name}
                onChange={handleChange}
              />
              <input
                className="input_email_signin"
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
              />

              <div className="d-flex justify-content-center">
                <button className="signin_btn" type="submit" disabled={loading}>
                  {loading ? <Loader /> : "Update"}{" "}
                  {/* Conditionally render Loader or button text */}
                </button>
              </div>
            </form>

            <p className="create_account_para" onClick={handleLogout}>
              Logout
            </p>
          </div>
          <div className="col-lg-4 col-md-3 col-sm-2 col-12"></div>
        </div>
      </div>
      <Footer />
      <FooterEnd />
    </div>
  );
}

export default ProfileView;
