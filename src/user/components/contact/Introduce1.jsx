import React, { useEffect, useState } from "react";
import axios from "axios";
import "./aboutUs.css";

const Introduce1 = () => {
  const [pdf, setPDF] = useState([]);

  useEffect(() => {
    fetchResume();
  }, []);

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
    <h2>dfff</h2>
      {pdf.map((df) => (
        <div key={df.id} className="about-us">
          <h1>Company</h1>
          <iframe
            className="iframe"
            src={df.company_pdf}
            title="Company PDF"
          ></iframe>
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
