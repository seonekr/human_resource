import React from "react";
import "./css/listusers.css";
import Menu from "../../user/components/menu/Menu";
import Header from "../../user/components/header/Header";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import image from "../../img/image.png";
import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useEffect, useState } from "react";

const Listusers = () => {
  // Favorite management
  const [favorite, set_favorite] = useState(() => {
    const localFavorite = localStorage.getItem("favorite");
    return localFavorite ? JSON.parse(localFavorite) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  const unfavorite = (id) => {
    set_favorite(favorite.filter((item) => !(item.id === id)));
  };

  console.log(favorite);

  return (
    <>
      <Header />
      <div className="continer-listuser">
        <div className="contian-box-listuser">
          <div className="box-title">
            <h2>List Users</h2>
            <div className="box-sendmail">
              <Link
                to="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=seonekr@gmail.com"
                className="btn-sendmail"
              >
                <p>Send to email</p>
              </Link>
            </div>
          </div>
          <div className="box-list-user">
            {favorite.length === 0 ? (
              <p className="no-reviews-message">No Resume</p>
            ) : (
              favorite.map((resume) => (
                <div className="box_list1">
                  <div className="box_txtandiamge">
                    <div className="box_img">
                      <img src={resume.image || image} alt="" />
                    </div>
                    <div className="box_user_text1">
                      <p>Name: {resume.name}</p>
                      <p>Position: {resume.skill}</p>
                    </div>
                  </div>
                  <div>
                    <button className="btn_delete_user">
                      <AiOutlineDelete onClick={() => unfavorite(resume.id)} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="box_container_next_user">
            <button className="box_prev_left_user">
              <AiOutlineLeft id="" />
              <p>Prev</p>
            </button>

            <div className="box_num_user">
              <div className="num_user">
                <p>1</p>
              </div>
              <div className="num_user">
                <p>2</p>
              </div>
            </div>

            <button className="box_prev_right_user">
              <p>Next</p>
              <AiOutlineRight id="" />
            </button>
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default Listusers;
