import React from "react";
import { useEffect, useState } from "react";
import "./css/listusers_company.css";

import AdminMenu from "../adminMenu/AdminMenu";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

const Listusers_company = () => {
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

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(favorite.length / 4);
  // ==== Paginator management ====
  // Calculate index range for current page
  const startIndex = (currentPage - 1) * 4;
  const endIndex = startIndex + 4;
  const currentGoods = favorite.slice(startIndex, endIndex);

  console.log("sddddddddddd", currentGoods.length);

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
    <>
      <AdminMenu />
      <div className="container_body_usercompany">
        <div className="back">
          <Link to="/listcompany" className="box_guopIconbAck">
            <FaAngleLeft id="box_icon_Back" />
            <p>Back</p>
          </Link>
        </div>
        <div className="container_box_usercompany">
          <div className="box_usercompany">
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

          <div className="box-list-user-company">
            {currentGoods.length === 0 ? (
              <p className="no-reviews-message">No Resume</p>
            ) : (
              currentGoods.map((resume) => (
                <div className="box_listuser-company ">
                  <div className="box_txtandiamge-company">
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
                      <AiOutlineDelete
                        onClick={() => unfavorite(resume.id)}
                        className="ai-outline-delete"
                      />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {favorite.length > 4 && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default Listusers_company;
