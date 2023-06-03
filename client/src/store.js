import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productListReducer } from "./reducers/productReducers.js";
import { configureStore } from "@reduxjs/toolkit";

const initialState = {};

// const reducer = combineReducers({
//   productList: productListReducer,
// });

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore(
  {
    reducer: {
      productList: productListReducer,
      initialState,
    },
  },
  composeEnhancer(applyMiddleware(thunk))
);
// console.log("products reducers", productListReducer.products);
// const store = createStore(
//   reducer,
//   initialState,
//   composeEnhancer(applyMiddleware(thunk))
// );

export default store;
