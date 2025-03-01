import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../styles/StickerLocation.css";
import { StickerLocationProps } from "../interfaces/StickerLocationInterface";
import { Environment } from "@/environment";

const StickerLocation: React.FC<StickerLocationProps> = ({ sticker, streamerId, time }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLImageElement>(null);

  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const API_URL = Environment.StickerBomberBackApiURL;

  const sendCoordsToBackend = async () => {
    if (time === 0) {
      alert("Please select a time first");
      return;
    }
    try {
      console.log("Coordinates sent:", coords, time);
      await axios.post(`${API_URL}/sticker-location/customer-send-sticker/`, {
        stickerId: sticker.stickerId,
        streamerId,
        location_x: coords.x,
        location_y: coords.y,
        time: time,
      });
    } catch (error) {
      console.error("Error sending coordinates:", error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setDragging(true);

    const sticker = stickerRef.current;
    if (!sticker) return;

    setOffset({
      x: e.clientX - sticker.getBoundingClientRect().left,
      y: e.clientY - sticker.getBoundingClientRect().top,
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
          height: `${sticker.stikerHeight}px`,
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
