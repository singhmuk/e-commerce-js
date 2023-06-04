import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/checkoutStep";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstatnts";
import LoadingBox from "../components/loadingBox.js";
import MessageBox from "../components/messageBox";

const OrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (!cart.paymentMethod) {
    navigate("/payment");
  }

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  // cart.itemsPrice = 10;

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const placeOrderHandler = (e) => {
    e.preventDefault();
    console.log("order");
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    // navigate(`/order/${order._id}`);

    // dispatch(savePaymentMethod(paymentMethod));
    // navigate("/placeorder");
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, order, navigate]);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <h2>Shipping</h2>
          <p>
            <strong>Name: </strong> {cart.shippingAddress.fullName}
            <br />
            <strong>Address: </strong> {cart.shippingAddress.address},
            {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
            {cart.shippingAddress.country},
          </p>
        </div>
        <div className="col-2">
          <h2>Payment</h2>
          <p>
            <strong>Method: </strong> {cart.paymentMethod}
          </p>
        </div>
        <div className="col-2">
          <h2>Order Items</h2>
          <ul>
            {cart.cartItems.map((item) => (
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
              <div>${cart.itemsPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div>Shipping</div>
              <div>${cart.shippingPrice.toFixed(2)}</div>
            </div>

            <div className="row">
              <div>Tax</div>
              <div>${cart.taxPrice}</div>
            </div>

            <div className="row">
              <div>
                <strong>Order Total</strong>
              </div>
              <div>
                <strong>${cart.totalPrice.toFixed(2)}</strong>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={placeOrderHandler}
            className="primary block"
            disabled={cart.cartItems.length === 0}
          >
            Place Order
          </button>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </div>
    </div>
  );
};

export default OrderScreen;
