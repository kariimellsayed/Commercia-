import { useDispatch, useSelector } from "react-redux";
import "./Electronics.scss";
import { useEffect } from "react";
import { fetchProducts } from "../../features/productsSlice";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { fetchWishItems } from "../../features/wishSlice";

function Electronics() {
  // Title Of Tap
  useEffect(() => {
    document.title = "Electronics | Commercia";
  }, []);

  // Navigate
  const navigation = useNavigate();
  // Dispatch
  const dispatch = useDispatch();
  // Products
  const { items: products, loading } = useSelector((state) => state.products);

  // Token
  const token = useSelector((state) => state.auth.token);

  // Token In Cookies
  const cookie = new Cookies();
  const tokenInCookie = cookie.get("Bearer");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle To Wishlist
  const handleToWish = async (productId) => {
    if (token || tokenInCookie) {
      try {
        await axios.post(
          "http://onlinestoreapi.runasp.net/api/WishList",
          {
            id: 0,
            productId: productId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // refresh WishList After Added
        dispatch(fetchWishItems());
      } catch (error) {
        console.error("Failed to add to wishlist", error);
      }
    } else {
      alert("Please log in to add products to your wishlist.");
      navigation("/login");
    }
  };

  // Handle Details Navigation
  const handleDetailsNavigation = (productId) => {
    if (token || tokenInCookie) {
      navigation(`/electronics/${productId}`);
    } else {
      alert("Please log in to view product details.");
      navigation("/login");
    }
  };

  return (
    <section className="labs">
      <div className="landing">
        <div className="container flex ">
          <h1>
            Commercia <span>For Electronics</span>
          </h1>

          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="labtops section-padding">
        <div className="container">
          <h2 className="text-capitalize text-light-blue fs-26 section-title text-logo heading">
            Products
          </h2>
          {loading ? (
            <Loading />
          ) : (
            <div className="labtops-cards grid">
              {products.map((product) => {
                return (
                  <div className="card" key={product.id}>
                    <div
                      className="img-contain"
                      onClick={() => {
                        handleDetailsNavigation(product.id);
                      }}
                    >
                      <img
                        src={`/assets/images/${product.photo}`}
                        alt={product.name}
                      />
                    </div>
                    <div className="details">
                      <h4>{product.name}</h4>
                      <div className="price flex">
                        <h2>
                          {product.price} <span>E.G</span>
                        </h2>
                        <span className="sale text-red ">
                          <del>{(product.price * 1.05).toFixed(2)} E.G</del>
                        </span>
                      </div>
                      <div className="click flex">
                        <button
                          className="add-to-cart"
                          onClick={() => handleDetailsNavigation(product.id)}
                        >
                          Details..
                        </button>
                        <div
                          className="wish"
                          onClick={() => handleToWish(product.id)}
                        >
                          <i className="fa-regular fa-heart"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Electronics;
