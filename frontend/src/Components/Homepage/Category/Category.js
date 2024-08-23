import React, { useEffect, useState } from "react";
import "./../Category/Category.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../Loader/Loader";

function Category() {
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
  const [categories, setCategories] = useState([]);

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
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  return (
    <div className="main_div_category">
      <p className="heading_category">CATEGORY</p>
      <div className="row m-0 p-0">
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-8 col-md-10 col-sm-12 col-12">
          <div className="row m-0 p-0">
            {categories ? (
              categories.map((category) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 col-12"
                  key={category.id}
                >
                  <Link to={`/products/category/${category.id}`}>
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/storage/${category.image}`}
                      className="img_category_style"
                      alt={category.name}
                    />
                    <button className="btn_category_style">
                      {/* {category.name} */}
                      {truncateText(category.name, 16)}
                    </button>
                  </Link>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
      </div>
    </div>
  );
}

export default Category;
