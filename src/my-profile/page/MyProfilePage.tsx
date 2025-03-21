import ChangeMyEmail from "../components/ChangeMyEmail";
import ChangeMyPassword from "../components/ChangeMyPassword";
import CustomerSupport from "../components/CustomerSupport";
import MyAvatar from "../components/MyAvatar";
import styles from "../styles/MyProfilePage.module.css";

const MyProfilePage = () => {
  return (
    <div className={styles.profileContainer}>
      <h1>My Profile</h1>
      <MyAvatar />
      <ChangeMyEmail />
      <ChangeMyPassword />
      <CustomerSupport />
    </div>
  )
}

export default MyProfilePage;