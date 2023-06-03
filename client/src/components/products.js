import { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./rating";

const Products = (props) => {
  const { product } = props;

  return (
    <div>
      <li key={product._id}>
        {/* {console.log("Products", product.numReviews)} */}
        <div className="product">
          <Link to={"/product/" + product._id}>
            <img className="product-image" src={product.image} alt="product" />
          </Link>
          <div className="product-name">
            <Link to={"/product/" + product._id}>{product.name}</Link>
          </div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-price">${product.price}</div>
          <div className="product-rating">
            <Rating rating={product.rating} numReiews={product.numReviews} />
          </div>
          <div className="price">${product.price}</div>
        </div>
      </li>
    </div>
  );
};

export default Products;
