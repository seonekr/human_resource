import React from "react";
import "./Contact.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";

const Contact = () => {

  return (
    <>
      <Header />
      <div className="contactBox_container">
        <div className="contact_content">
          <h2>information</h2>
          <p>Phone: 020 77414787</p>
          <p>Email: Huma999@gmail.com</p>
          <p>Address: Asian</p>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default Contact;
