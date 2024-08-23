import React, { useState, useEffect, useRef } from "react";
import "./../NadiaChottani/NadiaChottani.css";
import axios from "axios";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
import Loader from "../../Loader/Loader";

function NadiaChottani() {
  const [headings, setHeadings] = useState({
    heading_nadia: "",
    para_nadia: "",
  });
  const [isEditing, setIsEditing] = useState({
    heading_nadia: false,
    para_nadia: false,
  });
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const [notificationMessage, setNotificationMessage] = useState(null);
  const headingNadiaRef = useRef(null);
  const paraNadiaRef = useRef(null);

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
          setNotificationMessage("");
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
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength);
  };

  const paragraphText =
    "Discover a world where exquisite jewellery of diverse metals redefines modern elegance. Guided by Nadia Chhotani, a 4th generation jeweller from a 75-year-old legacy, our brand brings a fusion of eastern and western traditions to life. Nadia's designs, inspired by a kaleidoscope of gemstones set in various precious metals, radiate quality, luxury, and a distinct style that suits every woman, every occasion. This is more than jewellery - it's an expression of your unique persona, masterfully blending timeless tradition with contemporary flair.";

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main_div_nadia">
      {notificationMessage !== null && (
        <NotificationDisplay message={notificationMessage} />
      )}
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          {token && username === "admin" && isEditing.heading_nadia ? (
            <input
              type="text"
              name="heading_nadia"
              value={headings.heading_nadia}
              onChange={handleChange}
              className="input_heading_nadia"
              onBlur={() => handleBlur("heading_nadia")}
              autoFocus
              ref={headingNadiaRef}
            />
          ) : (
            <p
              className="heading_nadia"
              onClick={() => handleEditClick("heading_nadia")}
            >
              {truncateText(headings.heading_nadia, "Nadia Chottani".length)}
            </p>
          )}
          {token && username === "admin" && isEditing.para_nadia ? (
            <textarea
              name="para_nadia"
              value={headings.para_nadia}
              onChange={handleChange}
              className="input_heading_nadia"
              onBlur={() => handleBlur("para_nadia")}
              autoFocus
              ref={paraNadiaRef}
            />
          ) : (
            <p
              className="para_nadia"
              onClick={() => handleEditClick("para_nadia")}
            >
              {truncateText(headings.para_nadia, paragraphText.length)}
            </p>
          )}
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default NadiaChottani;
