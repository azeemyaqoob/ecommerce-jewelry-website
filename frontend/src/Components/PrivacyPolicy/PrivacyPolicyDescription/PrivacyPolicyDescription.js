import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
import Loader from "../../Loader/Loader";
import "./../PrivacyPolicyDescription/PrivacyPolicyDescription.css";

function PrivacyPolicyDescription() {
  const [privacyPolicies, setPrivacyPolicies] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const componentRef = useRef(null);
  const inputRefs = useRef([]);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get("/api/privacy-policies")
      .then((response) => {
        setPrivacyPolicies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the privacy policies!",
          error
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target) &&
        !inputRefs.current.some((ref) => ref && ref.contains(event.target))
      ) {
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
      .put(
        `/api/privacy-policies/${privacyPolicies[index].id}`,
        privacyPolicies[index]
      )
      .then((response) => {
        setNotificationMessage(response.data.message);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
      })
      .catch((error) => {
        console.error("There was an error updating the privacy policy!", error);
      });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPolicies = [...privacyPolicies];
    updatedPolicies[index][name] = value;
    setPrivacyPolicies(updatedPolicies);
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
          {privacyPolicies.map((policy, index) => (
            <div key={policy.id}>
              {token && username === "admin" && isEditing === index ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    className="input_heading_faqs"
                    value={policy.title}
                    onChange={(e) => handleChange(index, e)}
                    autoFocus
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                  <textarea
                    name="content"
                    className="input_heading_terms1"
                    value={policy.content}
                    onChange={(e) => handleChange(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                </div>
              ) : (
                <div>
                  
                  <p
                    className="heading_termandconditiondesp"
                    onClick={() => handleEditClick(index)}
                  >
                    {policy.title}
                  </p>
                  <p
                    className="para_termandconditiondesp"
                    onClick={() => handleEditClick(index)}
                  >
                    {policy.content}
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

export default PrivacyPolicyDescription;
