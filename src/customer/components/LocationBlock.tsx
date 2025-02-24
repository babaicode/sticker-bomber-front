import { useEffect, useState } from "react";
import "../styles/StickerLocation.css";

const LocationBlock = () => {
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
          <button className="button-1 big" role="button" onClick={() => setShouldShowMap(true)}>
            Open Map
          </button>
        ) : (
          <div className="map fullscreen">
            <p>Map for mobile</p>
            <button className="close-button" onClick={() => setShouldShowMap(false)}>
              ✖ Close
            </button>
          </div>
        )
      ) : (
        <div className="map sidebar">
          <p>Map for PC</p>
        </div>
      )}
    </div>
  );
};

export default LocationBlock;