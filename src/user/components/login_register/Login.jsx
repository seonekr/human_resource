import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import axios from "axios";
import Header from "../header/Header";
import Menu from "../menu/Menu";



const Login = () => {
  const login_en = "Login";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorText, set_errorText] = useState("");

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handlePass = (e) => {
    const value = e.target.value;
    setPass(value);
  };

  const Login = (e) => {
    e.preventDefault(); // Prevent the default form submission behavsior
    let data = JSON.stringify({
      email: email,
      password: pass,
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

    axios
      .request(config)
      .then((res) => {
        const result = res.data;
        const user = {
          email: result.email,
          image: result.image,
          is_admin: result.is_admin,
          store_id: result.store_id,
          origin_store_name: result.origin_store_name,
          user_id: result.user_id,
          user_name: result.user_name,
          is_first: result.is_first,
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
        set_errorText("The username or password do not match.");
      });
  };

  const [authUrl, setAuthUrl] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API + "/user/social/url/",
        {
          code: "your_code_here", // Replace 'your_code_here' with the actual code
        }
      );
      setAuthUrl(response.data.url);
    } catch (error) {
      console.error("Error fetching Google auth URL:", error);
    }
  };

  return (
    <>
      <section>
        <Header/>
        <form className="box_container_login2">
          <div className="cover">
            {/* <Link to="/" className="box_iconBack">
              <MdArrowBack id="iconBack" />
            </Link> */}
            <h2 className="box_container_login_text">{login_en}</h2>
            <p className="box_pleaselogin">Please Log in to use the service!</p>
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
                value={pass}
                onChange={handlePass}
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
      </section>
      <Menu/>
    </>
  );
};

export default Login;
