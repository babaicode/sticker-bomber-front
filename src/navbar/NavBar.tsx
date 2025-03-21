import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./styles/navbar.module.css";
import { getAuthorAvatar } from "@/auth/service/authService";
import { languageOptions } from "@/locales/LanguageOptions";

const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isStreamer, setIsStreamer] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("adminId");
    localStorage.removeItem("streamerId");
    navigate("/logout");
  };

  const goToMyProfile = () => {
    navigate("/me");
    setDropdownOpen(!dropdownOpen)
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>{t("home")}</Link>
      {!isAdmin && isStreamer && <Link to="/streamer" className={styles.navLink}>{t("streamer")}</Link>}
      {isAdmin && !isStreamer && <Link to="/admin" className={styles.navLink}>{t("admin")}</Link>}
      {!isAdmin && !isStreamer && <Link to="/wonna-be-streamer" className={styles.navLink}>{t("wonna-be-a-streamer?")}</Link>}

      <div className={styles.dropdown} ref={dropdownRef}>
        <button
          className={styles.dropdownToggle}
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {avatar ? (
            <img src={avatar} alt="User Avatar" className={styles.avatar} />
          ) : (
            <span className={styles.menuIcon}>⋮</span>
          )}
        </button>

        {dropdownOpen && (
          <ul className={styles.dropdownMenu}>
            <button className={styles.dropdownItem} type="button" onClick={changeLanguage}>
              <span className={styles.langButtonText} role="img" aria-label="flag">{languageOptions.find((lang) => lang.code === currentLanguage)?.flag}</span>
            </button>
            <li>
              <button className={styles.dropdownItemLogout} onClick={handleLogout}>
                🚪 {t("logout")}
              </button>
            </li>
            <li>
              <button onClick={goToMyProfile} className={styles.dropdownItemMyProfile}>
                🧍 {t("my_profile")}
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
