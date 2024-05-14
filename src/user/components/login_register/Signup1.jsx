import React, { useState } from "react";
import "./css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { FaLaptopHouse } from "react-icons/fa";

const Signup1 = () => {
  const [signup, setSignup] = useState("");
  const [user_type, set_user_type] = useState("");

  const navigate = useNavigate();

  const selectSignup = (event) => {
    const { id } = event.target;
    setSignup(id);
  };

  function onChange(e) {
    set_user_type(e.target.value);
  }

  return (
    <>
    <Header/>
      <section>
        <div className="signup_page">
          <div className="signup_page">

            <h3 className="title_mt20">Join the membership</h3>
            <p>Please sign up to use the service!</p>
            <div className="box_form_register">
              <div className="input_wrap">
                <ul>
                  <li>
                    <input
                      type="radio"
                      id="user"
                      value="1"
                      name="user_type"
                      onChange={onChange}
                    />
                    <label htmlFor="user" className="user_type02">
                      <FaUsers id="icon_user_sell" />
                      User
                    </label>
                  </li>
                </ul>
                <ul>
                  <li>
                    <input
                      type="radio"
                      id="seller"
                      value="2"
                      name="user_type"
                      onChange={onChange}
                    />
                    <label htmlFor="seller" className="user_type02">
                      <FaLaptopHouse id="icon_user_sell" />
                      Company
                    </label>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => {
                  if (user_type.length > 0) {
                    navigate("/signup2", { state: user_type });
                  } else {
                    window.alert(
                      "Please select the type you wish to sign up for."
                    );
                  }
                }}
                className="btn_register_next"
              >
                Next
              </button>
            </div>
            <div className="googlebtn_btn">
            <p className="box_dont">
              Already have an acount?
              <Link to={"/login"} className="loginmoreLink">
                Log in
              </Link>
            </p>
          </div>
          </div>
        </div>
      </section>
      <Menu/>
    </>
  );
};

export default Signup1;
