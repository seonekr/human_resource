import "../resume/css/resume.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";

const Search = () => {
  const user = localStorage.getItem("user");
  const storage = JSON.parse(localStorage.getItem("user"));

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");

  const [search, set_search] = useState(searchParam);

  let navigate = useNavigate();

  useEffect(() => {
    set_search(searchParam);
  }, [searchParam]);

  function handleSelectChange(e) {
    const selectedValue = e.target.value;
    set_search(selectedValue);
    navigateToSearch(selectedValue);
  }

  function navigateToSearch(selectedValue) {
    navigate({
      pathname: "/search/",
      search: `?search=${selectedValue}`,
    });
  }

  const [appState, setAppState] = useState({
    search: "",
    result: [],
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          method: "get",
          maxBodyLength: Infinity,
          url: import.meta.env.VITE_API + "/resume/list/?search=" + searchParam,
          headers: {},
        };

        const response = await axios.request(config);
        const allPosts = response.data;
        setAppState((prevState) => ({
          ...prevState,
          result: allPosts,
        }));
        setCurrentPage(1); // Reset to the first page when search changes
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [searchParam]);

  const [likedItems, setLikedItems] = useState([]);

  const [favorite, set_favorite] = useState(() => {
    const localFavorite = localStorage.getItem("favorite");
    return localFavorite ? JSON.parse(localFavorite) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  const AddToFavorite = (resume, index) => {
    const existingResume = favorite.find((item) => item.id === resume.id);

    if (existingResume) {
      alert("This resume already favorited!");
    } else {
      set_favorite([...favorite, { ...resume }]);
      alert("Success.");
    }

    if (likedItems.includes(index)) {
      setLikedItems(likedItems.filter((item) => item !== index));
    } else {
      setLikedItems([...likedItems, index]);
    }
  };

  const totalPages = Math.ceil(appState.result.length / 4);

  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const currentGoods = appState.result.slice(startIndex, endIndex);

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

  return (
    <div>
      <Header />
      <section id="resume">
        <div className="box_TfiMenuAlt">
          <select
            id="skillSelect"
            className="filter_position"
            value={search || ""}
            onChange={handleSelectChange} // Call handleSelectChange when an option is selected
            name="search" // Add name attribute to the select element
          >
            <option value="">More title job</option>
            <option value="computer science">Computer Science</option>
            <option value="grapich design">Grapich design</option>
            <option value="software engineer">Software Engineer</option>
          </select>
        </div>

        {currentGoods.length > 0 &&
          currentGoods.some((res) => res.is_recommend) && (
            <div className="title">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>Suggest
              </h1>
            </div>
          )}

        <div className="resume-contain">
          {currentGoods.length > 0 &&
            currentGoods.map(
              (res, index) =>
                res.is_recommend && (
                  <div className="group_itemBox" key={index}>
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
                      {user && storage.company_id !== false && (
                        <FaRegHeart
                          id="icon_FaRegHearts"
                          className={likedItems.includes(index) ? "active" : ""}
                          onClick={() => AddToFavorite(res, index)}
                        />
                      )}
                      <Link to={`/details/${res.id}`} className="button_see">
                        View
                      </Link>
                    </div>
                  </div>
                )
            )}
        </div>

        <div className="title">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>All User
          </h1>
        </div>

        <div className="contentImageUser">
          {currentGoods.length > 0 &&
            currentGoods.map((res, index) => (
              <div className="group_itemBox_user" key={index}>
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
                    {user && storage.company_id !== false && (
                      <FaRegHeart
                        id="icon_FaRegHearts"
                        className={likedItems.includes(index) ? "active" : ""}
                        onClick={() => AddToFavorite(res, index)}
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
        {appState.result.length > 4 && (
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
