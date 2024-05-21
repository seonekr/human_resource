import "./css/addresume.css";
import { BsUpload } from "react-icons/bs";
import React, { useState, useEffect, useRef } from "react";
import { IoCamera } from "react-icons/io5";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditResume() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("");
  const [skill, setSkill] = useState("");
  const [image, setImage] = useState(null);
  const [resumeImage, setResumeImage] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newResumeImage, setNewResumeImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const imageInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/resume/detail/${id}/`
        );
        const data = response.data;
        setName(data.name);
        setAge(data.age);
        setMajor(data.major);
        setSkill(data.skill);
        setUserId(data.user.id);
        setImage(data.image);
        setResumeImage(data.resume_image);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setNewImage(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeImage(file.name);
      setNewResumeImage(file);
    }
  };

  const extractFilename = (url) => {
    return url.split("/").pop();
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("major", major);
    formData.append("skill", skill);
    formData.append("user", userId);

    // Append new image if selected, otherwise append the current image filename
    if (newImage) {
      formData.append("image", newImage);
    } else {
      formData.append("image", extractFilename(image));
    }

    // Append new resume if selected, otherwise append the current resume filename
    if (newResumeImage) {
      formData.append("resume_image", newResumeImage);
    } else {
      formData.append("resume_image", "extractFilename(resumeImage)");
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API}/resume/update/${id}/`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Failed to update the resume");
      }
    } catch (error) {
      console.error(error);
    }

    // Clear the file inputs
    imageInputRef.current.value = null;
    resumeInputRef.current.value = null;
  };

  return (
    <>
      <Header />
      <div className="box_container_adresume">
        <h2>Edit Resume</h2>
        <div className="image_profile_user">
          <label htmlFor="profileImage">
            <div>
              <img src={image} alt="Preview" />
            </div>
            <div className="iconn_changecamera">
              <IoCamera />
            </div>
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            ref={imageInputRef} // Set the ref to the input
          />
        </div>

        <div className="box_content_input">
          <div className="box_inputContent">
            <label>Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="box_inputContent">
            <label>Age:</label>
            <input
              id="age"
              type="text"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="box_inputContent">
            <label>Major:</label>
            <input
              id="major"
              type="text"
              placeholder="Major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            />
          </div>
          <div className="box_inputContent">
            <label>Skills:</label>
            <textarea
              id="skill"
              placeholder="Skills..."
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            />
          </div>
          <div className="boxfileUp">
            <div className="boxfileUpInfo">
              <label className="icon_boxfileUpInfo" htmlFor="filecv">
                <BsUpload />
              </label>
              <input
                type="file"
                id="filecv"
                accept="application/pdf"
                onChange={handleResumeChange}
                ref={resumeInputRef} // Set the ref to the input
              />
            </div>
          </div>
          <div className="btn_submit_add">
            <button onClick={handleUpdate} className="btn_submit_addresume">
              Update
            </button>
          </div>
        </div>
      </div>
      <Menu />
    </>
  );
}

export default EditResume;
