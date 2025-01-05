import { useState } from "react";
import "./SignUp.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigate();

  //  FirstName Regex
  const validateFirstName = (firstName) => {
    const regex = /^[A-Z][a-zA-Z]{4,}$/;
    if (!regex.test(firstName)) {
      setFirstNameError(
        "First name must start with a capital letter and be at least 5 characters long with no spaces."
      );
      return false;
    }
    setFirstNameError("");
    return true;
  };

  // userName Regex
  const validateUserName = (userName) => {
    const regex = /^(?=.*\d).{1,}$/;
    if (!regex.test(userName)) {
      setUserNameError("Username must contain at least one number.");
      return false;
    }
    setUserNameError("");
    return true;
  };

  // Password Regex
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one digit, and one special character."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // userName, FirstName , Password
    if (
      !validateFirstName(firstName) ||
      !validateUserName(userName) ||
      !validatePassword(password)
    ) {
      return null;
    }

    const formData = {
      firstName,
      lastName,
      userName,
      email,
      password,
    };

    setLoading(true);
    // Post User Information using environment variable for API URL
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL + "Account/Register"; // Use the environment variable here
      await axios.post(apiUrl, formData);
      setLoading(false);
      navigation("/login");
    } catch (err) {
      console.log("Error in form submission:", err);
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="signup">
      <div className="signup-content">
        <div className="section-title">
          <h3>Sign Up</h3>
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              placeholder="First-Name-(5 characters start with capital )"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            {firstNameError && (
              <p className="error-message fs-14 text-red">{firstNameError}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Last-Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              value={userName}
              placeholder="User-Name-(must contain at least one number)"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            {userNameError && (
              <p className="error-message fs-14 text-red">{userNameError}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Examble@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Password-(at least 8 characters, one uppercase letter, one digit)"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {passwordError && (
              <p className="error-message fs-14 text-red">{passwordError}</p>
            )}
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>
        <div className="login-redirect">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
