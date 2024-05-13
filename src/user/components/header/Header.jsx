import React, { useEffect } from "react";
import "./css/header.css";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import logo_resoure from "../../../img/logo_resoure.jpeg";
import logo_resoure2 from "../../../img/logo_resoure2.jpeg";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();

  var store_id = false;
  if (localStorage.getItem("user")) {
    store_id = JSON.parse(window.localStorage.getItem("user")).store_id;
  }

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about" },
  ];

  useEffect(() => {
    let data = JSON.stringify({
      token: token,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/check-token",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.result != "success") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
          return;
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log(error);
      });
  }, [token]);

  return (
    <>
      <section id="header">
        <div className="navbar">
          <div className="headWithBox">
            <div className="headMenu">
              <div className="storename">
                <Link to="/">
                  <img src={logo_resoure2} alt="Logo" />
                </Link>
              </div>
              <div className="logo1">
                <Link to="/">
                  <img src={logo_resoure} alt="Logo" />
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
              <form className="searchBarForm">
                <input id="search" type="text" placeholder="Search..." />
                <button type="submit">
                  <FaMagnifyingGlass className="iconSearch" />
                </button>
              </form>

              <div className="icon_account_login">
                {user && (
                  <div className="icon_account_login">
                    <div>
                      <Link to="/add_resume" className="head_colorr">
                        CV
                      </Link>
                    </div>

                    <div>
                      <Link to="/more">
                        <FaRegUser className="head_colorr" />
                      </Link>
                    </div>
                    {storage.is_admin === true && (
                      <div>
                        <Link to="#">
                          <AiFillDashboard className="head_colorr" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {!user && (
                  <div className="icon_account_login">
                    <div>
                      <Link to="/login" className="head_colorr">
                        <p>Login</p>
                        <BiLogIn className="login" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
