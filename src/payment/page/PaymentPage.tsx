import { useState } from "react";
import axios from "axios";
import { Environment } from '@/environment';

const API_URL = Environment.StickerBomberBackApiURL;

const PaymentPage = () => {
  const [amount, setAmount] = useState<number>(100);
  const [loading, setLoading] = useState<"yookassa" | "anytime" | null>(null); // Убираем дефолтное значение

  const handlePayment = async (method: "yookassa" | "anytime") => {
    try {
      setLoading(method);
      const response = await axios.post(`${API_URL}/payment/create`, {
        userId: localStorage.getItem("userId"),
        streamerId: localStorage.getItem("streamerId"),
        amount,
        currency: "RUB",
        description: "Пополнение баланса",
        provider: method
      });

      console.log("Payment URL:", response.data);
      window.location.href = response.data;
    } catch (error) {
      console.error("Ошибка оплаты:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div>
      <h1>Пополнить баланс</h1>

      <label>Сумма:</label>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(Number(e.target.value))} 
        min="10"
      />

      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <button onClick={() => handlePayment("yookassa")} disabled={loading === "yookassa"}>
          {loading === "yookassa" ? "Оплата через ЮKassa..." : "Оплатить через ЮKassa"}
        </button>

        <button onClick={() => handlePayment("anytime")} disabled={loading === "anytime"}>
          {loading === "anytime" ? "Оплата через AnytimePay..." : "Оплатить через AnytimePay"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
