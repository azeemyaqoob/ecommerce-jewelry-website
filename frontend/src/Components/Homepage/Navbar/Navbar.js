import React, { useEffect, useState } from "react";
import logo from "./../../../Assets/LOGO PNG without BG.png";
import "./../Navbar/Navbar.css";
import search_icon from "./../../../Assets/serach.png";
import cart_icon from "./../../../Assets/addtocart.png";
import people_icon from "./../../../Assets/people_icon.png";
import menu from "./../../../Assets/menu.png";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/signin");
  };
  return (
    <div className="main_div_navbar">
      <div className="row p-0 m-0">
        <div className="col-lg-1 col-md-1 col-sm-12 col-12"></div>
        <div className="col-lg-10 col-md-10 col-sm-12 col-12">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
              <img src={logo} className="logo_style_izha" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <img src={menu} className="menu_icon_style" alt="menu icon" />
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto"></ul>
              <form className="form-inline my-2 my-lg-0">
                <NavLink to="/">
                  <p className="para_navbar">Shop</p>
                </NavLink>
                <NavLink to="/newarrivals">
                  <p className="para_navbar">New Arrivals</p>
                </NavLink>
                {token &&
                  username == "admin" && ( // Render only if token exists
                    <>
                      <NavLink to="/addproducts">
                        <p className="para_navbar">Add Products</p>
                      </NavLink>
                      <NavLink to="/addcategory">
                        <p className="para_navbar">Add category</p>
                      </NavLink>
                    </>
                  )}
                <NavLink to="/ringsizeguide">
                  <p className="para_navbar">Size Guides</p>
                </NavLink>
                {username ? null : (
                  <NavLink to="/signin">
                    <p className="para_navbar">LogIn</p>
                  </NavLink>
                )}

                {/* <img
                  className="icon_style"
                  src={search_icon}
                  alt="search icon"
                /> */}
                {token && username ? (
                  <div class="d-flex">
                    <div class="dropdown mr-1">
                      <button
                        type="button"
                        class="btn dropdown-toggle"
                        id="dropdownMenuOffset"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        data-offset="10,20"
                      >
                        <img
                          className="icon_style"
                          src={people_icon}
                          alt="people icon"
                        />
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuOffset"
                      >
                        <Link to="/profile-view">
                          <p class="para_navbar_dropdown">{username}</p>
                        </Link>
                        <p class="para_navbar_dropdown" onClick={handleLogout}>
                          Logout
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}

                <NavLink to="/cart">
                  <img className="icon_style" src={cart_icon} alt="cart icon" />
                </NavLink>
              </form>
            </div>
          </nav>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-1 col-12"></div>
      </div>
    </div>
  );
}

export default Navbar;
