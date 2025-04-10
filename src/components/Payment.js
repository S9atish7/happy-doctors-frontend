import React, { useState } from "react";
import "./Payment.css";
import { useNavigate, useLocation } from "react-router-dom";
import { database, ref, set } from "../firebase";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRazorpayPayment = async () => {
    const amount = 1; // Rs.1 (minimum test amount)
    try {
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message || "Failed to create Razorpay order");

      const options = {
        key: "rzp_test_DYU4rGUFm5V5Zf",
        amount: data.order.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Payment",
        order_id: data.order.id,
        handler: async function (response) {
          const transactionId = response.razorpay_payment_id;

          // Save to Firebase
          const paymentRef = ref(database, `payments/${transactionId}`);
          await set(paymentRef, {
            transactionId,
            status: "completed",
            amount,
            time: new Date().toISOString()
          });

          setPaymentStatus("success");

          // Get form data from location state or localStorage
          const formData = location.state?.formData || 
                          JSON.parse(localStorage.getItem("healthCardFormData"));

          // Prepare card data with transaction ID
          const cardData = {
            ...formData,
            transactionId,
            paymentStatus: "completed",
            paymentDate: new Date().toISOString()
          };

          // Navigate to generate-card with all data
          navigate("/generate-card", { 
            state: { 
              formData: cardData,
              paymentDetails: {
                transactionId,
                amount,
                status: "completed"
              }
            } 
          });
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#4CAF50"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        setErrorMessage(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Payment initiation failed");
    }
  };

  return (
    <div className="payment-container">
      <h2>Test Payment (₹1)</h2>
      <button onClick={handleRazorpayPayment} className="verify-button">
        Pay with Razorpay
      </button>
      {errorMessage && <p className="error-msg">{errorMessage}</p>}
      {paymentStatus === "success" && (
        <p className="success-msg">✅ Payment Successful! Redirecting...</p>
      )}
    </div>
  );
};

export default Payment;