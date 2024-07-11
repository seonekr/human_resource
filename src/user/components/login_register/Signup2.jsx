import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import Header from "../header/Header";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Signup2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const userType = location.state;
  const MySwal = withReactContent(Swal);

  const [timer, setTimer] = useState({
    minute: 0,
    second: 0,
  });
  const { minute, second } = timer;
  const [data, setData] = useState({
    category: "",
    email: "",
    code: "",
    password: "",
    password2: "",
    name: "",
    company_number: "",
    address: "",
    phone: "",
    introduce: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const signUp = (e) => {
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
    if (userType === "1" && !data.name) {
      if (!data.nickname) {
        MySwal.fire({
          text: "Please fill the nickname!",
          icon: "question",
        });
        return;
      }
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

    if (userType == "2") {
      if (!data.name) {
        MySwal.fire({
          text: "Please fill the store name!",
          icon: "question",
        });
        return;
      }
      if (!data.address) {
        MySwal.fire({
          text: "Please fill the address!",
          icon: "question",
        });
        return;
      }
      if (!data.phone) {
        MySwal.fire({
          text: "Please fill the phone!",
          icon: "question",
        });
        return;
      }
      if (!data.company_number) {
        MySwal.fire({
          text: "Please fill the company number!",
          icon: "question",
        });
        return;
      }
      if (!data.introduce) {
        MySwal.fire({
          text: "Please fill the introduce!",
          icon: "question",
        });
        return;
      }
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_API}/user/signup`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate("/login");
      })
      .catch((err) => {
        setErrorText(
          err.response?.data?.message || "This is an unknown error."
        );
      });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (second > 0) {
        setTimer({
          ...timer,
          second: second - 1,
        });
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(countdown);
        } else {
          setTimer({
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

  return (
    <>
      <Header />
      <section>
        <div className="box_forgot">
          {userType === "1" && <h2>User register</h2>}
          {userType === "2" && <h2>Company register</h2>}

          <p>You are in the process of signing up as a user!</p>
          <form className="container_form_user" onSubmit={signUp}>
            <div className="box_title">Enter basic information</div>
            <div className="container_form_user2">
              <input
                type="email"
                name="email"
                onChange={onChange}
                value={data.email}
                placeholder="Email"
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
                      setTimer({ minute: 3, second: 0 });
                      const config = {
                        method: "post",
                        maxBodyLength: Infinity,
                        url: `${import.meta.env.VITE_API}/user/send-email`,
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
                      setErrorText("Please enter your e-mail.");
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
              onChange={onChange}
              value={data.code}
              placeholder="Code (required)"
            />
            {userType === "1" && (
              <input
                type="text"
                name="name"
                onChange={onChange}
                value={data.name}
                placeholder="Nickname (maximum 10 characters)"
              />
            )}

            <input
              type="password"
              name="password"
              onChange={onChange}
              value={data.password}
              placeholder="Password"
            />
            <input
              type="password"
              name="password2"
              onChange={onChange}
              value={data.password2}
              placeholder="Confirm password"
            />
            {userType === "2" && (
              <>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={(data.category = "2")}
                  onChange={onChange}
                  hidden
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Company name (required)"
                  value={data.name}
                  onChange={onChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address (required)"
                  value={data.address}
                  onChange={onChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number (optional)"
                  value={data.phone}
                  onChange={onChange}
                />
                <input
                  type="text"
                  name="company_number"
                  placeholder="Business registration number (optional)"
                  value={data.company_number}
                  onChange={onChange}
                />
                <textarea
                  className="box_text"
                  name="introduce"
                  placeholder="Store introduction (optional/maximum 300 characters)"
                  maxLength="300"
                  value={data.introduce}
                  onChange={onChange}
                ></textarea>
              </>
            )}

            <button type="submit">Register</button>
            <div className="googlebtn_btn">
            <p className="box_dont">
              Already have an acount?
              <Link to={"/login"} className="loginmoreLink">
                Log in
              </Link>
            </p>
          </div>
          </form>
          
          {errorText.length > 0 && <div>{errorText}</div>}
          
        </div>
      </section>
    </>
  );
};

export default Signup2;
