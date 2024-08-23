import React, { useState, useEffect, useRef } from "react";
import "./../Fashion/Fashion.css";
import axios from "axios";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
import Loader from "../../Loader/Loader";
import summerfashion from "./../../../Assets/summer sale.png";
import weddingfashion from "./../../../Assets/bangle fashion.png";
import classyfashion from "./../../../Assets/classy fashion.png";
import trendingfashion from "./../../../Assets/trending fashion.png";
import casualfashion from "./../../../Assets/casual fashion.png";

function Fashion() {
  const [headings, setHeadings] = useState({
    heading_summer_Sale: "",
    below_heading_summer_Sale: "",
  });
  const [isEditing, setIsEditing] = useState({
    heading_summer_Sale: false,
    below_heading_summer_Sale: false,
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [notificationMessage, setNotificationMessage] = useState(null);
  const headingSummerSaleRef = useRef(null);
  const belowHeadingSummerSaleRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/headings")
      .then((response) => {
        setHeadings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the headings!", error);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = (field) => {
    axios
      .put("/api/headings", headings)
      .then((response) => {
        setIsEditing({ ...isEditing, [field]: false });
        setNotificationMessage(response.data.message);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
      })
      .catch((error) => {
        console.error("There was an error updating the headings!", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeadings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (field) => {
    handleSaveClick(field);
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main_div_fashion">
      {notificationMessage && (
        <NotificationDisplay message={notificationMessage} />
      )}
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="summer_photo_div">
                {token &&
                username === "admin" &&
                isEditing.heading_summer_Sale ? (
                  <input
                    type="text"
                    name="heading_summer_Sale"
                    value={headings.heading_summer_Sale}
                    onChange={handleChange}
                    className="input_heading_summer"
                    onBlur={() => handleBlur("heading_summer_Sale")}
                    autoFocus
                    ref={headingSummerSaleRef}
                  />
                ) : (
                  <p
                    className="heading_summer_Sale"
                    onClick={() => handleEditClick("heading_summer_Sale")}
                  >
                    {truncateText(headings.heading_summer_Sale, 12)}
                  </p>
                )}
                {token &&
                username === "admin" &&
                isEditing.below_heading_summer_Sale ? (
                  <input
                    type="text"
                    name="below_heading_summer_Sale"
                    value={headings.below_heading_summer_Sale}
                    onChange={handleChange}
                    className="input_heading_summer"
                    onBlur={() => handleBlur("below_heading_summer_Sale")}
                    autoFocus
                    ref={belowHeadingSummerSaleRef}
                  />
                ) : (
                  <p
                    className="below_heading_summer_Sale"
                    onClick={() => handleEditClick("below_heading_summer_Sale")}
                  >
                    {truncateText(headings.below_heading_summer_Sale, 18)}
                  </p>
                )}
                <div className="d-flex justify-content-center">
                  <button className="btn_summer_sale">SHOP NOW</button>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-sm-12 col-12">
              <div className="row m-0 p-0">
                <div className="col-lg-7 col-md-12 col-sm-6 col-12">
                  <img
                    src={weddingfashion}
                    className="wedding_fashion_style_icon"
                  />
                  <button className="btn_wedding_fashion">
                    WEDDING FASHION
                  </button>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-6 col-12">
                  <img
                    src={classyfashion}
                    className="wedding_fashion_style_icon"
                  />
                  <button className="btn_wedding_fashion">
                    CLASSY FASHION
                  </button>
                </div>
              </div>
              <div className="row m-0 p-0">
                <div className="col-lg-5 col-md-12 col-sm-6 col-12">
                  <img
                    src={trendingfashion}
                    className="wedding_fashion_style_icon"
                  />
                  <button className="btn_wedding_fashion">
                    TRENDING FASHION
                  </button>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-6 col-12">
                  <img
                    src={casualfashion}
                    className="wedding_fashion_style_icon"
                  />
                  <button className="btn_wedding_fashion">
                    CASUAL FASHION
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default Fashion;
