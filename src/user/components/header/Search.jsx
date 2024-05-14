import "../products/css/productHome.css";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";

const Search = () => {
  // Manage search fucntion
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("search");
  const [appState, setAppState] = useState({
    search: "",
    result: [],
  });

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/resume/list/?search=" + searchParam,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const allPosts = response.data;
        setAppState(allPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [appState]);

  ////Activate
  const [likedItems, setLikedItems] = useState([]);

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

  return (
    <div>
      <Header />
      <section id="product1">
        <div className="box_TfiMenuAlt">
          <select className="filter_position">
            <option>More title job</option>
            <option value="1">Tester</option>
            <option value="2">UX/UI</option>
            <option value="3">Data Analysis</option>
            <option value="4">Software developer</option>
          </select>
        </div>

        {appState.length > 0 &&
          appState.map(
            (res, index) =>
              res.is_recommend == true && (
                <div className="productHead_content">
                  <h1 className="htxthead">
                    <span className="spennofStyle"></span>Suggest
                  </h1>
                </div>
              )
          )}

        <div className="contentImageProducts1">
          {appState.length > 0 &&
            appState.map(
              (res, index) =>
                res.is_recommend == true && (
                  <div className="group_itemBox" key={index}>
                    <div className="containner_box_image">
                      <div className="box_image">
                        <img src={res.image} alt="image" />
                      </div>
                      <div className="txtOFproduct">
                        <h4>Name: {res.is_recommend}</h4>
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
                )
            )}
        </div>

        <div className="productHead_contents">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>All User
          </h1>
        </div>

        <div className="contentImageUser">
          {appState.length > 0 &&
            appState.map((res, index) => (
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
                    <Link
                      to={`/productdetails/${res.id}`}
                      className="button_see"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {appState.length > 4 && (
          <div className="box_container_next_product">
            <button className="box_prev_left_product">
              <AiOutlineLeft id="" />
              <p>Prev</p>
            </button>

            <div className="box_num_product">
              <div className="num_admin_product">
                <p>1</p>
              </div>
              <div className="num_admin_product">
                <p>2</p>
              </div>
            </div>

            <button className="box_prev_right_product">
              <p>Next</p>
              <AiOutlineRight id="" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
export default Search;
