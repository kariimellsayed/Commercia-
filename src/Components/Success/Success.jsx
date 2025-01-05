import { Link } from "react-router-dom";
import "./Success.scss";

const SuccessPage = () => {
  return (
    <div className="success flex flex-center">
      <div className="circle bg-white ">
        <i className="fa-solid fa-circle-check"></i>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase. Your order is being processed.</p>
        <div className="mt-6">
          <Link to="/">
            <button>Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
