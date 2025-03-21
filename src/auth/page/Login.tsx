import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from  '../styles/Auth.module.css';
import axios from 'axios';
import { getAuthorAvatar, login } from '../service/authService';
import { useAlert } from '@/alert/AlertContext';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '@/locales/LanguageOptions';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { showAlert } = useAlert();
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.user.userId);
        localStorage.setItem('isStreamer', data.user.isStreamer);
        localStorage.setItem('streamerId', data.user.streamerId);
        localStorage.setItem('adminId', data.user.adminId);

        if (data.user.adminId !== null) {
          const adminId = Number(data.user.adminId);
          await getAuthorAvatar(adminId);
        }

        showAlert('Login successful', 'success');
        navigate('/');
        clearInputs();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  }

  function clearInputs() {
    setEmail('');
    setPassword('');
  }

  const changeLanguage = () => {
    const nextLang =
      languageOptions[
        (languageOptions.findIndex((lang) => lang.code === currentLanguage) + 1) %
          languageOptions.length
      ]?.code || "en";
  
    i18n.changeLanguage(nextLang);
    setCurrentLanguage(nextLang);
  };

  return (
    <div className={style.authContainer}>
      <form onSubmit={handleSubmit} className={style.authForm}>
        <h2>{t("login")}</h2>

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
          <button className={style.registerButton} type="submit">{t("login")}</button>
          <Link className={style.goToLogin} to="/register">{t("do-you-need-to-register")}</Link>
          <button className={style.langButton} type="button" onClick={changeLanguage}>
            {languageOptions.find((lang) => lang.code === currentLanguage)?.flag}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
