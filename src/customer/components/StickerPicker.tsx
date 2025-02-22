import { Sticker } from "@/sticker/interfaces/StickerInterface";
import { useLocation } from "react-router-dom";
import { StreamerData } from "../interfaces/CustomerInterface";

const StickerPicker = () => {
    const location = useLocation();
    const { streamerData, sticker } = location.state as {
        streamerData: StreamerData;
        sticker: Sticker;
    };
    
    return (
        <div>
          <img src={sticker.url} alt={sticker.stickerName} />
          <h1>Sticker Picker</h1>
          <h2>Streamer: {streamerData.streamerName}</h2>
          <h3>Sticker: {sticker.stickerName}</h3>
          <h3>Price: {sticker.price}</h3>
        </div>
      );
}

export default StickerPicker;