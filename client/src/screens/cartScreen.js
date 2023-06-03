import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const CartScreen = (props) => {
  const { id } = useParams();
  const location = useLocation();
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const searchParams = new URLSearchParams(location.search);
  const qtyParam = searchParams.get("qty");
  const qty = qtyParam ? Number(decodeURIComponent(qtyParam)) : 1;
  console.log("qty", qty);
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        Add To Cart: ProductId: {id} Qty: {qty}
      </p>
    </div>
  );
};

export default CartScreen;
