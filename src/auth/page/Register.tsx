import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from '../styles/Auth.module.css';
import axios from 'axios';
import { register, registerAdmin } from '../service/authService';
import { useAlert } from '@/alert/AlertContext';
import { Environment } from '@/environment';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '@/locales/LanguageOptions';

const API_URL = Environment.StickerBomberBackApiURL;

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [streamerId, setStreamerId] = useState<number | null>(null);

  const { showAlert } = useAlert();
  const { dynamicParam } = useParams<{ dynamicParam?: string }>();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const shouldSaveAdmin: boolean = await checkIfAdminLinkIsValid();

      let savedNewUser = null;
      if (shouldSaveAdmin) {
        if (!streamerId) {
          throw new Error('Streamer ID is missing');
        }
        savedNewUser = await registerAdmin(username, email, password, streamerId);
      } else {
        savedNewUser = await register(username, email, password);
      }

      if (savedNewUser) {
        showAlert('Registration successful', 'success');
        clearInputs();
        navigate('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert('An error occurred', 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  };

  const clearInputs = () => {
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const checkIfAdminLinkIsValid = async (): Promise<boolean> => {
    let adminLinks: { streamerId: number; link: string }[] = [];

    try {
      const adminLinksResponse = await axios.get(`${API_URL}/streamer/streamers-admin-links`);
      adminLinks = adminLinksResponse.data;
    } catch (error) {
      console.error('Error fetching admin links:', error);
    }

    const matchedStreamerId = adminLinks.find((link) => link.link === dynamicParam)?.streamerId;

    if (!matchedStreamerId) {
      return false;
    }

    setStreamerId(matchedStreamerId);
    return true;
  };

  const changeLanguage = () => {
    const nextLang =
      languageOptions[
        (languageOptions.findIndex((lang) => lang.code === currentLanguage) + 1) %
          languageOptions.length
      ];
    i18n.changeLanguage(nextLang.code);
    setCurrentLanguage(nextLang.code);
    
    console.log(API_URL, 'API_URL');
    console.log(import.meta.env, 'import.meta.env');
    console.log(import.meta.env.VITE_API_URL, 'import.meta.env.VITE_API_URL');

  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/user/login-with/google`;
  };

  return (
    <div className={style.authContainer}>
      <form onSubmit={handleSubmit} className={style.authForm}>
        <h2>{t("register")}</h2>

        <div>
          <label htmlFor="username">{t("username")}:</label>
          <input
            className="input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">{t("email")}:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">{t("password")}:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={style.buttonsBox}>
          <button className={style.registerButton} type="submit">
            {t('register')}
          </button>
          <Link className={style.goToLogin} to="/login">
            {t("i-do-have-an-account")}
          </Link>
          <button className={style.langButton} type="button" onClick={changeLanguage}>
            {languageOptions.find((lang) => lang.code === currentLanguage)?.flag}
          </button>
          <button className={style.googleButton} type="button" onClick={handleGoogleLogin}>
            <img className={style.googleIcon} src="/google-icon.jpg" alt="Google icon" />
          </button>
        </div>

      </form>
    </div>
  );
};

export default Register;
