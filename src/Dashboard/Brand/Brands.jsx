import { Link } from "react-router-dom";
import "../Table.scss";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { fetchBrands } from "../../features/brandsSlice"; // Brands From fetchBrands Function in brandsSlice
import useConfirmAlert from "../../Components/ConfirmAlert/ConfirmAlert";

const Bradns = () => {
  // Title Of Tap
  useEffect(() => {
    document.title = "Brands | Dashboard";
  }, []);

  const dispatch = useDispatch();

  // الحصول على المنتجات والتوكن وحالة التحميل من Redux store
  const { items: brands, loading } = useSelector((state) => state.brands);
  const token = useSelector((state) => state.auth.token);

  // ConfirmAlert
  const { showConfirmAlert } = useConfirmAlert();

  // جلب المنتجات عند تحميل المكون
  useEffect(() => {
    if (token) {
      dispatch(fetchBrands()); // استدعاء الدالة الخاصة بجلب المنتجات
    }
  }, [dispatch, token]);

  // Delete Brand
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://onlinestoreapi.runasp.net/api/Brand/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        dispatch(fetchBrands());
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return loading ? (
    <Loading />
  ) : brands.length === 0 ? (
    <p className="no-brands-message text-dash fs-25 text-center">No Brands</p> // No Brands
  ) : (
    <div className="table-container">
      <h2 className="section-title fs-26 text-regal-blue">Brands</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={brand.id}>
              <td>{index + 1}</td>
              <td>{brand.name}</td>
              <td>{brand.description}</td>
              <td className="actions">
                <Link
                  className="btn delete"
                  onClick={(e) => {
                    e.preventDefault();
                    showConfirmAlert(
                      "Delete Brand",
                      "Are you sure you want to delete this Brand?",
                      () => handleDelete(brand.id)
                    );
                  }}
                >
                  Delete
                </Link>
                <Link className="btn edit" to={`edit/${brand.id}`}>
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

export default Bradns;
