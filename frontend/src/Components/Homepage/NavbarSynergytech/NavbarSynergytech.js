import React from "react";
import "./../NavbarSynergytech/NavbarSynergytech.css";
import synergy from "./../../../Assets/synergy-logo-3 1.png";
import clock from "./../../../Assets/clock_syn.png";
import location from "./../../../Assets/loction_syn.png";
import email from "./../../../Assets/email_syn.png";
import phone from "./../../../Assets/phone_syn.png";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

function NavbarSynergytech() {
  return (
    <div>
      <>
        <div className="uppernavbar">
          <div className="inside_div_navbar">
            <div className="d-flex justify-content-between content-wrapper">
              <div className="d-flex flex-row">
                <div className="d-flex flex-row">
                  <img src={clock} className="clock_style_syn" alt="clock" />
                  <p className="clock_para_syn">
                    Mon - Fri: 09.00am - 10.00 pm
                  </p>
                </div>
                <div className="d-flex flex-row main_div_clock">
                  <img src={clock} className="clock_style_syn" alt="clock" />
                  <p className="clock_para_syn">Richardson, California 62639</p>
                </div>
                <div className="d-flex flex-row main_div_clock">
                  <img src={clock} className="clock_style_syn" alt="clock" />
                  <p className="clock_para_syn">TANGO@mail.com</p>
                </div>
              </div>

              <div className="transform_second_div">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-row">
                    <img src={phone} className="phone_style_syn" alt="phone" />
                    <p className="clock_para_syn">Make a Call</p>
                    <p className="phone_para_syn_bold">+36 55 540 069</p>
                    <div className="social-media-row">
                      <a
                        href="https://www.facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="social-icon" />
                      </a>
                      <a
                        href="https://www.twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="social-icon" />
                      </a>
                      <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="social-icon" />
                      </a>
                      <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="social-icon" />
                      </a>
                      <a
                        href="https://www.youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaYoutube className="social-icon" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="#">
          <img src={synergy} className="synergytech_logo" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <p class="navitems_synergytechnavbar1">HOME </p>
            </li>
            <li class="nav-item">
              <p class="navitems_synergytechnavbar">LINK</p>
            </li>
            <li class="nav-item">
              <p class="navitems_synergytechnavbar">SERVICES </p>
            </li>
            <li class="nav-item">
              <p class="navitems_synergytechnavbar">BLOGS</p>
            </li>
            <li class="nav-item">
              <p class="navitems_synergytechnavbar">NEWS </p>
            </li>
            <li class="nav-item">
              <p class="navitems_synergytechnavbar">CONTACT</p>
            </li>
          </ul>
          <form class="form-inline">
            <button class="btn_request_quote" type="submit">
              REQUEST A QUOTE
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
}

export default NavbarSynergytech;
