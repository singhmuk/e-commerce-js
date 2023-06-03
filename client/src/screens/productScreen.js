import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import data from "../data";
import Rating from "../components/rating";

function ProductScreen(props) {
  const [singleProducts, setsingleProduct] = useState([]);

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/products");
      setsingleProduct(data);
    };
    fetchData();
    return () => {
      //
    };
  }, []);

  // const product = data.products.find((x) => x._id === id);
  const product = data.products.find((x) => x._id === id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Back to result</Link>
      </div>
      <div className="details">
        <div className="details-image">
          <img src={product.image} alt="product"></img>
        </div>
        <div className="details-info">
          <ul>
            <li>
              <h4>{product.name}</h4>
            </li>
            <li>
              {product.rating} Stars ({product.numReviews} Reviews)
            </li>
            <li>
              Price: <b>${product.price}</b>
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div className="details-action">
          <ul>
            <li>Price: {product.price}</li>
            <li>
              Status: {product.status}
              {product.countInStock > 0 ? (
                <span className="success">In Stoke</span>
              ) : (
                <span className="danger">Unavailable</span>
              )}
            </li>
            <li>
              Qty:{" "}
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </li>
            <li>
              <button className="button primary">Add to Cart</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default ProductScreen;
