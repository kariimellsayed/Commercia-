import { useState, useEffect } from "react";
import axios from "axios";
import "../AddAndEdit.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  // Title Of Tap
  useEffect(() => {
    document.title = "Add | Products";
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [brandId, setBrandId] = useState("");
  // Show Brands
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.auth.token);

  // Navigate
  const navigation = useNavigate();

  // Fetch brands from API
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "http://onlinestoreapi.runasp.net/api/Brand"
        );
        setBrands(response.data); // Set brands in state
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const productData = {
      id: 0,
      name,
      description,
      price: parseFloat(price),
      photoName,
      brandId: parseInt(brandId, 10),
    };

    try {
      const response = await axios.post(
        "http://onlinestoreapi.runasp.net/api/Product",
        productData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      setSuccess(true);
      setName("");
      setDescription("");
      setPrice("");
      setPhotoName("");
      setBrandId("");
      navigation("/dashboard/products");
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-edit">
      <div className="add-edit-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              value={description}
              placeholder="Product Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              placeholder="Product Price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photoName">Photo Name</label>
            <input
              type="text"
              id="photoName"
              name="photoName"
              value={photoName}
              placeholder="Product Photo"
              onChange={(e) => setPhotoName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="brandId">Brand</label>
            <div className="select-wrapper">
              <select
                id="brandId"
                name="brandId"
                value={brandId}
                onChange={(e) => setBrandId(e.target.value)}
                required
              >
                <option>Select a brand</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <i className="fas fa-chevron-down select-icon"></i>
            </div>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Loading..." : "Add Product"}
          </button>
        </form>

        {error && <p className="error text-red">{error}</p>}
        {success && (
          <p className="success text-semi">Product added successfully!</p>
        )}
      </div>
    </div>
  );
};

export default AddProducts;
