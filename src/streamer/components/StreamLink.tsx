import { useAlert } from "@/alert/AlertContext";
import axios from 'axios';
import { Environment } from '@/environment';
import { useCallback, useEffect, useState } from "react";
import '../styles/StreamLink.css';
import { useTranslation } from "react-i18next";

const StreamLink = () => {
    const API_URL = Environment.StickerBomberBackApiURL;
    const streamerId = localStorage.getItem('streamerId');
    const { showAlert } = useAlert();
    const { t } = useTranslation();

    const [streamLink, setStreamLink] = useState<string | null>(null);
    const [shouldShow, setShouldShow] = useState(false);

    const getStreamLink = useCallback(async () => {
        try {
          const response = await axios.get(`${API_URL}/streamer/get-stream-link/${streamerId}`);
          setStreamLink(response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
          } else {
            showAlert('An unexpected error occurred', 'error');
          }
        }
    }, [API_URL, streamerId, showAlert]);

    const generateStreamLink = async () => {
        try {
          const response = await axios.get(`${API_URL}/streamer/generate-stream-link/${streamerId}`);
          setStreamLink(response.data);
          showAlert('Stream link generated successfully!', 'success');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
          } else {
            showAlert('An unexpected error occurred', 'error');
          }
        }
    };

    useEffect(() => {
        if (streamerId) {
          getStreamLink();
        }
    }, [streamerId, getStreamLink]);

    return (
        <div>
          { shouldShow ? (
          <div>
            <h3 style={{ textAlign: "center" }}>{t("stream-link")}</h3>
            <div className="stream-link-container">
              {streamLink ? <p>{streamLink}</p> : <p>{t("loading...")}</p>}
              <div className="button-stream-link-box">
                <button className="button-stream-link small" role="button" onClick={generateStreamLink}>{t("generate-new-link")}</button>
                <button className="button-stream-link mega-small" role="button" onClick={() => setShouldShow(false)}>x</button>
              </div>
            </div>
          </div>
          ) : (
            <div className="show-stream-link-button-container">
              <button className="button-stream-link" role="button" onClick={() => setShouldShow(true)}>
                {t("show-stream-link")}
              </button>
            </div> 
          )}
        </div>
    );
}

export default StreamLink;