import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../TopSellingProducts/TopSellingProducts.css";
import necklace from "./../../../Assets/dummypic_neckless.png";
import slugify from "slugify";
import Slider from "react-slick";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";
function TopSellingProducts() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
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

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("api/products");
        setProducts(response.data);
        console.log(response.data, "resp product");
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  
  return (
    <div className="main_div_top_selling_products">
      <p className="heading_top_selling_product">TOP SELLING PRODUCTS</p>

      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <Slider {...settings}>
            {products ? products.map((product) => (
              <div className="col" key={product.id}>
                <Link
                to={`/product/${product.id}/${slugify(product.name, {
                  lower: true,
                })}`}
              >
                <img
            
                  src={`${process.env.REACT_APP_BASE_URL}/storage/${product.images[0]}`}
                  className="necklace_img_style_"
                  alt={product.name}
                />
                <div className="main_div_product_desp">
                <p className="necklace_name_style">{truncateText(product.name, 15)}</p>
                  <p className="necklace_price_style">RS. {product.price}</p>
                  <div className="d-flex justify-content-center">
                    <button className="btn_shpnow_necklace">SHOP NOW</button>
                  </div>
                </div>
              </Link>
              </div>
            )) : <Loader/>}
          </Slider>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default TopSellingProducts;
