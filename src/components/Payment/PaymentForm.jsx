import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { id } = useParams();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Get camp information
  const { isPending, data: campData = {} } = useQuery({
    queryKey: ["camps", id],

    queryFn: async () => {
      const res = await axiosSecure.get(`/camp-details/${id}`);

      return res.data;
    },

    enabled: !!id,
  });

  // Loading
  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  console.log("Camp ID:", id);
  console.log("Camp data:", campData);

  // Camp fee
  const amount = Number(campData.campFees);

  // Check camp fee
  if (Number.isNaN(amount)) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">Unable to load camp fee.</p>

        <p className="mt-2 text-sm text-gray-500">Camp ID: {id}</p>
      </div>
    );
  }

  // Stripe uses the smallest currency unit
  const amountInCents = Math.round(amount * 100);

  console.log("Amount:", amount);
  console.log("Amount in cents:", amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // Check Stripe
    if (!stripe || !elements) {
      setError("Stripe is not ready yet.");
      return;
    }

    // Check user
    if (!user) {
      setError("Please login before making payment.");
      return;
    }

    // Check camp ID
    if (!id) {
      setError("Camp ID is missing.");
      return;
    }

    // Check camp fee
    if (amount <= 0) {
      setError("Invalid camp fee.");
      return;
    }

    // Get card
    const card = elements.getElement(CardElement);

    if (!card) {
      setError("Please enter your card details.");
      return;
    }

    try {
      // Create payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        campId: id,
      });

      const clientSecret = res.data.clientSecret;

      if (!clientSecret) {
        setError("Unable to create payment.");
        return;
      }

      // Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,

          billing_details: {
            name: user.displayName || "",
            email: user.email || "",
          },
        },
      });

      // Stripe payment error
      if (result.error) {
        setError(result.error.message);
        return;
      }

      // Payment successful
      if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded!");
        console.log(result);

        // Save payment information
        const paymentData = {
          campId: id,
          userEmail: user.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method_types,
        };

        const paymentRes = await axiosSecure.post("/payments", paymentData);

        console.log("Payment saved:", paymentRes.data);

        if (paymentRes.data.success) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful",

            html: `
              <p>Transaction ID:</p>
              <strong>
                ${result.paymentIntent.id}
              </strong>
            `,

            confirmButtonText: "Go to Registered Camps",
          });

          navigate("/dashboard/registered-camps");
        }
      }
    } catch (error) {
      console.error("Payment error:", error);

      setError(
        error?.response?.data?.message || "Payment failed. Please try again.",
      );
    }
  };

  return (
    <div className="py-10">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        {/* Camp Name */}
        <div>
          <h2 className="text-xl font-semibold">{campData.campName}</h2>

          <p className="text-gray-500">Camp Fee: ৳{amount}</p>
        </div>

        {/* Credit Card */}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
            },
            hidePostalCode: true,
          }}
          className="rounded border p-2"
        />

        {/* Pay Button */}
        <button
          className="btn btn-primary w-full text-black"
          disabled={!stripe}
          type="submit"
        >
          Pay ৳{amount}
        </button>

        {/* Error */}
        {error && <p className="text-center text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
