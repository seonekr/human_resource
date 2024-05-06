import "./css/product.css";
import 깻잎 from "../../../img/깻잎.jpg";
import 더덕무침 from "../../../img/더덕무침.jpg";
import 멸치볶음 from "../../../img/멸치볶음.jpg";
import 진미채볶음 from "../../../img/진미채볶음.jpg";
import 물김치 from "../../../img/물김치.jpg";
import 참외장아찌 from "../../../img/참외장아찌.jpg";
import 파김치 from "../../../img/파김치.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../adminMenu/AdminMenu";
import { BiPlus } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import banner1 from "../../../img/banner1.png";
import imageicon from "../../../img/imageicon.jpg";
import { AiOutlineDelete } from "react-icons/ai";

const Product = () => {
  const [products, setProducts] = useState([
    {
      productID: 1,
      productName: "깻잎",
      price: 8.5,
      review: 50,
      popular: false,
      images: [{ src: 깻잎 }],
      bannerImage: [{ src: banner1 }],
    },
    {
      productID: 2,
      productName: "더덕무침",
      price: 7.52,
      review: 45,
      popular: false,
      images: [{ src: 더덕무침 }],
      bannerImage: [{ src: banner1 }],
    },
    {
      productID: 3,
      productName: "멸치볶음",
      price: 9.25,
      review: 30,
      popular: false,
      images: [{ src: 멸치볶음 }],
      bannerImage: [{ src: banner1 }],
    },
    {
      productID: 4,
      productName: "진미채볶음",
      price: 8.5,
      review: 29,
      popular: true,
      images: [{ src: 진미채볶음 }],
      bannerImage: [{ src: banner1 }],
    },
    {
      productID: 5,
      productName: "물김치",
      price: 9.5,
      review: 39,
      popular: true,
      images: [{ src: 물김치 }],
      bannerImage: [{ src: banner1 }],
    },
    {
      productID: 6,
      productName: "참외장아찌",
      price: 12.5,
      review: 35,
      popular: true,
      images: [{ src: 참외장아찌 }],
      bannerImage: [{ src: banner1 }],
    },
    {
      productID: 7,
      productName: "파김치",
      price: 11.5,
      review: 25,
      popular: true,
      images: [{ src: 파김치 }],
      bannerImage: [{ src: banner1 }],
    },
  ]);

  const [selectedImages, setSelectedImages] = useState(
    Array(products.length).fill(null)
  );
  const [updateProductId, setUpdateProductId] = useState(null);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [isConfirmationPopular, setConfirmationPopular] = useState(false);
  const [isConfirmationPopupOpenPrice, setConfirmationPopupOpenPrice] =
    useState(false);
  const [isConfirmationPopupOpenImage, setConfirmationPopupOpenImage] =
    useState(false);
  const [mainImageBanner, setMainImageBanner] = useState(null);

  const handleImage = (event, index) => {
    const selectedImage = event.target.files[0];
    const updatedImages = [...selectedImages];
    updatedImages[index] = selectedImage;
    setSelectedImages(updatedImages);
  };

  ///Choose image handleImageBanner
  const handleImageBanner = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImageBanner([file]);
      };

      reader.readAsDataURL(file);
    }
  };

  //// onClick icon edit product name
  const openConfirmationPopup = (productID) => {
    setUpdateProductId(productID.productName);
    setConfirmationPopupOpen(true);
  };

  const closeConfirmationPopup = () => {
    setUpdateProductId(null);
    setConfirmationPopupOpen(false);
  };

  //// onClick icon camera product image
  const openConfirmationPopupImage = (productID) => {
    setUpdateProductId(productID.images);
    setConfirmationPopupOpenImage(true);
  };

  const closeConfirmationPopupImage = () => {
    setUpdateProductId(null);
    setConfirmationPopupOpenImage(false);
  };

  ///// onClick icon edit product price
  const openConfirmationPopular = (productID) => {
    setUpdateProductId(productID.price);
    setConfirmationPopular(true);
  };
  const closeConfirmationPopular = () => {
    setUpdateProductId(null);
    setConfirmationPopular(false);
  };

  const openConfirmationPopupPrice = (productID) => {
    setUpdateProductId(productID.price);
    setConfirmationPopupOpenPrice(true);
  };

  const closeConfirmationPopupPrice = () => {
    setUpdateProductId(null);
    setConfirmationPopupOpenPrice(false);
  };

  // Choose banner image
  const [isPopupimage, setPopupimage] = useState(false);

  const togglePopupimage = () => {
    setPopupimage(!isPopupimage);
  };

  const handlePopularChange = (event, index) => {
    const checked = event.target.checked;
    const updatedProducts = [...products];
    updatedProducts[index].popular = checked;
    setProducts(updatedProducts);
  };

  /////////////////////handleDelete
  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <>
      <AdminMenu />
      <section id="product_admin">
        <div className="container_body_admin_product">
          <div className="search-box_product">
            <input type="text" placeholder="찾다..." />
            <button>
              <IoSearchOutline />
            </button>
          </div>

          <div className="productHead_content">
            <h1 className="htxthead">
              <span className="spennofStyleadmin"></span>제품
            </h1>
            <div className="categoryBoxfiler">
              <Link to="/post" className="box_add_product">
                <BiPlus id="icon_add_product" />
                <p>제품 추가</p>
              </Link>
            </div>
          </div>
          <div>
            <div className="banner_no_box">
              <div className="banner_no_box_image">
                <div className="banner_no_box_image">
                  <div className="img">
                    {mainImageBanner && mainImageBanner.length > 0 ? (
                      <img
                        src={URL.createObjectURL(mainImageBanner[0])}
                        alt="Banner"
                      />
                    ) : (
                      <img src={banner1} alt="Banner" />
                    )}
                  </div>
                </div>
              </div>
              <div className="edit_image_banner" onClick={togglePopupimage}>
                <CiCamera id="box_icon_camera" />
              </div>

              {isPopupimage && (
                <form className="background_addproductpopup_box">
                  <div className="hover_addproductpopup_box_image">
                    <div className="box_input_image">
                      <p>배너 이미지 수정</p>

                      <label className="popup_Border_Boximagae">
                        {mainImageBanner && mainImageBanner.length > 0 ? (
                          <img
                            src={URL.createObjectURL(mainImageBanner[0])}
                            alt="Banner"
                          />
                        ) : (
                          <img src={imageicon} alt="Banner" />
                        )}
                        <input
                          type="file"
                          id="img"
                          onChange={handleImageBanner}
                          required
                        />
                      </label>
                    </div>
                    <div className="btn_foasdf">
                      <button
                        className="btn_cancel btn_addproducttxt_popup"
                        onClick={togglePopupimage}
                      >
                        아니요
                      </button>
                      <button className="btn_confirm btn_addproducttxt_popup">
                      업데이트
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          <div id="container_product_admin">
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>인기 메뉴
              </h1>
            </div>

            <div className="contentImageProducts">
              {products.map(
                (product, index) =>
                  product.popular && (
                    <div className="box-product" key={index}>
                      <div className="box_input-img">
                        <div className="img">
                          {selectedImages[index] ? (
                            <img
                              src={URL.createObjectURL(selectedImages[index])}
                              alt="Product"
                            />
                          ) : (
                            <img src={product.images[0].src} alt="Product" />
                          )}
                        </div>
                        <div
                          className="Box_delete_product"
                          onClick={() => handleDelete(index)}
                        >
                          <AiOutlineDelete />
                        </div>

                        <div
                          className="edit_image_product"
                          onClick={() =>
                            openConfirmationPopupImage(product.productID)
                          }
                        >
                          <CiCamera id="box_icon_camera_product" />
                        </div>
                      </div>

                      {isConfirmationPopupOpenImage && (
                        <div className="background_addproductpopup_box">
                          <div className="hover_addproductpopup_box_image">
                            <div className="box_input_image">
                              <p>제품 이미지 수정</p>
                              <label htmlFor={`image-${index}`}>
                                {selectedImages[index] ? (
                                  <img
                                    src={URL.createObjectURL(
                                      selectedImages[index]
                                    )}
                                    alt="product"
                                  />
                                ) : (
                                  <img src={imageicon} alt="product" />
                                )}
                                <input
                                  type="file"
                                  id={`image-${index}`}
                                  onChange={(e) => handleImage(e, index)}
                                  required
                                />
                              </label>
                            </div>
                            <div className="btn_foasdf">
                              <button
                                className="btn_cancel btn_addproducttxt_popup"
                                onClick={closeConfirmationPopupImage}
                              >
                                아니요
                              </button>
                              <button className="btn_confirm btn_addproducttxt_popup">
                              업데이트
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="txtOFproduct">
                        <div
                          className="box_icon_MdOutlineEdit"
                          onClick={() =>
                            openConfirmationPopup(product.productID)
                          }
                        >
                          <li>음식 이름: {product.productName}</li>
                          <MdOutlineEdit id="icon_edit" />
                        </div>
                        <div
                          className="box_icon_MdOutlineEdit"
                          onClick={() =>
                            openConfirmationPopupPrice(product.productID)
                          }
                        >
                          <li>가격: ￦{product.price}</li>
                          <MdOutlineEdit id="icon_edit" />
                        </div>

                        <div
                          className="box_icon_MdOutlineEdit"
                          onClick={() =>
                            openConfirmationPopular(product.productID)
                          }
                        >
                          <li>인기 있는</li>
                          <MdOutlineEdit id="icon_edit" />
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>

          <div id="container_product_admin">
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>모든 메뉴
              </h1>
            </div>
            <div className="contentImageProducts">
              {products.map((product, index) => (
                <div className="box-product" key={index}>
                  <div className="box_input-img">
                    <div className="img">
                      {selectedImages[index] ? (
                        <img
                          src={URL.createObjectURL(selectedImages[index])}
                          alt="Product"
                        />
                      ) : (
                        <img src={product.images[0].src} alt="Product" />
                      )}
                      <input
                        type="file"
                        id={`image-${index}`}
                        onChange={(e) => handleImage(e, index)}
                        required
                      />
                    </div>
                    
                    <div
                      className="Box_delete_product"
                      onClick={() => handleDelete(index)}
                    >
                      <AiOutlineDelete />
                    </div>

                    <div
                      className="edit_image_product"
                      onClick={() =>
                        openConfirmationPopupImage(product.productID)
                      }
                    >
                      <CiCamera id="box_icon_camera_product" />
                    </div>
                  </div>

                  <div className="txtOFproduct">
                    <div></div>
                    <div
                      className="box_icon_MdOutlineEdit"
                      onClick={() => openConfirmationPopup(product.productID)}
                    >
                      <li>음식 이름: {product.productName}</li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>

                    <div
                      className="box_icon_MdOutlineEdit"
                      onClick={() =>
                        openConfirmationPopupPrice(product.productID)
                      }
                    >
                      <li>가격: ￦{product.price}</li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>

                    <div
                      className="box_icon_MdOutlineEdit"
                      onClick={() => openConfirmationPopular(product.productID)}
                    >
                      <li>인기 있는</li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isConfirmationPopupOpen && (
            <div className="background_addproductpopup_box">
              <div className="hover_addproductpopup_box">
                <div className="box_input">
                  <p>제품 이름 수정</p>
                  <input
                    type="text"
                    placeholder="상품명..."
                    className="input_of_txtAddproduct"
                  />
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={closeConfirmationPopup}
                  >
                    아니요
                  </button>
                  <button className="btn_confirm btn_addproducttxt_popup">
                  업데이트
                  </button>
                </div>
              </div>
            </div>
          )}

          {isConfirmationPopupOpenPrice && (
            <div className="background_addproductpopup_box">
              <div className="hover_addproductpopup_box">
                <div className="box_input">
                  <p>제품 가격 수정</p>
                  <input
                    type="text"
                    placeholder="제품 가격..."
                    className="input_of_txtAddproduct"
                  />
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={closeConfirmationPopupPrice}
                  >
                    아니요
                  </button>
                  <button className="btn_confirm btn_addproducttxt_popup">
                  업데이트
                  </button>
                </div>
              </div>
            </div>
          )}
          {isConfirmationPopular && (
            <div className="background_addproductpopup_box">
              <div className="hover_addproductpopup_box">
                <div className="box_input">
                  <p>인기 편집</p>
                  <div className="container_popular">
                    <label htmlFor="popular">인기 있는</label>
                    <input
                      type="checkbox"
                      id="popular"
                      onChange={(e) => handlePopularChange(e, index)}
                    />
                  </div>
                </div>
                <div className="btn_foasdf">
                  <button
                    className="btn_cancel btn_addproducttxt_popup"
                    onClick={() => closeConfirmationPopular()} // No need to pass index here
                  >
                    아니요
                  </button>
                  <button className="btn_confirm btn_addproducttxt_popup">
                  업데이트
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Product;
