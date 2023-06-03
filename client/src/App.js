import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import CartScreen from "./screens/cartScreen";
import { useSelector } from "react-redux";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">amazona</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
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
            </Routes>
          </div>
        </main>
        <footer className="footer">All right reserved.</footer>
      </div>
    </Router>
  );
}

export default App;
