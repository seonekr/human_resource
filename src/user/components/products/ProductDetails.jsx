import React, { useState } from "react";
import "./css/productBuy.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import avatar from "../../../img/avatar.png";


function ProductDetails() {

  return (
    <>
      <Header />
      <div className="contentBody">
        <div className="boxProduct_deteils">
          <section className="product_details">
            <div className="product-page-img">
              <div className="myslides">
                <img src={avatar} alt="" />
              </div>
            </div>
          </section>

          <div className="txtContentproduct">
            <h3 className="txt_nameP">Name: </h3>
            <p>Age: </p>
            <p>Major: </p>
            <p>
              Skills: Python, MySQL, java, PHP, MySQL, java, PHP Lorem ipsum
              dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>

        <div className="product-details-container">
          <h1 className="product-details-title">CV Details</h1>
            <div className="pdf-container">
              <iframe
                src=""
                title="Product PDF"
                className="pdf-viewer"
              ></iframe>
            </div>
        </div>
        <div className="box-check">
          <h4>Add to list</h4>
          <label className="checkbox-label">
            <input type="checkbox" className="checkbox" />
            <span className="checkbox-custom"></span>
          </label>
        </div>
      </div>
      <Menu />
    </>
  );
}

export default ProductDetails;
