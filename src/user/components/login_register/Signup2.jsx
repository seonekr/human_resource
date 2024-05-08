import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import Header from "../header/Header";
import Menu from "../menu/Menu";

const Signup2 = () => {
  const locataion = useLocation();
  const navigate = useNavigate();
  const [errorText, set_errorText] = useState("");
  const user_tyep = locataion.state;

  const [timer, set_timer] = useState({
    minute: 0,
    second: 0,
  });
  const { minute, second } = timer;
  const [data, set_data] = useState({
    category: "",
    email: "",
    code: "",
    nickname: "",
    password: "",
    password2: "",
    name: "",
    phone: "",
    address: "",
    sub_address: "",
    company_number: "",
    introduce: "",
  });

  function onChange(e) {
    const { name, value } = e.target;
    set_data({
      ...data,
      [name]: value,
    });
  }

  const SignUp = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate("/loginuser");
        return;
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          set_errorText(err.response.data.message);
        } else {
          set_errorText("This is an unknown error.");
        }
      });
    console.log(data);
  };

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

  return (
    <>
      <Header />
      <section>
        <div className="box_forgot">
          <h2>Company registration</h2>

          <div className="title">
            You are in the process of signing up as a user!
          </div>
          <form className="container_form_user">
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

            <>
              <input
                type="text"
                name="code"
                placeholder="code (required)"
                onChange={onChange}
                required
              />
              <input
                type="text"
                name="name"
                placeholder="Company name (required)"
                onChange={onChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address (required) "
                onChange={onChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone number (optional)"
                onChange={onChange}
              />
              <input
                type="text"
                name="company_number"
                placeholder="Business registration number (optional)"
                onChange={onChange}
              />

              <textarea
                className="box_text"
                name="introduce"
                placeholder="Store introduction (optional/maximum 300 characters)"
                maxLength="300"
                onChange={onChange}
              ></textarea>
            </>

            <button type="button" onClick={SignUp}>
              Register
            </button>
          </form>
          {errorText.length > 0 && <div>{errorText}</div>}
        </div>
      </section>
      <Menu />
    </>
  );
};

export default Signup2;
