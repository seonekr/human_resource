import "./css/product.css";
import users from "../../../img/users.png";
import 진미채볶음 from "../../../img/진미채볶음.jpg";
import { useState } from "react";
import AdminMenu from "../adminMenu/AdminMenu";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import imageicon from "../../../img/imageicon.jpg";
import { AiOutlineDelete } from "react-icons/ai";
import banner_job1 from "../../../img/banner_job1.jpg";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  const [selectedImages, setSelectedImages] = useState(
    Array(products.length).fill(null)
  );

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
            <input type="text" placeholder="Search..." />
            <button>
              <IoSearchOutline />
            </button>
          </div>

          <h1 className="htxthead">
            <span className="spennofStyleadmin"></span>Item
          </h1>
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
                      <img src={banner_job1} alt="Banner" />
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
                      <p>Edit banner image</p>

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
                        No
                      </button>
                      <button className="btn_confirm btn_addproducttxt_popup">
                        Yes
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
                <span className="spennofStyle"></span>Suggest
              </h1>
            </div>

            <div className="contentImageProducts">
              <div className="container_box">
                <div className="box-product">
                  <div className="box_input-img">
                    <div className="img">
                      <img src={users} alt="Product" />
                    </div>
                    <div className="Box_delete_product">
                      <AiOutlineDelete />
                    </div>

                    <div className="edit_image_product">
                      <CiCamera id="box_icon_camera_product" />
                    </div>
                  </div>

                  <div className="txtOFproduct">
                    <div className="box_icon_MdOutlineEdit">
                      <li>Name:</li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>
                    <div className="box_icon_MdOutlineEdit">
                      <li>Age: </li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>

                    <div className="box_icon_MdOutlineEdit">
                      <li>Major: </li>
                      <MdOutlineEdit id="icon_edit" />
                    </div>
                  </div>
                </div>
                <div className="box_icon_MdOutlineEdit">
                  <li>Skill: lorem10</li>
                  <MdOutlineEdit id="icon_edit" />
                </div>
              </div>
            </div>
          </div>

          <div id="container_product_admin">
            <div className="productHead_content">
              <h1 className="htxthead">
                <span className="spennofStyle"></span>All Users
              </h1>
            </div>
            <div className="contentImageUser">
              <div className="group_itemBox_user">
                <div className="containner_box_image_user">
                  <div className="box_image_user">
                    <img src={users} alt="image" />
                  </div>
                  <div className="txtOFproduct_user">
                    <p>
                      <span>Name:</span>
                    </p>
                    <p>
                      <span>Age:</span>
                    </p>
                    <p className="txt_span">
                      <span>Major:</span>
                    </p>
                    <p className="txt_span">
                      <span>Skills:</span>
                    </p>
                  </div>
                  <div className="btn_button_see_user">
                    <Link to="#" className="button_see">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
