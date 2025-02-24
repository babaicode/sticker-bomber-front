import React, { useRef, useState, useEffect } from "react";
import "../styles/StickerLocation.css";

const StickerLocation: React.FC = () => {
  const [coords, setCoords] = useState({ x: 100, y: 100 });

  const containerRef = useRef<HTMLDivElement>(null);

  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setDragging(true);

    setOffset({
      x: e.clientX - coords.x,
      y: e.clientY - coords.y,
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    let newX = e.clientX - offset.x;
    let newY = e.clientY - offset.y;

    const stickerWidth = 100; 
    const stickerHeight = 100;

    if (newX < rect.left + stickerWidth / 2) {
      newX = rect.left + stickerWidth / 2;
    }

    if (newX > rect.right - stickerWidth / 2) {
      newX = rect.right - stickerWidth / 2;
    }

    if (newY < rect.top + stickerHeight / 2) {
      newY = rect.top + stickerHeight / 2;
    }

    if (newY > rect.bottom - stickerHeight / 2) {
      newY = rect.bottom - stickerHeight / 2;
    }

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
        src="/images/sticker.png"
        alt="Sticker"
        className="draggable-sticker"
        style={{
          left: coords.x,
          top: coords.y,
          transform: "translate(-50%, -50%)",
          position: "absolute",
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default StickerLocation;
