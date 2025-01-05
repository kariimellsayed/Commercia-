import { useEffect, useState } from "react";
import "../AddAndEdit.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const EditBrand = () => {
  // Title Of Tap
  useEffect(() => {
    document.title = "Edit | Brands";
  }, []);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [accept, setAccept] = useState(false);

  const navigation = useNavigate();
  const token = useSelector((state) => state.auth.token); // الحصول على التوكن من Redux

  const id = window.location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          `http://onlinestoreapi.runasp.net/api/Brand/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // تمرير التوكن في الـ headers
            },
          }
        );
        // تعيين القيم المسترجعة من الـ API
        setName(response.data.name);
        setDescription(response.data.description);
      } catch (error) {
        console.error("Failed to fetch brand:", error);
      }
    };

    fetchBrands();
  }, [id, token]);

  const submit = async (e) => {
    e.preventDefault();
    setAccept(true);

    // if (name.length < 1 || description.length < 4) {
    //   return;
    // }

    try {
      const response = await axios.put(
        `http://onlinestoreapi.runasp.net/api/Brand/${id}`,
        {
          id,
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Brands updated successfully:", response.data);
      navigation("/dashboard/brands");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    <div className="add-edit">
      <div className="add-edit-content">
        <h2>Edit Brand</h2>
        <form onSubmit={submit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Brand Name.."
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
              placeholder="Enter Brand Description .."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {description.length < 4 && accept && (
              <p className="fs-13 text-red">
                The description must be longer than 4 characters.
              </p>
            )}
          </div>

          <button type="submit" className="fw-6">
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBrand;
