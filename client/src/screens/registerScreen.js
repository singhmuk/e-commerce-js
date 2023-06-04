import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions.js";
import Loading from "../components/loadingBox.js";
import MessageBox from "../components/messageBox.js";

function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // const redirect = props.loading.search
  //   ? props.location.search.split("=")[1]
  //   : "/";

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qtyParam = searchParams.get("qty");
  const redirect = qtyParam ? Number(decodeURIComponent(qtyParam)) : 1;

  useEffect(() => {
    if (userInfo) {
      // navigate(redirect);
      navigate("/");
    }
    return () => {
      //
    };
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Confirm password not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-Up</h2>
          </li>
          {loading && <Loading />}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </li>
          <li>
            <button type="submit" className="button primary">
              SignUp
            </button>
          </li>
          <li>Already have an account</li>
          <li>
            <Link
              to={`/signin?redirect=${redirect}`}
              className="button secondary text-center"
            >
              SignIn
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
