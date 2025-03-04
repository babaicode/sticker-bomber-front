import React, { useEffect, useState } from "react";
import styles from "../styles/LocationBlock.module.css";
import StickerLocation from "./StickerLocation";
import { StickerLocationProps } from "../interfaces/StickerLocationInterface";
import clsx from "clsx";

const LocationBlock: React.FC<StickerLocationProps> = ({ sticker, streamerId, time }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1440);
  const [shouldShowMap, setShouldShowMap] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        !shouldShowMap ? (
          <button
            className={clsx(styles.locationBlockButton, styles.big)}
            role="button"
            onClick={() => setShouldShowMap(true)}
          >
            Open Map
          </button>
        ) : (
          <div className={clsx(styles.map, styles.fullscreen)}>
            <p>Map for mobile</p>
            <button className={styles.closeButton} onClick={() => setShouldShowMap(false)}>
              ✖ Close
            </button>

            <StickerLocation sticker={sticker} streamerId={streamerId} time={time}/>
          </div>
        )
      ) : (
        <div className={clsx(styles.map, styles.sidebar)}>
          <StickerLocation sticker={sticker} streamerId={streamerId} time={time}/>
        </div>
      )}
    </div>
  );
};

export default LocationBlock;
