import React, { useEffect, useState } from "react";
import "../styles/LocationBlock.css";
import StickerLocation from "./StickerLocation";
import { StickerLocationProps } from "../interfaces/StickerLocationInterface";

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
            className="location-block-button big"
            role="button"
            onClick={() => setShouldShowMap(true)}
          >
            Open Map
          </button>
        ) : (
          <div className="map fullscreen">
            <p>Map for mobile</p>
            <button className="close-button" onClick={() => setShouldShowMap(false)}>
              ✖ Close
            </button>

            <StickerLocation sticker={sticker} streamerId={streamerId} time={time}/>
          </div>
        )
      ) : (
        <div className="map sidebar">
          <StickerLocation sticker={sticker} streamerId={streamerId} time={time}/>
        </div>
      )}
    </div>
  );
};

export default LocationBlock;
