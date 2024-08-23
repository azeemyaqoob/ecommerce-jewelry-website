import React from "react";
import "./../Footer/Footer.css";
import connected from "./../../../Assets/connected uicon.png";
import youtube from "./../../../Assets/youtube.png";
import facebook from "./../../../Assets/facebook.png";
import insta from "./../../../Assets/insta.png";
import twitter from "./../../../Assets/twitter.png";
import linked from "./../../../Assets/linkedin.png";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="main_div_footer">
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col-lg-4 col-md-6 col-sm-12 col-12 ">
              <p className="helpfullink_para">HELPFUL LINKS</p>
              <div className="row m-0 p-0">
                <div className="col-lg-6 col-md-6 col-sm-6 col-6 p-0 m-0">
                  <Link to="/">
                    <p className="serach_helpfulink_para">Home</p>
                  </Link>

                  <Link to="/contactus">
                    <p className="serach_helpfulink_para">Contact Us</p>
                  </Link>
                  <Link to="/newarrivals">
                    <p className="serach_helpfulink_para">New Arrivals</p>
                  </Link>
                  <Link to="/ringsizeguide">
                    <p className="serach_helpfulink_para">Ring Size Chart</p>
                  </Link>
                  <Link to="/banglesizeguide">
                    <p className="serach_helpfulink_para">Bangle Size Chart</p>
                  </Link>
                  <Link to="/faqs">
                    <p className="serach_helpfulink_para">FAQs</p>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-6 m-0 p-0">
                  <Link to="/privacypolicy">
                    <p className="serach_helpfulink_para">Privacy Policy</p>
                  </Link>
                  <Link to="/cart">
                    <p className="serach_helpfulink_para">Shopping Cart</p>
                  </Link>
                  <Link to="/exchangeandreturn">
                    <p className="serach_helpfulink_para">Exchange & Return</p>
                  </Link>
                  <Link to="/termandcondition">
                    <p className="serach_helpfulink_para">Terms & Conditions</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <p className="helpfullink_para">STAY CONNECTED</p>
              <div className="d-flex flex-row">
                <input className="input_style_connected" />
                <button className="btn_connected">
                  <img src={connected} />
                </button>
              </div>
              <div className="d-flex flex-row">
                <img src={facebook} className="icon_footer" />
                <img src={insta} className="icon_footer" />
                <img src={youtube} className="icon_footer" />
                <img src={twitter} className="icon_footer" />
                <img src={linked} className="icon_footer" />
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 col-12">
              <p className="helpfullink_para">CONTACT US</p>
              <p className="serach_helpfulink_para1">Telephone: 1234567890</p>
              <p className="serach_helpfulink_para">info@nadiachottani.com</p>
              <p className="serach_helpfulink_para">
                Address: House 123, Street 4, Central District
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default Footer;
