import { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "../styles/StickerLocationTime.module.css"; // Import CSS Module

interface StickerLocationTimeProps {
  setTime: (time: number) => void;
}

const StickerLocationTime: React.FC<StickerLocationTimeProps> = ({ setTime }) => {
  const [selectedTime, setSelectedTime] = useState<number>(2);
  const { t } = useTranslation();

  const handleTimeSelect = (time: number) => {
    setSelectedTime(time);
    setTime(time);
  };

  return (
    <div className={styles.stickerTimeContainer}>
      <h3 className={styles.title}>{t("select-duration-seconds")}</h3>
      <div className={styles.timeOptions}>
        {[2, 5, 10].map((time) => (
          <button 
            key={time} 
            className={`${styles.timeButton} ${selectedTime === time ? styles.selected : ""}`}
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
          className={styles.timeInput}
        />
      </div>
    </div>
  );
};

export default StickerLocationTime;
