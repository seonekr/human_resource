import React, { useState } from "react";
import "./css/productBuy.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import job from "../../../img/job.png";
// import PDFReader from './PDFReader';

function ProductDetails() {
  return (
    <>
      <Header />

      <div className="contentBody">
        <div className="boxProduct_deteils">
          <section className="product_details">
            <div className="product-page-img">
              <div className="myslides">
                <img src={job} alt="" />
              </div>
            </div>
          </section>

          <div className="txtContentproduct">
            <h3 className="txt_nameP">Name: </h3>
            <p>Age: </p>
            <p>Major: </p>
            <p>Position:</p>
          </div>
        </div>
        <div className="box_pdf">
          {/* <h1>PDF Reader</h1>
          <PDFReader pdfUrl="path/to/your_pdf_file.pdf" /> */}
        </div>
      </div>
      <Menu />
    </>
  );
}

export default ProductDetails;
