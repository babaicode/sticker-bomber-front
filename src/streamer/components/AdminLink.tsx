import { useAlert } from "@/alert/AlertContext";
import axios from 'axios';
import { Environment } from '@/environment';
import { useCallback, useEffect, useState } from "react";
import styles from '../styles/AdminLinkComponent.module.css';
import { useTranslation } from "react-i18next";
import clsx from "clsx";

export const AdminLink = () => {
  const API_URL = Environment.StickerBomberBackApiURL;
  const userId = localStorage.getItem('userId');

  const [adminLink, setAdminLink] = useState<string | null>(null);
  const [shouldShow, setShouldShow] = useState(false);

  const { showAlert } = useAlert();
  const { t } = useTranslation();
  const getAdminLink = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/streamer/get-admin-link/${userId}`);
      setAdminLink(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  }, [API_URL, userId, showAlert]);

  const generateAdminLink = async () => {
    try {
      const response = await axios.get(`${API_URL}/streamer/generate-admin-link/${userId}`);
      setAdminLink(response.data);
      showAlert('Admin link generated successfully!', 'success');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getAdminLink();
    }
  }, [userId, getAdminLink]);
 
  return (
    <div>
      { shouldShow ? (
      <div>
        <h3 style={{ textAlign: "center" }}>{t("admin-link")}</h3>
        <div className={styles.adminLinkContainer}>
          {adminLink ? <p>{adminLink}</p> : <p>{t("loading...")}</p>}
          <div className={styles.buttonBox}>
            <button className={clsx(styles.adminLinkButton, styles.small)} role="button" onClick={generateAdminLink}>{t("generate-new-link")}</button>
            <button className={clsx(styles.adminLinkButton, styles.megaSmall)} role="button" onClick={() => setShouldShow(false)}>x</button>
          </div>
        </div>
      </div>
      ) : (
        <div className={styles.showAdminLinkButtonContainer}>
          <button className={styles.adminLinkButton} role="button" onClick={() => setShouldShow(true)}>
            {t("show-admin-link")}
          </button>
        </div> 
      )}
    </div>
  );
}