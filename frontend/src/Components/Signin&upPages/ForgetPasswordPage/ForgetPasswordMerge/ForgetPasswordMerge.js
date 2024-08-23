import React, { useEffect, useState } from "react";
import Navbar from "../../../Homepage/Navbar/Navbar";
import ForgetPasswordNavbar from "../ForgetPasswordNavbar/ForgetPasswordNavbar";
import Footer from "../../../Homepage/Footer/Footer";
import FooterEnd from "../../../Homepage/FooterEnd/FooterEnd";
import ForgetPasswordPage from "../ForgetPasswordPage/ForgetPasswordPage";

function ForgetPasswordMerge() {
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
      <ForgetPasswordNavbar />
      <ForgetPasswordPage />
      <Footer />
      <FooterEnd />
    </div>
  );
}

export default ForgetPasswordMerge;
