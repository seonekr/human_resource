import React, { useState, useEffect } from "react";
import "./css/productBuy.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import avatar from "../../../img/avatar.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";

function ProductDetails() {
  const id = useParams().id;
  const [resume_id, set_resume_id] = useState([]);
   ////Activate
   const [likedItems, setLikedItems] = useState([]);

  console.log("Resume_id........", resume_id);

  console.log("Parameter: ", id);

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


  console.log("resume_idr..........", resume_id)

  return (
    <>
      <Header />
      <div className="contentBody">
        {resume_id ? (
          <div>
            <form className="boxProduct_deteils">
              <section className="product_details">
                <div className="product-page-img">
                  <div className="myslides">
                    <img src={resume_id.image} alt="" />
                  </div>
                </div>
              </section>

              <div className="txtContentproduct">
                <h3 className="txt_nameP">Name: {resume_id.name}</h3>
                <p>Age: {resume_id.age}</p>
                <p>Major: {resume_id.major}</p>
                <p>Skills: {resume_id.skill}</p>
              </div>
            </form>

            <div className="product-details-container">
              <h2 className="product-details-title">CV Details</h2>
              <div className="pdf-container">
                <iframe
                  src={resume_id.resume_image}
                  title="Product PDF"
                  className="pdf-viewer"
                ></iframe>
              </div>
            </div>
            <div className="box-check">
              <FaRegHeart
              id="icon_FaRegHearts"
              className={likedItems.includes(resume_id.id) ? "active" : ""}
              onClick={() => {
                AddToFavorite(resume_id, resume_id.id);
              }}
              />
              
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Menu />
    </>
  );
}

export default ProductDetails;
