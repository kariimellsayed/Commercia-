import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import MainPage from "./Pages/MainPage/MainPage";
import SignUp from "./Auth/SignUp/SignUp";
import Login from "./Auth/Login/Login";
import Home from "./Pages/Home/Home";
import Dashboard from "./Dashboard/Main/Dashboard";
import Users from "./Dashboard/Users/Users";
import Products from "./Dashboard/Product/Products";
import ProtectedRoute from "./Auth/ProtectedRoute/ProtectedRoute";
import NotFound from "./Auth/NotFound/NotFound";
import DashPage from "./Dashboard/Main/DashPage";
import Electronics from "./Pages/Electronics/Electronics";
import AddProducts from "./Dashboard/Product/AddProducts";
import Bradns from "./Dashboard/Brand/Brands";
import AddBrands from "./Dashboard/Brand/AddBrands";
import EditProduct from "./Dashboard/Product/EditProduct";
import EditBrand from "./Dashboard/Brand/EditBrands";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Footer from "./Components/Footer/Footer";
import Wish from "./Pages/Wish/Wish";
import About from "./Pages/About/About";
import SuccessPage from "./Components/Success/Success";
// import Checkout from "./stripe/CheckOut";

function App() {
  const location = useLocation();

  // this pages Does not contain a Footer
  const hideFooter =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/404" ||
    location.pathname === "/cart";
  return (
    <>
      {!location.pathname.startsWith("/dashboard") && <Navbar />}

      <Routes>
        {/* Pages */}
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          {/* Products */}
          <Route path="electronics" element={<Electronics />} />
          <Route path="electronics/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<Wish />} />
          {/* Auth */}
          <Route path="register" element={<SignUp />} />
          <Route path="login" element={<Login />} />

          {/* حماية مسار Dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="" element={<DashPage />} />
              {/* Users */}
              <Route path="users" element={<Users />} />
              {/* Products */}
              <Route path="products" element={<Products />} />
              <Route path="products/edit/:id" element={<EditProduct />} />
              <Route path="add" element={<AddProducts />} />
              {/* Brands */}
              <Route path="brands" element={<Bradns />} />
              <Route path="brands/edit/:id" element={<EditBrand />} />
              <Route path="new" element={<AddBrands />} />
            </Route>
          </Route>
          {/* Checkout */}
          {/* <Route path="checkout" element={<Checkout />} /> */}
          {/* Success */}
          <Route path="success" element={<SuccessPage />} />
          {/* مسار صفحة 404 */}
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
