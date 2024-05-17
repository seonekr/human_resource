import React, { useState, useEffect } from "react";
import "./css/detail.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import avatar from "../../../img/avatar.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

function Details() {
  const id = useParams().id;
  const [resume_id, set_resume_id] = useState([]);
  const [likedItems, setLikedItems] = useState([]);

  const user = localStorage.getItem("user");
  const storage = JSON.parse(window.localStorage.getItem("user"));


  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/resume/detail/${id}/`,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_resume_id(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // Cart management
  const [favorite, set_favorite] = useState(() => {
    const localFavorite = localStorage.getItem("favorite");
    return localFavorite ? JSON.parse(localFavorite) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);
  const AddToFavorite = (resume_id, index) => {
    const existingResume = favorite.find((item) => item.id === resume_id.id);

    if (existingResume) {
      alert("This resume already favorited!");
    } else {
      console.log("resume: ", resume_id);
      set_favorite([...favorite, { ...resume_id }]);

      alert("Success.");
    }

    if (likedItems.includes(index)) {
      setLikedItems(likedItems.filter((item) => item !== index));
    } else {
      setLikedItems([...likedItems, index]);
    }
  };


  return (
    <>
      <Header />
      <div className="contentBody">
        {resume_id ? (
          <>
            <div className="boxresume_deteils">
                <div className="resume-page-img">
                  <div className="myslides">
                    <img src={resume_id.image} alt="" />
                  </div>
                </div>

              <div className="txtContentresume">
                <h3 className="txt_nameP">Name: {resume_id.name}</h3>
                <p>Age: {resume_id.age}</p>
                <p>Major: {resume_id.major}</p>
                <p>Skills: {resume_id.skill}</p>
              </div>
            </div>

            <div className="resume-details-container">
              <h2 className="resume-details-title">CV Details</h2>
              <div className="pdf-container">
                <iframe
                  src={resume_id.resume_image}
                  title="resume PDF"
                  className="pdf-viewer"
                ></iframe>
              </div>
            </div>
            <div className="box-check">
              {user && (
                <>
                  {storage.company_id !== false && (
                    <div>
                      <FaRegHeart
                        id="icon_FaRegHearts"
                        className={
                          likedItems.includes(resume_id.id) ? "active" : ""
                        }
                        onClick={() => {
                          AddToFavorite(resume_id, resume_id.id);
                        }}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Menu />
    </>
  );
}

export default Details;
