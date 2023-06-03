import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Loading from "../components/loadingBox";
import MessageBox from "../components/messageBox";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function ProductScreen(props) {
  const productDetails = useSelector((state) => state.productDetails);
  const [qty, setQty] = useState(1);

  const { loading, error, product } = productDetails;
  const { id } = useParams();
  // console.log("product", productDetails);
  const dispatch = useDispatch();
  // const productId = id;

  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);

  const navigate = useNavigate();
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
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

                {product.countInStock > 0 && (
                  <>
                    <li>
                      <div className="row">
                        <div>Qty</div>
                        <select
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={addToCartHandler} className="button primary">
                    Add to Cart
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProductScreen;
