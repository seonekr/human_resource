import "./css/addresume.css";
import { BsUpload } from "react-icons/bs";
import React, { useState } from "react";
import { IoCamera } from "react-icons/io5";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function CVregister() {
 const  usenavigate = useNavigate()
  const storage = JSON.parse(localStorage.getItem("user"));


  const [mainImage, setImagePreview] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
  );
  const [image, set_image] = useState(null);
  const [resume_image, set_resume_image] = useState(null);
  const [postresume, setPostresume] = useState({
    image1: null,
    name: "",
    age: "",
    major: "",
    skill: "",
    resume_image1: null,
  });
  const MySwal = withReactContent(Swal);


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    set_image(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostresume((prevState) => ({
          ...prevState,
          image1: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageResume = (e) => {
    const file = e.target.files[0];

    set_resume_image(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostresume((prevState) => ({
          ...prevState,
          resume_image1: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostresume((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postresume.name) {
      MySwal.fire({
        text: "Please fill the name!",
        icon: "question",
      });
      return;
    }
    if (!postresume.age) {
      MySwal.fire({
        text: "Please fill the age!",
        icon: "question",
      });
      return;
    }
    if (!postresume.major) {
      MySwal.fire({
        text: "Please fill the major!",
        icon: "question",
      });
      return;
    }
    if (!postresume.skill) {
      MySwal.fire({
        text: "Please fill the skill!",
        icon: "question",
      });
      return;
    }
    if (!postresume.image1) {
      MySwal.fire({
        text: "Please fill the image!",
        icon: "question",
      });
      return;
    }
    if (!postresume.resume_image1) {
      MySwal.fire({
        text: "Please fill the file PDF!",
        icon: "question",
      });
      return;
    }
  
    const formdata = new FormData();
    formdata.append("name", postresume.name);
    formdata.append("age", postresume.age);
    formdata.append("major", postresume.major);
    formdata.append("skill", postresume.skill);
    formdata.append("image", image);
    formdata.append("resume_image", resume_image);
    formdata.append("user", storage.user_id);
  
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(`${import.meta.env.VITE_API}/resume/create/`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        Swal.fire({
          text: 'Your resume has been submitted successfully.',
          icon: 'success',
        });
        usenavigate("/");
        setPostresume({
          image1: null,
          name: "",
          age: "",
          major: "",
          skill: "",
          resume_image1: null,
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          text: 'There was a problem submitting your resume. Please try again.',
          icon: 'error',
        });
      });
  };
  

  return (
    <>
      <Header />
      <div className="box_container_adresume">
        <div>
          <h2>CV register</h2>
          <div className="image_profile_user">
            <label htmlFor="profileImage">
              <div>
                {postresume.image1 ? (
                  <img src={postresume.image1} alt="Preview" />
                ) : (
                  <img src={postresume.image1 || mainImage} alt="Default" />
                )}
              </div>
              <div className="iconn_changecamera">
                <IoCamera />
              </div>
            </label>
            <input
              type="file"
              id="profileImage"
              onChange={handleImageChange}
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
                value={postresume.name}
                onChange={handleChange}
              />
            </div>
            <div className="box_inputContent">
              <label>Age:</label>
              <input
                name="age"
                type="text"
                required
                placeholder="Age"
                value={postresume.age}
                onChange={handleChange}
              />
            </div>
            <div className="box_inputContent">
              <label>Major:</label>
              <input
                name="major"
                type="text"
                required
                placeholder="Major"
                value={postresume.major}
                onChange={handleChange}
              />
            </div>
            <div className="box_inputContent">
              <label>Skills:</label>
              <textarea
                name="skill"
                placeholder="Skills..."
                value={postresume.skill}
                onChange={handleChange}
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
                  onChange={handleImageResume}
                  accept="application/pdf"
                  required
                />
              </div>
            </div>
            <div className="btn_submit_add">
              <button className="btn_submit_addresume" onClick={handleSubmit}>
                Save
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
