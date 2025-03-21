import { useAlert } from "@/alert/AlertContext";
import { useEffect, useState } from "react";
import { Environment } from "@/environment";
import axios from "axios";
import styles from "../styles/ChangeMyEmail.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const ChangeMyEmail = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const fetchEmail = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      showAlert("User ID not found.", "error");
      return;
    }

    try {
      const response = await axios.get(
        `${Environment.StickerBomberBackApiURL}/user/user-email/${userId}`
      );

      // setCurrentEmail(response.data);
      setCurrentEmail(response.data.email);

    } catch (error) {
      console.error("Error fetching email:", error);
      showAlert("Error fetching email.", "error");
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId || !email) {
      showAlert("Missing user ID or email", "error");
      return;
    }

    try {
      await axios.patch(`${Environment.StickerBomberBackApiURL}/user/update-user-email/${userId}`, {
        email,
      });
      showAlert("Email updated successfully!", "success");
      setCurrentEmail(email);
      setEmail(null);
    } catch (error) {
      console.error("Error updating email:", error);
      showAlert("Failed to update email.", "error");
    }
  };

  return (
    <div className={styles.emailContainer}>
      <h3>{t("change_email")}</h3>
      <h4>{t("current_email")}: {currentEmail}</h4>
      <input
        type="email"
        value={email || ""}
        onChange={handleEmailChange}
        placeholder={t("enter_new_email")}
        className={styles.emailInput}
      />
      <button onClick={handleSubmit} className={clsx(styles.submitButton, styles.megaSmall)}>
        {t("update_email")}
      </button>
    </div>
  );
};

export default ChangeMyEmail;
