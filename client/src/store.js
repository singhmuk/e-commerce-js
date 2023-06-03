import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers.js";
import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducers.js";
import { userSigninReducer } from "./reducers/userReducers.js";

const initialState = {
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
      userSignin: userSigninReducer,
      initialState,
    },
  },
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
