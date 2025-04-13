import React, { useState } from "react";
import "./Payment.css";
import { useNavigate, useLocation } from "react-router-dom";
import { database, ref, set } from "../firebase";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRazorpayPayment = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const amount = 1; // Rs.1 (minimum test amount)
    
    try {
      // 1. Create order in your backend
      const res = await fetch("https://happy-doctors-backend.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      if (!data.success) throw new Error(data.error?.message || "Failed to create Razorpay order");

      // 2. Initialize Razorpay
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // From environment variables
        amount: data.order.amount,
        currency: "INR",
        name: "Happy Doctors Consultancy",
        description: "Health Card Payment",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            const transactionId = response.razorpay_payment_id;

            // Save to Firebase
            const paymentRef = ref(database, `payments/${transactionId}`);
            await set(paymentRef, {
              transactionId,
              status: "completed",
              amount,
              time: new Date().toISOString()
            });

            // Get form data
            const formData = location.state?.formData || 
                            JSON.parse(localStorage.getItem("healthCardFormData"));

            // Navigate with all data
            navigate("/generate-card", { 
              state: { 
                formData: {
                  ...formData,
                  transactionId,
                  paymentStatus: "completed",
                  paymentDate: new Date().toISOString()
                },
                paymentDetails: {
                  transactionId,
                  amount,
                  status: "completed"
                }
              } 
            });
          } catch (err) {
            console.error("Payment success handling failed:", err);
            setErrorMessage("Payment verification failed");
          }
        },
        prefill: {
          name: "Patient Name",
          email: "patient@example.com",
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
      console.error("Payment error:", err);
      setErrorMessage(err.message || "Payment initiation failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Test Payment (₹1)</h2>
      <button 
        onClick={handleRazorpayPayment} 
        className="verify-button"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Pay with Razorpay"}
      </button>
      {errorMessage && <p className="error-msg">{errorMessage}</p>}
    </div>
  );
};

export default Payment;
