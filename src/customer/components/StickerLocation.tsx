import { useEffect, useState } from "react";
import '../styles/StickerLocation.css';

const StickerLocation = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1440);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`sticker-details ${isMobile ? "fullscreen" : "sidebar"}`}>
        <h2>Sticker Location</h2>
        </div>
    );
}

export default StickerLocation;