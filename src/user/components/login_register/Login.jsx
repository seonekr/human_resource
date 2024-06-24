import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import axios from "axios";
import Header from "../header/Header";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  const login_en = "Login";
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, set_errorText] = useState("");

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const Login = (e) => {
    e.preventDefault(); // Prevent the default form submission behavsior
    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/signin",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    console.log("Data..........", data);

    axios
      .request(config)
      .then((response) => {
        const result = response.data;
        const user = {
          user_id: result.user_id,
          is_admin: result.is_admin,
          company_id: result.company_id,
          origin_company_name: result.origin_company_name,
          user_name: result.user_name,
          email: result.email,
          image: result.image,
        };

        const token = result.token.access;
        if (token) {
          window.localStorage.setItem("token", token);
        }
        window.localStorage.setItem("user", JSON.stringify(user));
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        // Swal.fire({
        //   text: "The username or password do not match.",
        //   icon: "error",
        // });

        if (error.response && error.response.status === 400) {
          MySwal.fire({
            icon: 'question',
            title: 'Oops...',
            text: error.response.message || 'Something went wrong!',
          });
        } else {
          MySwal.fire({
            icon: 'question',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      });
  };

  return (
    <>
      <section>
        <Header />
        <div>
          <form className="box_container_login2">
            <div className="cover">
              {/* <Link to="/" className="box_iconBack">
              <MdArrowBack id="iconBack" />
            </Link> */}
              <h2 className="box_container_login_text">{login_en}</h2>
              <p className="box_pleaselogin">
                Please Log in to use the service!
              </p>
              <div className="input">
                <label>Email</label>
                <input
                  className="input_form"
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={handleEmail}
                />
                <label>Password</label>
                <input
                  className="input_form"
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={handlePassword}
                />
              </div>

              {errorText.length > 0 && (
                <div id="error_msg" className="error mt20">
                  {errorText}
                </div>
              )}

              <div className="forgot_password">
                Forgot your password?{" "}
                <Link to={"/forgotPassword"} className="findpassword">
                  Find password
                </Link>
              </div>

              <div className="loginbtn_login">
                <Link type="submit" className="login_btn" onClick={Login}>
                  Login
                </Link>
              </div>
              <div className="googlebtn_btn">
                <p className="box_dont">
                  Is this your first time?
                  <Link to={"/signup1"} className="loginmoreLink">
                    Join the membership
                  </Link>
                </p>
              </div>
            </div>
          </form>
          {/* <Menu/> */}
        </div>
      </section>
    </>
  );
};

export default Login;

