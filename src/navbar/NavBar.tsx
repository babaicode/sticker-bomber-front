import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./styles/navbar.module.css";
import { getAuthorAvatar } from "@/auth/service/authService";
import { languageOptions } from "@/locales/LanguageOptions";

const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isStreamer, setIsStreamer] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      const adminId = localStorage.getItem("adminId");
      if (adminId && adminId !== "undefined") {
        const avatarUrl = await getAuthorAvatar(Number(adminId));
        if (avatarUrl) {
          setAvatar(avatarUrl);
        }
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      const streamerId = localStorage.getItem("streamerId");
      if (streamerId && streamerId !== "undefined") {
        setIsStreamer(true);
      }
    };

    fetchAvatar();
  }, []);

  const changeLanguage = () => {
    const nextLang =
      languageOptions[
        (languageOptions.findIndex((lang) => lang.code === currentLanguage) + 1) %
          languageOptions.length
      ];
    i18n.changeLanguage(nextLang.code);
    setCurrentLanguage(nextLang.code);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>{t("home")}</Link>
      {!isAdmin && isStreamer && <Link to="/streamer" className={styles.navLink}>{t("streamer")}</Link>}
      {isAdmin && !isStreamer && <Link to="/admin" className={styles.navLink}>{t("admin")}</Link>}
      <Link to="/logout" className={styles.navLink}>{t("logout")}</Link>
      {avatar && <img src={avatar} alt="User Avatar" className={styles.avatar} />}

      <button className={styles.langButton} type="button" onClick={changeLanguage}>
        <span role="img" aria-label="flag">{languageOptions.find((lang) => lang.code === currentLanguage)?.flag}</span>
      </button>
    </nav>
  );
};

export default NavBar;
