import { useTranslation } from "react-i18next";
import ChangeMyEmail from "../components/ChangeMyEmail";
import ChangeMyPassword from "../components/ChangeMyPassword";
import CustomerSupport from "../components/CustomerSupport";
import DeleteMyAccount from "../components/DeleteMyAccount";
import MyAvatar from "../components/MyAvatar";
import styles from "../styles/MyProfilePage.module.css";

const MyProfilePage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.profileContainer}>
      <h1>{t("my_profile")}</h1>
      <MyAvatar />
      <ChangeMyEmail />
      <ChangeMyPassword />
      <DeleteMyAccount />
      <CustomerSupport />
    </div>
  )
}

export default MyProfilePage;