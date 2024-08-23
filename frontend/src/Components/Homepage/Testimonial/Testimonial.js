import React from "react";
import "./../Testimonial/Testimonial.css";
import black from "./../../../Assets/Ellipse 2.png";
import Slider from "react-slick";
function Testimonial() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="main_div_testimonial">
      <p className="heading_testimonials">CLIENT TESTIMONIALS</p>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-9 col-sm-12 col-12">
          <p className="what_our_client_say">What Our Clients Say</p>

          <Slider {...settings}>
            <div className="col">
              <div className="main_div_card_testi">
                <div className="d-flex flex-row">
                  <div>
                    <div className="round_div_photo_testi"></div>
                    <img className="black_round_img" src={black} />
                  </div>
                  <div>
                    <p className="commnet_owner">Philip Anthorpy</p>
                    <p className="commnet_desp">UI Designer</p>
                  </div>
                </div>

                <p className="para_comment_card">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="col">
              <div className="main_div_card_testi">
                <div className="d-flex flex-row">
                  <div>
                    <div className="round_div_photo_testi"></div>
                    <img className="black_round_img" src={black} />
                  </div>
                  <div>
                    <p className="commnet_owner">Philip Anthorpy</p>
                    <p className="commnet_desp">UI Designer</p>
                  </div>
                </div>

                <p className="para_comment_card">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <div className="col">
              <div className="main_div_card_testi">
                <div className="d-flex flex-row">
                  <div>
                    <div className="round_div_photo_testi"></div>
                    <img className="black_round_img" src={black} />
                  </div>
                  <div>
                    <p className="commnet_owner">Philip Anthorpy</p>
                    <p className="commnet_desp">UI Designer</p>
                  </div>
                </div>

                <p className="para_comment_card">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </Slider>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default Testimonial;
