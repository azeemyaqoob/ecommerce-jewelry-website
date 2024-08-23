import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../NewArrivalsDisplay/NewArrivalsDisplay.css";
import ring from "./../../../Assets/ring.png";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
import slugify from "slugify";
import Pagination from "react-js-pagination"; // Correct import for react-js-pagination
import Slider from "react-slick/lib/slider";

function NewArrivalsDisplay() {
  const [products, setProducts] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState(12);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  useEffect(() => {
    fetchProducts(activePage);
  }, [activePage]);

  const fetchProducts = (pageNumber) => {
    axios
      .get(`/api/products-paginated?page=${pageNumber}`)
      .then((response) => {
        setProducts(response.data.data);
        setItemsCountPerPage(response.data.per_page);
        setTotalItemsCount(response.data.total);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const settings = {
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

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <>
      <div className="main_div_termandcondition_navbar">
        <p className="heading_termandcondition">NEW ARRIVALS</p>
      </div>
      <div className="main_div_new_arivals">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="row m-0 p-0">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product.id}
                    className="col-lg-3 col-md-4 col-sm-6 col-12"
                  >
                    <Link
                      to={`/product/${product.id}/${slugify(product.name, {
                        lower: true,
                      })}`}
                    >
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}/storage/${product.images[0]}`}
                        className="img_style_new_arrivals"
                        alt={product.name}
                      />
                      <div className="price_name_div_newarrivals">
                        <p className="name_new_arrival">
                          {/* {product.name} */}
                        {truncateText(product.name, 16)}
                        </p>
                        <p className="price_new_arrival">
                          {/* {product.price} */}
                          {truncateText(product.price, 16)}
                          </p>
                        <button className="btn_shop_new_arrival">
                          SHOP NOW
                        </button>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <Loader />
              )}
            </div>
            <div className="pagination_products">
              <div className="d-flex justify-content-end">
                {products.length > 0 ? (
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>

        <p className="para_may_like">YOU MAY ALSO LIKE</p>

        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="row m-0 p-0">
              <Slider {...settings}>
                {productsSlider
                  ? productsSlider?.map((product) => (
                      <div key={product.id} className="col">
                        <Link
                          to={`/product/${product.id}/${slugify(product.name, {
                            lower: true,
                          })}`}
                        >
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/storage/${product.images[0]}`}
                            className="img_style_new_arrivals"
                            alt={product.name}
                          />
                          <div className="price_name_div_newarrivals">
                            <p className="name_new_arrival">
                              {/* {product.name} */}
                              {truncateText(product.name, 16)}
                              </p>
                            <p className="price_new_arrival">
                              {/* {product.price} */}
                              {truncateText(product.price, 16)}
                              </p>
                            <button className="btn_shop_new_arrival">
                              SHOP NOW
                            </button>
                          </div>
                        </Link>
                      </div>
                    ))
                  : null}
              </Slider>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </>
  );
}

export default NewArrivalsDisplay;
