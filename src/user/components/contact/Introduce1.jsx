import React, {useEffect, useState} from "react";
import "./aboutUs.css";

const Introduce1 = () => {

  const [pdf, setPDF] = useState([])


  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `company/webinfo/list`,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        setPDF(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  console.log(pdf)

  return (
    <>
      <div>
  
      </div>
    </>
  );
};

export default Introduce1;
