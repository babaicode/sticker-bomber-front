import React, { useEffect, useState } from "react";
import styles from "../styles/MyAvatar.module.css";
import { useAlert } from "@/alert/AlertContext";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Environment } from "@/environment";
import clsx from "clsx";

const MyAvatar: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { showAlert } = useAlert();
  const { t } = useTranslation();
  const [ ihaveAvatar, setIHaveAvatar ] = useState(false);
  const [ editAvatar, setEditAvatar ] = useState(false);

  const fetchUserAvatar = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showAlert("User ID not found.", "error");
      return;
    }

    try {
      const response = await axios.get(
        `${Environment.StickerBomberBackApiURL}/user/avatar/${userId}`,
        { responseType: "blob" }
      );

      if (response.data.type === 'application/json') {
        setAvatarUrl(null);
        setIHaveAvatar(false);
        return;
      }

      const avatarBlob = new Blob([response.data]);
      const avatarObjectURL = URL.createObjectURL(avatarBlob);
      setAvatarUrl(avatarObjectURL);
      setIHaveAvatar(true);
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };

  useEffect(() => {
    fetchUserAvatar();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (["image/jpeg", "image/jpg", "image/png"].includes(fileType)) {
        setSelectedFile(file);
        setAvatarUrl(URL.createObjectURL(file));
        setIHaveAvatar(false);
        showAlert("File selected successfully!", "success");
      } else {
        showAlert("Only JPEG, JPG, or PNG files are allowed.", "error");
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      showAlert("No file selected.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", localStorage.getItem("userId") || "");

    try {
      await axios.post(
        `${Environment.StickerBomberBackApiURL}/user/upload-avatar`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      showAlert("File uploaded successfully!", "success");
      fetchUserAvatar();
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      showAlert("Failed to upload file. Please try again.", "error");
    }
  };

  const handleDelete = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showAlert("User ID not found.", "error");
      return;
    }

    try {
      await axios.delete(`${Environment.StickerBomberBackApiURL}/user/delete-avatar/${userId}`);
      showAlert("Avatar deleted successfully!", "success");
      setAvatarUrl(null);
      setIHaveAvatar(false);
    } catch (error) {
      console.error("Error deleting avatar:", error);
      showAlert("Failed to delete avatar. Please try again.", "error");
    }
  };

  return (
    <div className={styles.uploadContainer}>
      {!ihaveAvatar && <h3>{t("change-avatar__big")}</h3>}
  
      {avatarUrl ? (
        <div className={styles.avatarContainer}>
          <img src={avatarUrl} alt="User Avatar" className={styles.avatar} />
        </div>
      ) : (
        <div className={styles.avatarContainer}>
          <img src={"/default-avatar.jpg"} alt="Default Avatar" className={styles.avatar} />
        </div>
      )}
  
      {editAvatar ? (
        <>
          <label className={clsx(styles.myAvatarButtons, styles)}>
            <input type="file" accept=".jpeg, .jpg, .png" onChange={handleFileChange} className={styles.fileInput} />
            📷 {avatarUrl ? t("change-avatar__small") : t("select-avatar__small")}
          </label>
  
          {selectedFile && (
            <button className={clsx(styles.myAvatarButtons, styles.small)} onClick={handleUpload}>
              {t("upload")}
            </button>
          )}
  
          <div className={styles.buttonBox}>
            {ihaveAvatar && (
              <div>
                <button className={clsx(styles.myAvatarButtons, styles.megaSmall)} onClick={handleDelete}>
                  {t("delete__small")}
                </button>
              </div>
            )}
            <button className={clsx(styles.myAvatarButtons, styles.megaSmall)} role="button" onClick={() => setEditAvatar(false)}>{t("close__small")}</button>
          </div>

        </>
      ) : (
        <div>
          <button className={styles.myAvatarButtons} role="button" onClick={() => setEditAvatar(true)}>
            {t("change-my-avatar")}
          </button>
        </div>
      )}
    </div>
  );  
};

export default MyAvatar;
