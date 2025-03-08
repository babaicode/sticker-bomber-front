import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentStatus = () => {
  const { paymentId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await axios.get(`/payment/status/${paymentId}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    checkPaymentStatus();
    const interval = setInterval(checkPaymentStatus, 2000);

    return () => clearInterval(interval);
  }, [paymentId]);

  return (
    <div className="payment-status">
      <h2>Статус платежа: {status}</h2>
      {status === "succeeded" && <p>✅ Оплата прошла успешно!</p>}
      {status === "failed" && <p>❌ Оплата не удалась.</p>}
      {status !== "pending" && (
        <button onClick={() => navigate("/")}>Вернуться на главную</button>
      )}
    </div>
  );
};

export default PaymentStatus;
