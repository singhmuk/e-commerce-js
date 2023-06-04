import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/checkoutStep";
import { saveShippingAddress } from "../actions/cartActions";

const ShipingScreen = () => {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const cart = useSelector((state) => state.cart);

  const { userInfo } = userSignin;
  const { shippingAddress } = cart;

  // const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  // if (!userInfo) {
  //   navigate("/signin");
  // }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    navigate("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form onSubmit={submitHandler}>
        <h1>Shipping Address</h1>
        Full Name:{" "}
        <div>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        Address
        <div>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        City
        <div>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        Postal Code
        <div>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        Country
        <div>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="primary">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShipingScreen;
