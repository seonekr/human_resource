import React from "react";
import "./css/accountAdmin.css";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";

function EditAccount() {
  return (
    <>
      <section id="addAmin">
        <div className="box_addAdmin">
          {/* <h3>{message && message}</h3> */}
          <form>
            <div className="addAdminForm">
              <div className="boxhead_subminandtitle">
                <h2 className="titleaddmin">Edit Account</h2>
                <div className="btn_boxAcouunt">
                  <button type="submit" className="submit_delete_update">
                    Update
                  </button>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">
                  Name:
                </label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <input
                    type="text"
                    id="fname"
                    className="input"
                    placeholder="Name..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="email" className="titlelabel">
                  Email:
                </label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="Email..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                  Password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeyOutline className="iconinput" />
                  <input
                    type="text"
                    id="password"
                    className="input"
                    placeholder="Password enter your current password..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                  Password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeyOutline className="iconinput" />
                  <input
                    type="text"
                    id="password"
                    className="input"
                    placeholder="Please enter a new password..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="password" className="titlelabel">
                  Password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeyOutline className="iconinput" />
                  <input
                    type="text"
                    id="password"
                    className="input"
                    placeholder="Please confirm your new password..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">
                  Profile image:
                </label>
                <div className="boxiconnandinput">
                  <CiImageOn className="iconinput" />
                  <input type="file" className="input" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default EditAccount;
