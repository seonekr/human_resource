import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./aboutUs.css";

const Introduce1 = () => {
  const [pdf, setPDF] = useState([]);

  const [pd1, setpd1] = useState([]);
  const [pd2, setpd2] = useState([]);

  useEffect(() => {
    fetchResume();
  }, []);

  console.log(pd1);

  const nc1 = () => {
    setpd1(pdf);
    setpd2([]);
  };
  const nc2 = () => {
    setpd2(pdf);
    setpd1([]);
  };

  const fetchResume = async () => {
    try {
      const response = await axios.get(
        "http://3.38.225.226:8000/company/webinfo/list"
      );
      setPDF(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="link">
        <button onClick={nc1}>company</button>
        <button onClick={nc2}>Employee</button>
      </div>
      {pd1.map((df) => (
        <div key={df.id} className="about-us">
          <h1>Company</h1>
          <iframe
            className="iframe"
            src={df.company_pdf}
            title="Company PDF"
          ></iframe>
        </div>
      ))}
      {pd2.map((df) => (
        <div key={df.id} className="about-us">
          <h1>Employee</h1>
          <iframe
            className="iframe"
            src={df.employee_pdf}
            title="Company PDF"
          ></iframe>
        </div>
      ))}
    </>
  );
};

export default Introduce1;
