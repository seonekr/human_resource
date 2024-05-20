import "./css/addresume.css";
import { BsUpload } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { IoCamera } from "react-icons/io5";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditResume() {
  const { id } = useParams();

  console.log("idididididid", id)

  const storage = JSON.parse(window.localStorage.getItem("user"));
  const store_id = storage?.store_id || false;

  const [ImagePreview, setImagePreview] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
  );
  const [email, set_email] = useState("");
  const [name, set_name] = useState("");
  const [age, set_age] = useState("");
  const [major, set_major] = useState("");
  const [skill, set_skill] = useState("");
  const [image, set_image] = useState(null);
  const [resume_image, set_resume_image] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/resume/user/${id}/`,
    };

    axios
      .request(config)
      .then((response) => {
        const data = response.data.data;
        set_email(data.user.email);
        set_name(data.user.name);
        set_age(data.age);
        set_major(data.major);
        set_skill(data.skill);
        if (data.image) setImagePreview(data.image);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      set_image(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    set_resume_image(file);
  };

  // const EditProfile = (e) => {
  //   e.preventDefault();

  //   let data = new FormData();
  //   data.append("name", name);
  //   data.append("age", age);
  //   data.append("major", major);
  //   data.append("skill", skill);
  //   if (image) data.append("image", image);
  //   if (resume_image) data.append("resume_image", resume_image);
  //   data.append("user", id);

  //   let config = {
  //     method: "put",
  //     maxBodyLength: Infinity,
  //     url: `${import.meta.env.VITE_API}/resume/update/${store_id}`,
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       alert("Your Profile has been updated.");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };


  const handleUpdate = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('name', name);
    data.append('age', age);
    data.append('major', major);
    data.append('skill', skill);
    if (image) data.append('image', image);
    if (resume_image) data.append('resume_image', resume_image);
    data.append('user', id);

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/resume/user/${id}/`,
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert('Your Profile has been updated.');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  return (
    <>
      <Header />
      <div className="box_container_adresume">
        <form onSubmit={handleUpdate}>
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
              onChange={handleImageChange}
            />
          </div>

          <div className="box_content_input">
            <div className="box_inputContent">
              <label>Email:</label>
              <input
                id="email"
                type="text"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => set_email(e.target.value)}
              />
            </div>
            <div className="box_inputContent">
              <label>Name:</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => set_name(e.target.value)}
              />
            </div>
            <div className="box_inputContent">
              <label>Age:</label>
              <input
                id="age"
                type="text"
                required
                placeholder="Age"
                value={age}
                onChange={(e) => set_age(e.target.value)}
              />
            </div>
            <div className="box_inputContent">
              <label>Major:</label>
              <input
                id="major"
                type="text"
                required
                placeholder="Major"
                value={major}
                onChange={(e) => set_major(e.target.value)}
              />
            </div>
            <div className="box_inputContent">
              <label>Skills:</label>
              <textarea
                id="skill"
                placeholder="Skills..."
                value={skill}
                onChange={(e) => set_skill(e.target.value)}
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
                  onChange={handleResumeChange}
                />
              </div>
            </div>
            <div className="btn_submit_add">
              <button type="submit" className="btn_submit_addresume">Update</button>
            </div>
          </div>
        </form>
      </div>
      <Menu />
    </>
  );
}

export default EditResume;
