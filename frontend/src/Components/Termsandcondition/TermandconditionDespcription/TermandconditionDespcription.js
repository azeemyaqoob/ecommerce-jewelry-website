import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
import Loader from "../../Loader/Loader";
import "./TermandconditionDespcription.css";

function TermandconditionDescription() {
  const [terms, setTerms] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const componentRef = useRef(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get("/api/terms-and-conditions")
      .then((response) => {
        setTerms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the Terms and Conditions!", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        if (isEditing !== null) {
          handleSaveClick(isEditing);
          setIsEditing(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  const handleEditClick = (index) => {
    setIsEditing(index);
  };

  const handleSaveClick = (index) => {
    axios
      .put(`/api/terms-and-conditions/${terms[index].id}`, terms[index])
      .then((response) => {
        setNotificationMessage(response.data.message);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
      })
      .catch((error) => {
        console.error("There was an error updating the Terms and Conditions!", error);
      });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTerms = [...terms];
    updatedTerms[index][name] = value;
    setTerms(updatedTerms);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main_div_TermandconditionDespcription" ref={componentRef}>
      {notificationMessage && (
        <NotificationDisplay message={notificationMessage} />
      )}
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          {terms.map((term, index) => (
            <div key={term.id}>
              {token && username === "admin" && isEditing === index ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    className="input_heading_terms"
                    value={term.title}
                    onChange={(e) => handleChange(index, e)}
                    autoFocus
                  />
                  <textarea
                    name="description"
                    className="input_heading_terms1"
                    value={term.description}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              ) : (
                <div>
                  <p
                    className="heading_termandconditiondesp"
                    onClick={() => handleEditClick(index)}
                  >
                    {term.title}
                  </p>
                  <p
                    className="para_termandconditiondesp"
                    onClick={() => handleEditClick(index)}
                  >
                    {term.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default TermandconditionDescription;
