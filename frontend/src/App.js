import HomepageMerge from "./Components/Homepage/HomepageMerge/HomepageMerge";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TermsandconditionMerge from "./Components/Termsandcondition/TermsandconditionMerge/TermsandconditionMerge";
import PrivacyPolicyMerge from "./Components/PrivacyPolicy/PrivacyPolicyMerge/PrivacyPolicyMerge";
import ExchangeandreturnMerge from "./Components/Exchangeandreturn/ExchangeandreturnMerge/ExchangeandreturnMerge";
import FAQSMerge from "./Components/FAQS/FAQSMerge/FAQSMerge";
import ContactusMerge from "./Components/Contactus/ContactusMerge/ContactusMerge";
import RingSizeGuideMerge from "./Components/RingSizeGuide/RingSizeGuideMerge/RingSizeGuideMerge";
import BangleSizeGuidemerge from "./Components/BangleSizeGuide/BangleSizeGuideMerge/BangleSizeGuidemerge";
import SigninMerge from "./Components/Signin&upPages/Signin/SigninMerge/SigninMerge";
import SignupMerge from "./Components/Signin&upPages/Signup/SignupMerge/SignupMerge";
import ForgetPasswordMerge from "./Components/Signin&upPages/ForgetPasswordPage/ForgetPasswordMerge/ForgetPasswordMerge";
import AllCategoriesmerge from "./Components/AllCategories/AllCategoriesmerge/AllCategoriesmerge";
import NewArrivalsMerge from "./Components/NewArrivals/NewArrivalsMerge/NewArrivalsMerge";
import ProductsDetailsMerge from "./Components/ProductsDetails/ProductsDetailsMerge/ProductsDetailsMerge";
import AddtocartMerge from "./Components/Addtocart/AddtocartMerge/AddtocartMerge";
import CheckoutMerge from "./Components/Checkout/CheckoutMerge/CheckoutMerge";
import AddproductMerge from "./Components/Dashboard/Addproducts/AddproductMerge/AddproductMerge";
import AddcategoryMerge from "./Components/Dashboard/Addcategory/AddcategoryMerge/AddcategoryMerge";
import ResetPasswordmerge from "./Components/Signin&upPages/ResetPasswordPage/ResetPasswordmerge/ResetPasswordmerge";
import Navbar from "./Components/Homepage/Navbar/Navbar";
import ProfileView from "./Components/Dashboard/ProfileView/ProfileView";
function App() {
  return (
    <div>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<HomepageMerge />} />
          <Route path="/products/category/:id" element={<AllCategoriesmerge />} />
          <Route path="/newarrivals" element={<NewArrivalsMerge />} />
          <Route path="/product/:id/:title" element={<ProductsDetailsMerge />} />
          <Route path="/cart" element={<AddtocartMerge />} />
          <Route path="/checkout" element={<CheckoutMerge />} />

          <Route path="/addproducts" element={<AddproductMerge />} />
          <Route path="/addcategory" element={<AddcategoryMerge />} />

          <Route path="/termandcondition"  element={<TermsandconditionMerge />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyMerge />} />
          <Route path="/exchangeandreturn" element={<ExchangeandreturnMerge />}    />
          <Route path="/faqs" element={<FAQSMerge />} />
          <Route path="/contactus" element={<ContactusMerge />} />
          <Route path="/ringsizeguide" element={<RingSizeGuideMerge />} />
          <Route path="/banglesizeguide" element={<BangleSizeGuidemerge />} />

          <Route path="/signin" element={<SigninMerge />} />
          <Route path="/signup" element={<SignupMerge />} />
          <Route path="/forget-password" element={<ForgetPasswordMerge />} />
          <Route path="/reset-password" element={<ResetPasswordmerge />} />
          <Route path="/profile-view" element={<ProfileView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
