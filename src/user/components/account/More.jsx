import React from "react";
import "./css/more.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { MdDelete } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { IoKeySharp } from "react-icons/io5";
import { TfiCalendar } from "react-icons/tfi";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profile from "../../../img/profile.jpg";
import axios from "axios";

export const More = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);

  // const storage = JSON.parse(window.localStorage.getItem("user"));
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    return;
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowConfirmation(false);
  };
  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteAccount();
    setShowConfirmationDelete(false);
  };
  const handleCancelDelete = () => {
    setShowConfirmationDelete(false);
  };

  const user = localStorage.getItem("user");

  
  //Function Delete
  const handleDeleteAccount = async () => {
    try {
      const config = {
        method: "delete",
        url: `${import.meta.env.VITE_API}/user/my-page`, // Assuming your API URL is stored in environment variables
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
      };

      const response = await axios(config);
      if (response.status === 204) {
        // Account deleted successfully
        alert("Account deleted successfully");
        console.log("Account deleted successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        // Perform any other actions (e.g., redirect to home page)
      } else {
        console.error("Failed to delete account:", response.data.message);
        alert("Failed to delete account:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <Header />

      <div className="MorePage">
        <div className="box_icon_back">
          <div className="Box_haed_management">
            <h3>Account Settings</h3>
          </div>
        </div>

        <div className="profile_box">
          <div className="left_box">
            {JSON.parse(window.localStorage.getItem("user")).image != false ? (
              <img
                src={JSON.parse(window.localStorage.getItem("user")).image}
                alt=""
              />
            ) : (
              <img src={profile} alt="" />
            )}
            <div className="user_name">
              Name:{" "}
              {JSON.parse(window.localStorage.getItem("user")).user_name || null}
            </div>
          </div>
          <Link to="#" className="right_box">
            <button>View</button>
          </Link>
        </div>
        <hr className="hr" />
        <div className="more-menu-list">
          <div onClick={() => setShowConfirmation(true)} className="menu_icon">
            <IoLogOutOutline id="menu_icon" />
            <p>Log out </p>
          </div>
          {showConfirmation && (
            <div className="confirmation-popup">
              <p>Are you sure you want to log out?</p>
              <div className="btn_ok_on">
                <button onClick={handleCancelLogout} className="btn_on">
                  No
                </button>
                <button onClick={handleConfirmLogout} className="btn_yes">
                  Yes
                </button>
              </div>
            </div>
          )}

          <hr className="hr" />
          <div
            className="menu_icon"
            onClick={() => setShowConfirmationDelete(true)}
          >
            <MdDelete id="icon_more" />
            <p>Delete account</p>
          </div>

          {showConfirmationDelete && (
            <div className="confirmation-popup">
              <p>Are you sure you want to delete?</p>
              <div className="btn_ok_on">
                <button onClick={handleCancelDelete} className="btn_on">
                  No
                </button>
                <button onClick={handleConfirmDelete} className="btn_yes">
                  Yes
                </button>
              </div>
            </div>
          )}

          <hr className="hr" />
        </div>
      </div>

      <Menu />
    </>
  );
};
export default More;
