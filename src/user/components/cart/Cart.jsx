import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import 깻잎 from "../../../img/깻잎.jpg";
import 더덕무침 from "../../../img/더덕무침.jpg";
import 멸치볶음 from "../../../img/멸치볶음.jpg";
import Header from '../header/Header';
import Menu from '../menu/Menu'
import { AiOutlineDelete } from "react-icons/ai";

import './css/cart.css';

const Cart = () => {
  const [products, setProducts] = useState([
    { productID: 1, productName: '깻잎', price: 10, images: [깻잎]},
    { productID: 2, productName: '더덕무침', price: 20, images: [더덕무침]},
    { productID: 3, productName: '멸치볶음', price: 30, images: [멸치볶음]},
  ]);

  const [price, setPrice] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);


  const [productCounts, setProductCounts] = useState(products.reduce((acc, product) => ({ ...acc, [product.productID]: 1 }), {}));

  useEffect(() => {
    const totalPrice = products.reduce((accumulator, product) => accumulator + product.price * (productCounts[product.productID] || 0), 0);
    const shipping = 0;
    const grandTotal = totalPrice + shipping;

    setPrice(totalPrice);
    setShipping(shipping);
    setGrandTotal(grandTotal);
  }, [products, productCounts]);


  const incrementCount = (productID) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productID]: (prevCounts[productID] || 0) + 1,
    }));
  };

  const decrementCount = (productID) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productID]: Math.max(0, (prevCounts[productID] || 0) - 1),
    }));
  };

  // send to checkout
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    setProducts([]);
    setPrice('');
    setShipping('');
    setGrandTotal('');
    const selectedProducts = products.map((product) => ({
      productID: product.productID,
      productName: product.productName,
      color: product.colorName,
      price: product.price,
      size: product.size,
      productCounts: productCounts[product.productID] || 0,
      totalPrice: grandTotal,
    }));

    // Submit the selected products with userID
    // Send to checkout
    navigate('/cart/payment/', {
      state: {
        productsCart: selectedProducts,
        }
  });


  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className='box_container_cart'>
          <div className='display_products'>
            {products.map((product, index) => (
              <div className='container_cart_item' key={index}>
                <div className="box_item_image">
                  <img src={product.images[0]} alt='img'></img>
                  <div className='box_item_text'>
                    
                    <p>이름: {product.productName}</p>
                    <p>가격: ￦{product.price}</p>
                  </div>
                </div>
                <div className='box_icon_order'>
                  <div className="btnicon_delete_order" >
                    <AiOutlineDelete id="btnicon_delete" />
                  </div>

                  <div className='box_item_icon'>
                    <div className="icon_minus_plus" onClick={() => decrementCount(product.productID)}>-</div>
                    <span>
                      <input
                        type="text"
                        value={productCounts[product.productID] || 0}
                        onChange={() => { }}
                      />
                    </span>
                    <div className="icon_minus_plus" onClick={() => incrementCount(product.productID)}>+</div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
            {products.length > 0 ?
        <div className='box_item_total'>
          <h1>장바구니 합계</h1>
          <div className='box_item_total_text'>
            <p>소계:</p>
            <p><input type="text" value={"￦ " + price} onChange={() => { }} /></p>
          </div>
          <hr />
          <div className='box_item_total_text'>
            <p>배송: </p>
            <p><input type="text" value={"￦ " + shipping} onChange={() => { }} /></p>
          </div>
          <hr />
          <div className='box_item_total_text'>
            <h3>총: </h3>
            <p><input type="text" value={"￦ " + grandTotal} onChange={() => { }} /></p>
          </div>
          <div className='btn'>
            <Link to="/" className="Continues_btn">계속 쇼핑하기</Link>
            <button type='submit' className="checkout_btn">점검</button>
          </div>
        </div>: <p className='cart'>장바구니가 비어 있습니다.</p> }
      </form>
      <Menu />
    </>
  )
}

export default Cart;