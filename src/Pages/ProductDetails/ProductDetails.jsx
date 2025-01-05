import { useEffect, useState } from "react";
import "./ProductDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../../features/productSlice";
import Loading from "../../Components/Loading/Loading";
import axios from "axios";
import { fetchCartItems } from "../../features/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // Token
  const token = useSelector((state) => state.auth.token);

  // Product From productSlice
  const { product, loading } = useSelector((state) => state.product);

  // Quantity
  const [quantity, setQuantity] = useState(1);

  // Error In Quantity
  const [error, setError] = useState("");

  // Barnd's Name
  const [brandName, setBrandName] = useState("");

  // State Of Add To Cart Success
  const [success, setSucess] = useState(false);

  const handleToCart = async () => {
    if (quantity < 1 || quantity > 50) {
      setError("The field Quantity must be between 1 and 50.");
      return;
    }

    const cartItem = {
      id: 0,
      productId: product.id,
      quantity: quantity,
    };

    try {
      const response = await axios.post(
        "http://onlinestoreapi.runasp.net/api/Cart",
        cartItem,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Product added to cart:", response.data);
      setSucess(true);
      setError("");

      // refresh Cart after Add
      dispatch(fetchCartItems());
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setSucess(false);
    }
  };

  // Get Product
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  // Get Brand Name
  useEffect(() => {
    if (product?.brandId) {
      const fetchBrandName = async () => {
        try {
          const response = await axios.get(
            `http://onlinestoreapi.runasp.net/api/Brand/${product.brandId}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          setBrandName(response.data.name);
        } catch (error) {
          console.error("Failed to fetch brand name:", error);
        }
      };
      fetchBrandName();
    }
  }, [product?.brandId, token]);

  return loading ? (
    <Loading />
  ) : (
    product && (
      <section className="product-details">
        <div className="container">
          <div className="product-info">
            <h1 className="name text-center text-commerce fs-25 ls-1">
              {product.name}
            </h1>
            <img src={`/assets/images/${product.photo}`} alt={product.name} />
            <h3 className="brand">
              Brand : <span>{brandName}</span>
            </h3>
            <p className="descrip text-light-blue fs-18">
              {product.description}
            </p>
            <h2 className="price flex">
              {product.price} <span className="eg fs-22 fw-3">E.G</span>
              <span className="sale text-red ">
                <del>{(product.price * 1.05).toFixed(2)} E.G</del>
              </span>
            </h2>
            <div className="send-product flex flex-between">
              <div className="quantity">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                  max="50"
                />
                {error && <p className="text-red fs-18">{error}</p>}
              </div>

              <button className="add-to-cart" onClick={handleToCart}>
                <i className="fa-solid fa-cart-shopping"></i>
                Add to Cart
              </button>
            </div>

            {success && (
              <p className="text-semi fs-18">
                Product added to cart Successfully
              </p>
            )}
            <Link className="back" to={"/electronics"}>
              <i className="fa-solid fa-circle-chevron-left"></i>
            </Link>
          </div>
        </div>
      </section>
    )
  );
}

export default ProductDetails;
