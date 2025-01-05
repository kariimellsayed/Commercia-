import { Link } from "react-router-dom";
import "../Table.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { fetchProducts } from "../../features/productsSlice";
import { fetchBrands } from "../../features/brandsSlice";
import Loading from "../../Components/Loading/Loading";
import useConfirmAlert from "../../Components/ConfirmAlert/ConfirmAlert";

const Products = () => {
  // Title Of Tap
  useEffect(() => {
    document.title = "Products | Dashboard";
  }, []);

  const dispatch = useDispatch();

  // الحصول على المنتجات والعلامات التجارية من Redux store
  const { items: products, loading } = useSelector((state) => state.products);
  const { items: brands } = useSelector((state) => state.brands);
  const token = useSelector((state) => state.auth.token);

  // ConfirmAlert
  const { showConfirmAlert } = useConfirmAlert();

  // get Products And Brands With Brands
  useEffect(() => {
    if (token) {
      dispatch(fetchProducts()); //Fetch Products
      dispatch(fetchBrands()); // Fetch Brands
    }
  }, [dispatch, token]);

  // Delete Product
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://onlinestoreapi.runasp.net/api/Product/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        dispatch(fetchProducts()); // تحديث المنتجات بعد الحذف
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Get Brand Name Useing Brand Id
  const getBrandName = (brandId) => {
    const brand = brands.find((brand) => brand.id === brandId);
    return brand ? brand.name : "Unknown";
  };

  return loading ? (
    <Loading />
  ) : products.length === 0 ? (
    <p className="no-brands-message text-dash fs-25 text-center">No Products</p> // No Products
  ) : (
    <div className="table-container">
      <h2 className="section-title fs-26 text-regal-blue">Products</h2>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>
                {product.price} <span>E.G</span>
              </td>
              <td className="brand">{getBrandName(product.brandId)}</td>
              <td>
                <img
                  src={`/assets/images/${product.photo}`}
                  alt={product.photo}
                  loading="lazy"
                />
              </td>
              <td className="actions">
                <Link
                  className="btn delete"
                  onClick={() =>
                    showConfirmAlert(
                      "Delete Product",
                      "Are you sure you want to delete this product?",
                      () => handleDelete(product.id)
                    )
                  }
                >
                  Delete
                </Link>
                <Link className="btn edit" to={`edit/${product.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
