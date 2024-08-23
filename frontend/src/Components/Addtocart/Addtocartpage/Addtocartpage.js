import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../Addtocartpage/Addtocartpage.css";
import ring from "./../../../Assets/ring.png";
import deletebtn from "./../../../Assets/delete icon.png";
import { Link, useNavigate } from "react-router-dom";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
import Loader from "../../Loader/Loader";

function Addtocartpage() {
  const [cartItems, setCartItems] = useState([]);
  const [count, setCount] = useState(1);
  const [instructions, setInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = JSON.parse(localStorage.getItem("cart"));
      if (cartData) {
        await fetchProductData(cartData);
      }

      const savedInstructions = localStorage.getItem("orderInstructions");
      if (savedInstructions) {
        setInstructions(savedInstructions);
      }

      setIsLoading(false); // Set loading to false once data is fetched
    };

    fetchCartData();
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

  const handleIncrement = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].count += 1;
    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
  };

  const handleDecrement = (index) => {
    const newCartItems = [...cartItems];
    if (newCartItems[index].count > 1) {
      newCartItems[index].count -= 1;
      setCartItems(newCartItems);
      updateLocalStorage(newCartItems);
    }
  };

  const handleDelete = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);

    if (newCartItems.length === 0) {
      setNotificationMessage("No item in cart");
      setTimeout(() => {
        setNotificationMessage(null);
        navigate("/");
      }, 2000);
    }
  };

  const updateLocalStorage = (items) => {
    const cartData = items.map((item) => ({
      id: item.id,
      count: item.count,
      size: item.size,
    }));
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  const handleCheckout = () => {
    localStorage.setItem("orderInstructions", instructions);
    // Add any other checkout logic here
  };

  return (
    <div>
      {notificationMessage && (
        <NotificationDisplay message={notificationMessage} />
      )}
      <div className="main_div_termandcondition_navbar">
        <p className="heading_termandcondition">Your Shopping Cart</p>
      </div>

      <div className="main_div_cart">
        <div className="row m-0 p-0 mt-5">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            {isLoading ? (
              <Loader/>
            ) : (
              <>
                {cartItems.length === 0 ? (
                  <p className="no_product_found_in_cart">No product in cart</p>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">PRODUCT</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">
                            <div className="d-flex flex-row">
                              <img
                                src={`${process.env.REACT_APP_BASE_URL}/storage/${item.images[0]}`}
                                className="img_cart_product"
                                alt={item.name}
                              />
                              <div>
                                <p className="product_name_cart">{item.name}</p>
                                <p className="product_colour_cart">
                                  Size: {item.size}
                                </p>
                              </div>
                            </div>
                          </th>
                          <td>
                            <p className="price_product_cart">RS.{item.price}</p>
                          </td>
                          <td>
                            <div className="d-flex flex-row">

                                             {/* <div className="quantity_count_div_cart">
                          <button
                            className="btn_minus_cart"
                            onClick={() => handleDecrement(index)}
                          >
                            -
                          </button>
                          <span className="btn_minus1_cart">{item.count}</span>
                          <button
                            className="btn_minus_cart"
                            onClick={() => handleIncrement(index)}
                          >
                            +
                          </button>
                        </div> */}
                              <span className="show_div_quantity">{item.count}</span>
                              <div
                                className="delete_div_quantity"
                                onClick={() => handleDelete(index)}
                              >
                                <img
                                  src={deletebtn}
                                  className="delete_btn_quantity"
                                  alt="Delete"
                                />
                              </div>
                            </div>
                          </td>
                          <td>
                            <p className="total_price_cart">
                              Rs {item.price * item.count}
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <Link to="/">
                  <button className="continue_shopping">CONTINUE SHOPPING</button>
                </Link>
                <div className="row m-0 p-0">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 m-0 p-0">
                    <p className="para_instruction">Order Special Instructions</p>
                    <textarea
                      className="textarea_instruction"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div className="d-flex justify-content-end">
                      <div className="main_div_sub_total">
                        <div className="d-flex justify-content-between">
                          <p className="heading_sub_total"> SUB TOTAL</p>
                          <p className="rupee_cart">
                            Rs{" "}
                            {cartItems.reduce(
                              (total, item) => total + item.price * item.count,
                              0
                            )}
                          </p>
                        </div>
                        <p className="tax_calculated">
                          Taxes and shipping calculated at checkout
                        </p>
                        <Link to="/checkout">
                          <button
                            className="checkout_btn_cart"
                            onClick={handleCheckout}
                            disabled={cartItems.length === 0}
                          >
                            CHECKOUT
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </div>
  );
}

export default Addtocartpage;
