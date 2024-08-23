import React from "react";
import "./../WhereWeShip/WhereWeShip.css";
import icon from "./../../../Assets/shipping worldwide.png";
import icon2 from "./../../../Assets/shop all online.png";
import icon3 from "./../../../Assets/return policy.png";
import icon4 from "./../../../Assets/card accepted.png";
import icon5 from "./../../../Assets/online support.png";

function WhereWeShip() {
  return (
    <div className="main_WhereWeShip">
      <p className="heading_WhereWeShip">WHERE WE SHIP TO</p>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            <div className="col">
              <div className="d-flex justify-content-center">
                <img src={icon} className="icon_style_shipment" />
              </div>

              <p className="heading_free_shipping">Free Shipping</p>
              <p className="para_free_shipping">Free Shipping Worldwide</p>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <img src={icon2} className="icon_style_shipment"  />
              </div>
              <p className="heading_free_shipping">Shop Online</p>
              <p className="para_free_shipping">Shop All Products Online</p>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <img src={icon3} className="icon_style_shipment"  />
              </div>
              <p className="heading_free_shipping">Return Policy</p>
              <p className="para_free_shipping">30 Days Return Policy</p>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <img src={icon4} className="icon_style_shipment"  />
              </div>
              <p className="heading_free_shipping">Payment Methods</p>
              <p className="para_free_shipping">All Cards Accepted</p>
            </div>
            <div className="col">
              <div className="d-flex justify-content-center">
                <img src={icon5} className="icon_style_shipment"  />
              </div>
              <p className="heading_free_shipping">Online Support</p>
              <p className="para_free_shipping">24/7 Online Support</p>
            </div>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default WhereWeShip;
