import "./css/addresume.css";
import { BsUpload } from "react-icons/bs";
import React, { useState } from "react";
import { IoCamera } from "react-icons/io5";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import axios from "axios";

function CVregister() {
  const [ImagePreview, setImagePreview] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
  );
  
  

  return (
    <>
      <Header />
      <div className="box_container_adresume">
        <div>
          <h2>Edit Resume</h2>
          <div className="image_profile_user">
            <label htmlFor="profileImage">
              <div>
                  <img src={ImagePreview} alt="Preview" />
               
              </div>
              <div className="iconn_changecamera">
                <IoCamera />
              </div>
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              required
            />
          </div>

          <div className="box_content_input">
            <div className="box_inputContent">
              <label>Name:</label>
              <input
                name="name"
                type="text"
                required
                placeholder="Name"
              />
            </div>
            <div className="box_inputContent">
              <label>Age:</label>
              <input
                name="age"
                type="text"
                required
                placeholder="Age"
              />
            </div>
            <div className="box_inputContent">
              <label>Major:</label>
              <input
                name="major"
                type="text"
                required
                placeholder="Major"
              />
            </div>
            <div className="box_inputContent">
              <label>Skills:</label>
              <textarea
                name="skill"
                placeholder="Skills..."
              />
            </div>
            <div className="boxfileUp">
              <div className="boxfileUpInfo">
                <div className="icon_boxfileUpInfo">
                  <BsUpload />
                </div>
                <label htmlFor="filecv">Choose file CV PDF</label>
                <input
                  type="file"
                  id="filecv"
                  accept="application/pdf"
                  required
                />
              </div>
            </div>
            <div className="btn_submit_add">
              <button className="btn_submit_addresume" >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
}

export default CVregister;
