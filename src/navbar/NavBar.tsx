import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./styles/navbar.module.css";
import { getAuthorAvatar } from "@/auth/service/authService";
import { languageOptions } from "@/locales/LanguageOptions";

const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

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
    <nav className="navbar">
      <Link to="/" className="nav-link">{t("home")}</Link>
      {!isAdmin && <Link to="/streamer" className="nav-link">{t("streamer")}</Link>}
      {isAdmin && <Link to="/admin" className="nav-link">{t("admin")}</Link>}
      <Link to="/logout" className="nav-link">{t("logout")}</Link>
      {avatar && <img src={avatar} alt="User Avatar" className="avatar" />}

      <button className="lang-button" type="button" onClick={changeLanguage}>
        <span role="img" aria-label="flag">{languageOptions.find((lang) => lang.code === currentLanguage)?.flag}</span>
      </button>
    </nav>
  );
};

export default NavBar;
