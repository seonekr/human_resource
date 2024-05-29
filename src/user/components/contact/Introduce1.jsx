import React, { useEffect, useState } from "react";
import axios from "axios";
import "./aboutUs.css";

const Introduce1 = () => {
  const [pdf, setPDF] = useState([]);

  const [pd2, setpd2] = useState([]);

  useEffect(() => {
    fetchResume();
  }, []);

  const nc1 = () => {
    setpd2([]);
  };
  const nc2 = () => {
    setpd2(pdf);
  };

  const fetchResume = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API + "/company/webinfo/list"
      );
      setPDF(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="link">
        <button onClick={nc1}>Company</button>
        <button onClick={nc2}>Employee</button>
      </div>
      {pd2.length > 0 ? (
        <>
          {pd2.map((df) => (
            <div key={df.id} className="about-us">
              <div className="box">
                <h1>Employee</h1>
                <iframe
                  className="iframe"
                  src={df.employee_pdf}
                  title="Company PDF"
                ></iframe>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {pdf.map((df) => (
            <div key={df.id} className="about-us">
              <div className="box">
                <h1>Company</h1>
                <iframe
                  className="iframe"
                  src={df.company_pdf}
                  title="Company PDF"
                ></iframe>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Introduce1;
