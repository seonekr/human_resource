import React, { useState, useEffect } from "react";
import "./css/header.css";
import { FaMagnifyingGlass, FaCartShopping, FaRegUser, FaRegHeart } from "react-icons/fa6";
import { BiLogIn } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import axios from "axios";
import logo_resoure from "../../../img/logo_resoure.jpeg";
import logo_resoure2 from "../../../img/logo_resoure2.jpeg";

const Header = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const storage = JSON.parse(localStorage.getItem("user"));
  const [resume, setResume] = useState([]);
  const [checkMyCV, setCheckMyCV] = useState(false);
  const [id, setId] = useState(null);
  const [search, setSearch] = useState(new URLSearchParams(window.location.search).get("search") || "");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (storage) {
      const fetchResume = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API}/resume/list/`);
          setResume(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchResume();
    }
  }, [storage]);

  useEffect(() => {
    const userInfo = resume.find((res) => res.user.id === storage?.user_id);
    if (userInfo) {
      setId(userInfo.user.id);
      setCheckMyCV(true);
    } else {
      setId(null);
      setCheckMyCV(false);
    }
  }, [resume, storage]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/?search=${search}`);
  };

  useEffect(() => {
    if (!token) return;
    const checkToken = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API}/user/check-token`,
          { token },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.result !== "success") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
    };
    checkToken();
  }, [token, navigate]);

  return (
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
                {[
                  { label: "Home", path: "/" },
                  { label: "About us", path: "/about" },
                ].map((menuItem) => (
                  <Link
                    key={menuItem.label}
                    to={menuItem.path}
                    className={`link ${location.pathname === menuItem.path ? "active" : ""}`}
                  >
                    {menuItem.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="ulHead_box">
            <form className="searchBarForm" onSubmit={handleSearch}>
              <input
                id="search"
                type="text"
                value={search}
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit">
                <FaMagnifyingGlass className="iconSearch" />
              </button>
            </form>
            <div className="icon_account_login">
              {user ? (
                <div className="icon_account_login">
                  {!storage?.company_id ? (
                    <Link to={checkMyCV ? `/detail_cv/${id}` : "/add_resume"} className="head_colorr">
                      Resume
                    </Link>
                  ) : (
                    <Link to="/list_users" className="head_colorr">
                      <FaRegHeart />
                    </Link>
                  )}
                  {storage?.is_admin && (
                    <>
                      <Link to="/list_users" className="head_colorr">
                        <FaRegHeart />
                      </Link>
                      <Link to="/dashboard">
                        <AiFillDashboard className="head_colorr" />
                      </Link>
                    </>
                  )}
                  <Link to="/more">
                    <FaRegUser className="head_colorr" />
                  </Link>
                </div>
              ) : (
                <div className="icon_account_login">
                  <Link to={token ? "/add_resume" : "/login"} className="head_colorr">
                    Resume
                  </Link>
                  <Link to={token ? "/list_users" : "/login"} className="head_colorr">
                    <FaRegHeart />
                  </Link>
                  <Link to="/login" className="head_colorr">
                    <p>Login</p>
                    <BiLogIn className="login" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
