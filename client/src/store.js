import { compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers.js";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducers.js";
import {
  userSigninReducer,
  userRegisterReducer,
} from "./reducers/userReducers.js";
import { orderCreateReducer, orderDetailsReducer } from "./reducers/orderReducer.js";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
  {
    reducer: {
      productList: productListReducer,
      productDetails: productDetailsReducer,
      cart: cartReducer,
      userSignin: userSigninReducer,
      userRegister: userRegisterReducer,
      orderCreate: orderCreateReducer,
      orderDetails: orderDetailsReducer,
      initialState,
    },
  },
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
