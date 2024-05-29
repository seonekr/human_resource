import React, { useState, useEffect } from "react";
import "./css/detail.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const [likedItems, setLikedItems] = useState([]);

  const user = localStorage.getItem("user");
  const storage = user ? JSON.parse(user) : null;

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/resume/detail/${id}/`
        );
        setResume(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchResume();
  }, [id]);

  // Cart management
  const [favorite, setFavorite] = useState(() => {
    const localFavorite = localStorage.getItem("favorite");
    return localFavorite ? JSON.parse(localFavorite) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  const addToFavorite = (resume) => {
    if (favorite.some((item) => item.id === resume.id)) {
      alert("This resume is already favorited!");
    } else {
      setFavorite([...favorite, resume]);
      alert("Success.");
    }
    setLikedItems((prev) =>
      prev.includes(resume.id)
        ? prev.filter((item) => item !== resume.id)
        : [...prev, resume.id]
    );
  };

  return (
    <>
      <Header />
      <div className="contentBody">
        {resume ? (
          <>
            <div className="boxresume_deteils">
              <div className="resume-page-img">
                <div className="myslides">
                  <img src={resume.image} alt="" />
                </div>
              </div>

              <div className="txtContentresume">
                <p>Name: {resume.name}</p>
                <p>Age: {resume.age}</p>
                <p>Major: {resume.major}</p>
                <p>Skills: {resume.skill}</p>
              </div>
            </div>

            <div className="resume-details-container">
              <h2 className="resume-details-title">CV Details</h2>
              <div className="pdf-container">
                <iframe
                  src={resume.resume_image}
                  title="resume PDF"
                  className="pdf-viewer"
                ></iframe>
              </div>
            </div>
            <div className="box-check">
              {user && storage?.company_id && (
                <FaRegHeart
                  id="icon_FaRegHearts"
                  className={likedItems.includes(resume.id) ? "active" : ""}
                  onClick={() => addToFavorite(resume)}
                />
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
