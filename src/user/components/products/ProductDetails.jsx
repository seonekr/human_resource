import React, { useState } from "react";
import "./css/productBuy.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import CV from "./CvTest.pdf";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";

function ProductDetails() {
  // const [selectedFile, setSelectedFile] = useState(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  // };
  const pdfUrl = [CV]; // Replace "path_to_your_pdf_file.pdf" with the actual path or URL of your PDF file

  return (
    <>
      <Header />
      <div className="contentBody">
        <Link to="/" className="box_container_back_icons_back">
          <IoIosArrowBack id="icons_back" />
          <p>Back</p>
        </Link>
        {/* <div className="product-details-container">
          <h1 className="product-details-title">CV Details</h1>
          <input type="file" onChange={handleFileChange} />
          {selectedFile && (
            <div className="pdf-container">
              <iframe
                src={URL.createObjectURL(selectedFile)}
                title="Product PDF"
                className="pdf-viewer"
              ></iframe>
            </div>
          )}
        </div> */}

        <div className="product-details-container">
          <h1 className="product-details-title">CV Details</h1>
          {pdfUrl && (
            <div className="pdf-container">
              <iframe
                src={pdfUrl}
                title="Product PDF"
                className="pdf-viewer"
              ></iframe>
            </div>
          )}
        </div>
        <div className="box-check">
          <h4>Add to list</h4>
          <label className="checkbox-label">
            <input type="checkbox" className="checkbox" />
            <span className="checkbox-custom"></span>
          </label>
        </div>
      </div>
      <Menu />
    </>
  );
}

export default ProductDetails;

// import React, { useState } from "react";
// import "./css/productBuy.css";

// const ProductDetails = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   return (
//     <div className="product-details-container">
//       <h1 className="product-details-title">Product Details</h1>
//       <input type="file" onChange={handleFileChange} />
//       {selectedFile && (
//         <div className="pdf-container">
//           <iframe
//             src={URL.createObjectURL(selectedFile)}
//             title="Product PDF"
//             className="pdf-viewer"
//           ></iframe>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;
