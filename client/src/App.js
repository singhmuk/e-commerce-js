import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import CartScreen from "./screens/cartScreen";
import SigninScreen from "./screens/signScreen";
import { signout } from "./actions/userActions";

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <Link to="/">amazona</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdawn">
                <Link to="#">{userInfo.name}</Link>
                <ul className="dropdawn-content">
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          {/* <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button> */}
          <ul>
            <li>
              <Link to="index.html">Pants</Link>
            </li>

            <li>
              <Link to="index.html">Shirts</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
            </Routes>
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
