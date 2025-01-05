import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../features/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import Loading from "../../Components/Loading/Loading";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cart, loading } = useSelector((state) => state.cart);
  const token = useSelector((state) => state.auth.token);

  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://onlinestoreapi.runasp.net/api/Cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedCart = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedCart);
      dispatch(fetchCartItems());
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/success");
  };

  return (
    <section className="carts">
      <div className="container">
        <h2 className="text-capitalize text-light-blue fs-26 section-title text-logo heading">
          Cart
        </h2>
        {loading ? (
          <Loading />
        ) : cartItems.length === 0 ? (
          <p className="empty">Cart is Empty...</p>
        ) : (
          <div className="cart-content">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Details</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={`/assets/images/${item.product.photo}`}
                        alt={item.product.name}
                      />
                    </td>
                    <td>
                      <div className="details">
                        <h2 className="text-second fs-20">
                          {item.product.name}
                        </h2>
                        <p className="text-regal-blue fs-14 text-start">
                          {item.product.description}
                        </p>
                      </div>
                    </td>
                    <td className="price">
                      {item.product.price} <span>E.G</span>
                    </td>
                    <td className="quantity">{item.quantity}</td>
                    <td className="total">
                      {(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="clear"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="check">
              <button onClick={handleCheckout}>Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
