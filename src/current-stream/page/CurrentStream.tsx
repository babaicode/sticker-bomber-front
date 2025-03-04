import { Environment } from "@/environment";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { CurrentStreamDataDto, StickerOnCurrentStreamDto } from "../interfaces/StickerLocationInterface";
import { useParams } from "react-router-dom";
import styles from '../styles/CurrentStreamPage.module.css';

const CurrentStream = () => {
    const { stream_url } = useParams<{ stream_url: string }>();  
    const [currentStreamData, setCurrentStreamData] = useState<CurrentStreamDataDto | null>(null); 
    const [size, setSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const updateSize = () => {
        if (containerRef.current) {
            setSize({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight,
            });
        }
    };

    useEffect(() => {
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    useEffect(() => {
        if (!stream_url || size.width === 0 || size.height === 0) return;

        const fetchStickers = async () => {
            try {
                const response = await axios.get(`${Environment.StickerBomberBackApiURL}/current-stream/stickers-on-stream/${stream_url}`);
                let currentStreamData = response.data;

                if (currentStreamData.stickers.length > 0) {
                    currentStreamData = {
                        ...currentStreamData,
                        stickers: currentStreamData.stickers.map((sticker: StickerOnCurrentStreamDto) => ({
                            ...sticker,
                            locationX: (sticker.locationX / 100) * size.width,
                            locationY: (sticker.locationY / 100) * size.height,
                        })),
                    };
                }

                setCurrentStreamData(currentStreamData);
            } catch (error) {
                console.error("Error while loading stickers:", error);
            }
        };

        fetchStickers();
        const interval = setInterval(fetchStickers, 1000);
        return () => clearInterval(interval);
    }, [stream_url, size]);

    return (
        <div className={styles.overlayContainerCurrentStream} ref={containerRef}>
            {currentStreamData?.stickers.map((sticker) => (
                <img
                    key={sticker.stickerId}
                    src={sticker.stickerUrl}
                    alt={sticker.stickerName}
                    className={styles.stickerInCurrentStream}
                    style={{
                        left: `${sticker.locationX}px`,
                        top: `${size.height - sticker.locationY}px`,
                    }}
                />
            ))}
        </div>
    );
};

export default CurrentStream;
