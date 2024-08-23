import React, { useEffect, useState } from "react";
import "./../AddPoductsPage/AddPoductsPage.css";
import uploadpic from "./../../../../Assets/upload pic icon.png";
import plusicon from "./../../../../Assets/plus icon.png";
import axios from "axios";
import NotificationDisplay from "../../../NotificationDisplay/NotificationDisplay";
import { Navigate, useNavigate } from "react-router-dom";

function AddProductsPage() {
  const token = localStorage.getItem("token");
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
  
      if (token && username === "admin") {
        navigate("/addproducts");
      } else {
        navigate("/");
      }
    }, [navigate]);
  

  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
      "X-CSRF-TOKEN": csrfToken,
    },
  });
  const [notificationMessage, setnotificationMessage] = useState(null);
  const [sizes, setSizes] = useState([
    { size: '33"', quantity: 0 },
    { size: '34"', quantity: 0 },
    { size: '35"', quantity: 0 },
    { size: '36"', quantity: 0 },
    { size: '37"', quantity: 0 },
    { size: '38"', quantity: 0 },
    { size: '39"', quantity: 0 },
    { size: '40"', quantity: 0 },
    { size: '41"', quantity: 0 },
    { size: '42"', quantity: 0 },
    { size: '43"', quantity: 0 },
    { size: '44"', quantity: 0 },
    { size: '45"', quantity: 0 },
    { size: '46"', quantity: 0 },
    { size: '47"', quantity: 0 },
    { size: '48"', quantity: 0 },
    { size: 'S"', quantity: 0 },
    { size: 'M"', quantity: 0 },
    { size: 'L"', quantity: 0 },
    { size: 'XL"', quantity: 0 },
  ]);

  const handleIncrement = (index) => {
    const newSizes = [...sizes];
    newSizes[index].quantity += 1;
    setSizes(newSizes);
  };

  const handleDecrement = (index) => {
    const newSizes = [...sizes];
    if (newSizes[index].quantity > 0) {
      newSizes[index].quantity -= 1;
    }
    setSizes(newSizes);
  };

  const [pictures, setPictures] = useState([null, null, null, null, null]);
  const [pictureFiles, setPictureFiles] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleUpload = (event, index) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newPictures = [...pictures];
      newPictures[index] = reader.result;
      setPictures(newPictures);

      const newPictureFiles = [...pictureFiles];
      newPictureFiles[index] = file;
      setPictureFiles(newPictureFiles);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addNewUploadDiv = () => {
    setPictures([...pictures, null]);
    setPictureFiles([...pictureFiles, null]);
  };

  const removeUploadDiv = (index) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);

    const newPictureFiles = [...pictureFiles];
    newPictureFiles.splice(index, 1);
    setPictureFiles(newPictureFiles);
  };

  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [productVendor, setProductVendor] = useState("");
  const [productSku, setProductSku] = useState("");
  const [productTags, setProductTags] = useState("");
  const [productCategory, setProductCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/api/categories");
      const data = await response.data;
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", productPrice);
    formData.append("description", productDescription);
    formData.append("type", productType);
    formData.append("vendor", productVendor);
    formData.append("sku", productSku);
    formData.append("tags", productTags);
    formData.append("category_id", productCategory);

    sizes.forEach((size, index) => {
      if (size.quantity > 0) {
        formData.append(`sizes[${index}][size]`, size.size);
        formData.append(`sizes[${index}][quantity]`, size.quantity);
      }
    });
    pictureFiles.forEach((file, index) => {
      if (file) formData.append(`images[${index}]`, file);
    });

    try {
      const response = await axiosInstance.post("/api/products", formData);
      console.log(response.data.message);
      // Handle success
      setnotificationMessage(response.data.message);
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
    } catch (error) {
      console.error(error);
      setnotificationMessage(error.response.data.message);
      setTimeout(() => {
        setnotificationMessage("");
      }, 4000);
      // Handle error
    }
  };

  return (
    <>
      <>
        {notificationMessage === null ? null : (
          <NotificationDisplay message={notificationMessage} />
        )}
      </>
      <div className="main_div_termandcondition_navbar">
        <p className="heading_termandcondition">Add Product</p>
      </div>

      <div className="main_div_addproduct">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <div className="row m-0 p-0">
              <div className="col-lg-3 col-md-3 col-sm-3 col-12 p-0 m-0">
                <div className="row m-0 p-0">
                  {pictures.map((picture, index) => (
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-12"
                      key={index}
                    >
                      <div className="upload_picture_div">
                        <p
                          className="close_icon"
                          alt="Remove"
                          onClick={() => removeUploadDiv(index)}
                        >
                          ❌
                        </p>
                        {picture ? (
                          <img
                            src={picture}
                            className="upload_pic_icon"
                            alt="Uploaded"
                          />
                        ) : (
                          <label htmlFor={`upload-input-${index}`}>
                            <img
                              src={uploadpic}
                              className="upload_pic_icon"
                              alt="Upload"
                            />
                            <input
                              type="file"
                              id={`upload-input-${index}`}
                              onChange={(event) => handleUpload(event, index)}
                              style={{ display: "none" }}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div
                      className="upload_picture_div"
                      onClick={addNewUploadDiv}
                    >
                      <img
                        src={plusicon}
                        className="upload_pic_icon"
                        alt="Add new upload"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-1 col-12"></div>
              <div className="col-lg-8 col-md-8 col-sm-8 col-12">
                <input
                  placeholder="Product Name"
                  className="input_product_name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                <input
                  placeholder="Product Price"
                  className="input_product_name"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
                <textarea
                  placeholder="Product Description"
                  className="textarea_product_desp"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />

                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_addproduct_para">Type</p>
                      <p className="type_addproduct_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6 mr-0 pr-0">
                    <input
                      placeholder="Enter Type"
                      className="input_product_name"
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_addproduct_para">Vendor</p>
                      <p className="type_addproduct_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6 mr-0 pr-0">
                    <input
                      placeholder="Enter Vendor"
                      className="input_product_name"
                      value={productVendor}
                      onChange={(e) => setProductVendor(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_addproduct_para">SKU</p>
                      <p className="type_addproduct_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6 mr-0 pr-0">
                    <input
                      placeholder="Enter SKU"
                      className="input_product_name"
                      value={productSku}
                      onChange={(e) => setProductSku(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_addproduct_para">Tags</p>
                      <p className="type_addproduct_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6 mr-0 pr-0">
                    <input
                      placeholder="Enter Tags"
                      className="input_product_name"
                      value={productTags}
                      onChange={(e) => setProductTags(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row m-0 p-0">
                  <div className="col-lg-3 col-md-4 col-sm-5 col-6 m-0 p-0">
                    <div className="d-flex justify-content-between m-0 p-0">
                      <p className="type_addproduct_para">Category</p>
                      <p className="type_addproduct_para">:</p>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-8 col-sm-7 col-6 mr-0 pr-0">
                    <select
                      className="input_product_name"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row m-0 p-0">
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
                        {/* <p className="size_heading_add_product">Size</p> */}
                        <button className="btn_sizes_for_addproduct_quantity">
                          {item.size}
                        </button>
                      </div>

                      <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                        {/* <p className="size_heading_add_product">Quantity</p> */}
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
                </div>

                <div className="d-flex justify-content-end">
                  <button className="submit_product" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </>
  );
}

export default AddProductsPage;
