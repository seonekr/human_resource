import React, { useState } from "react";
import AdminMenu from "../adminMenu/AdminMenu";
import "./css/post.css";
import imageicon from "../../../img/imageicon.jpg";
import { AiOutlineDelete } from "react-icons/ai";
import { CiCamera } from "react-icons/ci";
import {
  HiOutlineShoppingBag as HiMiniShoppingBag,
  HiPlus,
} from "react-icons/hi";

const Post = () => {
  const [products, setProducts] = useState([
    {
      mainImage: null,
      productName: "",
      price: "",
      popular: false,
    },
  ]);

  const handleProductName = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].productName = value;
    setProducts(updatedProducts);
  };

  const handleProductPrice = (e, index) => {
    const value = e.target.value;
    const updatedProducts = [...products];
    updatedProducts[index].price = value;
    setProducts(updatedProducts);
  };

  const handlePopularChange = (event, index) => {
    const checked = event.target.checked;
    const updatedProducts = [...products];
    updatedProducts[index].popular = checked;
    setProducts(updatedProducts);
  };

  const handleImage = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProducts = [...products];
        updatedProducts[index].mainImage = reader.result;
        setProducts(updatedProducts);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    setProducts([
      ...products,
      {
        mainImage: null,
        productName: "",
        price: "",
        popular: false,
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    products.forEach((product, index) => {
      console.log("Product:", product);
      formData.append(`name${index}`, product.productName);
      formData.append(`price${index}`, product.price);
      formData.append(`popular${index}`, product.popular ? "Yes" : "No");
      if (product.mainImage) {
        formData.append(`image${index}`, product.mainImage);
      }
    });
    console.log("FormData:", formData);
  };

  return (
    <>
      <AdminMenu />
      <section id="post">
        <div className="boxcontainerSpan_Box"></div>
        <div className="box_container_product">
          <div className="box_text_post">
            <h2>제품 게시</h2>
          </div>

          <div className="group_container_product">
            {products.map((product, index) => (
              <div key={index}>
                <div className="addProduct_box_content_afterThat">
                  <div
                    className="deleteBox_productconotent"
                    onClick={() => handleDelete(index)}
                  >
                    <AiOutlineDelete />
                  </div>

                  <div className="box_input-img">
                    {product.mainImage ? (
                      <img src={product.mainImage} alt="product" />
                    ) : (
                      <img src={imageicon} alt="default" />
                    )}
                    <input
                      type="file"
                      id={`img-${index}`}
                      onChange={(e) => handleImage(e, index)}
                      required
                    />
                  </div>

                  <div className="edit_images">
                    <label
                      htmlFor={`img-${index}`}
                      className="trigger_popup_fricc"
                    >
                      <CiCamera id="icon_ci_camera" />
                    </label>
                  </div>

                  <div className="box_container_image">
                    <div className="input-box">
                      <div className="box">
                        <input
                          type="text"
                          placeholder="음식 이름"
                          value={product.productName}
                          onChange={(e) => handleProductName(e, index)}
                          required
                        />
                      </div>
                      <div className="box">
                        <input
                          type="text"
                          placeholder="제품 가격"
                          value={product.price}
                          onChange={(e) => handleProductPrice(e, index)}
                          required
                        />
                      </div>
                      <div className="box_popular">
                        <label htmlFor={`popular-${index}`}>인기 있는</label>
                        <input
                          type="checkbox"
                          id={`popular-${index}`}
                          checked={product.popular}
                          onChange={(e) => handlePopularChange(e, index)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div onClick={handleAdd}>
              <div className="iconimage">
                <HiMiniShoppingBag id="icon_shoppingbag" />
                <HiPlus id="icon_goplus" />
              </div>
            </div>
          </div>
          <div className="btn_submit">
            <button type="submit" onClick={handleSubmit}>
              제품 게시
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
