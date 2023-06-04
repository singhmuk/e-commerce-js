import { createStore, compose, applyMiddleware, combineReducers } from "redux";
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
  },
};

// const reducer = combineReducers({
//   productList: productListReducer,
// });

// console.log("products reducers", productListReducer.products);
// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
  {
    reducer: {
      productList: productListReducer,
      productDetails: productDetailsReducer,
      cart: cartReducer,
      userSignin: userSigninReducer,
      // userSignin: userSigninReducer,
      userRegister: userRegisterReducer,
      initialState,
    },
  },
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
