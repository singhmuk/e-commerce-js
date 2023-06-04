import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkoutStep";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
  const [paymentMethod, setPaymetMethod] = useState("PayPal");
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <h1>Payment</h1>
        <div>
          <input
            type="radio"
            id="paypal"
            value="PayPal"
            name="paymentMethod"
            required
            checked
            onChange={(e) => setPaymetMethod(e.target.value)}
          />
          <label htmlFor="paypal">PayPal</label>
        </div>

        <div>
          <input
            type="radio"
            id="stripe"
            value="Stripe"
            name="paymentMethod"
            required
            onChange={(e) => setPaymetMethod(e.target.value)}
          />
          <label htmlFor="strioe">Stripe</label>
        </div>
        <button type="submit" className="primary">
          Continue
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;
