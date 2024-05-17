import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import Header from "../header/Header";

const Signup2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const userType = location.state;

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
              required
            />
            {userType === "1" && (
              <input
                type="text"
                name="name"
                onChange={onChange}
                value={data.name}
                placeholder="Nickname (maximum 10 characters)"
                required
              />
            )}

            <input
              type="password"
              name="password"
              onChange={onChange}
              value={data.password}
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="password2"
              onChange={onChange}
              value={data.password2}
              placeholder="Confirm password"
              required
            />
            {userType === "2" && (
              <>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={(data.category = "2")}
                  onChange={onChange}
                  required
                  hidden
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Company name (required)"
                  value={data.name}
                  onChange={onChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address (required)"
                  value={data.address}
                  onChange={onChange}
                  required
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
          </form>
          <div className="googlebtn_btn">
            <p className="box_dont">
              Already have an acount?
              <Link to={"/login"} className="loginmoreLink">
                Log in
              </Link>
            </p>
          </div>
          {errorText.length > 0 && <div>{errorText}</div>}
        </div>
      </section>
    </>
  );
};

export default Signup2;
