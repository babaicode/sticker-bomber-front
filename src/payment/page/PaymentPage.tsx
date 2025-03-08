import { useState } from "react";
import axios from "axios";
import { Environment } from '@/environment';

const API_URL = Environment.StickerBomberBackApiURL;

const PaymentPage = () => {
  const [amount, setAmount] = useState<number>(100);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/payment/create`, {
        userId: localStorage.getItem("userId"),
        streamerId: localStorage.getItem("streamerId"),
        amount,
        currency: "RUB",
        description: "Пополнение баланса",
      });
      console.log("Payment URL:", response.data);

      window.location.href = response.data;
    } catch (error) {
      console.error("Ошибка оплаты:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Пополнить баланс</h1>
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Оплата..." : "Оплатить"}
      </button>
    </div>
  );
};

export default PaymentPage;
