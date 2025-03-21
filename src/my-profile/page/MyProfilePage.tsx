import MyAvatar from "../components/MyAvatar";
import styles from "../styles/MyProfilePage.module.css";

const MyProfilePage = () => {
  return (
    <div className={styles.profileContainer}>
      <h1>My Profile</h1>
      <MyAvatar />
    </div>
  )
}

export default MyProfilePage;