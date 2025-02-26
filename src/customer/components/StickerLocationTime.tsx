import { useState } from "react";

interface StickerLocationTimeProps {
  setTime: (time: number) => void;
}

const StickerLocationTime: React.FC<StickerLocationTimeProps> = ({ setTime }) => {
  const [selectedTime, setSelectedTime] = useState<number>(2);

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    setTime(time);
  };

  return (
    <div className="sticker-time-container">
      <h3>Select Duration (seconds):</h3>
      <div className="time-options">
        {[2, 5, 10].map((time) => (
          <button 
            key={time} 
            className={`time-button ${selectedTime === time ? "selected" : ""}`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </button>
        ))}
        <input
          type="number"
          min="1"
          value={selectedTime}
          onChange={(e) => handleTimeSelect(Number(e.target.value))}
          className="time-input"
        />
      </div>
    </div>
  );
};

export default StickerLocationTime;
