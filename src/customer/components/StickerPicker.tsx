import { Sticker } from "@/sticker/interfaces/StickerInterface";
import { useLocation } from "react-router-dom";
import { StreamerData } from "../interfaces/CustomerInterface";
import '../styles/StickerPicker.css';

const StickerPicker = () => {
    const location = useLocation();
    const { streamerData, sticker } = location.state as {
        streamerData: StreamerData;
        sticker: Sticker;
    };

const mediaQuery = window.matchMedia('(max-width: 1440px)');

if (mediaQuery.matches) {
  console.log('Mobile mode: @media (max-width: 1440px) is active');
} else {
  console.log('Desktop mode: @media (max-width: 1440px) is not active');
}
    
    return (
        <div className="container">
            <h2>Send to {streamerData.streamerName}</h2>
            <img className="sticker" src={sticker.url} alt={sticker.stickerName} />
            <div className="sticker-info">
                <h3>Sticker: {sticker.stickerName}</h3>
                <h3>Price per second: {sticker.price}</h3>
            </div>
        </div>
    );
}

export default StickerPicker;