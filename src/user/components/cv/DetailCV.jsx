import React, { useState, useEffect } from "react";
import "./css/detailCV.css";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo_resoure from "../../../img/logo_resoure.jpeg";

const DetailCV = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  
  return (
    <div>
      <Header />
      <section id="product1">
        <div className="productHead_contents">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>User
          </h1>
        </div>

        <div className="contentImageUser">
            <div className="group_itemBox_user" >
              <div className="containner_box_image_user">
                <div className="box_image_user">
                  <img src={logo_resoure} alt="image" />
                </div>
                <div className="txtOFproduct_user">
                  <p>
                    <span>Name: </span>
                  </p>
                  <p>
                    <span>Age: </span>
                  </p>
                  <p className="txt_span">
                    <span>Major:</span>
                  </p>
                  <p className="txt_span">
                    <span>Skills:</span>
                  </p>
                </div>
                <div className="btn_button_see_user">
                  <div
                    className="button_see_delete"
                    onClick={() => setShowConfirmation(true)}
                  >
                    Delete
                  </div>
                  <Link to="/edit_resume" className="button_see">
                    Edit
                  </Link>
                </div>
              </div>
            </div>

          {showConfirmation && (
            <div className="box_background_delete">
              <div className="hover_delete_box">
                <div className="box_logout">
                  <p>Are you sure you want to delete</p>
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={handleCancelDelete}
                  >
                    No
                  </button>
                  <button className="btn_confirm btn_addproducttxt_popup">
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DetailCV;
