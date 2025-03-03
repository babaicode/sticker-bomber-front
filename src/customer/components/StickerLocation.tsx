import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../styles/StickerLocation.css";
import { StickerLocationProps } from "../interfaces/StickerLocationInterface";
import { Environment } from "@/environment";

const StickerLocation: React.FC<StickerLocationProps> = ({ sticker, streamerId, time }) => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLImageElement>(null);

  const [coords, setCoords] = useState({ x: size.width / 2, y: size.height / 2 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const API_URL = Environment.StickerBomberBackApiURL;

  useEffect(() => {
    if (containerRef.current) {
      setSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);
  
  useEffect(() => {
    if (size.width > 0 && size.height > 0) {
      setCoords({ x: size.width / 2, y: size.height / 2 });
    }
  }, [size]);

  const sendCoordsToBackend = async () => {
    if (time === 0) {
      alert("Please select a time first");
      return;
    }

    if (isNaN(coords.x) || isNaN(coords.y)) {
      console.error("❌ ERROR: Invalid coordinates before sending!", coords);
      return;
    }

    
    const xByPercent = (coords.x * 100) / size.width;
    const yByPercent = (coords.y * 100) / size.height;

    try {
      await axios.post(`${API_URL}/sticker-location/customer-send-sticker/`, {
        stickerId: sticker.stickerId,
        streamerId,
        location_x: xByPercent,
        location_y: yByPercent,
        time: time,
      });
    } catch (error) {
      console.error("❌ Error sending coordinates:", error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setDragging(true);

    const sticker = stickerRef.current;
    if (!sticker) return;

    const stickerRect = sticker.getBoundingClientRect();

    setOffset({
      x: e.clientX - stickerRect.left,
      y: e.clientY - stickerRect.top,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    const container = containerRef.current;
    const sticker = stickerRef.current;
    if (!container || !sticker) return;

    const rect = container.getBoundingClientRect();
    const stickerSize = sticker.getBoundingClientRect();

    let newX = e.clientX - rect.left - offset.x + stickerSize.width / 2;
    let newY = rect.height - (e.clientY - rect.top - offset.y + stickerSize.height / 2);

    if (isNaN(newX) || isNaN(newY)) {
      console.error("❌ ERROR: NaN detected in handleMouseMove!", { newX, newY });
      return;
    }

    newX = Math.max(stickerSize.width / 2, Math.min(newX, rect.width - stickerSize.width / 2));
    newY = Math.max(stickerSize.height / 2, Math.min(newY, rect.height - stickerSize.height / 2));

    setCoords({ x: newX, y: newY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div className="sticker-location-container" ref={containerRef}>
      <img
        ref={stickerRef}
        src={sticker.url}
        alt="Sticker"
        className="draggable-sticker"
        style={{
          left: `${coords.x}px`,
          bottom: `${coords.y}px`,
          transform: "translate(-50%, 50%)",
          position: "absolute",
          width: `${sticker.stickerWidth}px`,
          height: `${sticker.stickerHeight}px`,
        }}
        onMouseDown={handleMouseDown}
      />

      <button className="save-button" onClick={sendCoordsToBackend}>
        Save screen position
      </button>
    </div>
  );
};

export default StickerLocation;
