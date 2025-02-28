import { Environment } from "@/environment";
import axios from "axios";
import { useEffect, useState } from "react";
import { CurrentStreamDataDto } from "../interfaces/StickerLocationInterface";
import { useParams } from "react-router-dom";
import '../styles/CurrentStreamPage.css';

const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

const CurrentStream = () => {
    const { stream_url } = useParams<{ stream_url: string }>();  
    const [currentStreamData, setCurrentStreamData] = useState<CurrentStreamDataDto | null>(null); 

    useEffect(() => {
        if (!stream_url) return;
    
        const fetchStickers = async () => {
            try {
                const response = await axios.get(`${Environment.StickerBomberBackApiURL}/current-stream/stickers-on-stream/${stream_url}`);
                setCurrentStreamData(response.data);
            } catch (error) {
                console.error("error while loading stickers", error);
            }
        };
    
        fetchStickers();
    
        const interval = setInterval(fetchStickers, 1000);

        return () => clearInterval(interval);
    }, [stream_url]);
    
    return (
        <div className="overlay-container-current-stream">
            {currentStreamData?.stickers.map((sticker) => (
                <img
                    key={sticker.stickerId}
                    src={sticker.stickerUrl}
                    alt={sticker.stickerName}
                    className="sticker-in-current-stream"
                    style={{
                        left: `${sticker.locationX}px`,
                        top: `${SCREEN_HEIGHT - sticker.locationY}px`, // Инвертируем Y
                    }}
                />
            ))}
        </div>
    );
};

export default CurrentStream;
