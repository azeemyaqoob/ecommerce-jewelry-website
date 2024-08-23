import React, { useState, useEffect, useRef } from "react";
import "./../GoldandJewellery/GoldandJewellery.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
import Loader from "../../Loader/Loader";

function GoldandJewellery() {
  const [headings, setHeadings] = useState({ heading_jewellery: '', heading_jewellery_2: '', para_jewellery: '' });
  const [isEditing, setIsEditing] = useState({ heading_jewellery: false, heading_jewellery_2: false, para_jewellery: false });
  const [loading, setLoading] = useState(true); 

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [notificationMessage, setNotificationMessage] = useState(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    axios.get('/api/headings')
      .then(response => {
        setHeadings(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the headings!', error);
        setLoading(false);
      });
  }, []);

  const handleEditClick = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = (field) => {
    axios.put('/api/headings', headings)
      .then(response => {
        setIsEditing({ ...isEditing, [field]: false });
        setNotificationMessage(response.data.message);
        setTimeout(() => {
          setNotificationMessage("");
        }, 2000);
      })
      .catch(error => {
        console.error('There was an error updating the headings!', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeadings(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBlur = (field) => {
    handleSaveClick(field);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main_div_GoldandJewellery">
      {notificationMessage !== null && (
        <NotificationDisplay message={notificationMessage} />
      )}
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          {token && username === "admin" && isEditing.heading_jewellery ? (
            <input
              type="text"
              name="heading_jewellery"
              value={headings.heading_jewellery}
              onChange={handleChange}
              className="input_heading_jewellery"
              onBlur={() => handleBlur('heading_jewellery')}
              autoFocus
              ref={heading1Ref}
            />
          ) : (
            <p className="heading_jewellery" onClick={() => handleEditClick('heading_jewellery')}>
              {truncateText(headings.heading_jewellery, "GOLD & SILVER".length)}
            </p>
          )}
          {token && username === "admin" && isEditing.heading_jewellery_2 ? (
            <input
              type="text"
              name="heading_jewellery_2"
              value={headings.heading_jewellery_2}
              onChange={handleChange}
              className="input_heading_jewellery1"
              onBlur={() => handleBlur('heading_jewellery_2')}
              autoFocus
              ref={heading2Ref}
            />
          ) : (
            <p className="heading_jewellery_2" onClick={() => handleEditClick('heading_jewellery_2')}>
              {truncateText(headings.heading_jewellery_2, "JEWELLERY".length)}
            </p>
          )}
          {token && username === "admin" && isEditing.para_jewellery ? (
            <textarea
              name="para_jewellery"
              value={headings.para_jewellery}
              onChange={handleChange}
              className="input_heading_jewellery1"
              onBlur={() => handleBlur('para_jewellery')}
              autoFocus
              ref={paraRef}
            />
          ) : (
            <p className="para_jewellery" onClick={() => handleEditClick('para_jewellery')}>
              {headings.para_jewellery}
            </p>
          )}
          <div className="d-flex flex-row">
            <button className="btn_shop_now">SHOP NOW</button>
            <Link to="/newarrivals">
              <button className="new_arrival_btn">NEW ARRIVALS</button>
            </Link>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default GoldandJewellery;
