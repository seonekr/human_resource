import React, { useState, useEffect } from "react";
import "./css/header.css";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../img/Logo.png";
import storename from "../../../img/storename.png";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";

const Header = () => {

  const [search, set_search] = useState("");


  console.log("Search....", search)

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about" },
  ];

  function OnSearch(e) {
    e.preventDefault();
    let data = JSON.stringify({
      search: search,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/resume/search",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <>
      <section id="header">
        <div className="navbar">
          <div className="headWithBox">
            <div className="headMenu">
              <div className="storename">
                <Link to="/">
                  <img src={storename} alt="Logo" />
                </Link>
              </div>
              <div className="logo1">
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>

              <div className="boxLiMenu">
                <div className="linkLi">
                  {menuItems.map((menuItem) => (
                    <Link
                      key={menuItem.label}
                      to={menuItem.path}
                      className={`link ${
                        location.pathname === menuItem.path ? "active" : ""
                      }`}
                    >
                      {menuItem.icon}
                      <p>{menuItem.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="ulHead_box">
              <form className="searchBarForm" onSubmit={OnSearch}>
                <input
                  id="search"
                  type="text"
                  value={search}
                  placeholder="Search..."
                  onChange={(e) => {
                    set_search(e.target.value);
                  }}
                />
                <button type="submit">
                  <FaMagnifyingGlass className="iconSearch" />
                </button>
              </form>

              {/* <form  className="searchBarForm">
                <input
                  type="text"
                  placeholder="Search..."
                />
                <button type="submit">
                  <FaMagnifyingGlass className="iconSearch" />
                </button>
              </form> */}
              <div className="icon_account_login">
                <div>
                  <Link to="/add_resume" className="head_colorr">
                    CV
                  </Link>
                </div>
                <div>
                  <Link to="/list_users">
                    <FaRegHeart className="head_colorr" />
                  </Link>
                </div>
                <div>
                  <Link to="/more">
                    <FaRegUser className="head_colorr" />
                  </Link>
                </div>
                <div>
                  <Link to="/dashboard">
                    <AiFillDashboard className="head_colorr" />
                  </Link>
                </div>
                <div>
                  <Link to="/login" className="head_colorr">
                    <p>Login</p>
                    <BiLogIn className="login" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
