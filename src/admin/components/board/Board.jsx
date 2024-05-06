import "./board.css";
import { IoDocumentText } from "react-icons/io5";
import { BsHandbagFill } from "react-icons/bs";
import { TbShoppingCartStar } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Board = () => {
  const [userAccount, setUserAccount] = useState("");
  const [adminCount, setAdminCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const token = localStorage.getItem("token");

  const navitage = useNavigate();

  // For authen users

  // For get number of admins
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/countAdmin", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAdminCount(result.result[0].admins)
      })
      .catch((error) => console.log("error", error));
  }, []);

  // For get number of users
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/countCustomer", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserAccount(result.result[0].customers)
      })
      .catch((error) => console.log("error", error));
  }, []);

  // For get number of product
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:5000/countProduct", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setProductCount(result.result[0].products)
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <section>
        <div className="boxspentainer"></div>
        <div className="board">
          <div className="manage-target">
            <div className="manage">
              <div className="containerBox_db">
                <h3>계기반</h3>
                <div className="contentBox_db">
                  <div className="menu-box one">
                    <div>
                      <IoDocumentText className="iconGad gone1" />
                      <p>명령</p>
                    </div>
                    <h2>{productCount}</h2>
                    <Link to="/product" className="txtcol">
                    더보기
                    </Link>
                  </div>
                  <div className="menu-box two">
                    <div>
                      <IoDocumentText className="iconGad gone2" />
                      <p>명령</p>
                    </div>
                    <h2>{orderCount}</h2>
                    <Link to="/orderpage" className="txtcol">
                      <p>더보기</p>
                    </Link>
                  </div>
                  <div className="menu-box three">
                    <div>
                      <IoDocumentText className="iconGad gone3" />
                      <p>명령</p>
                    </div>
                    <h2>{userAccount}</h2>
                    <Link to="/users" className="txtcol">
                      <p>더보기</p>
                    </Link>
                  </div>
                  <div className="menu-box four">
                    <div>
                      <IoDocumentText className="iconGad gone4" />
                      <p>명령</p>
                    </div>
                    <h2>{adminCount}</h2>
                    <Link to="/admins" className="txtcol">
                      <p>더보기</p>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
