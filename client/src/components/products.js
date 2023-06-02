import { useState } from "react";
import Rating from "./rating";

const Products = (props) => {
  const { product } = props;

  return (
    <div>
      <li key={product._id}>
        {console.log("Products", product.numReviews)}
        <div className="product">
          <a href={"/product/" + product._id}>
            <img className="product-image" src={product.image} alt="product" />
          </a>
          <div className="product-name">
            <a href={"/product/" + product._id}>{product.name}</a>
          </div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-price">${product.price}</div>
          <div className="product-rating">
            <Rating rating={product.rating} numReiews={product.numReviews} />
          </div>
        </div>
      </li>
    </div>
  );
};

export default Products;
