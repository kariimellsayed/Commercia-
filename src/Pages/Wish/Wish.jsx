import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Wish.scss";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { fetchWishItems } from "../../features/wishSlice";

function Wish() {
  const dispatch = useDispatch();
  const { items: wish, loading } = useSelector((state) => state.wish);
  const token = useSelector((state) => state.auth.token);

  // Local state to store wish items after delete operation
  const [wishItems, setWishItems] = useState(wish);

  // Fetch wish items
  useEffect(() => {
    dispatch(fetchWishItems());
  }, [dispatch]);

  // Update local state when wish is fetched from the store
  useEffect(() => {
    setWishItems(wish);
  }, [wish]);

  // Handle delete item
  const handleDelete = async (id) => {
    try {
      // Send delete request to the API
      await axios.delete(
        `http://onlinestoreapi.runasp.net/api/WishList/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update wishItems to remove the deleted item
      const updatedWish = wishItems.filter((item) => item.id !== id);
      setWishItems(updatedWish);

      // Fetch the updated wish from the API
      dispatch(fetchWishItems());
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <section className="wishs">
      <div className="container">
        <h2 className="text-capitalize text-light-blue fs-26 section-title text-logo heading">
          wish
        </h2>
        {loading ? (
          <>
            <Loading />
          </>
        ) : wishItems.length === 0 ? (
          <p className="empty">wishList is Empty...</p>
        ) : (
          <div className="table-content">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Details</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {wishItems.map((item) => (
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
          </div>
        )}
      </div>
    </section>
  );
}

export default Wish;
