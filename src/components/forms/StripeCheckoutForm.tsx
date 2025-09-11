import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface CheckoutProps {
  userId: string;
  eventId: string;
  ticketId: string;
  quantity: number;
  totalAmount: number; 
}

function CheckoutForm({ userId, eventId, ticketId, quantity, totalAmount }: CheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // 1️⃣ create payment intent
      const { data } = await axios.post("/api/payment/create-payment-intent", {
        amount: totalAmount,
        userId,
        eventId,
        ticketId,
        quantity,
      });

      // 2️⃣ confirm card payment
      const card = elements.getElement(CardElement);
      if (!card) return;

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card },
      });

      if (stripeError) {
        setError(stripeError.message ?? "Payment failed");
      } else if (paymentIntent?.status === "succeeded") {
        alert("Payment Successful! 🎉");
      }
    } catch (err: any) {
      setError(err.message || "Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      <button type="submit" disabled={loading || !stripe} className="btn btn-primary">
        {loading ? "Processing..." : `Pay $${totalAmount / 100}`}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}

export default function StripeWrapper(props: CheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
