import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../AddcategoryPage/AddcategoryPage.css";
import Loader from "../../../Loader/Loader";
import NotificationDisplay from "../../../NotificationDisplay/NotificationDisplay";
import { useNavigate } from "react-router-dom";

function AddcategoryPage() {
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

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username === "admin") {
      navigate("/addcategory");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const [nameEdit, setNameEdit] = useState("");
  const [imageEdit, setImageEdit] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [loadingState, setLoadingState] = useState({
    adding: false,
    editing: null,
    deleting: null,
  });

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

  const handleAddCategory = async () => {
    setLoadingState({ ...loadingState, adding: true });
    const formData = new FormData();
    formData.append("name", name);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axiosInstance.post("/api/categories", formData);
      setName("");
      setImage(null);
      fetchCategories();
      setNotificationMessage("Category added successfully");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
    } catch (error) {
      console.error("Error adding category:", error);
    } finally {
      setLoadingState({ ...loadingState, adding: false });
    }
  };

  const handleEditCategory = async () => {
    setLoadingState({ ...loadingState, editing: editCategoryId });

    const convertImageToArrayBuffer = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });
    };

    const imageArrayBuffer = imageEdit
      ? await convertImageToArrayBuffer(imageEdit)
      : null;

    const arrayBufferToBase64 = (arrayBuffer) => {
      const base64String = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/png;base64,${base64String}`;
    };

    const base64Image = imageArrayBuffer
      ? arrayBufferToBase64(imageArrayBuffer)
      : null;

    const payload = {
      name: nameEdit,
      image: base64Image,
    };

    try {
      await axiosInstance.put(`/api/categories/${editCategoryId}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setNameEdit("");
      setImageEdit(null);
      fetchCategories();
      setNotificationMessage("Category edited successfully");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
    } catch (error) {
      console.error("Error editing category:", error);
    } finally {
      setLoadingState({ ...loadingState, editing: null });
    }
  };

  const handleDeleteCategory = async (id) => {
    setLoadingState({ ...loadingState, deleting: id });
    try {
      await axiosInstance.delete(`/api/categories/${id}`);
      fetchCategories();
      setNotificationMessage("Category deleted successfully");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 4000);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoadingState({ ...loadingState, deleting: null });
    }
  };

  return (
    <>
      {notificationMessage && (
        <NotificationDisplay message={notificationMessage} />
      )}
      <div className="main_div_termandcondition_navbar">
        <p className="heading_termandcondition">Add Category</p>
      </div>
      <div className="main_div_add_category">
        <div className="row m-0 p-0">
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
          <div className="col-lg-8 col-md-10 col-sm-12 col-12">
            <p className="add_catgeory_heading">Add Category</p>
            <div className="row m-0 p-0">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 ml-0 pl-0">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Add Category"
                  className="add_category_input"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-12 ml-0 pl-0">
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="add_category_input_photo"
                />
              </div>
            </div>
            <br />
            <button
              className="add_category_btn"
              onClick={handleAddCategory}
              disabled={loadingState.adding}
            >
              {loadingState.adding ? <Loader /> : "Add Category"}
            </button>

            <table className="table table-bordered mt-5">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Picture</th>
                  <th scope="col">Name</th>
                  <th scope="col">Edit</th>
                  {/* <th scope="col">Delete</th> */}
                </tr>
              </thead>
              <tbody>
                {categories.length ? (
                  categories.map((category, index) => (
                    <tr key={category.id}>
                      <th scope="row" className="cat_name_td">
                        {index + 1}
                      </th>
                      <td>
                        <div className="d-flex justify-content-center">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/storage/${category.image}`}
                            className="img_view_category_list"
                            alt={category.name}
                          />
                        </div>
                      </td>
                      <td className="cat_name_td">{category.name}</td>
                      <td>
                        <button
                          className="delete_category_btn"
                          data-toggle="modal"
                          data-target={`#editModal-${category.id}`}
                          onClick={() => {
                            setNameEdit(category.name);
                            setImageEdit(null);
                            setEditCategoryId(category.id);
                          }}
                        >
                          Edit
                        </button>
                        <div
                          className="modal fade"
                          id={`editModal-${category.id}`}
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="editModalLabel"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-lg"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title" id="editModalLabel">
                                  Edit Category
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="row m-0 p-0">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 ml-0 pl-0">
                                    <input
                                      value={nameEdit}
                                      onChange={(e) =>
                                        setNameEdit(e.target.value)
                                      }
                                      placeholder="Edit Category"
                                      className="add_category_input"
                                    />
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-12 ml-0 pl-0">
                                    <input
                                      type="file"
                                      onChange={(e) =>
                                        setImageEdit(e.target.files[0])
                                      }
                                      className="add_category_input_photo"
                                    />
                                  </div>
                                </div>
                                <br />
                                <button
                                  className="add_category_btn"
                                  onClick={handleEditCategory}
                                  disabled={
                                    loadingState.editing === editCategoryId
                                  }
                                >
                                  {loadingState.editing === editCategoryId ? (
                                    <Loader />
                                  ) : (
                                    "Edit Category"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      {/* <td>
                        <button
                          className="delete_category_btn"
                          onClick={() => handleDeleteCategory(category.id)}
                          disabled={loadingState.deleting === category.id}
                        >
                          {loadingState.deleting === category.id ? (
                            <Loader />
                          ) : (
                            "Delete"
                          )}
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <Loader />
                )}
              </tbody>
            </table>
          </div>
          <div className="col-lg-2 col-md-1 col-sm-12 col-12"></div>
        </div>
      </div>
    </>
  );
}

export default AddcategoryPage;
