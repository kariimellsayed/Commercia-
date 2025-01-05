import { Link } from "react-router-dom";
import "../Table.scss";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import useConfirmAlert from "../../Components/ConfirmAlert/ConfirmAlert";

const Users = () => {
  // Title Of Tap
  useEffect(() => {
    document.title = "Users | Dashboard";
  }, []);
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const [run, setRun] = useState(0);
  const [loading, setLoading] = useState(false);

  // ConfirmAlert
  const { showConfirmAlert } = useConfirmAlert();

  useEffect(() => {
    if (!token) return;

    // Loading
    setLoading(true);

    axios
      .get("http://onlinestoreapi.runasp.net/api/Account", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [run, token]);

  // Delete User
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://onlinestoreapi.runasp.net/api/Account?id=${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (res.status === 200) {
        setRun((prev) => prev + 1);
      }
    } catch {
      console.log("none");
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="table-container">
      <h2 className="section-title fs-26 text-regal-blue">Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>UserName</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.userName}</td>
              <td className="images">
                <Link
                  className="text-red fs-20"
                  onClick={(e) => {
                    e.preventDefault();
                    showConfirmAlert(
                      "Delete User",
                      "Are you sure you want to delete this User?",
                      () => handleDelete(user.id)
                    );
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
