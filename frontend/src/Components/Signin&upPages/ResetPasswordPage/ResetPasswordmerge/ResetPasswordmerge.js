import React, { useEffect, useState } from "react";
import Navbar from "../../../Homepage/Navbar/Navbar";
import ResetPasswordNavbar from "../ResetPasswordNavbar/ResetPasswordNavbar";
import ResetPassword from "../ResetPassword/ResetPassword";
import Footer from "../../../Homepage/Footer/Footer";
import FooterEnd from "../../../Homepage/FooterEnd/FooterEnd";

function ResetPasswordmerge() {
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
      <Navbar />
      <ResetPasswordNavbar />
      <ResetPassword />
      <Footer />
      <FooterEnd />
    </div>
  );
}

export default ResetPasswordmerge;
