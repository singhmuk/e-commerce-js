import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Signin } from "../actions/userActions.js";
import Loading from "../components/loadingBox.js";
import MessageBox from "../components/messageBox.js";

function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
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
    dispatch(Signin(email, password));
  };
  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Sign-In</h2>
          </li>
          {loading && <Loading />}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
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
            <button type="submit" className="button primary">
              Signin
            </button>
          </li>
          <li>New to amazona?</li>
          <li>
            <Link to="/register" className="button secondary text-center">
              Create your amazona account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default SigninScreen;
