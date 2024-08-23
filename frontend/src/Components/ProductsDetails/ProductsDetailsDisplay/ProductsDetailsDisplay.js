import React, { useEffect, useState } from "react";
import "./../ProductsDetailsDisplay/ProductsDetailsDisplay.css";
import ring from "./../../../Assets/ring.png";
import Slider from "react-slick";
import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import NotificationDisplay from "../../NotificationDisplay/NotificationDisplay";
import Loader from "../../Loader/Loader";
import RingSizeGuideDetail from "../../RingSizeGuide/RingSizeGuideDescription/RingSizeGuideDetail";
import slugify from "slugify";
import BangleSizeGuideDetail from "../../BangleSizeGuide/BangleSizeGuideDetail/BangleSizeGuideDetail";

function ProductsDetailsDisplay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    beforeChange: function (currentSlide, nextSlide) {
      // console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
      // console.log("after change", currentSlide);
    },
  };
  const [notificationMessage, setnotificationMessage] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  console.log(images, "IMAGES show");

  console.log(sizes, ": sizes after API");

  // const handleIncrement = (index) => {
  //   const newSizes = [...sizes];
  //   newSizes[index].quantity += 1;
  //   setSizes(newSizes);
  // };

  // const handleDecrement = (index) => {
  //   const newSizes = [...sizes];
  //   if (newSizes[index].quantity > 0) {
  //     newSizes[index].quantity -= 1;
  //   }
  //   setSizes(newSizes);
  // };

  const [isEditing, setIsEditing] = useState({
    productName: false,
    productPrice: false,
    productDescription: false,
    typeDetail: false,
    vendor: false,
    sku: false,
    tags: false,
  });

  const [values, setValues] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    typeDetail: "",
    vendor: "",
    sku: "",
    tags: "",
  });

  const handleEdit = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleBlur = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Get the 'id' parameter from the route
  const { id } = useParams();

  // Initialize the state to store the blog post data
  const [Productdata, setProductdata] = useState(null);

  // Fetch the blog post data when the component mounts
  useEffect(() => {
    getProductdata();
  }, [id]);

  // Fetch blog post data from the API
  const getProductdata = () => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        console.log(res, "product desp");
        setProductdata(res.data);
        console.log(res.data, "IMAGES API RESP");
        setValues({
          productName: res.data.name,
          productPrice: res.data.price,
          productDescription: res.data.description,
          typeDetail: res.data.type,
          vendor: res.data.vendor,
          sku: res.data.sku,
          tags: res.data.tags,
        });
        setImages(res.data.images);

        // Convert object to array of objects
        const sizesArray = Object.values(res.data.sizes);

        const mappedSizes = sizesArray.map((sizeObj) => ({
          size: sizeObj.size,
          quantity: sizeObj.quantity,
        }));
        console.log(mappedSizes, "mapped sizes");

        setSizes(mappedSizes); // Update state with mapped sizes
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        // Implement error handling as needed
      });
  };

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  console.log(user, "userdata");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/api/user");
      setUser(response.data);
      setUsername(response.data.first_name);
    } catch (err) {
    } finally {
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const updatedProduct = {
        name: values.productName,
        price: values.productPrice,
        description: values.productDescription,
        type: values.typeDetail,
        vendor: values.vendor,
        sku: values.sku,
        tags: values.tags,
        sizes: sizes.reduce((acc, size) => {
          acc[size.size] = { size: size.size, quantity: size.quantity };
          return acc;
        }, {}),
      };

      const response = await axios.put(`/api/products/${id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Product updated successfully:", response.data);
      setnotificationMessage("Product updated successfully");
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
      // Refresh the product data after update
      getProductdata();
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error states or notify the user
    }
  };

  // const [selectedSize, setSelectedSize] = useState(null);
  // const [showQuantity, setShowQuantity] = useState(false);
  // const [count, setCount] = useState(1);
  const [sizeQuantityArray, setSizeQuantityArray] = useState([]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [count, setCount] = useState(1);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    const selected = sizes.find((s) => s.size === size);
    setSelectedQuantity(selected ? selected.quantity : 1);
    setCount(1); // Reset count when a new size is selected
  };

  const handleIncrement = () => {
    if (count < selectedQuantity) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  useEffect(() => {
    if (selectedSize) {
      storeSizeQuantity();
    }
  }, [count, selectedSize]);

  const storeSizeQuantity = () => {
    const sizeQuantity = {
      size: selectedSize,
      quantity: count,
    };

    setSizeQuantityArray((prevArray) => {
      const existingIndex = prevArray.findIndex(
        (item) => item.size === selectedSize
      );
      if (existingIndex !== -1) {
        const newArray = [...prevArray];
        newArray[existingIndex] = sizeQuantity;
        return newArray;
      } else {
        return [...prevArray, sizeQuantity];
      }
    });

    console.log("Selected Size:", selectedSize, "Quantity:", count);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setnotificationMessage("Please select a size");
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      id: id,
      size: selectedSize,
      count: count,
    };

    // Find the existing item in the cart by ID and size
    const existingItemIndex = cart.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size
    );

    if (existingItemIndex !== -1) {
      // Item exists in cart with the same size, increment the count
      cart[existingItemIndex].count += newItem.count;
    } else {
      // Item does not exist in cart, push the new item
      cart.push(newItem);
    }

    // Update the local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Item added to cart:", newItem);
    setSelectedQuantity(0);
    setSelectedSize(null);
    setnotificationMessage("Item added to cart");
    setTimeout(() => {
      setnotificationMessage("");
    }, 4000);
  };

  const navigate = useNavigate();

  const handleBuyItNow = () => {
    if (!selectedSize) {
      setnotificationMessage("Please select a size");
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const newItem = {
      id: id,
      size: selectedSize,
      count: count,
    };

    // Find the existing item in the cart by ID and size
    const existingItemIndex = cart.findIndex(
      (item) => item.id === newItem.id && item.size === newItem.size
    );

    if (existingItemIndex !== -1) {
      // Item exists in cart with the same size, increment the count
      cart[existingItemIndex].count += newItem.count;
    } else {
      // Item does not exist in cart, push the new item
      cart.push(newItem);
    }

    // Update the local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Item added to cart:", newItem);

    setnotificationMessage("Item added to cart");
    setTimeout(() => {
      setnotificationMessage("");
      navigate("/cart");
    }, 1000);
  };

  const settingsproduct = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const [productsSlider, setProductsSlider] = useState([]);

  useEffect(() => {
    fetchProductsslider();
  }, []);

  const fetchProductsslider = (pageNumber) => {
    axios
      .get(`/api/products`)
      .then((response) => {
        setProductsSlider(response.data);
        console.log(response.data, "slider prodicts");
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

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
    <>
      <>
        {notificationMessage === null ? null : (
          <NotificationDisplay message={notificationMessage} />
        )}
      </>
      <div className="main_div_termandcondition_navbar">
        <p className="heading_termandcondition">Product details</p>
      </div>

      <div className="main_div_productdetail">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="row m-0 p-0">
              <div className="col-lg-3 col-md-3 col-sm-3 col-3 p-0 m-0">
                <div className="slider-container">
                  <Slider {...settings}>
                    {images ? (
                      images.map((product) => (
                        <div>
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/storage/${product}`}
                            className="img_product_detail"
                          />
                        </div>
                      ))
                    ) : (
                      <Loader />
                    )}
                  </Slider>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-1 col-1"></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                {token && username == "admin" && isEditing.productName ? (
                  <input
                    type="text"
                    value={values.productName}
                    onChange={(e) => handleChange("productName", e)}
                    onBlur={() => handleBlur("productName")}
                    autoFocus
                    className="input_product_name"
                  />
                ) : (
                  <p
                    className="product_name"
                    onClick={() => handleEdit("productName")}
                  >
                    {values.productName}
                  </p>
                )}
                {token && username == "admin" && isEditing.productPrice ? (
                  <input
                    type="text"
                    value={values.productPrice}
                    onChange={(e) => handleChange("productPrice", e)}
                    onBlur={() => handleBlur("productPrice")}
                    autoFocus
                    className="input_product_name"
                  />
                ) : (
                  <div className="d-flex flex-row">
                    <p className="product_price">RS.</p>
                    <p
                      className="product_price"
                      onClick={() => handleEdit("productPrice")}
                    >
                      {values.productPrice}
                    </p>
                  </div>
                )}
                {token &&
                username == "admin" &&
                isEditing.productDescription ? (
                  <textarea
                    value={values.productDescription}
                    onChange={(e) => handleChange("productDescription", e)}
                    onBlur={() => handleBlur("productDescription")}
                    autoFocus
                    className="textarea_product_desp"
                  />
                ) : (
                  <p
                    className="product_description"
                    onClick={() => handleEdit("productDescription")}
                  >
                    {values.productDescription}
                  </p>
                )}
                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_para">Type</p>
                      <p className="type_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6">
                    {token && username == "admin" && isEditing.typeDetail ? (
                      <input
                        type="text"
                        value={values.typeDetail}
                        onChange={(e) => handleChange("typeDetail", e)}
                        onBlur={() => handleBlur("typeDetail")}
                        autoFocus
                        className="input_product_name"
                      />
                    ) : (
                      <p
                        className="type_detail"
                        onClick={() => handleEdit("typeDetail")}
                      >
                        {values.typeDetail}
                      </p>
                    )}
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_para">Vendor </p>
                      <p className="type_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6">
                    {token && username == "admin" && isEditing.vendor ? (
                      <input
                        type="text"
                        value={values.vendor}
                        onChange={(e) => handleChange("vendor", e)}
                        onBlur={() => handleBlur("vendor")}
                        autoFocus
                        className="input_product_name"
                      />
                    ) : (
                      <p
                        className="type_detail"
                        onClick={() => handleEdit("vendor")}
                      >
                        {values.vendor}
                      </p>
                    )}
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_para">Sku</p>
                      <p className="type_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6">
                    {token && username == "admin" && isEditing.sku ? (
                      <input
                        type="text"
                        value={values.sku}
                        onChange={(e) => handleChange("sku", e)}
                        onBlur={() => handleBlur("sku")}
                        autoFocus
                        className="input_product_name"
                      />
                    ) : (
                      <p
                        className="type_detail"
                        onClick={() => handleEdit("sku")}
                      >
                        {values.sku}
                      </p>
                    )}
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_para">Tags</p>
                      <p className="type_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6">
                    {token && username == "admin" && isEditing.tags ? (
                      <input
                        type="text"
                        value={values.tags}
                        onChange={(e) => handleChange("tags", e)}
                        onBlur={() => handleBlur("tags")}
                        autoFocus
                        className="input_product_name"
                      />
                    ) : (
                      <p
                        className="type_detail"
                        onClick={() => handleEdit("tags")}
                      >
                        {values.tags}
                      </p>
                    )}
                  </div>
                </div>
                <div className="d-flex m-0 p-0">
                  {/* <p className="size_chart_para">Size</p> */}
                  <p
                    className="size_chart_para"
                    data-toggle="modal"
                    data-target=".bd-example-modal-lg"
                  >
                    Size Chart
                  </p>
                </div>

                <div
                  class="modal fade bd-example-modal-lg"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="myLargeModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <RingSizeGuideDetail />
                      <BangleSizeGuideDetail/>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap">
                  {sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`btn_sizes ${
                        selectedSize === size.size ? "btn_sizes_selected" : ""
                      } ${size.quantity === 0 ? "btn_hide" : ""}`}
                      onClick={() => handleSizeClick(size.size)}
                      disabled={size.quantity === 0} // Optionally disable the button if quantity is 0
                    >
                      {console.log(size, "sizesssss")}
                      {size.size}
                    </button>
                  ))}
                </div>
                {selectedSize && selectedQuantity > 0 && (
                  <div className="d-flex flex-row">
                    <p className="quantity_para">
                      Available Quantity: {selectedQuantity}
                    </p>
                  </div>
                )}
                {selectedSize && selectedQuantity > 0 && (
                  <div className="d-flex flex-row">
                    <p className="quantity_para">Quantity</p>

                    <div className="quantity_count_div">
                      <button className="btn_minus" onClick={handleDecrement}>
                        -
                      </button>
                      <span className="btn_minus1">{count}</span>
                      <button className="btn_minus" onClick={handleIncrement}>
                        +
                      </button>
                    </div>
                  </div>
                )}
              

                {/* <div className="row m-0 p-0">
                  <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <p className="size_heading_add_product">Size</p>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                    <p className="size_heading_add_product">Quantity</p>
                  </div>
                  <div className="col-lg-2 col-md-6 col-sm-6 col-6">
                    <p className="size_heading_add_product displaynone">Size</p>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                    <p className="size_heading_add_product displaynone">
                      Quantity
                    </p>
                  </div>
                  {sizes.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="col-lg-2 col-md-6 col-sm-6 col-6"
                      >
                     
                        <button className="btn_sizes_for_addproduct_quantity">
                          {item.size}
                        </button>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                        
                        <div className="quantity_count_div_addproduct">
                          <button
                            className="btn_minus_addproduct"
                            onClick={() => handleDecrement(index)}
                          >
                            -
                          </button>
                          <span className="btn_minus1_addproduct">
                            {item.quantity}
                          </span>
                          <button
                            className="btn_minus_addproduct"
                            onClick={() => handleIncrement(index)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </>
                  ))}
                </div> */}

                {token && username == "admin" ? (
                  <div className="d-flex justify-content-end">
                    <button
                      className="submit_product"
                      onClick={handleUpdateProduct}
                    >
                      Update
                    </button>
                  </div>
                ) : null}

                <div className="row m-0 p-0">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6 ml-0 pl-0">
                    <button className="addtocart" onClick={handleAddToCart}>
                      ADD TO CART
                    </button>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6 mr-0 pr-0">
                    <button className="buyitnow" onClick={handleBuyItNow}>
                      BUY IT NOW
                    </button>
                  </div>
                </div>

                <div className="acordian_div">
                  <div
                    className="accordion"
                    id="accordionPanelsStayOpenExample"
                  >
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingOne"
                      >
                        <button
                          className="accordion-button"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseOne"
                          aria-expanded="true"
                          aria-controls="panelsStayOpen-collapseOne"
                        >
                          Accordion Item #1
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="panelsStayOpen-headingOne"
                      >
                        <div className="accordion-body">
                          <strong>
                            This is the first item's accordion body.
                          </strong>{" "}
                          It is shown by default, until the collapse plugin adds
                          the appropriate classes that we use to style each
                          element. These classes control the overall appearance,
                          as well as the showing and hiding via CSS transitions.
                          You can modify any of this with custom CSS or
                          overriding our default variables. It's also worth
                          noting that just about any HTML can go within the{" "}
                          <code>.accordion-body</code>, though the transition
                          does limit overflow.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingTwo"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseTwo"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseTwo"
                        >
                          Accordion Item #2
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingTwo"
                      >
                        <div className="accordion-body">
                          <strong>
                            This is the second item's accordion body.
                          </strong>{" "}
                          It is hidden by default, until the collapse plugin
                          adds the appropriate classes that we use to style each
                          element. These classes control the overall appearance,
                          as well as the showing and hiding via CSS transitions.
                          You can modify any of this with custom CSS or
                          overriding our default variables. It's also worth
                          noting that just about any HTML can go within the{" "}
                          <code>.accordion-body</code>, though the transition
                          does limit overflow.
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2
                        className="accordion-header"
                        id="panelsStayOpen-headingThree"
                      >
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#panelsStayOpen-collapseThree"
                          aria-expanded="false"
                          aria-controls="panelsStayOpen-collapseThree"
                        >
                          Accordion Item #3
                        </button>
                      </h2>
                      <div
                        id="panelsStayOpen-collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="panelsStayOpen-headingThree"
                      >
                        <div className="accordion-body">
                          <strong>
                            This is the third item's accordion body.
                          </strong>{" "}
                          It is hidden by default, until the collapse plugin
                          adds the appropriate classes that we use to style each
                          element. These classes control the overall appearance,
                          as well as the showing and hiding via CSS transitions.
                          You can modify any of this with custom CSS or
                          overriding our default variables. It's also worth
                          noting that just about any HTML can go within the{" "}
                          <code>.accordion-body</code>, though the transition
                          does limit overflow.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="para_may_like">YOU MAY ALSO LIKE</p>

            <div className="row m-0 p-0">
              <Slider {...settingsproduct}>
                {productsSlider?.map((product) => (
                  <div key={product.id} className="col">
                    <Link
                      to={`/product/${product.id}/${slugify(product.name, {
                        lower: true,
                      })}`}
                      onClick={scrollToTop}
                    >
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/storage/${product.images[0]}`}
                        className="img_style_new_arrivals"
                        alt={product.name}
                      />
                      <div className="price_name_div_newarrivals">
                        <p className="name_new_arrival">{product.name}</p>
                        <p className="price_new_arrival">{product.price}</p>
                        <button className="btn_shop_new_arrival">
                          SHOP NOW
                        </button>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </>
  );
}

export default ProductsDetailsDisplay;
