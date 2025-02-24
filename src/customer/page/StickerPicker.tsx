import { Sticker } from "@/sticker/interfaces/StickerInterface";
import { useLocation } from "react-router-dom";
import { StreamerData } from "../interfaces/CustomerInterface";
import '../styles/StickerPicker.css';
import StickerLocation from "../components/StickerLocation";
import { useState } from "react";

const StickerPicker = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1440);
    const location = useLocation();

    const { streamerData, sticker } = location.state as {
        streamerData: StreamerData;
        sticker: Sticker;
    };

    return (
        <div className={`container ${isMobile ? "mobile" : "desktop"}`}>
            <h2>Send to {streamerData.streamerName}</h2>
            <img className="sticker" src={sticker.url} alt={sticker.stickerName} />
            <div className="sticker-info">
                <h3>Sticker: {sticker.stickerName}</h3>
                <h3>Price per second: {sticker.price}</h3>
            </div>
            <StickerLocation />
        </div>
    );
}

export default StickerPicker;