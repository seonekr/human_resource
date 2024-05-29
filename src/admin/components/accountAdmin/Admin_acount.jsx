import Reac, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/accountAdmin.css";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { CiImageOn } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";

function Admin_acount() {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <section id="addAmin">
        <div className="box_addAdmin">
          <form>
            <div className="addAdminForm">
              <div className="boxhead_subminandtitle">
                <h2 className="titleaddmin">Admin Account</h2>
                <div className="btn_boxAcouunt">
                  <div
                    className="submit_delete"
                    onClick={() => setShowConfirmation(true)}
                  >
                    Delete
                  </div>
                  <Link to="/edit_account" className="submit_add">
                    Edit
                  </Link>
                </div>
                {showConfirmation && (
                  <div className="background_addproductpopup_box">
                    <div className="hover_addproductpopup_box">
                      <div className="box_logout">
                        <p>Are you sure you want to delete</p>
                      </div>
                      <div className="btn_foasdf">
                        <button
                          className="btn_cancel btn_addproducttxt_popup"
                          onClick={handleCancelDelete}
                        >
                          No
                        </button>
                        <button
                          className="btn_confirm btn_addproducttxt_popup"
                          onClick={handleConfirmDelete}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                <label htmlFor="pass" className="titlelabel">
                  Password:
                </label>
                <div className="boxiconnandinput">
                  <IoKeyOutline className="iconinput" />
                  <input
                    type="text"
                    id="pass"
                    className="input"
                    placeholder="Password..."
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

export default Admin_acount;
