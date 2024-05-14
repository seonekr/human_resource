import "./css/productHome.css";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";

const ProductHome = () => {
  const [resume, set_resume] = useState([]);
  ////Activate
  const [likedItems, setLikedItems] = useState([]);

  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");

  let navigate = useNavigate();
  const [search, set_search] = useState(searchParam);

  console.log("Search.............", search);

  function OnSearch(e) {
    e.preventDefault();

    navigate({
      pathname: "/search/",
      search: "?search=" + search,
    });
  }

  useEffect(() => {
    getResume();
  }, []);

  const getResume = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/resume/list/",
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_resume(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("My resume: ", resume);

  // Cart management
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
      console.log("resume: ", resume);
      set_favorite([...favorite, { ...resume }]);

      alert("Success.");
    }

    if (likedItems.includes(index)) {
      setLikedItems(likedItems.filter((item) => item !== index));
    } else {
      setLikedItems([...likedItems, index]);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(resume.length / itemsPerPage);
  // ==== Paginator management ====
  // Calculate index range for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGoods = resume.slice(startIndex, endIndex);

  // Handle pagination click
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle next and previous page
  const nextPage = () => {
    setCurrentPage(currentPage === totalPages ? totalPages : currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
  };

  return (
    <div>
      <Header />
      <section id="product1">
        <div className="box_TfiMenuAlt">
          <form onSubmit={OnSearch}>
            <select
              className="filter_position"
              onChange={(e) => {
                set_search(e.target.value);
              }}
            >
              <option>More title job</option>
              <option value={search}>Tester</option>
              <option value={search}>UX/UI</option>
              <option value={search}>Data Analysis</option>
              <option value={search}>Software developer</option>
            </select>
          </form>
        </div>

        {resume.length > 0 &&
          resume.map(
            (res, index) =>
              res.is_recommend == true && (
                <div className="productHead_content" key={index}>
                  <h1 className="htxthead">
                    <span className="spennofStyle"></span>Suggest
                  </h1>
                </div>
              )
          )}

        <div className="contentImageProducts1">
          {resume.length > 0 &&
            resume.map(
              (res, index) =>
                res.is_recommend == true && (
                  <div className="group_itemBox" key={index}>
                    <div className="containner_box_image">
                      <div className="box_image">
                        <img src={res.image} alt="image" />
                      </div>
                      <div className="txtOFproduct">
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
                      <FaRegHeart
                        id="icon_FaRegHearts"
                        className={likedItems.includes(index) ? "active" : ""}
                        onClick={() => {
                          AddToFavorite(res, index);
                        }}
                      />

                      <Link
                        to={`/productdetails/${res.id}`}
                        className="button_see"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                  // </Link>
                )
            )}
        </div>

        <div className="productHead_contents">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>All User
          </h1>
        </div>

        <div className="contentImageUser">
          {currentGoods.map((res, index) => (
            <div className="group_itemBox_user" key={index}>
              <div className="containner_box_image_user">
                <div className="box_image_user">
                  <img src={res.image} alt="image" />
                </div>
                <div className="txtOFproduct_user">
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
                  <FaRegHeart
                    id="icon_FaRegHeart"
                    className={likedItems.includes(index) ? "active" : ""}
                    onClick={() => {
                      AddToFavorite(res, index);
                    }}
                  />
                  <Link to={`/productdetails/${res.id}`} className="button_see">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Render pagination */}
        <div className="box_container_next_product">
          <button
            className="box_prev_left_product"
            disabled={currentPage === 1}
            onClick={prevPage}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <div className="box_num_product">
                <button
                  key={page}
                  className="num_admin_product"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </div>
            )
          )}
          <button
            className="box_prev_right_product"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductHome;
