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
import Logo from "../../../img/Logo.png";
import storename from "../../../img/storename.png";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import imageicon from "../../../img/imageicon.jpg";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

const AdminMenu = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

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

  // image handle logo store name
  const [mainImage, setMainImage] = useState(null);

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
    setIsPopUp("이름 이미지 수정");
  };

  const togglePopupimageLogo = () => {
    setPopupimage(!isPopupimage);
    setIsPopUp("로고 이미지 편집");
  };

  const closeToggle = () => {
    setPopupimage(false);
    setIsPopUp("");
    setMainImage(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
              <p>계기반</p>
            </NavLink>
            <NavLink to="/product" className="link">
              <IoDocumentText />
              <p>제품</p>
            </NavLink>
            <NavLink to="/orderpage" className="link">
              <MdOutlineSell />
              <p>명령</p>
            </NavLink>
            <NavLink to="/bank" className="link">
              <RiAccountBoxLine />
              <p>은행 계좌</p>
            </NavLink>
            <NavLink to="/store" className="link">
              <HiOutlineBuildingStorefront />
              <p>백화점</p>
            </NavLink>
            <NavLink to="/users" className="link">
              <BiUser />
              <p>사용자</p>
            </NavLink>
            <NavLink to="/admins" className="link">
              <LiaUserCogSolid />
              <p>관리자</p>
            </NavLink>
            <div onClick={() => setShowConfirmation(true)} className="link">
              <IoLogOutOutline />
              <p>로그 아웃</p>
            </div>
            {showConfirmation && (
              <div className="background_addproductpopup_box">
                <div className="hover_addproductpopup_box">
                  <div className="box_logout">
                    <p>정말로 로그아웃하시겠습니까?</p>
                  </div>
                  <div className="btn_foasdf">
                    <button
                      className="btn_cancel btn_addproducttxt_popup"
                      onClick={handleCancelLogout}
                    >
                      아니요
                    </button>
                    <button
                      className="btn_confirm btn_addproducttxt_popup"
                      onClick={handleConfirmLogout}
                    >
                      예
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
                    <img src={storename} className="box_logo_storename"></img>
                  </Link>

                  <div className="edit_image_logo_store">
                    <CiCamera
                      id="box_icon_camera_product"
                      onClick={togglePopupimageName}
                    />
                  </div>
                </div>

                <div className="image_logo">
                  <img src={Logo} className="box_store_logo"></img>
                  <div className="edit_image_logo">
                    <CiCamera
                      id="box_icon_camera_product"
                      onClick={togglePopupimageLogo}
                    />
                  </div>
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
                          아니요
                        </button>
                        <button
                          className="btn_confirm btn_addproducttxt_popup"
                          type="submit"
                        >
                          업데이트
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </span>
            </div>

            <NavLink to="/adminacount" className="userAdminImage">
              <img src={user} alt="Logo_Profile" />
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminMenu;