import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import GoldandJewellery from "../GoldandJewellery/GoldandJewellery";
import TopSellingProducts from "../TopSellingProducts/TopSellingProducts";
import Category from "../Category/Category";
import NadiaChottani from "../NadiaChottani/NadiaChottani";
import Fashion from "../Fashion/Fashion";
import Testimonial from "../Testimonial/Testimonial";
import WhereWeShip from "../WhereWeShip/WhereWeShip";
import Footer from "../Footer/Footer";
import FooterEnd from "../FooterEnd/FooterEnd";
import NavbarSynergytech from "../NavbarSynergytech/NavbarSynergytech";
import Designation from "../Designation/Designation";

function HomepageMerge() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    scrollToTop();
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return (
    <div>
      <>
        {isVisible && (
          <button onClick={scrollToTop} className="scroll-to-top-button">
            <span>&uarr;</span>
          </button>
        )}
      </>
      {/* <NavbarSynergytech />
      <Designation /> */}
      <Navbar />
      <GoldandJewellery />
      <TopSellingProducts />
      <Category />
      <NadiaChottani />
      <Fashion />
      <Testimonial />
      <WhereWeShip />
      <Footer />
      <FooterEnd />
    </div>
  );
}

export default HomepageMerge;
