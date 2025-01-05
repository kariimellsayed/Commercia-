import { useEffect, useState } from "react";
import axios from "axios";
import "../AddAndEdit.scss";
import { useSelector } from "react-redux";

const AddBrands = () => {
  // Title Of Tap
  useEffect(() => {
    document.title = "Add | Brands";
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const brandData = {
      id: 0,
      name,
      description,
    };

    try {
      const response = await axios.post(
        "http://onlinestoreapi.runasp.net/api/Brand",
        brandData,
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
    } catch (error) {
      console.error("Error adding brand:", error);
      setError("Failed to add brand.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-edit">
      <div className="add-edit-content">
        <h2>Add New brand</h2>
        <form onSubmit={handleSubmit} className="add-brand-form">
          <div className="form-group">
            <label htmlFor="name">Brand Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Brand Name"
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
              placeholder="Brand Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Loading..." : "Add Brand"}
          </button>
        </form>

        {error && <p className="error text-red">{error}</p>}
        {success && <p className="text-semi">Brand added successfully!</p>}
      </div>
    </div>
  );
};

export default AddBrands;
