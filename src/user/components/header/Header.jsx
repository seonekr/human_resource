import React, { useState, useEffect } from "react";
import "./css/header.css";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo_resoure from "../../../img/logo_resoure.jpeg";
import logo_resoure2 from "../../../img/logo_resoure2.jpeg";
import { AiFillDashboard } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";


const Header = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");
  const [is_resumed, set_is_resumed] = useState(false);

  let navigate = useNavigate();
  const [search, set_search] = useState(searchParam);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/about" },
  ];

  function OnSearch(e) {
    e.preventDefault();

    navigate({
      pathname: "/search/",
      search: "?search=" + search,
    });
  }

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const storage = JSON.parse(window.localStorage.getItem("user"));

  var store_id = false;
  if (localStorage.getItem("user")) {
    store_id = JSON.parse(window.localStorage.getItem("user")).store_id;
  }

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

    IsUserHaveResume();
  }, [token]);



  
  const IsUserHaveResume = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://3.38.225.226:8000/resume/user/${storage.user_id}/`,
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_is_resumed(true);
        // navigate("/");
      })
      .catch((error) => {
        // console.log(error);
        set_is_resumed(false);
        // navigate("/");
      });
  };

  console.log(is_resumed);

  const checkStatus = () => {
    alert(is_resumed);
  };

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

              <div className="icon_account_login">
                {user && (
                  <div className="icon_account_login">
                    {storage.company_id == false ? (
                      <>
                        <div>
                          <Link
                            onClick={() => {
                              checkStatus();
                            }}
                            className="head_colorr"
                          >
                            CV
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div>
                        <Link to="/list_users" className="head_colorr">
                          <FaRegHeart />
                        </Link>
                      </div>
                    )}

                    {storage.is_admin === true && (
                      <>
                        <div>
                          <Link to="/list_users" className="head_colorr">
                            <FaRegHeart />
                          </Link>
                        </div>
                        <div>
                          <Link to="/dashboard">
                            <AiFillDashboard className="head_colorr" />
                          </Link>
                        </div>
                      </>
                    )}

                    <div>
                      <Link to="/more">
                        <FaRegUser className="head_colorr" />
                      </Link>
                    </div>
                  </div>
                )}

                {!user && (
                  <div className="icon_account_login">
                    <div>
                      <Link
                        to={token ? "/add_resume" : "/login"}
                        className="head_colorr"
                      >
                        CV
                      </Link>
                    </div>

                    <div>
                      <Link
                        to={token ? "/list_users" : "/login"}
                        className="head_colorr"
                      >
                        <FaRegHeart />
                      </Link>
                    </div>
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
