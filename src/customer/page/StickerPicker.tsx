import { StickerForSettingLocation } from "@/sticker/interfaces/StickerInterface";
import { useLocation } from "react-router-dom";
import { StreamerData } from "../interfaces/CustomerInterface";
import '../styles/StickerPicker.css';
import { useState, useEffect } from "react";
import LocationBlock from "../components/LocationBlock";
import StickerLocationTime from "../components/StickerLocationTime";
import { useTranslation } from "react-i18next";

const StickerPicker = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1440);
    const location = useLocation();
    const [time, setTime] = useState<number>(0);
    const { t } = useTranslation();

    const { streamerData, sticker } = location.state as {
        streamerData: StreamerData;
        sticker: StickerForSettingLocation;
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1440);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={`sticker-picker-container ${isMobile ? "mobile" : "desktop"}`}>
            <div className="sticker-wrapper">
                <img className="sticker" src={sticker.url} alt={sticker.stickerName} />
                <div className="sticker-info">
                    <h3>{t("sticker:")} {sticker.stickerName}</h3>
                    <h3>{t("price-per-second")}: {sticker.price}</h3>
                </div>
                <StickerLocationTime setTime={setTime} />
            </div>

            <div className="sticker-location">
                <LocationBlock sticker={sticker} streamerId={streamerData.streamerId} time={time}/>
            </div>
        </div>
    );
}

export default StickerPicker;
