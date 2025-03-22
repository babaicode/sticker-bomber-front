import { Environment } from "@/environment";
import styles from "../styles/MostPopularStreamers.module.css";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useAlert } from "@/alert/AlertContext.tsx";
import { MostPopularStreamersInterface } from "../interfaces/MostPopularStreamersInterface";

const ITEMS_PER_PAGE = 10;
const MAX_PAGES = 5;
const defaultAvatarPath = "/default-avatar.jpg";

const MostPopularStreamers = () => {
    const [streamers, setStreamers] = useState<MostPopularStreamersInterface[]>([]);
    const [streamersLength, setStreamersLength] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);

    const API_URL = Environment.StickerBomberBackApiURL;
    const { t } = useTranslation();
    const { showAlert } = useAlert();

    const getMostPopularStreamers = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/streamer/50-most-popular-streamers`);
            setStreamers(response.data);
            setStreamersLength(response.data.length);
        } catch (error) {
            showAlert("Error getting most popular streamers", "error");
        }
    }, [API_URL, showAlert]);
    
    useEffect(() => {
        getMostPopularStreamers();
    }, []);

    const totalPages = Math.min(Math.ceil(streamersLength / ITEMS_PER_PAGE), MAX_PAGES);
    const hasMultiplePages = totalPages > 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedStreamers = streamers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={styles.mostPopularStreamers}>
            <h1>{t("most-popular-streamers")}</h1>
            <div className={styles.streamersContainer}>
                <table className={styles.streamersTable}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t("streamer")}</th>
                            <th>{t("received-stickers")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedStreamers.map((streamer, index) => (
                            <tr key={streamer.streamerId}>
                                <td>{startIndex + index + 1}</td>
                                <td>
                                    <div className={styles.streamerInfo}>
                                        <img 
                                            src={streamer.image ? streamer.image : defaultAvatarPath} 
                                            alt={streamer.streamerName} 
                                            className={styles.streamerImage} 
                                        />
                                        {streamer.streamerName}
                                    </div>
                                </td>
                                <td>{streamer.stickerCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    
            {hasMultiplePages && (
                <div className={styles.pagination}>
                    {currentPage > 1 && (
                        <button onClick={() => setCurrentPage((prev) => prev - 1)}>
                            {t("previous")}
                        </button>
                    )}
                    <span>{t("page")} {currentPage} / {totalPages}</span>
                    {currentPage < totalPages && (
                        <button onClick={() => setCurrentPage((prev) => prev + 1)}>
                            {t("next")}
                        </button>
                    )}
                </div>
            )}
        </div>
    );    
};

export default MostPopularStreamers;
