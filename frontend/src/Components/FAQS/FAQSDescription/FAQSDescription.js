import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
import Loader from "../../Loader/Loader";

function FAQSDescription() {
  const [faqs, setFaqs] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const componentRef = useRef(null);

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get("/api/faqs")
      .then((response) => {
        setFaqs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the FAQs!", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        // Call API to save changes if there is any editing in progress
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
      .put(`/api/faqs/${faqs[index].id}`, faqs[index])
      .then((response) => {
        setNotificationMessage(response.data.message);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 2000);
      })
      .catch((error) => {
        console.error("There was an error updating the FAQ!", error);
      });
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = [...faqs];
    updatedFaqs[index][name] = value;
    setFaqs(updatedFaqs);
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
          {faqs.map((faq, index) => (
            <div key={faq.id}>
              {token && username === "admin" && isEditing === index ? (
                <div>
                  <input
                    type="text"
                    name="question"
                    className="input_heading_faqs"
                    value={faq.question}
                    onChange={(e) => handleChange(index, e)}
                    autoFocus
                  />
                  <textarea
                    name="answer"
                    className="input_heading_terms1"
                    value={faq.answer}
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
              ) : (
                <div>
                  <p
                    className="heading_termandconditiondesp"
                    onClick={() => handleEditClick(index)}
                  >
                    {faq.question}
                  </p>
                  <p
                    className="para_termandconditiondesp"
                    onClick={() => handleEditClick(index)}
                  >
                    {faq.answer}
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

export default FAQSDescription;
