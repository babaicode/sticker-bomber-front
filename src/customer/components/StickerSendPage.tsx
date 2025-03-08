import { useState } from "react";
import axios from "axios";

const StickerSendPage = () => {
  const [sticker, setSticker] = useState<number | null>(null);
  const [streamer, setStreamer] = useState<number | null>(null);
  const [time, setTime] = useState<number>(2);
  const [loading, setLoading] = useState(false);

  const handleSendSticker = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/payment/create`, {
        streamerId: streamer,
        amount: 300, // Цена стикера
        currency: "RUB",
        description: "Стикер на стрим",
      });

      window.location.href = response.data;
    } catch (error) {
      console.error("Ошибка отправки стикера:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Отправить стикер</h1>
      <select onChange={(e) => setStreamer(Number(e.target.value))}>
        <option value={1}>Стример 1</option>
        <option value={2}>Стример 2</option>
      </select>
      <select onChange={(e) => setSticker(Number(e.target.value))}>
        <option value={1}>Стикер 1</option>
        <option value={2}>Стикер 2</option>
      </select>
      <button onClick={handleSendSticker} disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </button>
    </div>
  );
};

export default StickerSendPage;
