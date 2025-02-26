import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../styles/StickerLocation.css";

interface StickerLocationProps {
  stickerUrl: string;
  stickerId: number;
}

const StickerLocation: React.FC<StickerLocationProps> = ({ stickerUrl, stickerId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickerRef = useRef<HTMLImageElement>(null);

  const [coords, setCoords] = useState({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const sendCoordsToBackend = async () => {
    try {
      console.log("Coordinates sent:", coords);
      await axios.post("", {
        stickerId,
        x: coords.x,
        y: coords.y
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
    let newY = e.clientY - rect.top - offset.y + stickerSize.height / 2;

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
        src={stickerUrl}
        alt="Sticker"
        className="draggable-sticker"
        style={{
          left: `${coords.x}px`,
          top: `${coords.y}px`,
          transform: "translate(-50%, -50%)",
          position: "absolute",
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
