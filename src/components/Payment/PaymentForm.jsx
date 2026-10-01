import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  //might need update
  const { id } = useParams();
  const [error, setError] = useState('');
  const axiosSecure = useAxiosSecure();

  const {} = useQuery({
    queryKey: ["camps", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/camp-details/${id}`);
      return res.data;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError('');
      console.log("payment method", paymentMethod);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button type="submit" className="btn bg-blue-500 text-white w-full" disabled={!stripe} >
          Pay
        </button>
        {
          error && <p className="text-red-500">{error}</p>
        }
      </form>
    </div>
  );
};

export default PaymentForm;
