import "./adminMenu.css";
import {
  IoDocumentText,
  IoLogOutOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { LiaUserCogSolid } from "react-icons/lia";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSell } from "react-icons/md";
import { RiAccountBoxLine } from "react-icons/ri";
import user from "../../../img/user.png";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import imageicon from "../../../img/imageicon.jpg";
import logo_resoure from "../../../img/logo_resoure.jpeg";
import logo_resoure2 from "../../../img/logo_resoure2.jpeg";
import axios from "axios";

const AdminMenu = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const [mainImageStore, setMainImageStore] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [logo1, set_logo1] = useState(null);
  const [logo2, set_logo2] = useState(null);

  var is_admin = false;
  if (localStorage.getItem("user")) {
    is_admin = JSON.parse(window.localStorage.getItem("user")).is_admin;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    console.log("Logged out");
    navigate("/");
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowConfirmation(false);
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleImageStoreName = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImageStore([file]);
      };

      reader.readAsDataURL(file);
    }

    const formdata = new FormData();
    formdata.append("logo1", file);

    const requestOptions = {
      method: "PATCH",
      body: formdata,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/store/1", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setMainImageStore(null);
      })
      .catch((error) => console.error(error));
  };


  const handleImageStoreLogo = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImages([file]);
      };

      reader.readAsDataURL(file);
    }

    const formdata = new FormData();
    formdata.append("logo2", file);

    const requestOptions = {
      method: "PATCH",
      body: formdata,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/store/1", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setMainImages(null);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/resume/1",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.logo1));
        set_logo1(response.data.logo1);
        set_logo2(response.data.logo2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [logo1, logo2, mainImageStore, mainImage]);

 

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImage([file]);
      };

      reader.readAsDataURL(file);
    }
  };

  const [isPopupimage, setPopupimage] = useState(false);

  const [isPopUp, setIsPopUp] = useState("");

  const togglePopupimageName = () => {
    setPopupimage(!isPopupimage);
    setIsPopUp("Edit name image");
  };

  const togglePopupimageLogo = () => {
    setPopupimage(!isPopupimage);
    setIsPopUp("Edit logo image");
  };

  const closeToggle = () => {
    setPopupimage(false);
    setIsPopUp("");
    setMainImage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("logo", image);

    const requestOptions = {
      method: "PATCH",
      body: formdata,
      redirect: "follow",
    };


    if (isPopUp === "name") {
      console.log("Submit image name");
    } else if (isPopUp === "logo") {
      console.log("Submit image logo");
    }

    setMainImage(null);
    setIsPopUp("");
  };

  return (
    <>
      <section id="dashboard">
        <div className="left">
          <div className="menu">
            <NavLink to="/dashboard" className="link">
              <RxDashboard />
              <p>Dashboard</p>
            </NavLink>
            <NavLink to="/product" className="link">
              <IoDocumentText />
              <p>Resume</p>
            </NavLink>
            <NavLink to="/users" className="link">
              <BiUser />
              <p>Users</p>
            </NavLink>
            <NavLink to="/admins" className="link">
              <LiaUserCogSolid />
              <p>Admins</p>
            </NavLink>
            <div onClick={() => setShowConfirmation(true)} className="link">
              <IoLogOutOutline />
              <p>Login</p>
            </div>
            {showConfirmation && (
              <div className="background_addproductpopup_box">
                <div className="hover_addproductpopup_box">
                  <div className="box_logout">
                    <p>Are you sure you want to log out?</p>
                  </div>
                  <div className="btn_foasdf">
                    <button
                      className="btn_cancel btn_addproducttxt_popup"
                      onClick={handleCancelLogout}
                    >
                      No
                    </button>
                    <button
                      className="btn_confirm btn_addproducttxt_popup"
                      onClick={handleConfirmLogout}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="right">
            <div className="logo">
              <span className="logo_store">
                <div className="image_logo_storename">
                  <Link to="/">
                    <img
                      src={logo_resoure2}
                      className="box_logo_storename"
                    ></img>
                  </Link>

                  {is_admin === true && (
                    <div className="edit_image_logo_store">
                      <CiCamera
                        id="box_icon_camera_product"
                        onClick={togglePopupimageName}
                      />
                    </div>
                  )}
                </div>

                <div className="image_logo">
                  <img src={logo_resoure} className="box_store_logo"></img>
                  {is_admin === true && (
                    <div className="edit_image_logo">
                      <CiCamera
                        id="box_icon_camera_product"
                        onClick={togglePopupimageLogo}
                      />
                    </div>
                  )}
                </div>

                {isPopupimage && (
                  <form
                    className="background_addproductpopup_box"
                    onSubmit={handleSubmit}
                  >
                    <div className="hover_addproductpopup_box_image">
                      <div className="box_input_image">
                        <p> {isPopUp} </p>
                        <input
                          type="file"
                          id="img"
                          onChange={handleImage}
                          required
                        />
                        <label htmlFor="img" className="popup_Border_Boximagae">
                          {mainImage && mainImage.length > 0 ? (
                            <img src={URL.createObjectURL(mainImage[0])} />
                          ) : (
                            <img src={imageicon} alt="logo" />
                          )}
                        </label>
                      </div>
                      <div className="btn_foasdf">
                        <button
                          className="btn_cancel btn_addproducttxt_popup"
                          onClick={closeToggle}
                        >
                          No
                        </button>
                        <button
                          className="btn_confirm btn_addproducttxt_popup"
                          type="submit"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </span>
            </div>

            <div className="boximage_admin">
              <NavLink to="/adminacount" className="userAdminImage">
                <p>{storage.email}</p>
                <img src={storage.image || user} alt="admin profile" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminMenu;
