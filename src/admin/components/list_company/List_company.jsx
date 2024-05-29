import React from "react";
import { useEffect, useState } from "react";
import "./css/list_company.css";
import { Link } from "react-router-dom";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import logo_resoure from "../../../img/logo_resoure.jpeg";

const List_company = () => {
  return (
    <>
      <div className="container_body_admincompany">
        <div className="container_box_admincompany">
          <div className="box_company">
            <h2>List Company</h2>
          </div>
          <Link to="/listuserscompany" className="box_companys_company">
            <div className="box_dp_txtandiamge">
              <div className="box_company_img">
                <img src={logo_resoure} alt="" />
              </div>
              <div className="box_company_text">
                <p>Name: Humascot</p>
                <p>Email: Humascot@gmail.com</p>
              </div>
            </div>
            <button className="btn_delete_company">
              <AiOutlineDelete className="ai-outline-delete" />
            </button>
          </Link>
          

          <div className="box_container_next_product">
            <button className="box_prev_left_product">
              <AiOutlineLeft id="box_icon_left_right_product" />
              <p>Prev</p>
            </button>

            <div className="box_num_product">
              <div className="num_admin_product">
                <p>1</p>
              </div>
            </div>

            <button className="box_prev_right_product">
              <p>Next</p>
              <AiOutlineRight id="box_icon_left_right_product" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default List_company;
