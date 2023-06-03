import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loadingBox";
import MessageBox from "../components/messageBox";

import { listProducts } from "../actions/productActions";
import Product from "../components/products";

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : products === undefined ? null : (
        <div className="products">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
export default HomeScreen;
