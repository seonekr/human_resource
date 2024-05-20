import "../resume/css/resume.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";

const Search = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { filtered } = location.state || {};
  const user = JSON.parse(localStorage.getItem("user"));
  const searchParam =
    new URLSearchParams(window.location.search).get("search") || "";

  const [search, setSearch] = useState(searchParam);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );
  const [likedItems, setLikedItems] = useState([]);
  const [filter, setFilter] = useState(filtered);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const query = search ? `?search=${search}` : "";
        const response = await axios.get(
          `${import.meta.env.VITE_API}/resume/list/${query}`
        );
        setResults(response.data);
        setCurrentPage(1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, [search]);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  useEffect(() => {
    if (results.length > 0) {
      if (!filter) {
        setFilteredResults(results);
      } else {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - parseInt(filter));
        const filtered = results.filter(({ updated_at }) => {
          const updatedAt = new Date(updated_at);
          return updatedAt >= startDate && updatedAt <= endDate;
        });
        setFilteredResults(filtered);
      }
    }
  }, [results, filter]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSearch(selectedValue);
    navigate(`/search/?search=${selectedValue}`);
  };

  const handleSelectFilter = (e) => {
    setFilter(e.target.value);
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

  const totalPages = Math.ceil(filteredResults.length / 4);
  const currentItems = filteredResults.slice(
    (currentPage - 1) * 4,
    currentPage * 4
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const nextPage = () =>
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  const prevPage = () =>
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));

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

        {currentItems.some((res) => res.is_recommend) && (
          <div className="title">
            <h1 className="htxthead">
              <span className="spennofStyle"></span>Suggest
            </h1>
          </div>
        )}

        <div className="resume-contain">
          {currentItems.map((res, index) =>
            res.is_recommend ? (
              <div className="group_itemBox" key={res.id}>
                <div className="containner_box_image">
                  <div className="box_image">
                    <img src={res.image} alt="Resume" />
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
            ) : null
          )}
        </div>

        <div className="title">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>All Users
          </h1>
        </div>

        <div className="contentImageUser">
          {currentItems.map((res, index) => (
            <div className="group_itemBox_user" key={res.id}>
              <div className="containner_box_image_user">
                <div className="box_image_user">
                  <img src={res.image} alt="Resume" />
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

        {results.length > 4 && (
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
