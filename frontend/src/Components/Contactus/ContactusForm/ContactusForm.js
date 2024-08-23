import React, { useState } from "react";
import "./../ContactusForm/ContactusForm.css";
import phone from "./../../../Assets/phone contact.png";
import email from "./../../../Assets/email contact.png";
import address from "./../../../Assets/adress contact.png";
import time from "./../../../Assets/time.png";
import axios from "axios";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
function ContactusForm() {
  const [name, setName] = useState("");
  const [emailinput, setEmail] = useState("");
  const [phoneinput, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [notificationMessage, setnotificationMessage] = useState(null);

  const handleSubmit = async () => {

    // const payload = {
    //     name: name,
    //     email: emailinput,
    //     phone: phoneinput,
    //     comment: comment,
    // }
    try {
      const response = await axios.post("/api/contact", {
        name: name,
        email: emailinput,
        phone: phoneinput,
        comment: comment,
      });
      setName("");
      setEmail("");
      setPhone("");
      setComment("");
      setnotificationMessage("Contact saved successfully!");
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
    } catch (error) {
      setnotificationMessage("Error submitting the form. Please try again.");
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
    }
  };
  return (
    <>
      <>
        {notificationMessage === null ? null : (
          <NotificationDisplay message={notificationMessage} />
        )}
      </>

      <div className="main_div_ContactusForm">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="row m-0 p-0">
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <p className="contact_us_heading">Contact Us</p>
                <input
                  placeholder="Name"
                  className="input_style_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Email*"
                  className="input_style_name"
                  value={emailinput}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="Phone number"
                  className="input_style_name"
                  value={phoneinput}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  placeholder="Comment"
                  className="textarea_style_comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="btn_send_contactusoform"
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                <p className="contact_us_heading">Get In Touch With Us</p>

                <div className="row m-0 p-0">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                    <img
                      src={phone}
                      className="email_icon_contactus"
                      alt="Phone"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                    <p className="para_phone_number_contactus">
                      (+91) 012-345-6789
                    </p>
                  </div>
                </div>

                <div className="row m-0 p-0">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                    <img
                      src={email}
                      className="email_icon_contactus"
                      alt="Email"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                    <p className="para_phone_number_contactus">
                      nadiachottani@exampledemo.com
                    </p>
                  </div>
                </div>

                <div className="row m-0 p-0">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                    <img
                      src={address}
                      className="email_icon_contactus"
                      alt="Address"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                    <p className="para_phone_number_contactus">
                      33 New Montgomery St. Ste 750 San Francisco, CA, USA 94105
                    </p>
                  </div>
                </div>

                <div className="row m-0 p-0">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                    <img
                      src={time}
                      className="email_icon_contactus"
                      alt="Time"
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                    <p className="para_phone_number_contactus">
                      Monday – Friday 10 AM – 8 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.2018527719247!2d74.25805527623903!3d31.40856425265624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901a4df466703%3A0xa9ba717b98084f51!2s360SynergyTech%20(Pvt.)%20Ltd!5e0!3m2!1sen!2s!4v1704355694100!5m2!1sen!2s"
              width="100%"
              height="480"
              className="map_setting_style"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </>
  );
}

export default ContactusForm;
