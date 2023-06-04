import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/messageBox";

const CartScreen = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const searchParams = new URLSearchParams(location.search);
  const qtyParam = searchParams.get("qty");
  const qty = qtyParam ? Number(decodeURIComponent(qtyParam)) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const navigate = useNavigate();
  const checkout = () => {
    // navigate("/signin?redirect=shipping");
    navigate("/shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping List</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
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
                <select
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <br />${item.price}
                <br />
                <button
                  type="button"
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <h2>
          Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
          {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
        </h2>
        <button
          type="button"
          onClick={checkout}
          className="primary block"
          disabled={cartItems.length === 0}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default CartScreen;
