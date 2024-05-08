import React, { useState, useEffect } from "react";
import "./css/header.css";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../img/Logo.png";
import storename from "../../../img/storename.png";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";

const Header = ({ handleSearch }) => {
  // For authenticate user
  const userID = localStorage.getItem("userID");
  const location = useLocation();

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  // Search bar function
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <>
      <section id="header">
        <div className="navbar">
          <div className="headWithBox">
            <div className="headMenu">

              <div className="storename"><Link to="/"><img src={storename} alt="Logo" /></Link></div>
              <div className="logo1"><Link to="/"><img src={Logo} alt="Logo" /></Link></div>

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

              <form onSubmit={handleSubmit} className="searchBarForm">
                {" "}
                {/* Here is search bar */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit"><FaMagnifyingGlass className="iconSearch" /></button>
              </form>
              <div className="icon_account_login">
                <div>
                  <Link to="/add_resume" className="head_colorr">
                    CV
                  </Link>
                </div>
                <div>
                  <Link to="/list_users">
                    <FaRegHeart className="head_colorr"/>
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
