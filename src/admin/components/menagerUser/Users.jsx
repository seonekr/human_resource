import React, { useState, useEffect } from "react";
import "./css/users.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import AdminMenu from "../adminMenu/AdminMenu";
import { Link, useNavigate } from "react-router-dom";
import user from "../../../img/user.png";
import axios from "axios";

const Users = () => {
  const [users, set_users] = useState([]);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleConfirmDelete = () => {
    setShowConfirmation(false);
  };
  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/resume",
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        set_users(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [users]);


  console.log("users..........", users)

  return (
    <>
      <AdminMenu />
      <div className="container_body_adminuser">
        <div className="container_box_adminusers">
          <div className="box_users">
            <h2>Users</h2>
            {/* <form className="search">
              <div className="search-box_menageruser">
                <input type="text" placeholder="Search..." />

                <button type="submit">
                  <IoSearchOutline />
                </button>
              </div>
            </form> */}
          </div>
          {/* {users.length === 0 ? (
            <p className="no-reviews-message">No Order</p>
          ) : (
            users.map((user, index) => ( */}
              <div className="box_users_user">
                <div className="box_dp_txtandiamge">
                  <div className="box_user_img">
                    <img src={user} alt="" />
                  </div>
                  <div className="box_user_text">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.emil}</p>
                  </div>
                </div>
                <div className="btn_box_Cont">
                  <button
                    className="delete_storeDetails"
                    onClick={() => setShowConfirmation(true)}
                  >
                    Delete
                  </button>
                  <Link to="/user" className="viewMore_storeDetails">
                    View
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
            {/* ))
          )} */}

          {/* <div className="box_users_user">
            <div className="box_dp_txtandiamge">
              <div className="box_user_img">
                <img src={user} alt="" />
              </div>
              <div className="box_user_text">
                <p>Name</p>
                <p>Email</p>
              </div>
            </div>
            <div className="btn_box_Cont">
              <button
                className="delete_storeDetails"
                onClick={() => setShowConfirmation(true)}
              >
                Delete
              </button>
              <Link to="/user" className="viewMore_storeDetails">
                View
              </Link>
            </div>
          </div> */}

          <div className="box_container_next_product">
            <button className="box_prev_left_product">
              <AiOutlineLeft id="box_icon_left_right_product" />
              <p>Prev</p>
            </button>

            <div className="box_num_product">
              <div className="num_admin_product">
                <p>1</p>
              </div>
            </div>

            <button className="box_prev_right_product">
              <p>Next</p>
              <AiOutlineRight id="box_icon_left_right_product" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
