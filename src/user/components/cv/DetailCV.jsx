import React, { useState, useEffect } from "react";
import "./css/detailCV.css";
import Header from "../header/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo_resoure from "../../../img/logo_resoure.jpeg";

const DetailCV = () => {
  const id = useParams().id;
  const  usenavigate = useNavigate()
  console.log("ididid", id)
  const [user_id, set_user_id] = useState([]);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);

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
    const requestOptions = {
      method: "DELETE",
      redirect: "follow"
    };
    
    fetch(`http://3.38.225.226:8000/resume/delete/${user_id.id}/`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
      usenavigate("/")
     
  };
  //  console.log(user_id.id)

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/resume/user/${id}/`,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));

        set_user_id(response.data.data);

        console.log("result", response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />
      <section id="product1">
        <div className="productHead_contents">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>User
          </h1>
        </div>

        {user_id ? (
          <div className="contentImageUser">
            <div className="group_itemBox_user">
              <div className="containner_box_image_user">
                <div className="box_image_user">
                  <img src={user_id.image} alt="image" />
                </div>
                <div className="txtOFproduct_user">
                  <p>
                    <span>Name: {user_id.name}</span>
                  </p>
                  <p>
                    <span>Age: {user_id.age}</span>
                  </p>
                  <p className="txt_span">
                    <span>Major: {user_id.major}</span>
                  </p>
                  <p className="txt_span">
                    <span>Skills: {user_id.skill}</span>
                  </p>
                </div>
                <div className="btn_button_see_user">
                  <div
                    className="button_see_delete"
                    onClick={() => setShowConfirmationDelete(true)}
                  >
                    Delete
                  </div>
                  {user_id.user && (
                    <div>
                      <Link
                        to={`/edit_resume/${user_id.id}`}
                        className="button_edit"
                      >
                        Update
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showConfirmationDelete && (
              <div className="box_background_delete">
                <div className="hover_delete_box">
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
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </div>
  );
};

export default DetailCV;
