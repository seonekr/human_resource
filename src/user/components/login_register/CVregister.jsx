import "./css/addresume.css";
import { BsUpload } from "react-icons/bs";
import React, { useRef, useState } from "react";
import { IoCamera } from "react-icons/io5";
import Header from "../header/Header";
import Menu from "../menu/Menu";

function CVregister() {
  //Choose image user
  const [imagePreview, setImagePreview] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      <div className="box_container_adresume">
        <h2>CV register</h2>
        <div className="image_profile_user">
          <label htmlFor="profileImage">
            <img src={imagePreview} alt="" />
            <div className="iconn_changecamera">
              <IoCamera />
            </div>
          </label>

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="box_content_input">
          <div className="box_inputContent">
            <label>Name:</label>
            <input type="text" required placeholder="Name" />
          </div>
          <div className="box_inputContent">
            <label>Age:</label>
            <input type="text" required placeholder="Age" />
          </div>
          <div className="box_inputContent">
            <label>Major:</label>
            <input type="text" required placeholder="Major" />
          </div>
          <div className="box_inputContent">
            <label>Skills:</label>
            <textarea placeholder="Skills..."></textarea>
          </div>
          <div className="boxfileUp">
            <div className="boxfileUpInfo">
              <div className="icon_boxfileUpInfo">
                <BsUpload />
              </div>
              <input type="file" id="filecv"/>
              <label htmlFor="filecv">Choose file CV PDF</label>
              
              {/* <label htmlFor="filecv" className="btn_submitUploadFile">Selete CV file</label> */}
            </div>
          </div>
          <div className="btn_submit_add">
            <button className="btn_submit_addresume">Save</button>
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
}

export default CVregister;
