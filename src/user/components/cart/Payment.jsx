import { FiPlus } from "react-icons/fi";
import "./css/payment.css";
import qrcode from "../../../img/QRCODE.png";
import wechat from "../../../img/WeChat.png";
import Menu from "../menu/Menu";
import React, { useState } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";

import { Link } from "react-router-dom";
import Header from "../header/Header";

const Payment = () => {
  // state payment method
  const [selectedOption, setSelectedOption] = useState("onePay");

  // get address state
  const location = useLocation();
  const navigate = useNavigate();

  const {
    address = [],
    products = [],
    productsCart = [],
  } = location?.state || {}; // Here mean if "empty"

  // Get date tody
  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1; // January is month 0 in JavaScript
  const year = today.getFullYear();

  //   Get userID
  const [userID, setUserID] = useState(2);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dateTody = `${date}/${month}/${year}`;

    console.log("payment:", selectedOption)
    console.log("address:", address.province)
    console.log("city:", address.city)
    console.log("company:", address.companny)
    console.log("branch:", address.branch)
    console.log("date:", dateTody)
    console.log("userID:", userID)
    
    if (products.length > 0) {
      console.log(products)
    }else if(productsCart.length > 0){
      console.log(productsCart)
    }
    navigate('/cart/payment')
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const totalProductPrice = () => {
    let  total = 0;
    productsCart.forEach((product) => {
      total = product.totalPrice;
    });

    return total;
  }

  const totalPrice = totalProductPrice();


  // Confirm transfer Choose image
  const [mainImage, setMainImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(URL.createObjectURL(file)); // Use createObjectURL directly
    }
  };
  


  return (
    <>
      <Header />
      <section id="payment">
        <section id="address">
          <div className="header_box"><h3>지불</h3></div>
            <div className="head_text">주소 추가</div>
              <form>
                <div className="box">
                  <label htmlFor="contact">연락처:</label>
                  <input
                    type="text"
                    id="contact"
                    required
                  />
                </div>
                <div className="box">
                  <label htmlFor="prov">주:</label>
                  <input
                    type="text"
                    id="prov"
                    required
                  />
                </div>
                <div className="box">
                  <label htmlFor="city">구역:</label>
                  <input
                    type="text"
                    id="city"
                    required
                  />
                </div>
                <div className="box">
                  <label htmlFor="companny">배송회사명:</label>
                  <input
                    type="text"
                    id="companny"
                    required
                  />
                </div>
                <div className="box">
                  <label htmlFor="branch">나뭇가지:</label>
                  <input
                    type="text"
                    id="branch"
                    required
                  />
                </div>
                <div className="box">
                  <label htmlFor="account">계정 이름:</label>
                  <input
                    type="text"
                    id="prov"
                    required
                  />
                </div>                
              </form>
        </section>

        <div className="guopBoxPayment">
          <form onSubmit={handleSubmit}>
            <div className="adress-payment">
              {/* procuts */}
              {products.length > 0 ? (
                <div className="detailsProductInPayMentBox">
                  <h3>세부</h3>
                  <ul>
                    {products.map((product) => (
                      <li className="detailsProduct_li" key={product.productID}>
                        <div>제품 ID: {product.productID}</div>
                        <div>상품명: {product.productName}</div>
                        
                        <div>가격: {product.price}</div>
                        <div>제품 수: {product.productCounts}</div>
                        <div>
                        지불해야 함: {product.productCounts * product.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
              {/* Procuts Cart */}
              {productsCart.length > 0 ? (
                <div className="detailsProductInPayMentBox">
                  <ul>
                    {productsCart.map((product) => (
                      <li key={product.productID}>
                        <div>제품 ID: {product.productID}</div>
                        <div>상품명: {product.productName}</div>
                        
                        <div>가격: {product.price}</div>
                        <div>제품 수: {product.productCounts}</div>
                      </li>
                    ))}
                    <div>
                    지불해야 함: {totalPrice}
                    </div>
                  </ul>
                </div>
              ) : (
                <div></div>
              )}
              

              <div className="box">
                <div className="transfer">
                  <div className="select-option">
                    <input
                      type="radio"
                      id="onePay"
                      value="onePay"
                      checked={selectedOption === "onePay"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="onePay">비셀원</label>
                  </div>
                  <div className="select-option">
                    <input
                      type="radio"
                      id="wechat"
                      value="wechat"
                      checked={selectedOption === "wechat"}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="wechat">WeChat</label>
                  </div>
                </div>
                <div className="boxImageqr">
                  {selectedOption === "onePay" && (
                    <div className="qr">
                      <img src={qrcode} alt="" />
                    </div>
                  )}
                  {selectedOption === "wechat" && (
                    <div className="qr">
                      <img src={wechat} alt="" />
                    </div>
                  )}
                  {!selectedOption && (
                    <div className="qr">
                      <img src={qrcode} alt="" />
                    </div>
                  )}
                </div>
              </div>

              <div className="save">

                <button 
                  type="submit"
                  disabled={
                    !selectedOption ||
                    address == 0 ||
                    (products == 0 && productsCart == 0)
                  }
                >
                  확인하다
                </button>
                
              </div>
            </div>
          </form>
        </div>
      </section>

      
      <Menu />
    </>
  );
};

export default Payment;
