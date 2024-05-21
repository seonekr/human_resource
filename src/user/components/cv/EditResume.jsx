import "./css/addresume.css";
import { BsUpload } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { IoCamera } from "react-icons/io5";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditResume() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [major, setMajor] = useState("");
  const [skill, setSkill] = useState("");
  const [image, setImage] = useState(null);
  const [resumeImage, setResumeImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const [newImage, setNewImage] = useState(null); // State to hold new image file
  const [newResumeImage, setNewResumeImage] = useState(null); // State to hold new resume file
  const [imagePreview, setImagePreview] = useState(null); // State to hold image preview URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/resume/detail/${id}/`);
        const data = response.data;
        setEmail(data.user.email);
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
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setNewImage(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setNewResumeImage(file);
  };

  const extractFilename = (url) => {
    return url.split('/').pop();
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("major", major);
    formData.append("skill", skill);
    formData.append("is_recommend", "true");
    formData.append("user", userId);

    if (newImage) {
      formData.append("image", newImage);
    } else if (image) {
      formData.append("image", extractFilename(image));
    }

    if (newResumeImage) {
      formData.append("resume_image", newResumeImage);
    } else if (resumeImage) {
      formData.append("resume_image", extractFilename(resumeImage));
    }

    fetch(`${import.meta.env.VITE_API}/resume/update/${id}/`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Header />
      <div className="box_container_adresume">
        <h2>Edit Resume</h2>
        <div className="image_profile_user">
          <label htmlFor="profileImage">
            <div>
              <img src={imagePreview || image} alt="Preview" />
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
          />
        </div>

        <div className="box_content_input">
          <div className="box_inputContent">
            <label>Email:</label>
            <input
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
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
