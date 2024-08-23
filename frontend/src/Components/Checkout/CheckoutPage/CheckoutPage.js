import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../CheckoutPage/CheckoutPage.css";
import delete_icon from "./.../../../../../Assets/delete icon.png";
import { useNavigate } from "react-router-dom";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [newsOffers, setNewsOffers] = useState(false);
  const [orderInstructions, setOrderInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery - COD");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    const orderinstruction = localStorage.getItem("orderInstructions");
    setOrderInstructions(orderinstruction);
    if (cartData) {
      fetchProductData(cartData);
    }
  }, []);

  const fetchProductData = async (cartData) => {
    const productDataPromises = cartData.map(async (item) => {
      try {
        const response = await axios.get(`/api/products/${item.id}`);
        return {
          ...response.data,
          count: item.count,
          size: item.size,
        };
      } catch (error) {
        console.error(`Error fetching product with id ${item.id}:`, error);
        return null;
      }
    });

    const productData = await Promise.all(productDataPromises);
    const validProductData = productData.filter((item) => item !== null);
    setCartItems(validProductData);
  };

  const handleDelete = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
  };

  const updateLocalStorage = (items) => {
    const cartData = items.map((item) => ({
      id: item.id,
      count: item.count,
      size: item.size,
    }));
    localStorage.setItem("cart", JSON.stringify(cartData));
    if (cartData.length === 0) {
      setNotificationMessage("Nothing in cart");
      setTimeout(() => {
        setNotificationMessage(null);
        navigate("/");
      }, 2000);
    }
  };

  const truncateText = (text, wordLimit) => {
    if (typeof text !== "string") return "";
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/orders", {
        email,
        first_name: firstName,
        last_name: lastName,
        country,
        address,
        apartment,
        city,
        postal_code: postalCode,
        phone,
        news_offers: newsOffers,
        order_instructions: orderInstructions,
        payment_method: paymentMethod,
        cart_items: cartItems.map((item) => ({
          id: item.id,
          count: item.count,
          size: item.size,
        })),
      });

      // Clear local storage upon successful API call
      localStorage.removeItem("cart");
      localStorage.removeItem("orderInstructions");

      setNotificationMessage("Order placed successfully!");
      setTimeout(() => {
        setNotificationMessage(null);
        navigate("/");
      }, 2000);
    } catch (error) {
      setNotificationMessage(error.response.data.message);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 2000);
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      {notificationMessage && (
        <NotificationDisplay message={notificationMessage} />
      )}
      <div className="main_div_termandcondition_navbar">
        <p className="heading_termandcondition">Checkout</p>
      </div>

      <div className="main_div_checkout">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="row m-0 p-0">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <p className="contactus_heading_checkout">Contact Us</p>
                <input
                  placeholder="Email"
                  className="email_style_checkout"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="checkbox"
                  id="newsOffers"
                  name="newsOffers"
                  checked={newsOffers}
                  onChange={(e) => setNewsOffers(e.target.checked)}
                />
                <label htmlFor="newsOffers" className="ml-3">
                  Email me with news and offers
                </label>

                <p className="contactus_heading_checkout">Delivery</p>
                <input
                  placeholder="Country/Region"
                  className="email_style_checkout"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <div className="row m-0 p-0">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 m-0 p-0">
                    <input
                      placeholder="First Name"
                      className="email_style_checkout"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 m-0 p-0">
                    <input
                      placeholder="Last Name"
                      className="email_style_checkout1"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <input
                  placeholder="Address"
                  className="email_style_checkout"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  placeholder="Apartment, suite, etc. (optional)"
                  className="email_style_checkout"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                />
              
                <div className="row m-0 p-0">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 m-0 p-0">
                    <input
                      placeholder="City"
                      className="email_style_checkout"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 m-0 p-0">
                    <input
                      placeholder="Postal Code (optional)"
                      className="email_style_checkout1"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  placeholder="Phone"
                  className="email_style_checkout"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <p className="contactus_heading_checkout">Shipping Method</p>
                <div className="shippingmethod">
                  <div className="d-flex justify-content-between">
                    <p className="shiiping_method_para">Flat Rate</p>
                    <p className="shiiping_method_para_rate">Rs 300</p>
                  </div>
                </div>

                <p className="contactus_heading_checkout">Shipping Method</p>
                <p className="contactus_heading_checkout_desp">
                  All transactions are secure and encrypted.
                </p>
                {/* <table className="table table-bordered mt-5">
                    <tbody>
                      <tr>
                        <td>
                          <p className="para_cod_description">
                            <input
                              type="radio"
                              id="payment1"
                              name="paymentMethod"
                              value="Debit - Credit Card"
                              checked={paymentMethod === "Debit - Credit Card"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="payment1" className="ml-3">
                              Debit - Credit Card
                            </label>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="para_cod_description">
                            <input
                              type="radio"
                              id="payment2"
                              name="paymentMethod"
                              value="Card & Online Payments"
                              checked={paymentMethod === "Card & Online Payments"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="payment2" className="ml-3">
                              Card & Online Payments
                            </label>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="para_cod_description">
                            <input
                              type="radio"
                              id="payment3"
                              name="paymentMethod"
                              value="Cash on Delivery - COD"
                              checked={paymentMethod === "Cash on Delivery - COD"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="payment3" className="ml-3">
                              Cash on Delivery - COD
                            </label>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="para_cod_description">
                            <input
                              type="radio"
                              id="payment4"
                              name="paymentMethod"
                              value="Bank Deposit"
                              checked={paymentMethod === "Bank Deposit"}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <label
                              htmlFor="payment4"
                              className="ml-3 para_cod_checbox"
                            >
                              Bank Deposit
                            </label>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table> */}

                <div id="accordion">
                  {/* <div class="card">
                    <div class="card-header" id="headingOne">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          <input
                            type="radio"
                            id="payment1"
                            name="paymentMethod"
                            value="Debit - Credit Card"
                            checked={paymentMethod === "Debit - Credit Card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="payment1" className="ml-3">
                            Debit - Credit Card
                          </label>
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseOne"
                      class="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        on click pay now you will go to payment page
                      </div>
                    </div>
                  </div> */}
                  <div class="card">
                    <div class="card-header" id="headingTwo">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          <input
                            type="radio"
                            id="payment3"
                            name="paymentMethod"
                            value="Cash on Delivery - COD"
                            checked={paymentMethod === "Cash on Delivery - COD"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="payment3" className="ml-3">
                            Cash on Delivery - COD
                          </label>
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseTwo"
                      class="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordion"
                    >
                      <div class="card-body">Cash on Delivery</div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="headingThree">
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="false"
                          aria-controls="collapseThree"
                        >
                          <input
                            type="radio"
                            id="payment4"
                            name="paymentMethod"
                            value="Bank Deposit"
                            checked={paymentMethod === "Bank Deposit"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label
                            htmlFor="payment4"
                            className="ml-3 para_cod_checbox"
                          >
                            Bank Deposit
                          </label>
                        </button>
                      </h5>
                    </div>
                    <div
                      id="collapseThree"
                      class="collapse"
                      aria-labelledby="headingThree"
                      data-parent="#accordion"
                    >
                      <div class="card-body">
                        TOONEY TEEZ <br />
                        Meezan Bank <br />
                        Account Number: 02530104714863
                        <br />
                        IBAN: PK69MEZN0002530104714863
                      </div>
                    </div>
                  </div>
                </div>

                {/* <p className="contactus_heading_checkout">Billing Address</p>
                <table className="table table-bordered mt-5">
                  <tbody>
                    <tr>
                      <td>
                        <p className="para_cod_description">
                          <input
                            type="checkbox"
                            id="billing1"
                            name="billing1"
                            value="Same as shipping address"
                          />
                          <label htmlFor="billing1" className="ml-3">
                            Same as shipping address
                          </label>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p className="para_cod_description">
                          <input
                            type="checkbox"
                            id="billing2"
                            name="billing2"
                            value="Different billing address"
                          />
                          <label htmlFor="billing2" className="ml-3">
                            Use a different billing address
                          </label>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table> */}

                <button
                  type="submit"
                  className="btn_pay_now_checkout"
                  onClick={handleSubmit}
                >
                  PAY NOW
                </button>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <div className="main_div_your_cart">
                  <p className="your_cart_para">Your Cart</p>
                  {cartItems.map((item, index) => (
                    <div key={index} className="d-flex flex-row">
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/storage/${item.images[0]}`}
                        className="cart_checkout_img_product"
                        alt="product"
                      />
                      <div>
                        <p className="name_product_checkout">
                          {truncateText(item.name, 10)}
                        </p>
                        <p className="colour_product_checkout">
                          Size: {item.size}
                        </p>
                        <p className="colour_product_checkout">
                          Quantity: {item.count}
                        </p>
                      </div>
                      <img
                        src={delete_icon}
                        className="delete_icon_style_checkout"
                        alt="delete"
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  ))}

                  <hr className="hr_line" />

                  <div className="d-flex justify-content-between">
                    <p className="tota_price_cart_checkout_heading">TOTAL</p>
                    <p className="tota_price_cart_checkout_para">
                      Rs{" "}
                      {cartItems.reduce(
                        (total, item) => total + item.price * item.count,
                        0
                      )}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="tota_price_cart_checkout_heading">SHIPPING</p>
                    <p className="tota_price_cart_checkout_para">Rs 300</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="tota_price_cart_checkout_heading">SUBTOTAL</p>
                    <p className="tota_price_cart_checkout_para">
                      Rs{" "}
                      {cartItems.reduce(
                        (total, item) => total + item.price * item.count,
                        0
                      ) + 300}
                    </p>
                  </div>
                  {/* <button className="check_btn_cart_pay">CHECKOUT</button> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
