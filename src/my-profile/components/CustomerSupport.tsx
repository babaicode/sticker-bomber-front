import { useTranslation } from "react-i18next";
import styles from "../styles/CustomerSupport.module.css";

const CustomerSupport = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.customerSupport}>
      <h4>{t("customer_support")}: sb3babai@gmail.com</h4>
    </div>
  )
};

export default CustomerSupport;