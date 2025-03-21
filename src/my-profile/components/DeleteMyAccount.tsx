import { useState, useEffect } from "react";
import styles from "../styles/DeleteMyAccount.module.css";
import { useAlert } from "@/alert/AlertContext";
import axios from "axios";
import { Environment } from "@/environment";
import { useTranslation } from "react-i18next";

const DeleteMyAccount = () => {
  const [inputValue, setInputValue] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const requiredPhrase = "delete my account";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase());
    setIsCopied(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    showAlert("Manual input only.", "error");
    setIsCopied(true);
  };

  useEffect(() => {
    if (inputValue === requiredPhrase && !isCopied) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [inputValue, isCopied]);

  const handleDelete = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      showAlert("User ID not found.", "error");
      return;
    }

    try {
      await axios.delete(`${Environment.StickerBomberBackApiURL}/user/delete-account/${userId}`);
      showAlert("Your account has been deleted.", "success");
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      showAlert("Failed to delete account.", "error");
    }
  };

  return (
    <div className={styles.deleteContainer}>
      <h3>{t("delete_my_account")}</h3>
      <p>{t("this_action_is_irreversible")}:</p>
      <code className={styles.confirmText}>{requiredPhrase}</code>

      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onPaste={handlePaste}
        className={styles.input}
        placeholder={t("type_here")}
      />

      <button
        className={styles.deleteButton}
        onClick={handleDelete}
        disabled={!isValid}
      >
        {t("delete_account")}
      </button>
    </div>
  );
};

export default DeleteMyAccount;
