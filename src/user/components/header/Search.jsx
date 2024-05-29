import React, { useState, useEffect } from "react";
import "../resume/css/resume.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filtered } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");

  const [filter, setFilter] = useState(filtered || "");
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [search, setSearch] = useState(searchParam || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [appState, setAppState] = useState({
    result: [],
  });
  const [likedItems, setLikedItems] = useState([]);
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );

  useEffect(() => {
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [searchParam]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/resume/list/?search=${search}`
        );
        setAppState({
          result: response.data,
        });
        setCurrentPage(1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [search]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSearch(selectedValue);
    navigateToSearch(selectedValue);
  };

  const navigateToSearch = (selectedValue) => {
    navigate({
      pathname: "/search/",
      search: `?search=${selectedValue}`,
    });
  };

  useEffect(() => {
    if (appState.result.length > 0) {
      if (filter === "") {
        setFilteredResumes(appState.result);
      } else {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - parseInt(filter));
        const filtered = appState.result.filter(({ updated_at }) => {
          const updatedAt = new Date(updated_at);
          return updatedAt >= startDate && updatedAt <= endDate;
        });
        setFilteredResumes(filtered);
      }
    }
  }, [appState.result, filter]);

  const handleSelectFilter = (e) => {
    const selectedValue = e.target.value;
    setFilter(selectedValue);
  };

  const addToFavorite = (resume, index) => {
    if (favorite.some((item) => item.id === resume.id)) {
      alert("This resume is already favorited!");
    } else {
      setFavorite([...favorite, resume]);
      alert("Added to favorites.");
    }

    setLikedItems((prevLikedItems) =>
      prevLikedItems.includes(index)
        ? prevLikedItems.filter((item) => item !== index)
        : [...prevLikedItems, index]
    );
  };

  const totalPages = Math.ceil(filteredResumes.length / 4);
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const currentResumes = filteredResumes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === totalPages ? totalPages : prevPage + 1
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
  };

  const suggestedResumes = filteredResumes.filter((res) => res.is_recommend);

  return (
    <div>
      <Header />
      <section id="resume">
        <div className="box_TfiMenuAlt">
          <select
            id="skillSelect"
            className="filter_position"
            value={search || ""}
            onChange={handleSelectChange}
            name="search"
          >
            <option value="">More title job</option>
            <option value="computer science">Computer Science</option>
            <option value="graphic design">Graphic Design</option>
            <option value="software engineer">Software Engineer</option>
          </select>
          <select
            id="skillSelect"
            className="filter_month"
            value={filter}
            onChange={handleSelectFilter}
          >
            <option value="">Date</option>
            <option value="7">Last week</option>
            <option value="30">Last month</option>
            <option value="61">2 months ago</option>
            <option value="92">3 months ago</option>
          </select>
        </div>

        {suggestedResumes.length > 0 && (
          <>
            <div className="title">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>Suggest
              </h1>
            </div>
            <div className="resume-contain">
              {suggestedResumes.map((res, index) => (
                <div className="group_itemBox" key={res.id}>
                  <div className="containner_box_image">
                    <div className="box_image">
                      <img src={res.image} alt="image" />
                    </div>
                    <div className="txtOFResume">
                      <h4>Name: {res.name}</h4>
                      <p>Age: {res.age}</p>
                      <p>Major: {res.major}</p>
                    </div>
                  </div>
                  <p>
                    <span>Skill: </span>
                    {res.skill.substring(0, 10)}...
                  </p>
                  <div className="btn_button_see">
                    {user && user.company_id !== false && (
                      <FaRegHeart
                        id="icon_FaRegHearts"
                        className={likedItems.includes(index) ? "active" : ""}
                        onClick={() => addToFavorite(res, index)}
                      />
                    )}
                    <Link to={`/details/${res.id}`} className="button_see">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="title">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>All User
          </h1>
        </div>

        <div className="contentImageUser">
          {currentResumes.map((res, index) => (
            <div className="group_itemBox_user" key={res.id}>
              <div className="containner_box_image_user">
                <div className="box_image_user">
                  <img src={res.image} alt="image" />
                </div>
                <div className="txtOF-normal-resume">
                  <p>
                    <span>Name:</span> {res.name}
                  </p>
                  <p>
                    <span>Age:</span> {res.age}
                  </p>
                  <p className="txt_span">
                    <span>Major:</span> {res.major}
                  </p>
                  <p className="txt_span">
                    <span>Skills:</span> {res.skill.substring(0, 30)}...
                  </p>
                </div>
                <div className="btn_button_see_user">
                  {user && user.company_id !== false && (
                    <FaRegHeart
                      id="icon_FaRegHearts"
                      className={likedItems.includes(index) ? "active" : ""}
                      onClick={() => addToFavorite(res, index)}
                    />
                  )}
                  <Link to={`/details/${res.id}`} className="button_see">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredResumes.length > 4 && (
          <div className="box_container_next_resume">
            <button
              className="box_prev_left_resume"
              disabled={currentPage === 1}
              onClick={prevPage}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <div className="box_num_resume" key={page}>
                  <button
                    className={`num_admin_resume ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </div>
              )
            )}
            <button
              className="box_prev_right_resume"
              disabled={currentPage === totalPages}
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        )}
      </section>
      <Menu />
    </div>
  );
};

export default Search;
