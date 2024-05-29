import React from "react";
import "./menu.css";
import "boxicons";
import { Link } from "react-router-dom";
import QrdownloadApp from "../../../img/QrdownloadApp.png";
import { FaCartShopping, FaBold } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi";
import { BsShop, BsClipboardCheck } from "react-icons/bs";
import { GrContact } from "react-icons/gr";

const Menu = () => {
  return (
    <section>
      {/* Footer Menu For PC */}
      <footer className="footerBox">
        <div className="footer_Container">
          <div className="footconentBox">
            <h3 className="txt_footHead">About Us</h3>
            <p>
              <Link to="/about" className="txt_pFoot">
                information
              </Link>
            </p>
          </div>

          <div className="footconentBox">
            <h3 className="txt_footHead">Contact us</h3>
            <p>
              <Link to="/" className="txt_pFoot">
                Phone: 020 998878788
              </Link>
            </p>
            <p>
              <Link to="/" className="txt_pFoot">
                Email: humascot@gmail.com
              </Link>
            </p>
            <p>
              <Link to="/" className="txt_pFoot">
                Address: Asean mall
              </Link>
            </p>
          </div>

          <div className="footconentBox3">
            <h3 className="txt_footHead txh3">Download the app</h3>
            <div className="foot_contentItem">
              <img src={QrdownloadApp} alt="QrdownloadApp" />
              <div className="guop_btndownl">
                <Link to="/" className="footLink">
                  Play store
                </Link>
                <Link to="/" className="footLink">
                  App store
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="hrfoo" />
        <p className="lastFooter">Copyright &#169; Huma_resource 2024</p>
      </footer>

      {/* Footer Menu For Mobile */}
      <div className="menubar">
        <Link to="/" className="box-menu active">
          <span className="iconMenuSpan">
            <HiOutlineHome />
          </span>
          <span>Home</span>
        </Link>
        <Link to="/about" className="box-menu">
          <span className="iconMenuSpan">
            <FaBold />
          </span>
          <span>About</span>
        </Link>
        <Link to="/contact" className="box-menu">
          <span className="iconMenuSpan">
            <GrContact />
          </span>
          <span>Contact</span>
        </Link>
      </div>
    </section>
  );
};

export default Menu;
