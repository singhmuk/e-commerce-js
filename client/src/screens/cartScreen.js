import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";

const CartScreen = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const qtyParam = searchParams.get("qty");
  const qty = qtyParam ? Number(decodeURIComponent(qtyParam)) : 1;

  useEffect(() => {
    if (id) {
      console.log("id", id);
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        Add To Cart: id: {id} Qty: {qty}
      </p>
    </div>
  );
};

export default CartScreen;
