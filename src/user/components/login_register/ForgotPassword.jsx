import React, { useState, useEffect } from "react";
import "./css/forgotpassword.css";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [errorText, set_errorText] = useState("");
  const MySwal = withReactContent(Swal);

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

    if (!data.email) {
      MySwal.fire({
        text: "Please fill the email!",
        icon: "question",
      });
      return;
    }
    if (!data.code) {
      MySwal.fire({
        text: "Please fill the code!",
        icon: "question",
      });
      return;
    }
    if (!data.password) {
      MySwal.fire({
        text: "Please fill the password!",
        icon: "question",
      });
      return;
    }
    if (!data.password2) {
      MySwal.fire({
        text: "Please fill the confirm password!",
        icon: "question",
      });
      return;
    }
    if (data.password != data.password2) {
      MySwal.fire({
        text: "Password do not match!",
        icon: "question",
      });
      return;
    }
    if (data.password.length <= 7 || data.password2.length <= 7) {
      MySwal.fire({
        text: "Password must be at least 8 characters!",
        icon: "question",
      });
      return;
    }

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
          <div className="box_infor_txt">
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
            />
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="New password"
              value={password}
              onChange={onChange}
            />
            <input
              type="password"
              name="password2"
              autoComplete="new-password"
              placeholder="Confirm password"
              value={password2}
              onChange={onChange}
            />

            <button type="submit">confirmation</button>
            <div className="googlebtn_bt">
              <p className="box_dont">
                Already have an acount?
                <Link to={"/login"} className="loginmoreLink">
                  Log in
                </Link>
              </p>
            </div>
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
