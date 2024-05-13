import React, { useState, useEffect } from "react";
import "./css/forgotpassword.css";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [errorText, set_errorText] = useState("");
 
  const [data, set_data] = useState({
    email: "",
    code: "",
    password: "",
    password2: "",
  });
  const [timer, set_timer] = useState({
    minute: 0,
    second: 0,
  });
  const { minute, second } = timer;
  const { email, code, password, password2 } = data;

  function onChange(e) {
    const { name, value } = e.target;
    set_data({
      ...data,
      [name]: value,
    });
  }
  useEffect(() => {
    const countdown = setInterval(() => {
      if (second > 0) {
        set_timer({
          ...timer,
          second: second - 1,
        });
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(countdown);
        } else {
          set_timer({
            minute: minute - 1,
            second: 59,
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API}/user/my-page`, data)
      .then((response) => {
        console.log(response.data);
        alert("Your password has been changed.");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Header />
      <section>
        <div className="box_forgot">
          <h2>Find password</h2>
          <div className="title">
            Please change your password after verifying your email!
          </div>
          <form className="container_form_forgot" onSubmit={handleSubmit}>
            <div className="box_infor">Please enter basic information</div>
            <div className="container_form_forgot2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={onChange}
                required
              />
              {minute > 0 || second > 0 ? (
                <div id="email_send_btn" className="verification">
                  {minute < 10 ? `0${minute}` : minute}:
                  {second < 10 ? `0${second}` : second}
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (data.email.length > 0) {
                      set_timer({ minute: 3, second: 0 });
                      let config = {
                        method: "post",
                        maxBodyLength: Infinity,
                        url: import.meta.env.VITE_API + "/user/send-email",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        data: data,
                      };

                      axios
                        .request(config)
                        .then((response) => {
                          console.log(JSON.stringify(response.data));
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    } else {
                      set_errorText("Please enter your e-mail.");
                    }
                  }}
                  id="email_send_btn"
                  className="verification"
                >
                  Verify
                </div>
              )}
            </div>

            <input
              type="text"
              name="code"
              placeholder="confirmation number"
              value={code}
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="New password"
              value={password}
              onChange={onChange}
              required
            />
            <input
              type="password2"
              name="password2"
              autoComplete="new-password"
              placeholder="Confirm password"
              value={password2}
              onChange={onChange}
              required
            />

            <button type="submit">
              confirmation
            </button>
          </form>
          {errorText.length > 0 && (
            <div id="error_msg" className="error mt20">
              {errorText}
            </div>
          )}
        </div>
      </section>
      <Menu />
    </>
  );
};

export default ForgotPassword;
