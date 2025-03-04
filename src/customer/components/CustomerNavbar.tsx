import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from '../styles/CustomerNavbar.module.css';
import { useTranslation } from "react-i18next";
import { languageOptions } from "@/locales/LanguageOptions";

const CustomerNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { t, i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    useEffect(() => {
        const checkLogin = () => {
            const userId = localStorage.getItem('userId');
            if (userId && userId !== 'undefined') {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        checkLogin();
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
            {!isLoggedIn && <Link to="/login" className={styles.navLink}>{t("login")}</Link>}
            {isLoggedIn && <Link to="/streamer-list" className={styles.navLink}>{t("streamer-list")}</Link>}
            <button className={styles.langButton} onClick={changeLanguage}>
                {languageOptions.find((lang) => lang.code === currentLanguage)?.flag}
            </button>
        </nav>
    );
}

export default CustomerNavbar;