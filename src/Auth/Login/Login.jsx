import { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken, setUserRole } from "../../features/authSlice";
import Loading from "../../Components/Loading/Loading";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    setLoading(true);

    try {
      // استخدام VITE_API_BASE_URL من ملف .env
      let res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}Account`,
        loginData
      );
      const token = res.data.token;

      dispatch(setToken(token));

      let userRolesResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}Account/UserRoles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { Email: email },
        }
      );
      console.log(token);
      const userRoles = userRolesResponse.data;
      dispatch(setUserRole(userRoles));
      setLoading(false);

      // التنقل بناءً على دور المستخدم
      if (userRoles.includes("Admin")) {
        navigation("/dashboard");
      } else {
        navigation("/");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <section className="login">
      <div className="login-content">
        <div className="section-title">
          <h3>Login Account</h3>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Or UserName</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email Or UserName"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
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
          </div>
          {error && <p className="error-message text-red fs-18">{error}</p>}
          <div className="form-actions">
            <div className="remember-me">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember me?</label>
            </div>
            <button type="submit" className="btn-primary">
              Sign In
            </button>
          </div>
          <div className="login-options">
            <Link>Forgot password?</Link>
            <Link>Email confirmation</Link>
            <Link to={"/register"}>Create Account</Link>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
