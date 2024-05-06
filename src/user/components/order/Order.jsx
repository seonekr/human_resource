import React from "react";
import "./css/order.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bill from "./Bill";

const Order = () => {
  // Orders
  const [orders, setOrders] = useState([
    {
      orderID: 1,
      userID: 2,
      products: [
        {
          productID: 1,
          productName: "깻잎",
          price: 8.500,
          review: 50,
          popular: true,
        },
        {
          productID: 2,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          size: "m",
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Houngaloun",
    },
    {
      orderID: 2,
      userID: 1,
      products: [
        {
          productID: 1,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colB",
          size: "m",
        },
        {
          productID: 2,
          productName: "pro2",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colW",
          size: "l",
        },

        {
          productID: 3,
          productName: "pro3",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colBlue",
          size: "xl",
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
          productID: 1,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colB",
          size: "m",
        },
        {
          productID: 2,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colBlue",
          size: "m",
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Houngaloun",
    },
    {
      orderID: 4,
      userID: 3,
      products: [
        {
          productID: 1,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colB",
          size: "m",
        },
        {
          productID: 2,
          productName: "pro1",
          productType: "clothes",
          amount: 2,
          price: 10,
          color: "colBlue",
          size: "m",
        },
      ],
      orderDate: "10/12/2023",
      status: "pending",
      payment: "Bcel One",
      delivery: "Anousit",
    },
  ]);

  // users
  const [users, setUsers] = useState([
    { userID: 1, name: "John Doe", email: "john@gmail.com" },
    { userID: 2, name: "SamVln", email: "sam@gmail.com" },
    { userID: 3, name: "Will", email: "wil@gmail.com" },
  ]);

  const filteredOrders = orders
    .filter((order) => order.userID === 1) // Filter orders by userID = 2 (Sam)
    .map((order) => {
      const user = users.find((user) => user.userID === order.userID); // Find user details for the order

      // Calculate total price
      const totalPrice = order.products.reduce((total, product) => {
        return total + product.price * product.amount;
      }, 0);

      return {
        orderID: order.orderID,
        userID: order.userID,
        userName: user.name,
        products: order.products,
        orderDate: order.orderDate,
        status: order.status,
        payment: order.payment,
        delivery: order.delivery,
        totalPrice: totalPrice,
      };
    });

  // Get order ID
  const [id, setId] = useState();
  const navigate = useNavigate();

  const handleOrder = (id) => {
    setId(id);
    navigate("/order/bill/", { state: { id: id } });
  };

  return (
    <>
      <Header />
      <section id="container_order_item">
        <div className="container_order_all">
          <h2>명령</h2>
          {filteredOrders.map((order) => (
            <div key={order.orderID}>
              <div
                onClick={() => handleOrder(order.orderID)}
                className="box_item_order"
              >
                <div className="box_item_order_text">
                  <p>ID: {order.orderID}</p>
                  <p className="txtheadeproductorder">
                    {order.products.slice(0, 2).map((product, index) => (
                      <span key={product.productID}>
                        {product.productName}
                        {index === 0 && order.products.length > 1
                          ? ", "
                          : " ..."}
                      </span>
                    ))}
                  </p>
                  <p>{order.orderDate}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Menu />
    </>
  );
};

export default Order;
