import "./css/productHome.css";
import job from "../../../img/job.png";
import logo from "../../../img/logo.jpg";
import avatar from "../../../img/avatar.png";
import Header from "../header/Header";
import { Link } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TfiMenuAlt } from "react-icons/tfi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ProductHome = () => {

  return (
    <div>
      <Header />
      <section id="product1">
        <div className="box_container_ux_ui">
          <div className="container_Uxui">
            <div className="box_Uxui">
              <p>UX/UI</p>
            </div>
            <p>Software developer</p>
            <p>Data Analysis</p>
          </div>
          <div className="box_TfiMenuAlt">
            <select className="filter_priceProduct">
              <option>More title job</option>
              <option value="1">Tester</option>
              <option value="2">Data Analysis</option>
              <option value="3">Software developer</option>
              <option value="4">Frontend</option>
              <option value="5">Backend</option>
              <option value="6">Web developer</option>
              <option value="7">Programe developer</option>
              
            </select>
          </div>
        </div>
        <div className="productHead_content">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>Suggest
          </h1>
        </div>
        <div className="contentImageProducts1">
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={logo} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={avatar} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={job} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
        </div>

        <div className="productHead_contents">
          <h1 className="htxthead">
            <span className="spennofStyle"></span>All User
          </h1>
        </div>

        <div className="contentImageProducts1">
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={logo} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={avatar} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} className="Checkbox" />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={job} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} className="Checkbox" />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={logo} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={avatar} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
          <div className="group_itemBox">
            <div className="containner_box_image">
              <div className="box_image">
                <img src={job} alt="image" />
              </div>
              <div className="txtOFproduct">
                <h4>Name: </h4>
                <p>Age: </p>
                <p>Major: </p>
                <p>Position:</p>
              </div>
            </div>
            <div className="btn_button_see">
              <FormControlLabel control={<Checkbox />} />
              <Link to="/productdetails" className="button_see">
                PDF
              </Link>
            </div>
          </div>
        </div>

        <div className="box_container_next_product">
          <button className="box_prev_left_product">
            <AiOutlineLeft id="" />
            <p>Prev</p>
          </button>

          <div className="box_num_product">
            <div className="num_admin_product">
              <p>1</p>
            </div>
            <div className="num_admin_product">
              <p>2</p>
            </div>
          </div>

          <button className="box_prev_right_product">
            <p>Next</p>
            <AiOutlineRight id="" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductHome;
