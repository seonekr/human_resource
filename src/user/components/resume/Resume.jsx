import React, { useState, useEffect } from "react";
import "./css/resume.css";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";

const Resume = () => {
  const user = localStorage.getItem("user");
  const storage = user ? JSON.parse(user) : null;

  const [resume, setResume] = useState([]);
  const [filteredResumes, setFilteredResumes] = useState([]);
  const [filter, setFilter] = useState("");
  const [likedItems, setLikedItems] = useState([]);
  const [favorite, setFavorite] = useState(() => {
    const localFavorite = localStorage.getItem("favorite");
    return localFavorite ? JSON.parse(localFavorite) : [];
  });

  const [currentPage, setCurrentPage] = useState(1);

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search") || "";
  const [search, setSearch] = useState(searchParam);

  const navigate = useNavigate();
  const totalPages = Math.ceil(filteredResumes.length / 4);

  useEffect(() => {
    fetchResume();
  }, []);

  useEffect(() => {
    if (search !== searchParam) {
      setSearch(searchParam);
    }
  }, [searchParam]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    if (resume.length > 0) {
      if (filter === "") {
        setFilteredResumes(resume);
      } else {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - parseInt(filter));
        const filtered = resume.filter(({ updated_at }) => {
          const updatedAt = new Date(updated_at);
          return updatedAt >= startDate && updatedAt <= endDate;
        });
        setFilteredResumes(filtered);
      }
    }
  }, [resume, filter]);

  const fetchResume = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API}/resume/list/`
      );
      setResume(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSearch(selectedValue);
    navigate(`/search/?search=${selectedValue}`, {
      state: {
        filtered: filter,
      },
    });
  };

  const handleSelectFilter = (e) => {
    const selectedValue = e.target.value;
    setFilter(selectedValue);
  };

  const handleAddToFavorite = (resume, index) => {
    if (favorite.some((item) => item.id === resume.id)) {
      alert("This resume is already favorited!");
    } else {
      setFavorite([...favorite, resume]);
      alert("Success.");
    }
    setLikedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const nextPage = () =>
    setCurrentPage((prev) => (prev === totalPages ? totalPages : prev + 1));

  const prevPage = () => setCurrentPage((prev) => (prev === 1 ? 1 : prev - 1));

  const startIndex = (currentPage - 1) * 4;
  const currentGoods = filteredResumes.slice(startIndex, startIndex + 4);

  const recommendedResumes = filteredResumes.filter((res) => res.is_recommend);

  return (
    <div>
      <Header />
      <section id="resume">
        <div className="box_TfiMenuAlt">
          <select
            id="skillSelect"
            className="filter_position"
            value={search}
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

        {recommendedResumes.length > 0 && (
          <div className="title">
            <h1 className="htxthead">
              <span className="spennofStyle"></span>Suggest
            </h1>
          </div>
        )}

        <div className="resume-contain">
          {recommendedResumes.map((res, index) => (
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
                {user && storage?.company_id && (
                  <FaRegHeart
                    id="icon_FaRegHearts"
                    className={likedItems.includes(index) ? "active" : ""}
                    onClick={() => handleAddToFavorite(res, index)}
                  />
                )}
                <Link to={`/details/${res.id}`} className="button_see">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="title">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>All User
          </h1>
        </div>

        <div className="contentImageUser">
          {currentGoods.map((res, index) => (
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
                  {user && storage?.company_id && (
                    <FaRegHeart
                      id="icon_FaRegHearts"
                      className={
                        likedItems.includes(startIndex + index) ? "active" : ""
                      }
                      onClick={() =>
                        handleAddToFavorite(res, startIndex + index)
                      }
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
            {Array.from({ length: totalPages }, (_, index) => (
              <div className="box_num_resume" key={index}>
                <button
                  className={`num_admin_resume ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </div>
            ))}
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
    </div>
  );
};

export default Resume;
