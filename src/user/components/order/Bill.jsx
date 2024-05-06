import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "../../../img/Logo.png";
import storename from "../../../img/storename.png";

import "./css/bill.css";
const Bill = () => {
  // Orders
  const [orders, setOrders] = useState([
    {
      orderID: 2,
      userID: 1,
      products: [
        {
          productID: 1,
          productName: "Sesame",
          price: 8.500,
          amount: 5,
          delivery: 2.500
        },
        {
          productID: 2,
          productName: "Seasoned",
          price: 7.500,
          amount: 5,
          delivery: 3.500
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Anousit",
    },
    {
      orderID: 3,
      userID: 1,
      products: [
        {
          productID: 3,
          productName: "Stir-fried",
          price: 9.250,
          amount: 5,
          delivery: 2.500
        },
        {
          productID: 2,
          productName: "Seasoned",
          price: 7.500,
          amount: 5,
          delivery: 3.500
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Anousit",
    },
    
  ]);

  // users
  const [users, setUsers] = useState([]);

  // Get order ID
  const location = useLocation();
  const { id } = location.state;
  const [getId, setGetId] = useState(id);

  const filteredOrders = orders
    .filter((order) => order.orderID === getId) // Filter orders by userID = 2 (Sam)
    .map((order) => {
      const user = users.find((user) => user.userID === order.userID); // Find user details for the order

      // Calculate total price
      const totalPrice = order.products.reduce((total, product) => {
        return total + product.price * product.amount + product.delivery;
      }, 0);

      return {
        orderID: order.orderID,
        userID: order.userID,
        products: order.products,
        orderDate: order.orderDate,
        status: order.status,
        payment: order.payment,
        delivery: order.delivery,
        totalPrice: totalPrice,
      };
    });

     // Handle checked popular
    const handlePopular = (event) => {
      setPopular(event.target.checked);
    };




    ////////////////commend
    const [note, setNote] = useState({
      commend: "",
      rating: 0,
    });
  
  
    const handleChange = (e) => {
      if (note.rating < 1) {
        e.preventDefault();
        return;
      }
      setNote({ ...note, [e.target.name]: e.target.value });
      adjustTextareaHeight(e.target);
    };
  
    const handleRatingChange = (newRating) => {
      setNote({ ...note, rating: newRating });
    };
  
    const adjustTextareaHeight = (element) => {
      element.style.height = "auto";
      element.style.height = element.scrollHeight + "px";
    };


  // Completion
  let statusDelivery = ''
  if (filteredOrders) {
    filteredOrders.forEach((order) => (
      statusDelivery = order.status
    ))
  }
  const [status, setStatus] = useState(statusDelivery)

  // Handle status
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(status)
  }

  return (
    <>
      <Header></Header>
      <section id="bill">
        <Link to="/order" className="box_container_back_icons_back">
          <IoIosArrowBack id="icons_back" />
          <p>뒤쪽에</p>
        </Link>
        {filteredOrders.map((order) => (
          <div className="bill-detial newspanBox" key={order.orderID}>
            <div className="logo_image_bill">
              <div className="name_store"><div><img src={storename} alt="Logo" /></div></div>
              <div className="logo_store"><Link to="/"><img src={Logo} alt="Logo" /></Link></div>
            </div>
            <div className="guopoidHead">
              <div className="idf">
                <p>주문 아이디: {order.orderID}</p>
              </div>
            </div>
            <hr />
            <div className="billGopBox">
              <table>
                <thead>
                  <tr>
                    <th>음식 이름 </th>
                    <th>가격</th>
                    <th>양</th>
                    <th>배달</th>
                  </tr>
                </thead>
                {/* <hr className="hr"/> */}
                {order.products.map((product) => (
                  <tbody key={product.productID}>
                    <tr>
                      <td>{product.productName}</td>
                      <td>￦{product.price}</td>
                      <td>{product.amount}</td>
                      <td>￦{product.delivery}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <hr />
            <div className="titlePrice">
              <p>총:</p>
              <p>￦{order.totalPrice}</p>
            </div>
            <div className="place-on">
              <p>에 놓다: {order.orderDate}</p>
              <p>결제수단: {order.payment}</p>
              <p>연락하다: +86520</p>
              <p>상태: Pending</p>
              <p>배달: {order.delivery}</p>
            </div>
          </div>
        ))}

      </section>
      <section>
      <form className="box_containner_commend">
        <p>검토</p>
        <div className="star">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{ cursor: "pointer" }}
              onClick={() => handleRatingChange(star)}
            >
              {star <= note.rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        <div className="box_commend">
          <textarea
            name="commend"
            className="multiline-input"
            id="multiline-input"
            value={note.commend}
            onChange={handleChange}
            placeholder="당신의 의견..."
            maxLength="300"
            required
          />
          <button
            type="submit" className="btn_commend"
          >
            기리다
          </button>
        </div>
      </form>
      </section>
      <Menu />
    </>
  );
};

export default Bill;
