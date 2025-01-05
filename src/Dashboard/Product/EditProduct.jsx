import { useEffect, useState } from "react";
import "../AddAndEdit.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../features/productSlice"; // fetchPrd
import { fetchBrands } from "../../features/brandsSlice"; // جلب العلامات التجارية
import axios from "axios"; // استخدام Axios للتعديل
import Loading from "../../Components/Loading/Loading";

const EditProduct = () => {
  // Title Of Tap
  useEffect(() => {
    document.title = "Edit | Products";
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState("");
  const [brandId, setBrandId] = useState(0);
  const [success, setSuccess] = useState(false);
  const [accept, setAccept] = useState(false);

  const { id } = useParams(); // Get Id
  // Navigate
  const navigate = useNavigate();
  // Dispatch
  const dispatch = useDispatch();

  const { product, loading: productLoading } = useSelector(
    (state) => state.product
  );
  const { items: brands, loading: brandsLoading } = useSelector(
    (state) => state.brands
  );
  const token = useSelector((state) => state.auth.token); // Get Token

  useEffect(() => {
    // Get Product ID from productSlice
    dispatch(fetchProductById(id));
    // Get Brands from brandsSlice
    dispatch(fetchBrands());
  }, [dispatch, id]);

  // refresh the Inputs
  useEffect(() => {
    if (product && product.name) {
      // تحقق من وجود المنتج وبياناته
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setPhoto(product.photo);
      setBrandId(product.brandId);
    }
  }, [product]);

  const submit = async (e) => {
    e.preventDefault();
    setAccept(true);

    if (name.length < 1 || description.length < 4) {
      return;
    }
    setSuccess(false);
    try {
      // Coerce price and brandId to numbers
      const updatedProduct = {
        id: Number(id),
        name,
        description,
        price: Number(price),
        photoName: photo, // Ensure this matches the API field
        brandId: Number(brandId),
      };

      // PUT request
      const response = await axios.put(
        `http://onlinestoreapi.runasp.net/api/Product/${id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSuccess(true);
      }
      navigate("/dashboard/products");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return productLoading || brandsLoading ? (
    <Loading />
  ) : (
    <div className="add-edit">
      <div className="add-edit-content">
        <h2>Edit Product</h2>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Product Name.."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {name.length < 1 && accept && (
              <p className="fs-13 text-red">
                The Title should not be shorter than 1
              </p>
            )}
          </div>
          <div>
            <label htmlFor="descrip">Description:</label>
            <input
              id="descrip"
              type="text"
              placeholder="Enter Product Description .."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {description.length < 4 && accept && (
              <p className="fs-13 text-red">
                The description must be longer than 4 characters.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              placeholder="Enter Product Price .."
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="photoName">Photo Name:</label>
            <input
              id="photoName"
              type="text"
              placeholder="Enter Product Photo Name .."
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>
          <div>
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

          <button type="submit" className="btn fw-6">
            Edit Product
          </button>
          {success && (
            <p className="text-semi fs-18 text-center">
              Edit Product Successfuly
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
