import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/checkoutStep";

import LoadingBox from "../components/loadingBox.js";
import MessageBox from "../components/messageBox";
import { detailsOrder } from "../actions/orderActions";

const OrderDetailScreen = () => {
  const cart = useSelector((state) => state.cart);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(id));
  }, [dispatch, id]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <h2>Shipping</h2>
          <p>
            <strong>Name: </strong> {order.shippingAddress.fullName}
            <br />
            <strong>Address: </strong> {order.shippingAddress.address},
            {order.shippingAddress.city},{order.shippingAddress.postalCode},
            {order.shippingAddress.country},
          </p>
          {order.isDelivered ? (
            <MessageBox variant="success">
              Delivered at {order.deliveredAt}
            </MessageBox>
          ) : (
            <MessageBox variant="danget">Not Delivered</MessageBox>
          )}
        </div>
        <div className="col-2">
          <h2>Payment</h2>
          <p>
            <strong>Method: </strong> {cart.paymentMethod}
          </p>
          {order.isPaid ? (
            <MessageBox variant="success">Paid at {order.isPaid}</MessageBox>
          ) : (
            <MessageBox variant="danget">Not Paid</MessageBox>
          )}
        </div>
        <div className="col-2">
          <h2>Order Items</h2>
          <ul>
            {order.orderItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="small"
                    style={{ width: 150, height: 100 }}
                  />
                </div>
                <div className="min-30">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
                {item.qty} x ${item.price} = ${item.qty * item.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <h2>Order Summary</h2>
            <div className="row">
              <div>Items</div>
              <div>${order.itemsPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div>Shipping</div>
              <div>${order.shippingPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div>Tax</div>
              <div>${order.taxPrice}</div>
            </div>

            <div className="row">
              <div>
                <strong>Order Total</strong>
              </div>
              <div>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailScreen;
