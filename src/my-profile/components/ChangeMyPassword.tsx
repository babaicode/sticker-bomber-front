import styles from "../styles/ChangeMyPassword.module.css";
import clsx from "clsx";
import axios, { AxiosError } from "axios";
import { useAlert } from "@/alert/AlertContext";
import { useState } from "react";
import { Environment } from "@/environment";
import { useTranslation } from "react-i18next";

const ChangeMyPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId || !oldPassword || !newPassword) {
      showAlert("Please fill all fields.", "error");
      return;
    }

    try {
      await axios.patch(`${Environment.StickerBomberBackApiURL}/user/change-password/${userId}`, {
        oldPassword,
        newPassword
      });

      showAlert("Password updated successfully!", "success");
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        showAlert("Old password is incorrect.", "error");
      } else {
        showAlert("Failed to update password.", "error");
        console.error("Error updating password:", error);
      }
    }
  };

  return (
    <div className={styles.passwordContainer}>
      <h3>{t("change_password")}</h3>

      <input
        type="password"
        value={oldPassword}
        onChange={handleOldPasswordChange}
        placeholder={t("enter_old_password")}
        className={styles.input}
      />

      <input
        type="password"
        value={newPassword}
        onChange={handleNewPasswordChange}
        placeholder={t("enter_new_password")}
        className={styles.input}
      />

      <button className={clsx(styles.submitButton, styles.megaSmall)} onClick={handleSubmit}>
        {t("update_password")}
      </button>
    </div>
  );
};

export default ChangeMyPassword;
