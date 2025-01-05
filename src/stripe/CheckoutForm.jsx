import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import "./CheckoutForm.scss";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: clientSecret } = await axios.post(
        "http://your-backend-url.com/api/create-payment-intent",
        { amount: 1000 } // Replace with dynamic total amount
      );

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        console.error("Payment failed:", error.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
}

export default CheckoutForm;
