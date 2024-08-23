import React, { useEffect, useState } from "react";
import "./../AllCategoriesDisplay/AllCategoriesDisplay.css";
import ring from "./../../../Assets/ring.png";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import slugify from "slugify";
import Loader from "../../Loader/Loader";
import Pagination from "react-js-pagination";

function AllCategoriesDisplay() {
  const token = localStorage.getItem("token");
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CSRF-TOKEN": csrfToken,
    },
  });
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [productCategories, setproductCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const [activePage, setActivePage] = useState(1);
  const [itemsCountPerPage, setItemsCountPerPage] = useState("");
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchproductCategories(activePage);
  }, [activePage, id]);

  const fetchproductCategories = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/products/category/${id}?page=${activePage}`
      );
      setproductCategories(response.data.data);
      setItemsCountPerPage(response.data.per_page);
      setTotalItemsCount(response.data.total);
    } catch (error) {
      console.error("Error fetching product categories:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div>
      <div className="main_div_termandcondition_navbar">
        <p className="heading_termandcondition">CATEGORIES</p>
      </div>

      <div className="main_div_all_catgories">
        <div className="row m-0 p-0">
          <div className="col-lg-2 co-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 co-md-10 col-sm-12 col-12">
            <div className="row m-0 p-0">
              <div className="col-lg-2 col-md-2 col-sm-3 col-4 m-0 p-0">
                <p className="categories_para">CATEGORIES</p>
                <div className="brown_div_sidebar">
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        to={`/products/category/${category.id}`}
                        key={category.id}
                      >
                        <p
                          className={`all_category_names_para ${
                            category.id === parseInt(id) ? "selected" : ""
                          }`}
                        >
                          {category.name}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <Loader />
                  )}
                </div>
                <div className="ring_bg_sale_offer">
                  <p className="ring_off_style_para">Silver Rings</p>
                  <p className="ring_off_style_para1">25% OFF</p>
                </div>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-9 col-8">
                <div className="d-flex">
                  <div className="mr-auto dropdown">
                    <button
                      className="btn_dropdown_cat dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Categories
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <Link
                            to={`/products/category/${category.id}`}
                            key={category.id}
                          >
                            <p
                              className={`dropdowncategory ${
                                category.id === parseInt(id) ? "selected" : ""
                              }`}
                            >
                              {category.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </div>

                  <div className="">
                    <p className="products_numbers_style">
                      {productCategories.length} Products
                    </p>
                  </div>
                </div>
                <div className="row m-0 p-0">
                {
        isLoading ? (
          <Loader />
        ) : productCategories.length > 0 ? (
          productCategories.map((category) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-16" key={category.id}>
              <Link
                to={`/product/${category.id}/${slugify(category.name, { lower: true })}`}
              >
                <img
                  className="ring_cat_style_picture"
                  src={`${process.env.REACT_APP_BASE_URL}/storage/${category.images[0]}`}
                />
                <div className="name_price_div">
                  <p className="name_para_ring">{category.name}</p>
                  <p className="price_para_ring">RS.{category.price}</p>
                  <div className="d-flex justify-content-center">
                    <button className="shop_now_btn_ring">SHOP NOW</button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="no_product_found">No products found</p>
        )
      }
                  <div className="pagination_products">
                    <div className="d-flex justify-content-end">
                      {productCategories.length > 0 ? (
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
              </div>
            </div>
          </div>
          <div className="col-lg-2 co-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </div>
  );
}

export default AllCategoriesDisplay;
